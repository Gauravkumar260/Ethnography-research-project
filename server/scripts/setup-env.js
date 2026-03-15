const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const envPath = path.join(__dirname, '../.env');
let envContent = '';

if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
}

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
});

// Format keys to be single line with \n to avoid multiline parsing issues in dotenv
const formatKey = (key) => key.replace(/\n/g, '\\n');

const updates = {
    MONGODB_URI: 'mongodb+srv://college:Gaurav26@cluster0.unjyqcr.mongodb.net/appName=Cluster0',
    REDIS_URL: 'redis://localhost:6379',
    CSRF_SECRET: crypto.randomBytes(32).toString('hex'),
    RESEND_API_KEY: 're_123456789_placeholder',
    RS256_PRIVATE_KEY: `"${formatKey(privateKey)}"`,
    RS256_PUBLIC_KEY: `"${formatKey(publicKey)}"`,
};

for (const [key, value] of Object.entries(updates)) {
    const regex = new RegExp(`^${key}=.*`, 'm');
    if (regex.test(envContent)) {
        envContent = envContent.replace(regex, `${key}=${value}`);
    } else {
        envContent += `\n${key}=${value}`;
    }
}

fs.writeFileSync(envPath, envContent.trim());
console.log('Environment variables generated and updated in .env');
