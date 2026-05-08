import mongoose from 'mongoose';
import { config } from '../src/config/env';
import { logger } from '../src/lib/logger';
import Community from '../src/models/Community';
import Research from '../src/models/Research';
import Documentary from '../src/models/Documentary';
import Story from '../src/models/Story';
import FieldData from '../src/models/FieldData';

const applyIndexes = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    logger.info('Connected to MongoDB for index application');

    logger.info('Applying indexes to Research collection...');
    await Research.collection.createIndex({ community: 1, status: 1 }, { background: true });
    await Research.collection.createIndex({ status: 1, createdAt: -1 }, { background: true });

    logger.info('Applying indexes to Community collection...');
    await Community.collection.createIndex({ status: 1, name: 1 }, { background: true });

    logger.info('Applying indexes to Documentary collection...');
    await Documentary.collection.createIndex({ status: 1, createdAt: -1 }, { background: true });

    logger.info('Applying indexes to Story collection...');
    await Story.collection.createIndex({ communityId: 1, status: 1 }, { background: true });

    logger.info('Applying indexes to FieldData collection...');
    // Combined compound index for community and type filtering
    // Note: This also covers queries filtered by community only (prefix match)
    await FieldData.collection.createIndex({ community: 1, type: 1 }, { background: true });
    // Keep single index for type-only queries
    await FieldData.collection.createIndex({ type: 1 }, { background: true });

    logger.info('Successfully applied all indexes');
    process.exit(0);
  } catch (error) {
    logger.error('Error applying indexes:', error);
    process.exit(1);
  }
};

applyIndexes();
