import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '..', '.env');

try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  console.log('Environment file exists and contains:');
  const vars = envContent.split('\n').filter(line => line.trim());
  vars.forEach(line => {
    const [key] = line.split('=');
    console.log(`${key}: ${key.startsWith('VITE_') ? '[✓] Prefixed correctly' : '[✗] Missing VITE_ prefix'}`);
  });
} catch (error) {
  console.error('Error reading .env file:', error.message);
}
