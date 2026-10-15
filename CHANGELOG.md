# Changelog & Fork Evolution

All notable changes, fixes, and improvements introduced in this repository (`rktiwari00/omniroute-web-extension`) relative to the original fork (`Anjokal/OMNIROUTE---Limpakus`).

---

## [8.1.0] - 2026-10-15

### Added
- **OmniRoute Software Version Updater**:
  - Integrated `updater.js` service supporting semver comparisons and dual-target checks.
  - Server update check querying `http://localhost:20128/api/system/version` with Bearer token authentication.
  - Fallback check querying `https://registry.npmjs.org/omniroute/latest` when the local daemon is offline.
  - Extension update check querying `https://api.github.com/repos/rktiwari00/omniroute-web-extension/releases/latest`.
  - 1-hour local storage caching (`omniroute_updater_cache`) to avoid rate limits, with manual force refresh support.
  - Header badge (`#updaterBtn`) with dynamic visual indicators: green dot for up-to-date, pulsing amber badge for update available, and spinner for active checks.
  - Interactive popup modal (`#updaterModal`) with server and extension status cards, 1-click update command copy button (`npm install -g omniroute@latest`), and GitHub release link.
- **Enhanced Settings & Configuration (`options.html`, `options.js`, `options.css`)**:
  - Configurable OmniRoute server URL (default: `http://localhost:20128`).
  - Management API Key input with password masking for protected endpoints.
  - Auto-check toggle for background update checks on popup open.
  - Live **"Test Connection"** diagnostic button showing immediate server connectivity status.
- **Automated Test Suite (`tests/updater.test.js`)**:
  - Unit tests verifying `compareVersions`, mock server online/offline scenarios, npm registry fallback, GitHub API parsing, and storage cache behavior.
- **Full Wiki Documentation (`wiki/`)**:
  - Comprehensive documentation covering Installation, Supported Providers, Updater Guide, Architecture, and FAQ.

---

## [8.0.1] - 2026-10-15

### Fixed
- **Chrome Manifest V3 Variable Crash**:
  - Resolved `Variable $FIELDS$ used but not defined` parsing failure in Chrome by replacing unescaped `$FIELDS$` placeholders with `{fields}`.
- **Gemini Cookie Detection**:
  - Added `.google.com` parent domain hierarchy search in `cookiesFor()` to retrieve root authentication cookies.
  - Added direct URL querying for Google services.
  - Added live `webRequest` header interception fallback for Google accounts with rotating `__Secure-1PSIDTS` and `__Secure-1PSIDCC` cookies.
  - Added fallback to `__Secure-3PSID` if `__Secure-1PSID` is not present.
- **Internationalization & English Default**:
  - Created complete English localization in `_locales/en/messages.json`.
  - Added dynamic multi-language switcher dropdown in the popup header supporting `EN`, `PT`, `ES`, `DE`, `FR`, and `IT`.
  - Translated all hardcoded Portuguese dialogs, error messages, and hint texts in `providers.json`, `options.html`, and `popup.js`.
  - Fixed duplicate security notice in `popup.html`.

---

## [8.0.0] - Baseline Fork
- Original base release from [Omniroute-LIMPAKUS // ROOT ACCESS LAB](https://github.com/Anjokal/OMNIROUTE---Limpakus).
- Basic cookie and token collection for supported web providers.
