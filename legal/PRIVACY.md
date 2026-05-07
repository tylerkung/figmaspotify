# Privacy Policy

**Last updated: May 7, 2026**

This privacy policy describes how the Figma plugin (the "Plugin") handles your information.

## TL;DR

The Plugin runs entirely inside Figma. It has no backend and sends no data to any server we control. The only data it stores is a Spotify refresh token, kept locally in Figma's plugin storage on your device.

## What we collect

Nothing. The Plugin has no analytics, telemetry, crash reporting, or tracking of any kind.

## What the Plugin does on your device

When you sign in with Spotify, the Plugin requests an OAuth access token and refresh token directly from Spotify's authorization server using PKCE. These tokens are stored in Figma's local plugin storage (`clientStorage`) on your machine and are used to make API calls directly from your browser to Spotify's API.

The Plugin reads:
- The list of your active Spotify devices
- Currently playing track metadata (name, artist, album art, position)
- Search results when you query

The Plugin sends commands to:
- Start, pause, skip, and seek playback
- Adjust volume
- Transfer playback between your devices

All requests go directly between your browser (the Figma plugin iframe) and Spotify's API. No data is routed through any server we operate.

## Information processed by Spotify

When you use the Plugin, Spotify processes your interaction with their service per their own policies. See the [Spotify Privacy Policy](https://www.spotify.com/legal/privacy-policy/).

## Sign out and data deletion

Tapping the sign-out button in the Plugin clears your refresh token from Figma's local storage. Uninstalling the Plugin from Figma also clears its storage.

To revoke the Plugin's authorization on Spotify's side, visit your [Spotify Apps page](https://www.spotify.com/account/apps/) and remove this app.

## Children

The Plugin is not intended for users under 13.

## Changes

If we materially change this policy, we'll update the "Last updated" date above. Continued use of the Plugin after a change constitutes acceptance.

## Contact

Questions: tyler@sleeper.app
