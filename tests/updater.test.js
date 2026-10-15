const assert = require('assert');
const path = require('path');

// Test runner for updater.js
async function runTests() {
  console.log('--- Running Updater Unit Tests ---');
  let passed = 0;
  let failed = 0;

  let updater;
  try {
    updater = require('../extension/updater.js');
  } catch (err) {
    console.error('Failed to require extension/updater.js:', err.message);
    process.exit(1);
  }

  function test(name, fn) {
    try {
      fn();
      console.log(`[PASS] ${name}`);
      passed++;
    } catch (e) {
      console.error(`[FAIL] ${name}:`, e.message);
      failed++;
    }
  }

  async function asyncTest(name, fn) {
    try {
      await fn();
      console.log(`[PASS] ${name}`);
      passed++;
    } catch (e) {
      console.error(`[FAIL] ${name}:`, e.message);
      failed++;
    }
  }

  // 1. compareVersions tests
  test('compareVersions: greater version', () => {
    assert.strictEqual(updater.compareVersions('3.8.51', '3.8.49'), 1);
    assert.strictEqual(updater.compareVersions('v8.1.0', '8.0.5'), 1);
    assert.strictEqual(updater.compareVersions('1.0.0', '0.9.9'), 1);
  });

  test('compareVersions: lesser version', () => {
    assert.strictEqual(updater.compareVersions('3.8.49', '3.8.51'), -1);
    assert.strictEqual(updater.compareVersions('8.0.0', 'v8.0.1'), -1);
  });

  test('compareVersions: equal versions', () => {
    assert.strictEqual(updater.compareVersions('8.0.0', '8.0.0'), 0);
    assert.strictEqual(updater.compareVersions('v3.8.50', '3.8.50'), 0);
  });

  // 2. checkOmniRouteServer tests with mock fetch
  await asyncTest('checkOmniRouteServer: online with update available', async () => {
    const mockFetch = async (url, opts) => {
      assert(url.includes('/api/system/version'));
      assert.strictEqual(opts.headers.Authorization, 'Bearer test-key');
      return {
        ok: true,
        status: 200,
        json: async () => ({
          current: '3.8.49',
          latest: '3.8.51',
          updateAvailable: true
        })
      };
    };

    const res = await updater.checkOmniRouteServer('http://localhost:20128', 'test-key', mockFetch);
    assert.strictEqual(res.status, 'update_available');
    assert.strictEqual(res.current, '3.8.49');
    assert.strictEqual(res.latest, '3.8.51');
    assert.strictEqual(res.updateAvailable, true);
  });

  await asyncTest('checkOmniRouteServer: online and up to date', async () => {
    const mockFetch = async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        current: '3.8.51',
        latest: '3.8.51',
        updateAvailable: false
      })
    });

    const res = await updater.checkOmniRouteServer('http://localhost:20128', '', mockFetch);
    assert.strictEqual(res.status, 'up_to_date');
    assert.strictEqual(res.updateAvailable, false);
  });

  await asyncTest('checkOmniRouteServer: offline, fallback to npm registry', async () => {
    const mockFetch = async (url) => {
      if (url.includes('localhost')) {
        throw new Error('Connection refused');
      }
      if (url.includes('registry.npmjs.org')) {
        return {
          ok: true,
          status: 200,
          json: async () => ({ version: '3.8.52' })
        };
      }
      throw new Error('Unknown URL: ' + url);
    };

    const res = await updater.checkOmniRouteServer('http://localhost:20128', '', mockFetch);
    assert.strictEqual(res.status, 'server_offline');
    assert.strictEqual(res.latest, '3.8.52');
  });

  // 3. checkExtensionRelease tests
  await asyncTest('checkExtensionRelease: new release available on GitHub', async () => {
    const mockFetch = async (url) => {
      assert(url.includes('github.com'));
      return {
        ok: true,
        status: 200,
        json: async () => ({
          tag_name: 'v8.1.0',
          html_url: 'https://github.com/rktiwari00/omniroute-web-extension/releases/tag/v8.1.0',
          name: 'v8.1.0 Release'
        })
      };
    };

    const res = await updater.checkExtensionRelease('8.0.0', 'rktiwari00/omniroute-web-extension', mockFetch);
    assert.strictEqual(res.status, 'update_available');
    assert.strictEqual(res.current, '8.0.0');
    assert.strictEqual(res.latest, '8.1.0');
    assert.strictEqual(res.updateAvailable, true);
    assert(res.releaseUrl.includes('v8.1.0'));
  });

  await asyncTest('checkExtensionRelease: already latest release', async () => {
    const mockFetch = async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        tag_name: 'v8.0.0',
        html_url: 'https://github.com/rktiwari00/omniroute-web-extension/releases/tag/v8.0.0'
      })
    });

    const res = await updater.checkExtensionRelease('8.0.0', 'rktiwari00/omniroute-web-extension', mockFetch);
    assert.strictEqual(res.status, 'up_to_date');
    assert.strictEqual(res.updateAvailable, false);
  });

  // 4. checkForUpdates with mock storage
  await asyncTest('checkForUpdates: full orchestrator with cache', async () => {
    let storageData = {};
    const mockStorage = {
      get: async (keys) => {
        const res = {};
        for (const k of (Array.isArray(keys) ? keys : [keys])) {
          if (storageData[k] !== undefined) res[k] = storageData[k];
        }
        return res;
      },
      set: async (obj) => {
        Object.assign(storageData, obj);
      }
    };

    const mockFetch = async (url) => {
      if (url.includes('/api/system/version')) {
        return {
          ok: true,
          status: 200,
          json: async () => ({ current: '3.8.49', latest: '3.8.51', updateAvailable: true })
        };
      }
      if (url.includes('github.com')) {
        return {
          ok: true,
          status: 200,
          json: async () => ({ tag_name: 'v8.0.0', html_url: 'https://github.com/...' })
        };
      }
      throw new Error('Not mocked: ' + url);
    };

    // First call: fresh check, writes cache
    const result1 = await updater.checkForUpdates({
      storage: mockStorage,
      fetchFn: mockFetch,
      currentExtVersion: '8.0.0',
      omnirouteUrl: 'http://localhost:20128',
      apiKey: 'test-key',
      forceRefresh: true
    });

    assert.strictEqual(result1.server.status, 'update_available');
    assert.strictEqual(result1.extension.status, 'up_to_date');
    assert(storageData['omniroute_updater_cache']);

    // Second call without forceRefresh: returns cached version
    let fetchCalled = false;
    const failingFetch = async () => {
      fetchCalled = true;
      throw new Error('Should not fetch when cache is valid');
    };

    const result2 = await updater.checkForUpdates({
      storage: mockStorage,
      fetchFn: failingFetch,
      currentExtVersion: '8.0.0',
      forceRefresh: false
    });

    assert.strictEqual(fetchCalled, false);
    assert.strictEqual(result2.server.status, 'update_available');
    assert.strictEqual(result2.extension.status, 'up_to_date');
  });

  console.log(`\nTests Completed: ${passed} passed, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

runTests();
