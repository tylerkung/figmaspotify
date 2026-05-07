// OAuth code relay for Remote for Spotify.
//
// The Figma plugin can't receive the auth code directly because Spotify's COOP
// header severs window.opener when the popup navigates to accounts.spotify.com.
// This function holds the code briefly so the plugin can poll for it.
//
// Endpoints (mounted at /api/auth via the path config below):
//   POST /api/auth?session=<id>  body: { code?, error? }
//     - Stores the auth result for `session`. Called by callback.html.
//   GET  /api/auth?session=<id>
//     - Returns and deletes the stored result. Called by the plugin.
//
// Storage: Netlify Blobs, 5-minute TTL, single-use.

import { getStore } from '@netlify/blobs';

const TTL_MS = 5 * 60 * 1000;
const SESSION_RE = /^[A-Za-z0-9_-]{16,128}$/;

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const json = (status, body) => new Response(JSON.stringify(body), {
  status,
  headers: { ...cors, 'Content-Type': 'application/json' },
});

export default async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: cors });

  const url = new URL(req.url);
  const session = url.searchParams.get('session') || '';
  if (!SESSION_RE.test(session)) return json(400, { error: 'bad_session' });

  const store = getStore('spotify-auth');

  if (req.method === 'POST') {
    let body;
    try { body = await req.json(); } catch { return json(400, { error: 'bad_json' }); }
    const code = typeof body.code === 'string' ? body.code : null;
    const error = typeof body.error === 'string' ? body.error : null;
    if (code && code.length > 2048) return json(400, { error: 'code_too_long' });
    if (!code && !error) return json(400, { error: 'missing_code_or_error' });

    await store.setJSON(session, { code, error, expiresAt: Date.now() + TTL_MS });
    return json(200, { ok: true });
  }

  if (req.method === 'GET') {
    const data = await store.get(session, { type: 'json' });
    if (!data) return json(404, { status: 'pending' });
    if (Date.now() > data.expiresAt) {
      await store.delete(session);
      return json(410, { status: 'expired' });
    }
    // One-time use.
    await store.delete(session);
    return json(200, { status: 'ok', code: data.code, error: data.error });
  }

  return json(405, { error: 'method_not_allowed' });
};

export const config = { path: '/api/auth' };
