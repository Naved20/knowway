import { readFileSync } from 'fs';

// Load env
const envContent = readFileSync('.env', 'utf-8');
const envLines = envContent.split('\n');
for (const line of envLines) {
  const eqIdx = line.indexOf('=');
  if (eqIdx > 0 && !line.startsWith('#')) {
    const key = line.slice(0, eqIdx).trim();
    const val = line.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
    process.env[key] = val;
  }
}

console.log('ADMIN_PASSWORD:', JSON.stringify(process.env.ADMIN_PASSWORD));
console.log('SMTP_USER:', JSON.stringify(process.env.SMTP_USER));

const adminEnvPass = (process.env.ADMIN_PASSWORD || 'KnowvyAdmin2026!#').replace(/['"]/g, '').trim();
const adminEmail = (process.env.SMTP_USER || 'knowvy1@gmail.com').toLowerCase().trim();

console.log('adminEmail:', adminEmail);
console.log('adminEnvPass:', JSON.stringify(adminEnvPass));

const inputPassword = 'KnowvyAdmin2026!#';
const inputEmail = 'knowvy1@gmail.com';

const emailMatch = inputEmail === adminEmail;
const passMatch = inputPassword === adminEnvPass;

console.log('emailMatch:', emailMatch);
console.log('passMatch:', passMatch);
console.log('isMasterAdmin:', emailMatch && passMatch);

// Also test the DB hash
import { createHash } from 'crypto';
const db = JSON.parse(readFileSync('data/knowvy-db.json', 'utf-8'));
const adminUser = db.users.find(u => u.role === 'admin');
console.log('\nAdmin user in DB:');
console.log('  email:', adminUser.email);
console.log('  passwordHash (first 30 chars):', adminUser.passwordHash?.slice(0, 30));
