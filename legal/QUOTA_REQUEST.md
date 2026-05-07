# Spotify Extended Quota Mode — Application Draft

Paste the relevant chunks of this into Spotify's Extended Quota Mode form fields when you submit. The form's exact fields change occasionally; the sections below cover everything they typically ask for.

---

## App description (1–2 sentences)

A free Figma plugin that gives designers a lightweight Spotify Connect remote control inside their Figma workspace — see what's currently playing, pause/skip/seek, search tracks, and switch between active devices, without leaving Figma.

## Detailed description / what the app does

The plugin is intentionally minimal: a small player UI rendered inside the Figma plugin panel, with a one-row collapsed mode for when designers want it out of the way. There is no backend; the plugin runs entirely in the user's browser and communicates directly with Spotify's Web API over HTTPS.

It uses standard Spotify Connect endpoints to:
- Read the user's current playback state and active devices
- Send playback commands (play/pause/next/previous/seek/volume)
- Transfer playback between the user's existing devices
- Search Spotify's catalog when the user types a query

The plugin does not stream audio itself — the Spotify Web Playback SDK isn't usable inside Figma's sandboxed iframe (no secure context, so EME/Widevine is unavailable). Instead, the plugin acts as a remote for whatever Spotify device the user already has running.

## Intended use case

Designers spend long sessions in Figma and routinely have Spotify open on a second device (phone, desktop app, or open.spotify.com). The plugin saves them a context-switch by surfacing playback controls directly in the tool they're already in. It's a quality-of-life utility, not a content product — it does not redistribute Spotify content, scrape catalog data, generate derivative works, or expose Spotify functionality to non-Spotify users.

## Why I'm requesting Extended Quota

The plugin will be published in the Figma Community for free. The Figma design community is large enough that the 25-user development cap will block legitimate use within days of launch. Granting Extended Quota lets any Spotify user authorize the plugin without me pre-approving them by email.

## Expected scale

Light to moderate. Each user makes one `/me/player` poll roughly every 3 seconds while the plugin is open, plus occasional control calls and search queries. Typical session length is 30 minutes to a few hours. I expect anywhere from hundreds to a few thousand monthly active users initially, scaling slowly with Figma Community discovery.

## Commercial use

No. The plugin is free, ad-free, contains no in-app purchases or premium tiers, and is offered as a free utility.

## Compliance with Spotify Design Guidelines

I have reviewed Spotify's Design and Brand Guidelines and confirm:

- The Spotify wordmark and logo are used only to identify the service the plugin connects to, never as part of the plugin's own branding.
- The wordmark is not modified, recolored, or combined with my own branding in a way that implies endorsement.
- The plugin is described in copy as "controlling Spotify playback" — not as "a Spotify app."
- All track metadata (name, artist, album art) is displayed in its original form, attributed to Spotify.
- Playback controls follow Spotify's recommended icon conventions (play/pause/next/previous).
- The plugin does not modify, edit, or create derivative works from any Spotify content.

## Privacy and security

- OAuth 2.0 with PKCE — no client secret stored in the plugin.
- Refresh tokens are stored only in Figma's local `clientStorage` on the user's device and are never transmitted to any server I control.
- The plugin has no backend, no analytics, and no telemetry.
- Privacy Policy: [PASTE YOUR HOSTED URL]
- Terms of Service: [PASTE YOUR HOSTED URL]

## Contact

tyler@sleeper.app
