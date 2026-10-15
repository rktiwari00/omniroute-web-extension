# Troubleshooting & FAQ

Frequently asked questions and solutions for common issues when using the OmniRoute Web Extension.

---

## Common Issues & Fixes

### 1. "Could not find __Secure-1PSID" on Google Gemini
**Cause**: You might not be fully signed in, or the Google session cookie is stored on `.google.com` rather than `gemini.google.com`.  
**Solution**:
1. Open [gemini.google.com](https://gemini.google.com) in your browser and ensure you are logged in.
2. Send a test message or refresh the Gemini page.
3. Open the OmniRoute extension and click **AUTHORIZE AND COPY**. The extension will automatically search parent domain cookies and captured network headers.

---

### 2. "Authentication required (401)" when testing OmniRoute connection
**Cause**: Your local OmniRoute server has authentication enabled (`MANAGEMENT_KEY` or `API_KEY` required).  
**Solution**:
1. Open your OmniRoute dashboard at `http://localhost:20128`.
2. Go to **Settings** or **API Keys** and copy an API key that has the `manage` scope (or your master management key).
3. Open the OmniRoute Extension **Settings** (gear icon) and paste the key into the **Management API Key** field.
4. Click **Save Settings**, then click **Test Connection**.

---

### 3. "Failed to load extension: Variable $FIELDS$ used but not defined"
**Cause**: An old version of the extension had an unescaped Chrome i18n variable syntax.  
**Solution**: This issue was completely resolved in version `8.0.1+`. Please ensure you are running the latest version from [rktiwari00/omniroute-web-extension](https://github.com/rktiwari00/omniroute-web-extension).

---

### 4. Running OmniRoute on a custom port or remote machine
**Cause**: By default, the extension checks `http://localhost:20128`.  
**Solution**:
1. Open the extension Settings page.
2. Change the **OmniRoute Server URL** to your custom address (e.g., `http://localhost:8080` or `http://192.168.1.50:20128`).
3. Click **Save Settings**.

---

## Frequently Asked Questions (FAQ)

#### Q: Does this extension send my cookies or passwords to any server?
**A**: **No.** The extension has zero tracking or remote communication. Extraction happens entirely inside Chrome's memory on your local machine and copies the result directly to your clipboard.

#### Q: How often do session cookies expire?
**A**: Different providers have different token lifespans:
- Google Gemini `__Secure-1PSIDTS` rotates every few hours to days.
- ChatGPT `__Secure-next-auth.session-token` typically lasts 30 days.
- Claude `sessionKey` lasts between 7 and 30 days.  
Whenever an AI provider in OmniRoute returns an authentication error, simply revisit the provider's website, re-click **AUTHORIZE AND COPY**, and update the provider in OmniRoute.

#### Q: Can I run this in Brave or Edge?
**A**: **Yes.** The extension runs on any Chromium-based browser supporting Manifest V3. Enable Developer Mode in `brave://extensions` or `edge://extensions` and click "Load unpacked".
