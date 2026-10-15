/**
 * OmniRoute Software Version Updater
 * Checks for updates to the OmniRoute Server and the Web Extension.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.OmniRouteUpdater = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const CACHE_KEY = 'omniroute_updater_cache';
  const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
  const DEFAULT_OMNIROUTE_URL = 'http://localhost:20128';
  const DEFAULT_REPO = 'rktiwari00/omniroute-web-extension';
  const UPDATE_COMMAND = 'npm install -g omniroute@latest';

  /**
   * Cleans a semver string (strips leading 'v', metadata, etc.)
   */
  function cleanSemver(v) {
    if (!v || typeof v !== 'string') return '0.0.0';
    const trimmed = v.trim().replace(/^v/i, '');
    const clean = trimmed.split(/[-+]/)[0];
    return clean || '0.0.0';
  }

  /**
   * Compares two semver strings.
   * Returns: 1 if v1 > v2, -1 if v1 < v2, 0 if equal.
   */
  function compareVersions(v1, v2) {
    const p1 = cleanSemver(v1).split('.').map(n => parseInt(n, 10) || 0);
    const p2 = cleanSemver(v2).split('.').map(n => parseInt(n, 10) || 0);
    const len = Math.max(p1.length, p2.length, 3);

    for (let i = 0; i < len; i++) {
      const num1 = p1[i] || 0;
      const num2 = p2[i] || 0;
      if (num1 > num2) return 1;
      if (num1 < num2) return -1;
    }
    return 0;
  }

  /**
   * Checks OmniRoute server version via local API, falling back to npm registry.
   */
  async function checkOmniRouteServer(baseUrl, apiKey, fetchFn) {
    const _fetch = fetchFn || (typeof fetch !== 'undefined' ? fetch.bind(globalThis) : null);
    if (!_fetch) throw new Error('No fetch function available');

    const cleanUrl = (baseUrl || DEFAULT_OMNIROUTE_URL).replace(/\/+$/, '');
    const headers = { 'Accept': 'application/json' };
    if (apiKey && apiKey.trim()) {
      headers['Authorization'] = `Bearer ${apiKey.trim()}`;
    }

    try {
      const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
      const timeoutId = controller ? setTimeout(() => controller.abort(), 4000) : null;
      
      const res = await _fetch(`${cleanUrl}/api/system/version`, {
        method: 'GET',
        headers,
        signal: controller ? controller.signal : undefined
      });
      if (timeoutId) clearTimeout(timeoutId);

      if (res && res.ok) {
        const data = await res.json();
        const current = data.current || null;
        const latest = data.latest || current;
        let updateAvailable = !!data.updateAvailable;
        if (!updateAvailable && current && latest) {
          updateAvailable = compareVersions(latest, current) > 0;
        }

        return {
          status: updateAvailable ? 'update_available' : 'up_to_date',
          current,
          latest,
          updateAvailable,
          updateCommand: UPDATE_COMMAND,
          channel: data.channel || 'npm'
        };
      }
    } catch (e) {
      // Local server offline or failed, fallback to npm registry
    }

    // Fallback: check npm registry for latest version
    try {
      const npmRes = await _fetch('https://registry.npmjs.org/omniroute/latest', {
        headers: { 'Accept': 'application/json' }
      });
      if (npmRes && npmRes.ok) {
        const npmData = await npmRes.json();
        const latest = npmData.version || null;
        return {
          status: 'server_offline',
          current: null,
          latest,
          updateAvailable: false,
          updateCommand: UPDATE_COMMAND,
          npmLatest: latest
        };
      }
    } catch (e) {
      // Fallback failed
    }

    return {
      status: 'server_offline',
      current: null,
      latest: null,
      updateAvailable: false,
      updateCommand: UPDATE_COMMAND
    };
  }

  /**
   * Checks GitHub releases for the latest version of this extension.
   */
  async function checkExtensionRelease(currentVersion, repo, fetchFn) {
    const _fetch = fetchFn || (typeof fetch !== 'undefined' ? fetch.bind(globalThis) : null);
    if (!_fetch) throw new Error('No fetch function available');

    const targetRepo = repo || DEFAULT_REPO;
    const defaultReleaseUrl = `https://github.com/${targetRepo}/releases`;

    try {
      const res = await _fetch(`https://api.github.com/repos/${targetRepo}/releases/latest`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'OmniRoute-Web-Extension'
        }
      });

      if (res && res.ok) {
        const data = await res.json();
        const tag = data.tag_name || data.name || '';
        const cleanLatest = cleanSemver(tag);
        const cleanCurrent = cleanSemver(currentVersion);
        const updateAvailable = compareVersions(cleanLatest, cleanCurrent) > 0;

        return {
          status: updateAvailable ? 'update_available' : 'up_to_date',
          current: cleanCurrent,
          latest: cleanLatest,
          updateAvailable,
          releaseUrl: data.html_url || defaultReleaseUrl,
          releaseName: data.name || tag
        };
      }
    } catch (e) {
      // GitHub check failed
    }

    return {
      status: 'up_to_date',
      current: cleanSemver(currentVersion),
      latest: cleanSemver(currentVersion),
      updateAvailable: false,
      releaseUrl: defaultReleaseUrl
    };
  }

  /**
   * Orchestrates full check with cache support.
   */
  async function checkForUpdates(options = {}) {
    const storage = options.storage || (typeof chrome !== 'undefined' && chrome.storage ? chrome.storage.local : null);
    const fetchFn = options.fetchFn;
    const forceRefresh = !!options.forceRefresh;
    const currentExtVersion = options.currentExtVersion || (typeof chrome !== 'undefined' && chrome.runtime?.getManifest ? chrome.runtime.getManifest().version : '8.0.0');
    const omnirouteUrl = options.omnirouteUrl || DEFAULT_OMNIROUTE_URL;
    const apiKey = options.apiKey || '';

    // Check cache
    if (!forceRefresh && storage) {
      try {
        const cached = await storage.get(CACHE_KEY);
        const cacheEntry = cached ? cached[CACHE_KEY] : null;
        if (cacheEntry && cacheEntry.timestamp && (Date.now() - cacheEntry.timestamp) < CACHE_TTL_MS) {
          return cacheEntry;
        }
      } catch (e) {
        // Ignore cache read error
      }
    }

    // Run parallel checks
    const [serverRes, extRes] = await Promise.all([
      checkOmniRouteServer(omnirouteUrl, apiKey, fetchFn),
      checkExtensionRelease(currentExtVersion, DEFAULT_REPO, fetchFn)
    ]);

    const result = {
      timestamp: Date.now(),
      server: serverRes,
      extension: extRes,
      hasUpdate: !!(serverRes.updateAvailable || extRes.updateAvailable)
    };

    // Save cache
    if (storage) {
      try {
        await storage.set({ [CACHE_KEY]: result });
      } catch (e) {
        // Ignore cache write error
      }
    }

    return result;
  }

  return {
    cleanSemver,
    compareVersions,
    checkOmniRouteServer,
    checkExtensionRelease,
    checkForUpdates,
    UPDATE_COMMAND,
    DEFAULT_OMNIROUTE_URL
  };
});
