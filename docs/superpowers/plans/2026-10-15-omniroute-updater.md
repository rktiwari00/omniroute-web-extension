# OmniRoute Software Version Updater Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a Software Version Updater in the OmniRoute Web Extension that detects and displays update status for both the local OmniRoute server (via local API or npm registry) and the web extension (via GitHub releases), complete with 1-click update commands and links.

**Architecture:** A modular `updater.js` service handles network queries (local OmniRoute `/api/system/version`, npm registry fallback, and GitHub releases API), caching results in `chrome.storage.local`. A glassmorphism header badge and popup modal dialog in `popup.html`/`popup.js` present the status and actions to the user, while `options.html`/`options.js` provide configuration for the OmniRoute server URL and management API key.

**Tech Stack:** JavaScript (ES6+ / Chrome Manifest V3), HTML5, Vanilla CSS, Chrome Storage API, Chrome i18n API, Node.js (test runner).

## Global Constraints
- Target platform: Google Chrome Extension (Manifest V3).
- Zero external data leakage: update checks must strictly query the user's local OmniRoute server, the public npm registry (`registry.npmjs.org`), and GitHub public releases. No tokens or session cookies may be leaked.
- Multi-language support: all strings must be localized across `en`, `pt`, `es`, `fr`, `de`, `it`.
- UI style: preserve dark theme `#0c0f14`, border `#1a2333`, cyan `#00e5ff`, amber `#ff9800`, and green `#00e676`.

---

### Task 1: Update Manifest Permissions

**Files:**
- Modify: `extension/manifest.json:15-30`

**Interfaces:**
- Produces: Chrome runtime host permissions to query `http://localhost:20128/*`, `http://127.0.0.1:20128/*`, `https://registry.npmjs.org/omniroute/*`, and `https://api.github.com/repos/rktiwari00/omniroute-web-extension/*`.

- [ ] **Step 1: Check existing host_permissions in `manifest.json`**
Read `extension/manifest.json` to confirm current list of `host_permissions`.

- [ ] **Step 2: Add host permissions for local OmniRoute server, npm registry, and GitHub API**
In `extension/manifest.json`, ensure the following are included in `host_permissions`:
```json
"http://localhost:20128/*",
"http://127.0.0.1:20128/*",
"https://registry.npmjs.org/omniroute/*",
"https://api.github.com/repos/rktiwari00/omniroute-web-extension/*"
```

- [ ] **Step 3: Verify JSON syntax**
Run `node -e "JSON.parse(require('fs').readFileSync('extension/manifest.json'))"` to ensure valid JSON.

- [ ] **Step 4: Commit**
```bash
git add extension/manifest.json; git commit -m "feat(manifest): add host permissions for OmniRoute updater"
```

---

### Task 2: Add Localization Keys across Locales

**Files:**
- Modify: `extension/_locales/en/messages.json`
- Modify: `extension/_locales/pt/messages.json`
- Modify: `extension/_locales/es/messages.json`
- Modify: `extension/_locales/fr/messages.json`
- Modify: `extension/_locales/de/messages.json`
- Modify: `extension/_locales/it/messages.json`

**Interfaces:**
- Produces: i18n message keys:
  - `updaterTitle`, `updaterCheckNow`, `updaterChecking`, `updaterServerTitle`, `updaterExtensionTitle`, `updaterUpToDate`, `updaterUpdateAvailable`, `updaterServerOffline`, `updaterCopyCommand`, `updaterCopied`, `updaterDownload`, `updaterSettings`, `updaterClose`, `updaterTesting`, `updaterConnected`, `updaterFailed`

