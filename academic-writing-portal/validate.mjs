#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Files to check
const files = [
  'types/index.ts',
  'lib/api.ts',
  'lib/auth.ts',
  'lib/constants.ts',
  'components/common/button.tsx',
  'components/common/card.tsx',
  'components/common/table.tsx',
  'components/forms/form-field.tsx',
  'components/forms/text-field.tsx',
  'components/forms/select-field.tsx',
  'components/forms/textarea-field.tsx',
  'components/forms/file-dropzone.tsx',
  'components/common/confirm-modal.tsx',
  'components/common/countdown-timer.tsx',
  'components/common/price-breakdown.tsx',
  'components/common/task-card.tsx',
  'components/charts/analytics.tsx',
  'app/layout.tsx',
  'app/page.tsx',
  '(auth)/login/page.tsx',
  '(auth)/register/page.tsx',
  'student/dashboard/page.tsx',
  'student/submit-task/page.tsx',
  'student/messages/page.tsx',
  'writer/dashboard/page.tsx',
  'writer/workspace/page.tsx',
  'admin/dashboard/page.tsx',
  'admin/tasks/page.tsx',
  'admin/analytics/page.tsx',
];

console.log('🔍 Validating Academic Writing Portal...\n');

let errors = 0;
let warnings = 0;

// Check critical files exist
const criticalFiles = [
  'types/index.ts',
  'lib/api.ts',
  'lib/auth.ts',
  'lib/constants.ts',
  'components/common/table.tsx',
];

console.log('📋 Checking critical files...');
for (const file of criticalFiles) {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - NOT FOUND`);
    errors++;
  }
}

// Check types/index.ts has TableColumn export
console.log('\n🔎 Checking type exports...');
const typesPath = path.join(__dirname, 'types/index.ts');
const typesContent = fs.readFileSync(typesPath, 'utf8');

const requiredExports = ['Role', 'TaskStatus', 'Task', 'Message', 'User', 'AnalyticsPoint', 'EarningsSummary', 'TableColumn'];
for (const exp of requiredExports) {
  if (typesContent.includes(`export interface ${exp}`) || typesContent.includes(`export type ${exp}`)) {
    console.log(`  ✅ ${exp}`);
  } else {
    console.log(`  ❌ ${exp} - NOT EXPORTED`);
    errors++;
  }
}

// Check confirm-modal has correct imports
console.log('\n🔍 Checking confirm-modal imports...');
const confirmPath = path.join(__dirname, 'components/common/confirm-modal.tsx');
const confirmContent = fs.readFileSync(confirmPath, 'utf8');
if (confirmContent.includes('"use client"')) {
  console.log(`  ✅ "use client" directive present`);
} else {
  console.log(`  ❌ "use client" directive missing`);
  warnings++;
}

if (confirmContent.includes('useState')) {
  console.log(`  ❌ useState import (should not be present)`);
  warnings++;
} else {
  console.log(`  ✅ No unused useState`);
}

// Check admin dashboard imports
console.log('\n🔍 Checking admin/dashboard imports...');
const dashboardPath = path.join(__dirname, 'app/admin/dashboard/page.tsx');
if (fs.existsSync(dashboardPath)) {
  const dashboardContent = fs.readFileSync(dashboardPath, 'utf8');
  if (dashboardContent.includes('import type { TableColumn } from "@/components/common/table"')) {
    console.log(`  ✅ TableColumn imported from correct source`);
  } else {
    console.log(`  ❌ TableColumn import may be wrong`);
    errors++;
  }
} else {
  console.log(`  ⚠️  admin/dashboard/page.tsx not found`);
  warnings++;
}

// Summary
console.log('\n' + '='.repeat(50));
console.log(`\n📊 Validation Summary:`);
console.log(`  ✅ Errors: ${errors}`);
console.log(`  ⚠️  Warnings: ${warnings}`);

if (errors === 0) {
  console.log('\n✨ Project structure looks good! Ready to build.');
  process.exit(0);
} else {
  console.log('\n❌ Please fix the errors above before building.');
  process.exit(1);
}
