import { beforeAll, afterAll, afterEach, vi } from 'vitest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import crypto from 'crypto';

// Mock Redis
vi.mock('ioredis', () => {
  const RedisMock = require('ioredis-mock');
  return {
    default: RedisMock,
  };
});

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
  });

  process.env.REDIS_URL = 'redis://localhost:6379'; // Dummy
  process.env.NODE_ENV = 'test';
  process.env.RS256_PRIVATE_KEY = privateKey;
  process.env.RS256_PUBLIC_KEY = publicKey;
  process.env.CSRF_SECRET = 'changeme';

  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  await mongoose.connect(mongoUri, {
    bufferCommands: false,
  });
}, 60000); // 60s timeout for downloading mongodb binary

afterEach(async () => {
  if (mongoose.connection.readyState !== 0) {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  }
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
});