- [ ] **Step 1: Add updater keys to English `_locales/en/messages.json`**
```json
"updaterTitle": { "message": "OmniRoute Updater" },
"updaterCheckNow": { "message": "Check Now" },
"updaterChecking": { "message": "Checking for updates..." },
"updaterServerTitle": { "message": "OmniRoute Server" },
"updaterExtensionTitle": { "message": "Web Extension" },
"updaterUpToDate": { "message": "Up to date" },
"updaterUpdateAvailable": { "message": "Update Available" },
"updaterServerOffline": { "message": "Server Offline" },
"updaterCopyCommand": { "message": "Copy Update Command" },
"updaterCopied": { "message": "Copied!" },
"updaterDownload": { "message": "Download Latest Release" },
"updaterSettings": { "message": "Settings" },
"updaterClose": { "message": "Close" },
"updaterServerUrl": { "message": "OmniRoute Server URL" },
"updaterApiKey": { "message": "Management API Key (optional)" },
"updaterAutoCheck": { "message": "Check for updates when popup opens" },
"updaterTestConn": { "message": "Test Connection" },
"updaterConnected": { "message": "Connected successfully!" },
"updaterFailed": { "message": "Connection failed" }
```

- [ ] **Step 2: Add translated keys to `pt`, `es`, `fr`, `de`, `it`**
Add corresponding translations for each locale ensuring accurate terminology.

- [ ] **Step 3: Validate all JSON locale files**
Run a validation script to ensure all 6 JSON files parse cleanly.

- [ ] **Step 4: Commit**
```bash
git add extension/_locales/; git commit -m "feat(i18n): add updater localization keys for all languages"
```

---

### Task 3: Core Updater Service & Automated Unit Tests

**Files:**
- Create: `tests/updater.test.js`
- Create: `extension/updater.js`

**Interfaces:**
- Produces:
  - `compareVersions(v1, v2)`: returns `1` if `v1 > v2`, `-1` if `v1 < v2`, `0` if equal.
  - `checkOmniRouteServer(baseUrl, apiKey, fetchFn)`: queries `/api/system/version` or npm registry fallback.
  - `checkExtensionRelease(currentVersion, repo, fetchFn)`: queries GitHub releases API.
  - `checkForUpdates(options)`: orchestrates server & extension check with 1h caching via storage.

- [ ] **Step 1: Write unit tests in `tests/updater.test.js`**
Write tests covering:
- `compareVersions`: (`3.8.51` > `3.8.49`, `8.0.0` == `8.0.0`, `v8.0.1` > `8.0.0`).
- `checkOmniRouteServer`: mock 200 response with `updateAvailable: true`.
- `checkOmniRouteServer`: mock server failure, fallback to npm registry mock.
- `checkExtensionRelease`: mock GitHub release API response.

- [ ] **Step 2: Run test to verify it fails**
Run: `node tests/updater.test.js`
Expected: FAIL (module `extension/updater.js` not found).

- [ ] **Step 3: Implement `extension/updater.js`**
Implement version comparison, OmniRoute system version check, npm fallback check, GitHub release check, and storage caching. Ensure it works in both browser environment (`chrome.storage`) and Node.js testing environment.

- [ ] **Step 4: Run test to verify it passes**
Run: `node tests/updater.test.js`
Expected: PASS with 100% assertions passing.

- [ ] **Step 5: Commit**
```bash
git add extension/updater.js tests/updater.test.js; git commit -m "feat(updater): implement core updater service with unit tests"
```

---

### Task 4: Popup UI Markup & Styling

**Files:**
- Modify: `extension/popup.html:15-35`
- Modify: `extension/popup.css:300-400`

**Interfaces:**
- Produces:
  - Header button `#btn-updater` with state classes (`badge-ok`, `badge-update`, `badge-checking`).
  - Modal element `#updater-modal` with ID `#updater-server-card`, `#updater-extension-card`, `#updater-status-text`, `#btn-check-updates`, `#btn-copy-update-cmd`, `#btn-download-ext`, `#btn-close-updater`.

- [ ] **Step 1: Add updater button to header in `extension/popup.html`**
Add `#btn-updater` beside `#lang-selector` and `#options-link`.

