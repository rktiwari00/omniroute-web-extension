// Omniroute-LIMPAKUS Options & Settings Controller

document.addEventListener('DOMContentLoaded', async () => {
  const urlInput = document.querySelector('#omnirouteUrl');
  const apiKeyInput = document.querySelector('#omnirouteApiKey');
  const autoCheckInput = document.querySelector('#autoCheckUpdates');
  const saveBtn = document.querySelector('#saveSettingsBtn');
  const testBtn = document.querySelector('#testConnectionBtn');
  const resultSpan = document.querySelector('#connectionResult');
  const clearBtn = document.querySelector('#clear');
  const clearResult = document.querySelector('#result');

  // Load existing settings
  try {
    const data = await chrome.storage.local.get([
      'omniroute_url',
      'omniroute_api_key',
      'auto_check_updates'
    ]);

    if (urlInput) {
      urlInput.value = data.omniroute_url || 'http://localhost:20128';
    }
    if (apiKeyInput) {
      apiKeyInput.value = data.omniroute_api_key || '';
    }
    if (autoCheckInput) {
      autoCheckInput.checked = data.auto_check_updates !== false;
    }
  } catch (e) {
    console.warn('Failed to load settings:', e);
  }

  // Save settings
  saveBtn?.addEventListener('click', async () => {
    const url = (urlInput?.value || 'http://localhost:20128').trim();
    const apiKey = (apiKeyInput?.value || '').trim();
    const autoCheck = autoCheckInput?.checked !== false;

    try {
      await chrome.storage.local.set({
        omniroute_url: url,
        omniroute_api_key: apiKey,
        auto_check_updates: autoCheck
      });

      if (resultSpan) {
        resultSpan.className = 'form-result success';
        resultSpan.textContent = 'Settings saved successfully.';
        setTimeout(() => { resultSpan.textContent = ''; }, 3000);
      }
    } catch (e) {
      if (resultSpan) {
        resultSpan.className = 'form-result error';
        resultSpan.textContent = 'Error saving settings: ' + e.message;
      }
    }
  });

  // Test connection
  testBtn?.addEventListener('click', async () => {
    const url = (urlInput?.value || 'http://localhost:20128').trim().replace(/\/+$/, '');
    const apiKey = (apiKeyInput?.value || '').trim();

    if (resultSpan) {
      resultSpan.className = 'form-result info';
      resultSpan.textContent = 'Testing connection to ' + url + '...';
    }

    const headers = { 'Accept': 'application/json' };
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    try {
      const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
      const timeoutId = controller ? setTimeout(() => controller.abort(), 5000) : null;

      const res = await fetch(`${url}/api/system/version`, {
        method: 'GET',
        headers,
        signal: controller ? controller.signal : undefined
      });
      if (timeoutId) clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const current = data.current || 'detected';
        const latest = data.latest || current;
        if (resultSpan) {
          resultSpan.className = 'form-result success';
          resultSpan.textContent = `Connected! OmniRoute v${current} (Latest: v${latest})`;
        }
      } else {
        if (resultSpan) {
          resultSpan.className = 'form-result error';
          if (res.status === 401) {
            resultSpan.textContent = 'Unauthorized (401). Please enter a valid Management API Key.';
          } else {
            resultSpan.textContent = `Server returned status ${res.status}: ${res.statusText}`;
          }
        }
      }
    } catch (e) {
      if (resultSpan) {
        resultSpan.className = 'form-result error';
        resultSpan.textContent = 'Connection failed: ' + (e.name === 'AbortError' ? 'Request timed out' : e.message);
      }
    }
  });

  // Clear captured data
  clearBtn?.addEventListener('click', async () => {
    try {
      await chrome.runtime.sendMessage({ type: 'CLEAR_CAPTURED_DATA' });
    } catch (e) {}
    try {
      await chrome.storage.session.clear();
    } catch (e) {}
    if (clearResult) {
      clearResult.textContent = ' Captured data cleared successfully.';
    }
  });
});
