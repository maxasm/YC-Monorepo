#!/usr/bin/env node

/**
 * Install dependencies using npm via Node.js
 * This bypasses PowerShell execution policy issues
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const projectRoot = __dirname;
const nodeModulesPath = path.join(projectRoot, 'node_modules');

console.log('📦 Installing dependencies...');
console.log(`📁 Project root: ${projectRoot}`);

try {
  // Check if npm is in the PATH
  const npmPath = require('which').sync('npm');
  console.log(`✅ Found npm at: ${npmPath}`);
  
  // Run npm install
  execSync('npm install', {
    cwd: projectRoot,
    stdio: 'inherit'
  });
  
  console.log('\n✅ Dependencies installed successfully!');
  process.exit(0);
} catch (e1) {
  console.log('❌ Standard npm not found, trying alternative method...');
  
  try {
    // Try using node directly with npm
    const cmd = `"${process.execPath}" -e "require('child_process').execSync('npm install', { cwd: '${projectRoot}', stdio: 'inherit' })"`;
    execSync(cmd, { stdio: 'inherit' });
    
    console.log('\n✅ Dependencies installed successfully!');
    process.exit(0);
  } catch (e2) {
    console.error('❌ Failed to install dependencies');
    console.error('Error:', e2.message);
    process.exit(1);
  }
}
