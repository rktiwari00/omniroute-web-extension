# Installation & Setup Guide

This guide walks you through installing and configuring the OmniRoute Web Extension on Chromium-based browsers.

---

## Prerequisites
- Any modern Chromium browser (Google Chrome, Brave, Microsoft Edge, Opera, Vivaldi, Arc) running version 114 or newer.
- An installed and running instance of [OmniRoute](https://github.com/diegosouzapw/OmniRoute) (optional for extraction, required for the live server updater and routing).

---

## Step-by-Step Installation

### Method 1: Git Clone (Recommended for easy updates)
1. Open your terminal and clone the repository:
   ```bash
   git clone https://github.com/rktiwari00/omniroute-web-extension.git
   ```
2. In your browser, open the extensions management page:
   - **Chrome**: `chrome://extensions`
   - **Brave**: `brave://extensions`
   - **Edge**: `edge://extensions`
3. Enable **Developer mode** using the toggle switch (usually in the upper right or left sidebar).
4. Click **Load unpacked**.
5. Browse to the cloned directory and select the **`extension`** folder:
   ```text
   omniroute-web-extension/extension
   ```
6. The extension is now installed. Pin it to your browser toolbar for easy access.

### Method 2: ZIP Download
1. Go to the [GitHub Repository Releases](https://github.com/rktiwari00/omniroute-web-extension/releases).
2. Download `omniroute-web-extension.zip`.
3. Extract the archive into a permanent folder on your computer.
4. Follow steps 2 to 5 above, selecting the extracted `extension` folder.

---

## Verifying Installation
1. Click the **OmniRoute** icon in your toolbar.
2. The popup should open displaying the dark cyberpunk interface with:
   - Header with logo and language dropdown (`EN`, `PT`, `ES`, `DE`, `FR`, `IT`).
   - Version badge (e.g. `v8.0.0` with green dot).
   - "DETECTED NODE" indicator.
   - List of 25+ supported AI platforms.

---

## Updating the Extension
When an update is published on GitHub:
- If you installed via **Git**: run `git pull origin main` inside the repo directory and click the reload icon on `chrome://extensions`.
- If you installed via **ZIP**: download the new ZIP, replace the folder contents, and click reload on `chrome://extensions`.
