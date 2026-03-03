import pino from 'pino';
const logger = pino();

const REQUIRED_ENVS = [
  { name: 'MONGODB_URI', description: 'MongoDB connection string (e.g., mongodb://localhost:27017/thesis)' },
  { name: 'REDIS_URL', description: 'Redis connection string for sessions & rate limiting' },
  { name: 'RS256_PRIVATE_KEY', description: 'RSA private key for JWT signing' },
  { name: 'RS256_PUBLIC_KEY', description: 'RSA public key for JWT verification' },
  { name: 'CSRF_SECRET', description: 'Secret for signing CSRF tokens' }
];

export function checkEnv() {
  const missing = [];
  let hasWarnings = false;

  for (const env of REQUIRED_ENVS) {
    if (!process.env[env.name]) {
      missing.push(env);
    } else if (env.name === 'CSRF_SECRET' && process.env.CSRF_SECRET === 'changeme') {
      logger.warn('WARNING: CSRF_SECRET is set to the default "changeme". This is insecure in production.');
      hasWarnings = true;
    }
  }

  if (missing.length > 0) {
    logger.error('CRITICAL: Missing required environment variables:');
    missing.forEach(m => logger.error(`- ${m.name}: ${m.description}`));
    process.exit(1);
  }

  if (!hasWarnings) {
    logger.info('Environment validation passed. All required variables are present.');
  }
}

// Allow executing directly
if (require.main === module) {
  checkEnv();
}
