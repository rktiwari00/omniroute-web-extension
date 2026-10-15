# OmniRoute Version Updater Guide

The OmniRoute Web Extension features a built-in **Software Version Updater** that monitors both your local OmniRoute server instance and the web extension itself.

---

## How It Works

### 1. OmniRoute Server Version Checking
When you open the extension popup or click the **Check Now** button:
1. The extension contacts your local OmniRoute instance at `http://localhost:20128/api/system/version` (customizable in Settings).
2. It sends an `Authorization: Bearer <managementApiKey>` header if you configured an API key in the extension options.
3. OmniRoute returns:
   ```json
   {
     "current": "3.8.49",
     "latest": "3.8.51",
     "updateAvailable": true
   }
   ```
4. **Offline Fallback**: If your local OmniRoute daemon is currently offline or unreachable, the extension automatically queries the public npm registry (`https://registry.npmjs.org/omniroute/latest`) to determine the latest available version.

### 2. Web Extension Version Checking
1. The extension reads its current installed version from `chrome.runtime.getManifest().version` (e.g. `8.0.0`).
2. It queries the GitHub Releases API (`https://api.github.com/repos/rktiwari00/omniroute-web-extension/releases/latest`).
3. If a higher semver tag is detected on GitHub, it triggers the update alert.

---

## Using the Updater

### Visual Indicators
- 🟢 **Green Dot (`v8.0.0`)**: Everything is up to date.
- 🟠 **Pulsing Amber Badge ("Update Available")**: A newer version of OmniRoute server or the extension is available.
- 🔵 **Spinner ("Checking...")**: Active network check in progress.

### 1-Click Server Update
1. Click the updater badge in the top header to open the dialog.
2. In the **OmniRoute Server** card, click **Copy Update Command**:
   ```bash
   npm install -g omniroute@latest
   ```
3. Paste and run the command in your terminal.
4. Restart your OmniRoute server if necessary.

---

## Caching Behavior
To avoid spamming local ports and hitting GitHub API rate limits:
- Results are cached in `chrome.storage.local` for **1 hour** (`omniroute_updater_cache`).
- Clicking **Check Now** in the updater modal bypasses the cache immediately and forces a fresh network check.
