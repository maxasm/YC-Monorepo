const { spawnSync } = require('child_process');
const path = require('path');

const projectPath = path.resolve(__dirname);

console.log('Installing dependencies for Academic Writing Portal...');
console.log(`Project path: ${projectPath}\n`);

// Try to install using npm directly
const result = spawnSync('npm', ['install', '--legacy-peer-deps'], {
  cwd: projectPath,
  stdio: 'inherit',
  shell: true
});

if (result.error) {
  console.error('\n❌ Error:', result.error.message);
  process.exit(1);
} else if (result.status !== 0) {
  console.error('\n❌ npm install failed with status:', result.status);
  process.exit(result.status);
} else {
  console.log('\n✅ Dependencies installed successfully!');
  console.log('\nYou can now run: npm run dev');
  process.exit(0);
}
