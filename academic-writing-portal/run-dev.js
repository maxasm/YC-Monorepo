const { spawnSync } = require('child_process');
const path = require('path');

const projectPath = path.resolve(__dirname);

console.log('🚀 Starting Academic Writing Portal dev server...');
console.log(`Project path: ${projectPath}\n`);

// Run next dev on port 3001 to avoid conflicts
const result = spawnSync('npx', ['next', 'dev', '-p', '3001'], {
  cwd: projectPath,
  stdio: 'inherit',
  shell: true
});

if (result.error) {
  console.error('❌ Error:', result.error.message);
  process.exit(1);
} else if (result.status && result.status !== 0) {
  console.error('❌ Dev server failed with status:', result.status);
  process.exit(result.status);
}
