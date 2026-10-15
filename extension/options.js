document.querySelector('#clear').addEventListener('click', async () => {
  try {
    await chrome.runtime.sendMessage({ type: 'CLEAR_CAPTURED_DATA' });
  } catch (e) {}
  try {
    await chrome.storage.session.clear();
  } catch (e) {}
  const res = document.querySelector('#result');
  if (res) res.textContent = ' Captured data cleared successfully.';
});
