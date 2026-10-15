const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const WIKI_DIR = path.join(__dirname, '..', 'wiki');
const TEMP_DIR = path.join(__dirname, '..', '.temp_wiki_sync');

async function syncWiki() {
  console.log('🔄 Checking GitHub wiki status for rktiwari00/omniroute-web-extension...');

  let token = '';
  try {
    token = execSync('gh auth token').toString().trim();
  } catch (e) {
    console.error('❌ Failed to retrieve GitHub token via `gh auth token`. Make sure gh CLI is authenticated.');
    process.exit(1);
  }

  const remoteUrl = `https://x-access-token:${token}@github.com/rktiwari00/omniroute-web-extension.wiki.git`;

  if (fs.existsSync(TEMP_DIR)) {
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  }

  // Check if remote wiki repository is initialized
  try {
    execSync(`git ls-remote "${remoteUrl}"`, { stdio: 'pipe' });
  } catch (e) {
    console.error('\n⚠️ The GitHub Wiki git repository is not yet initialized by GitHub.');
    console.error('👉 GitHub creates the wiki git repository when you save the first page in the web UI:');
    console.error('   1. Open: https://github.com/rktiwari00/omniroute-web-extension/wiki/_new');
    console.error('   2. Type anything (or leave default Home) and click the green "Save page" button.');
    console.error('   3. Run `npm run wiki:push` (or `node scripts/sync-wiki.js`) again to automatically push all 6 wiki pages + sidebar!');
    process.exit(1);
  }

  console.log('Cloning remote wiki...');
  execSync(`git clone "${remoteUrl}" "${TEMP_DIR}"`, { stdio: 'inherit' });

  console.log('Copying wiki pages from wiki/ ...');
  const files = fs.readdirSync(WIKI_DIR);
  for (const file of files) {
    const src = path.join(WIKI_DIR, file);
    const dest = path.join(TEMP_DIR, file);
    fs.copyFileSync(src, dest);
    console.log(`  + ${file}`);
  }

  console.log('Committing and pushing wiki updates...');
  execSync('git add .', { cwd: TEMP_DIR, stdio: 'inherit' });
  try {
    execSync('git -c user.name="rktiwari00" -c user.email="rktiwari00@users.noreply.github.com" commit -m "Update wiki documentation"', { cwd: TEMP_DIR, stdio: 'inherit' });
    execSync('git push origin HEAD', { cwd: TEMP_DIR, stdio: 'inherit' });
    console.log('\n✅ Successfully published all wiki pages to https://github.com/rktiwari00/omniroute-web-extension/wiki !');
  } catch (e) {
    console.log('Nothing new to commit or already up to date.');
  } finally {
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  }
}

syncWiki().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
