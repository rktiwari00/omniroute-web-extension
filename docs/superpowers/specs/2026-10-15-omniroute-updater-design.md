# OmniRoute Software Version Updater — Design Specification

**Date:** 2026-10-15  
**Topic:** OmniRoute & Extension Version Updater  
**Target:** OmniRoute Web Extension (`omniroute-web-extension`)

---

## 1. Overview & Goals
The OmniRoute Web Extension currently extracts session tokens and credentials for 24+ AI web providers. To keep users' local installations healthy and up-to-date, this feature adds a **Software Version Updater** to:
1. Detect and display updates for the **OmniRoute Server** (`omniroute` npm package / local daemon).
2. Detect and display updates for the **OmniRoute Web Extension** (GitHub releases).
3. Provide one-click actions: copying the npm update command for the server, and linking directly to the latest GitHub release for the extension.

---

## 2. Architecture & Data Sources

### 2.1 OmniRoute Server Version Checking
- **Primary Endpoint**: `GET ${omnirouteUrl}/api/system/version` (default: `http://localhost:20128/api/system/version`).
  - Headers: `Authorization: Bearer ${managementApiKey}` (if configured).
  - Response format from OmniRoute:
    ```json
    {
      "current": "3.8.49",
      "latest": "3.8.51",
      "updateAvailable": true,
      "channel": "source",
      "autoUpdateSupported": false
    }
    ```
- **Fallback Endpoint (npm Registry)**: If the local OmniRoute instance is offline or unreachable, the extension fetches from the official npm registry:
  - `GET https://registry.npmjs.org/omniroute/latest`
  - Extracts `"version"` from npm metadata.
  - Server status is reported as "Server Offline (Latest published: vX.Y.Z)".
- **Update Command**: When an update is available, the extension displays:
  ```bash
  npm install -g omniroute@latest
  ```
  with a 1-click **Copy Command** button.

### 2.2 Extension Version Checking
- **Local Installed Version**: Read directly from the running extension via `chrome.runtime.getManifest().version` (e.g. `8.0.0`).
- **Remote Version Check**:
  - `GET https://api.github.com/repos/rktiwari00/omniroute-web-extension/releases/latest`
  - Parses `tag_name` (e.g., `v8.0.1` or `8.0.1`).
  - Fallback: `GET https://api.github.com/repos/rktiwari00/omniroute-web-extension/tags` if no explicit GitHub release exists yet.
- **Update Action**: Direct button link to the release download page:
  `https://github.com/rktiwari00/omniroute-web-extension/releases`

### 2.3 Caching & Network Resilience
- Version check results are cached in `chrome.storage.local` under `omniroute_updater_cache` with a TTL of 1 hour (`3600000` ms).
- Cache structure:
  ```json
  {
    "timestamp": 1729000000000,
    "server": {
      "status": "update_available" | "up_to_date" | "offline" | "error",
      "current": "3.8.49",
      "latest": "3.8.51"
    },
    "extension": {
      "status": "update_available" | "up_to_date" | "unknown",
      "current": "8.0.0",
      "latest": "8.0.1",
      "releaseUrl": "https://github.com/..."
    }
  }
  ```
- A manual **Check Now** button bypasses cache and triggers an immediate network check.

---

## 3. UI & User Experience

### 3.1 Header Updater Badge ([popup.html](file:///d:/projects/omniroute-extension/extension/popup.html))
- Added to the top header right side next to the language dropdown and options link.
- **States**:
  - `badge-uptodate`: Green dot / subtle label "Up to date".
  - `badge-update`: Amber/orange pulsing badge "Update Available".
  - `badge-checking`: Spinner animation while fetching.

### 3.2 Updater Modal Dialog
- Modal backdrop + card (`#updater-modal`) styled in OmniRoute's dark cyberpunk / glassmorphism theme (`#0c0f14`, border `#1a2333`, accent `#00e5ff` / `#ff9800`).
- **Sections**:
  1. **OmniRoute Server Card**:
     - Status icon + Title
     - Version comparison: Current vs Latest
     - Action button: "Copy Update Command" (`npm install -g omniroute@latest`) with transient "Copied!" feedback.
  2. **Web Extension Card**:
     - Status icon + Title
     - Version comparison: Installed vs Latest
     - Action button: "Get Latest Release" (opens GitHub in new tab).
  3. **Footer Controls**:
     - "Check Now" button (with refresh icon).
     - Link to extension settings.
     - "Close" button.

### 3.3 Options / Settings Page ([options.html](file:///d:/projects/omniroute-extension/extension/options.html))
- New settings section: **OmniRoute Server & Updater**:
  - `omniroute_url`: Input text field (default `http://localhost:20128`).
  - `omniroute_api_key`: Password/token field for optional Management API key (pre-filled with existing key if found or user entered).
  - `auto_check_updates`: Checkbox toggle (default `true`) to check for updates when popup opens.
  - "Test Server Connection" button verifying connectivity to `GET /api/system/version`.

---

## 4. Internationalization & Localization
All new UI labels, status messages, buttons, and error strings will be added to `_locales/<lang>/messages.json` across all 6 supported languages:
- English (`en`)
- Portuguese (`pt`)
- Spanish (`es`)
- French (`fr`)
- German (`de`)
- Italian (`it`)

New keys:
- `updaterTitle`: "OmniRoute Updater"
- `updaterCheckNow`: "Check Now"
- `updaterChecking`: "Checking for updates..."
- `updaterServerTitle`: "OmniRoute Server"
- `updaterExtensionTitle`: "Web Extension"
- `updaterUpToDate`: "Up to date"
- `updaterUpdateAvailable`: "Update Available"
- `updaterServerOffline`: "Server Offline"
- `updaterCopyCommand`: "Copy Update Command"
- `updaterCopied`: "Copied!"
- `updaterDownload`: "Download Update"
- `updaterSettings`: "Settings"
- `updaterClose`: "Close"

---

## 5. Permissions & Security
- Updates [manifest.json](file:///d:/projects/omniroute-extension/extension/manifest.json) `host_permissions`:
  - `http://localhost:20128/*`
  - `http://127.0.0.1:20128/*`
  - `https://registry.npmjs.org/omniroute/*`
  - `https://api.github.com/repos/rktiwari00/omniroute-web-extension/*`
- All network requests are strictly limited to the local OmniRoute server, the public npm registry, and the public GitHub releases endpoint.
- Zero credential leakage: No tokens or session cookies are transmitted in update checks.

---

## 6. Testing & Verification Plan
1. **Local OmniRoute Version Check**:
   - Verify connection to running OmniRoute instance (`http://localhost:20128/api/system/version`).
   - Validate version comparison (`3.8.49` current vs `3.8.51` latest) triggers "Update Available" state.
2. **Fallback Check**:
   - Verify that when OmniRoute URL is invalid/offline, npm registry check cleanly reports npm latest version.
3. **Extension Version Check**:
   - Verify GitHub API query for `rktiwari00/omniroute-web-extension`.
4. **UI & Actions**:
   - Verify modal opens/closes cleanly.
   - Verify copy button copies `npm install -g omniroute@latest` and shows feedback.
   - Verify external link opens GitHub release tab.
   - Verify language switching updates all updater strings in real-time.
5. **Options Configuration**:
   - Verify custom OmniRoute URL and API key persist in storage and are used for subsequent checks.
