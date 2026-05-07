// Figma plugin sandbox — bridges UI <-> Figma APIs.
// All Spotify network + playback work happens in ui.html.

const SIZE_FULL = { width: 360, height: 680 };
const SIZE_COMPACT = { width: 360, height: 64 };

const STORAGE_KEYS = {
  refreshToken: 'spotify.refreshToken',
  clientId: 'spotify.clientId',
  redirectUri: 'spotify.redirectUri',
  lastTrackUri: 'spotify.lastTrackUri',
  compact: 'spotify.compact',
};

(async () => {
  const compact = await figma.clientStorage.getAsync(STORAGE_KEYS.compact);
  const size = compact ? SIZE_COMPACT : SIZE_FULL;
  figma.showUI(__html__, { width: size.width, height: size.height, themeColors: true });

  const [refreshToken, clientId, redirectUri, lastTrackUri] = await Promise.all([
    figma.clientStorage.getAsync(STORAGE_KEYS.refreshToken),
    figma.clientStorage.getAsync(STORAGE_KEYS.clientId),
    figma.clientStorage.getAsync(STORAGE_KEYS.redirectUri),
    figma.clientStorage.getAsync(STORAGE_KEYS.lastTrackUri),
  ]);
  figma.ui.postMessage({
    type: 'state-loaded',
    refreshToken: refreshToken || null,
    clientId: clientId || null,
    redirectUri: redirectUri || null,
    lastTrackUri: lastTrackUri || null,
    compact: !!compact,
  });
})();

figma.ui.onmessage = async (msg) => {
  switch (msg.type) {
    case 'persist-credentials':
      await figma.clientStorage.setAsync(STORAGE_KEYS.clientId, msg.clientId || '');
      await figma.clientStorage.setAsync(STORAGE_KEYS.redirectUri, msg.redirectUri || '');
      break;

    case 'persist-refresh-token':
      await figma.clientStorage.setAsync(STORAGE_KEYS.refreshToken, msg.refreshToken || '');
      break;

    case 'persist-last-track':
      await figma.clientStorage.setAsync(STORAGE_KEYS.lastTrackUri, msg.uri || '');
      break;

    case 'sign-out':
      await figma.clientStorage.deleteAsync(STORAGE_KEYS.refreshToken);
      await figma.clientStorage.deleteAsync(STORAGE_KEYS.lastTrackUri);
      break;

    case 'set-compact': {
      const size = msg.compact ? SIZE_COMPACT : SIZE_FULL;
      figma.ui.resize(size.width, size.height);
      await figma.clientStorage.setAsync(STORAGE_KEYS.compact, !!msg.compact);
      break;
    }

    case 'notify':
      figma.notify(msg.message, msg.options || undefined);
      break;

    case 'close':
      figma.closePlugin();
      break;
  }
};
