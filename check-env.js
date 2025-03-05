const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

console.log('Current working directory:', process.cwd());

// Check if .env file exists at the root
const rootEnvPath = path.join(process.cwd(), '.env');
console.log('.env file at root exists:', fs.existsSync(rootEnvPath));

// Check if .env file exists in src directory
const srcEnvPath = path.join(process.cwd(), 'src', '.env');
console.log('.env file in src directory exists:', fs.existsSync(srcEnvPath));

// Load and print environment variables from root .env
if (fs.existsSync(rootEnvPath)) {
  const envConfig = dotenv.parse(fs.readFileSync(rootEnvPath));
  console.log('Root .env file contents:');
  for (const key in envConfig) {
    const value = key.includes('KEY') || key.includes('SECRET') ? 
      `${envConfig[key].substring(0, 3)}...${envConfig[key].substring(envConfig[key].length - 3)}` : 
      envConfig[key];
    console.log(`  ${key}: ${value}`);
  }
}

// Check if process.env has the variables
console.log('\nProcess environment variables:');
console.log('  VITE_HUGGINGFACE_API_KEY:', process.env.VITE_HUGGINGFACE_API_KEY ? 'Exists' : 'Missing');
console.log('  VITE_AI_MODEL:', process.env.VITE_AI_MODEL || 'Missing');
