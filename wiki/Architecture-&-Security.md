# Architecture & Security Model

The OmniRoute Web Extension is engineered with a strict **Local-First, Zero-Exfiltration** security posture. It is designed to run exclusively on developer and personal workstations to facilitate session token collection.

---

## Technical Architecture

```text
┌────────────────────────────────────────────────────────┐
│                      Chrome Browser                    │
│                                                        │
│   ┌──────────────────┐         ┌───────────────────┐   │
│   │   popup.html     │         │   background.js   │   │
│   │   (UI & Modal)   │         │ (Service Worker)  │   │
│   └────────┬─────────┘         └─────────┬─────────┘   │
│            │                             │             │
│            │ calls                       │ captures    │
│            ▼                             ▼             │
│   ┌──────────────────┐         ┌───────────────────┐   │
│   │   updater.js     │         │  webRequest API   │   │
│   │ (Version Logic)  │         │  (Headers/Tokens) │   │
│   └────────┬─────────┘         └─────────┬─────────┘   │
│            │                             │             │
└────────────┼─────────────────────────────┼─────────────┘
             │                             │
             ▼                             ▼
    Local OmniRoute API            Active Browser Tabs
 (http://localhost:20128)        (Google, ChatGPT, Claude)
```

### Components
1. **`popup.html` / `popup.js` / `popup.css`**: The main user interface, provider list selector, search bar, language switcher, and updater modal dialog.
2. **`background.js`**: Manifest V3 background service worker listening to `chrome.webRequest.onSendHeaders` to detect Bearer tokens and cookies in flight for providers like Microsoft Copilot and Google.
3. **`updater.js`**: Reusable version checking module that queries local OmniRoute status, npm registry, and GitHub releases.
4. **`options.html` / `options.js`**: Settings page for configuring local OmniRoute ports, management API keys, and test diagnostics.

---

## Security Guarantees

### Zero External Exfiltration
- **No Analytics / Telemetry**: No tracking libraries, Google Analytics, PostHog, or telemetry endpoints exist in the extension code.
- **Strict Host Permissions**: All network connections are restricted strictly to:
  - Supported AI domains (e.g., `gemini.google.com`, `chatgpt.com`).
  - Localhost (`http://localhost:20128/*`, `http://127.0.0.1:20128/*`).
  - Public registry (`registry.npmjs.org`).
  - Public release API (`api.github.com/repos/rktiwari00/omniroute-web-extension/*`).
- **No Credential Transmission**: Update checks never transmit cookies, credentials, or session tokens.

### Memory & Session Security
- Captured headers are stored exclusively in temporary Chrome session memory (`chrome.storage.session`) or short-lived memory caches with a strict **10-minute Time-To-Live (TTL)**.
- Users can click **"Clear captured data"** in the popup or options page at any time to immediately purge all cached tokens.
