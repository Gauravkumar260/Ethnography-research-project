import * as crypto from 'crypto';

function generateKeys() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem'
    }
  });

  console.log('
--- KEYS GENERATED ---
');
  console.log('Copy the following into your .env.local file:');
  console.log('\nRS256_PRIVATE_KEY="' + privateKey.replace(/\n/g, '\\n') + '"\n');
  console.log('RS256_PUBLIC_KEY="' + publicKey.replace(/\n/g, '\\n') + '"\n');
  console.log('
If deploying to Vercel/Railway, paste the exact strings above into the secret configuration.');
}

generateKeys();
