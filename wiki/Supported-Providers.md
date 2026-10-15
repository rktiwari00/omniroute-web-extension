# Supported Providers & Credential Matrix

The OmniRoute Web Extension standardizes credential collection across 25+ AI web platforms. Because every AI platform stores authentication data in different places, the extension uses specialized extraction strategies tailored to each provider.

---

## Provider Overview

| Provider | URL | Mode | Primary Credential | Notes |
|---|---|---|---|---|
| **Google Gemini** | `gemini.google.com` | `google_cookie` | `__Secure-1PSID` + `__Secure-1PSIDTS` | Automatically searches `.google.com` parent cookies and captured request headers. |
| **Gemini Business** | `business.gemini.google` | `google_cookie` | `__Secure-1PSID` + `__Secure-1PSIDTS` | For Google Workspace AI accounts. |
| **ChatGPT Web** | `chatgpt.com` | `cookie_value_prefix` | `__Secure-next-auth.session-token` | Prefix-based session token. |
| **Claude Web** | `claude.ai` | `cookie_first` | `sessionKey` or `__Secure-next-auth.session-token` | Anthropic session cookie. |
| **DeepSeek Web** | `chat.deepseek.com` | `storage` | `userToken` | Reads from browser `localStorage`. |
| **Grok Web** | `grok.com` | `cookie_header` | `sso` + `sso-rw` | Full formatted Cookie header. |
| **Perplexity AI** | `perplexity.ai` | `cookie_value_prefix` | `__Secure-next-auth.session-token` | NextAuth session token. |
| **Poe Web** | `poe.com` | `cookie_value` | `p-b` | Quora Poe authentication cookie. |
| **HuggingChat** | `huggingface.co/chat` | `cookie_header` | `hf-chat` | Full session Cookie header. |
| **Blackbox Web** | `app.blackbox.ai` | `cookie_value_prefix` | `__Secure-authjs.session-token` | AuthJS session token. |
| **Microsoft Copilot**| `copilot.microsoft.com` | `captured_token` | Bearer `access_token` | Automatically intercepted from web traffic. |
| **M365 Copilot** | `m365.cloud.microsoft` | `manual_m365` | `access_token` + Chathub segment | Captures WebSocket parameters. |
| **Qwen Web** | `chat.qwen.ai` | `qwen` | `token` or `tongyi_sso_ticket` | Alibaba Tongyi Qianwen token. |
| **Kimi Web** | `kimi.com` | `cookie_header` | `kimi-auth` | Moonshot AI auth cookie. |
| **Tencent Yuanbao** | `yuanbao.tencent.com` | `cookie_header` | `hy_user` + `hy_token` | Tencent Hunyuan session cookies. |
| **v0 Vercel** | `v0.dev` | `cookie_header` | Full session cookie | Vercel NextAuth session. |
| **Venice AI** | `venice.ai` | `cookie_header` | Full session cookie | Privacy-first LLM cookies. |
| **Z.ai** | `chat.z.ai` | `cookie_header` | `token` | Z.ai auth cookie. |
| **ZenMux Free** | `zenmux.ai` | `cookie_header` | Session cookies | ZenMux AI session. |
| **Inner.ai** | `innerai.com` | `inner` | Bearer Token + Account Email | Hybrid token prompt. |
| **Meta AI (Muse)** | `meta.ai` | `cookie_first` | `ecto_1_sess` or `abra_sess` | Meta AI session token. |
| **Arena.ai** | `arena.ai` | `cookie_header` | `arena-auth-prod-v1.0` | LMSYS Chatbot Arena cookie. |
| **Dola Web** | `dola.com` | `cookie_header` | `sessionid` + `ttwid` | ByteDance Dola session. |
| **t3.chat** | `t3.chat` | `t3` | `convex-session-id` + Cookie | Convex real-time DB session. |

---

## Credential Extraction Details

### Google Gemini Details
Google divides its authentication across multiple domains:
- Core session tokens like `__Secure-1PSID` are scoped to `.google.com`.
- Temporary rotating tokens like `__Secure-1PSIDTS` and `__Secure-1PSIDCC` are refreshed on `gemini.google.com`.
- **How OmniRoute Web Extension solves this**: It scans both `gemini.google.com` and `.google.com`, cross-referencing live HTTP request headers captured via `chrome.webRequest` to build a complete cookie string:
  ```text
  __Secure-1PSID=...; __Secure-1PSIDTS=...; __Secure-1PSIDCC=...
  ```
