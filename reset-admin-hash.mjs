/**
 * One-time script to reset admin password hash in knowvy-db.json
 * Run with: node reset-admin-hash.mjs
 */
import { readFileSync, writeFileSync } from 'fs';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_FILE = path.join(__dirname, 'data/knowvy-db.json');

// The correct admin password
const CORRECT_PASSWORD = 'KnowvyAdmin2026!#';

async function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('hex');
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) return reject(err);
      resolve(`${salt}:${derivedKey.toString('hex')}`);
    });
  });
}

async function verifyPassword(password, storedHash) {
  return new Promise((resolve, reject) => {
    if (!storedHash || !storedHash.includes(':')) return resolve(false);
    const [salt, key] = storedHash.split(':');
    const keyBuffer = Buffer.from(key, 'hex');
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) return reject(err);
      try {
        resolve(crypto.timingSafeEqual(keyBuffer, derivedKey));
      } catch {
        resolve(false);
      }
    });
  });
}

const db = JSON.parse(readFileSync(DB_FILE, 'utf-8'));
const adminUser = db.users.find(u => u.role === 'admin');

if (!adminUser) {
  console.error('❌ No admin user found in DB!');
  process.exit(1);
}

console.log('Admin user found:', adminUser.email);

// Check if current hash verifies correctly
const currentMatch = await verifyPassword(CORRECT_PASSWORD, adminUser.passwordHash);
console.log('Current hash matches correct password:', currentMatch);

if (!currentMatch) {
  console.log('Rehashing admin password with correct value...');
  const newHash = await hashPassword(CORRECT_PASSWORD);
  adminUser.passwordHash = newHash;
  adminUser.updatedAt = new Date().toISOString();
  writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  console.log('✅ Admin password hash updated successfully!');
  
  // Verify the new hash
  const verify = await verifyPassword(CORRECT_PASSWORD, newHash);
  console.log('New hash verification:', verify);
} else {
  console.log('✅ Admin password hash is already correct, no changes needed.');
}