- [ ] **Step 2: Add modal markup in `extension/popup.html`**
Add `#updater-modal` container before closing `</body>`.

- [ ] **Step 3: Add CSS styling in `extension/popup.css`**
Add styles matching existing dark glassmorphism theme:
- `.updater-badge` pill styling and pulsating dot animation for update notifications.
- `.updater-modal-overlay` backdrop filter and positioning.
- `.updater-card` styling for server and extension status.
- `.copy-btn` and `.action-btn` styles with hover and active states.

- [ ] **Step 4: Commit**
```bash
git add extension/popup.html extension/popup.css; git commit -m "feat(ui): add updater button and modal to popup"
```

---

### Task 5: Popup Logic Integration

**Files:**
- Modify: `extension/popup.js`

**Interfaces:**
- Consumes: `extension/updater.js`
- Connects: `#btn-updater` open/close modal, `#btn-check-updates` force refresh, `#btn-copy-update-cmd` clipboard copy, automatic background check on popup load.

- [ ] **Step 1: Wire updater script in `extension/popup.html`**
Add `<script src="updater.js"></script>` before `<script src="popup.js"></script>`.

- [ ] **Step 2: Add updater initialization and event listeners in `extension/popup.js`**
- On popup load, check settings (`auto_check_updates !== false`). If true, call `checkForUpdates(false)` in background.
- Update `#btn-updater` visual indicator (green dot if up to date, amber pulsing badge if update available).
- `#btn-updater` click: toggle `#updater-modal`.
- `#btn-check-updates` click: call `checkForUpdates(true)` (force refresh) and render results into modal cards.
- `#btn-copy-update-cmd` click: write `npm install -g omniroute@latest` to clipboard and display "Copied!".
- `#btn-close-updater` click: hide modal.
- Language change listener: re-render updater strings when user changes language.

- [ ] **Step 3: Commit**
```bash
git add extension/popup.html extension/popup.js; git commit -m "feat(popup): integrate updater events and live status in popup"
```

---

### Task 6: Options Page Integration (Settings & Test Connection)

**Files:**
- Modify: `extension/options.html`
- Modify: `extension/options.js`

**Interfaces:**
- Manages storage keys:
  - `omniroute_url`: default `"http://localhost:20128"`
  - `omniroute_api_key`: default `""`
  - `auto_check_updates`: default `true`
- Action: `#btn-test-connection` tests connection to `${omniroute_url}/api/system/version`.

- [ ] **Step 1: Add OmniRoute & Updater section in `extension/options.html`**
Add form fields for server URL, API key, auto-check checkbox, and test button.

- [ ] **Step 2: Update `extension/options.js` to persist settings and test connection**
- Load values from `chrome.storage.local`.
- Save values when edited with save notification.
- Test connection handler: fetch `${omniroute_url}/api/system/version` using the API key, display status (Success: server version / Failure: error message).

- [ ] **Step 3: Commit**
```bash
git add extension/options.html extension/options.js; git commit -m "feat(options): add OmniRoute connection settings and test connection"
```

---

### Task 7: Full Verification, Documentation & Cleanup

**Files:**
- Modify: `README.md`
- Scratch/temporary files cleanup.

- [ ] **Step 1: Run automated unit tests**
Run: `node tests/updater.test.js`
Verify all unit tests pass.

- [ ] **Step 2: Test live integration with local OmniRoute server**
Run a test script that exercises `checkOmniRouteServer('http://localhost:20128', '<key>')` and verifies that it correctly receives version `3.8.49` vs `3.8.51` with `updateAvailable: true`.

- [ ] **Step 3: Update `README.md`**
Document the new OmniRoute Updater feature, how to use it, and how to configure custom OmniRoute ports/keys in options.

- [ ] **Step 4: Clean up scratch directory and commit**
```bash
git add README.md; git commit -m "docs: document OmniRoute updater in README"
```
