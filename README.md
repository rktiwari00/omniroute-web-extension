# OmniRoute Web Extension

[![Chrome Manifest V3](https://img.shields.io/badge/Manifest-V3-00a8ff.svg?style=flat-square)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![Compatible with OmniRoute](https://img.shields.io/badge/Compatible-OmniRoute%20v3.8+-23ff9a.svg?style=flat-square)](https://github.com/diegosouzapw/OmniRoute)
[![Multi-Language](https://img.shields.io/badge/Locales-EN%20%7C%20PT%20%7C%20ES%20%7C%20DE%20%7C%20FR%20%7C%20IT-blue.svg?style=flat-square)](extension/_locales)
[![Zero Exfiltration](https://img.shields.io/badge/Privacy-100%25%20Local%20%2F%20Zero%20Exfil-brightgreen.svg?style=flat-square)](#security--privacy)

The official community browser extension companion for **[OmniRoute](https://github.com/diegosouzapw/OmniRoute)**. Automatically detects, extracts, and formats session credentials for 25+ AI web providers with a single click, and keeps your OmniRoute server and extension up-to-date with a built-in software version updater.

---

## Table of Contents
- [Key Features](#key-features)
- [Changes from Original Fork](#changes-from-original-fork)
- [Supported AI Platforms](#supported-ai-platforms)
- [Installation Guide](#installation-guide)
- [How to Use](#how-to-use)
- [OmniRoute Version Updater](#omniroute-version-updater)
- [Settings & Configuration](#settings--configuration)
- [Security & Privacy](#security--privacy)
- [Attribution & Credits](#attribution--credits)

---

## Key Features

- ⚡ **1-Click Credential Extraction**: Automatically detects active AI platform tabs, extracts the required credentials (cookies, Bearer tokens, or LocalStorage keys), formats them, and copies them to the clipboard.
- 🔄 **Built-in OmniRoute Version Updater**: Checks your running local OmniRoute instance (`/api/system/version`) and the npm registry to alert you when server updates are available, complete with a 1-click update command (`npm install -g omniroute@latest`).
- 🧩 **Extension Release Alerts**: Automatically monitors GitHub releases for `omniroute-web-extension` to notify you when new extension features or provider definitions are released.
- 🌐 **Multi-Language Support**: English by default, with dynamic live switching to Portuguese (`PT`), Spanish (`ES`), German (`DE`), French (`FR`), and Italian (`IT`).
- 🛠️ **Deep Gemini Cookie Detection**: Comprehensive extraction for Google Gemini including `.google.com` domain traversal, URL querying, and live `webRequest` header capture for rotating `__Secure-1PSIDTS` cookies.
- 🔒 **100% Local & Privacy-Preserving**: Zero tracking, zero telemetry, and zero remote data exfiltration. All processing happens entirely inside your browser.

---

## Changes from Original Fork

This project is a significantly enhanced and modernized fork of **`Anjokal/OMNIROUTE---Limpakus`** (by ROOT ACCESS LAB). Below is a summary of all major improvements and fixes:

| Feature / Fix | Original Fork (`Anjokal/OMNIROUTE---Limpakus`) | This Enhanced Version (`rktiwari00/omniroute-web-extension`) |
|---|---|---|
| **Chrome Manifest V3 Syntax** | ❌ Threw `Variable $FIELDS$ used but not defined` error preventing Chrome from loading the extension. | ✅ **Fixed**: Corrected Chrome i18n variable formatting (`$FIELDS$` &rarr; `{fields}`), loading cleanly in Manifest V3. |
| **Language & Localization** | Hardcoded Portuguese UI, Portuguese error alerts, and no language selector. | ✅ **Multi-Language**: English set as default, plus an instant language switcher in the header supporting **EN, PT, ES, DE, FR, IT**. |
| **Gemini Cookie Detection** | ❌ Failed to detect cookies on `gemini.google.com` because Google sets auth cookies on parent `.google.com`. | ✅ **Fixed**: Added `.google.com` domain hierarchy search, URL querying, and live `webRequest` header capture fallback for `__Secure-1PSID`, `__Secure-1PSIDTS`, and `__Secure-1PSIDCC`. |
| **OmniRoute Version Updater** | ❌ Not available (manual copy-paste only). | ✅ **Added**: Integrated **Software Version Updater** checking local OmniRoute server (`/api/system/version`), npm registry fallback, and GitHub releases with 1-click copy update command. |
| **Settings & Connection Testing** | Minimal options page with only a clear-data button. | ✅ **Enhanced Options**: Added server URL configuration, Management API Key storage, auto-check toggle, and live **"Test Connection"** diagnostic button. |
| **Automated Testing** | No test suite. | ✅ **Unit Tested**: Comprehensive Node.js test suite (`tests/updater.test.js`) verifying semver logic, mock API responses, and caching. |

---

## Supported AI Platforms

The extension supports 25+ AI platforms across various authentication mechanisms:

| Provider ID | Platform Name | Extraction Method | Required Credential |
|---|---|---|---|
| `gemini` | **Google Gemini** | Google Cookie Traversal | `__Secure-1PSID` + `__Secure-1PSIDTS` |
| `gemini-business` | **Gemini Business** | Google Cookie Traversal | `__Secure-1PSID` + `__Secure-1PSIDTS` |
| `chatgpt` | **ChatGPT Web** | Cookie Prefix | `__Secure-next-auth.session-token` |
| `claude` | **Claude Web** | Cookie First Match | `sessionKey` / `__Secure-next-auth.session-token` |
| `deepseek` | **DeepSeek Web** | Local Storage | `userToken` |
| `grok` | **Grok Web** | Cookie Header | `sso` + `sso-rw` |
| `perplexity` | **Perplexity AI** | Cookie Prefix | `__Secure-next-auth.session-token` |
| `poe` | **Poe Web** | Cookie Value | `p-b` |
| `huggingchat` | **HuggingChat** | Cookie Header | `hf-chat` |
| `blackbox` | **Blackbox Web** | Cookie Prefix | `__Secure-authjs.session-token` |
| `copilot` | **Microsoft Copilot** | Captured Token | `access_token` (webRequest) |
| `m365` | **Microsoft 365 Copilot** | Chathub WS Token | `access_token` + WebSocket segment |
| `qwen` | **Qwen Web (Alibaba)** | Storage / SSO | `token` or `tongyi_sso_ticket` |
| `kimi` | **Kimi Web** | Cookie Header | `kimi-auth` |
| `dola` | **Dola Web (ByteDance)**| Cookie Header | `sessionid` + `ttwid` |
| `t3` | **t3.chat** | Hybrid | `convex-session-id` + Cookie |
| `yuanbao` | **Tencent Yuanbao** | Cookie Header | `hy_user` + `hy_token` |
| `v0` | **v0 Vercel Web** | Cookie Header | Session cookie |
| `venice` | **Venice Web** | Cookie Header | Session cookie |
| `zai` | **Z.ai Web** | Cookie Header | `token` |
| `zenmux` | **ZenMux Free** | Cookie Header | Session cookies |
| `adapta` | **Adapta.org** | Cookie Value | `__client` |
| `inner` | **Inner.ai** | Hybrid | Bearer Token + Account Email |
| `muse` | **Meta AI / Muse Spark**| Cookie First Match | `ecto_1_sess` or `abra_sess` |
| `arena` | **Arena.ai** | Cookie Header | `arena-auth-prod-v1.0` |

---

## Installation Guide

1. **Clone or Download** this repository:
   ```bash
   git clone https://github.com/rktiwari00/omniroute-web-extension.git
   ```
2. Open **Google Chrome** and navigate to:
   ```text
   chrome://extensions
   ```
3. Enable **Developer mode** using the toggle switch in the top-right corner.
4. Click the **Load unpacked** button in the top-left corner.
5. Select the **`extension`** folder inside the cloned repository directory:
   ```text
   omniroute-web-extension/extension
   ```
6. The extension icon will appear in your Chrome toolbar. Pin it for quick access.

---

## How to Use

1. Open your browser and navigate to any supported AI platform (e.g., [gemini.google.com](https://gemini.google.com) or [chatgpt.com](https://chatgpt.com)) and sign in.
2. Click the **OmniRoute Extension** icon in your toolbar.
3. The active platform is automatically detected.
4. Click **AUTHORIZE AND COPY**.
5. Open your OmniRoute Dashboard (`http://localhost:20128/dashboard/providers`), select the corresponding provider, and paste the credential.

---

## OmniRoute Version Updater

The extension includes an integrated updater to keep your local OmniRoute installation and extension synchronized:

1. **Header Badge**: Displays your current status at a glance:
   - 🟢 `v8.0.0` (Up to date)
   - 🟠 **Update Available** (Pulsing amber badge when newer versions exist)
2. **Updater Modal**: Click the header badge to open the Updater view:
   - **OmniRoute Server Card**: Compares your installed OmniRoute version against the latest published version on npm.
   - **1-Click Update**: Click **Copy Update Command** to copy `npm install -g omniroute@latest`.
   - **Web Extension Card**: Checks GitHub releases for newer extension versions with a direct download link.
   - **Check Now**: Immediately bypasses the 1-hour cache to run a fresh live check.

---

## Settings & Configuration

Right-click the extension icon and select **Options** (or click the ⚙ gear icon in the popup):

- **OmniRoute Server URL**: Specify your OmniRoute address (default: `http://localhost:20128`). Useful if running OmniRoute on a custom port or remote server.
- **Management API Key**: Optional Bearer token for accessing protected OmniRoute endpoints.
- **Test Connection**: Tests live connectivity to your OmniRoute instance and displays the detected server version.
- **Auto-check Toggle**: Automatically runs a background update check when the popup is opened (enabled by default).
- **Clear Captured Data**: Manually purges temporary memory caches and authorization headers.

---

## Security & Privacy

- **100% Local Execution**: All extraction and clipboard operations take place strictly within Chrome's local sandbox.
- **No External Analytics**: The extension contains no tracking scripts, telemetry, or external analytics.
- **Scoped Host Permissions**: Network requests are strictly restricted to supported AI provider domains, `localhost:20128`, the official npm registry, and GitHub releases.
- **Temporary Memory TTL**: Any cookies or headers captured during extraction are retained in memory for at most 10 minutes and can be purged at any time using the "Clear captured data" button.

---

## Attribution & Credits

- **[OmniRoute](https://github.com/diegosouzapw/OmniRoute)** is developed by **[Diego Souza (@diegosouzapw)](https://github.com/diegosouzapw)**.
- **Omniroute-LIMPAKUS** original base extension created by **[LIMPAKUS // ROOT ACCESS LAB](https://github.com/Anjokal/OMNIROUTE---Limpakus)** (`limpakus@gmail.com`).
- **Enhanced Edition & Updater** maintained by **[Ranjan Kumar Tiwari (@rktiwari00)](https://github.com/rktiwari00)**.

---

## License

This project is open-source under the [MIT License](LICENSE).
