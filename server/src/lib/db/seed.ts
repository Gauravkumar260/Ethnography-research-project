import mongoose from 'mongoose';
import dbConnect from './mongoose';
import { User, Department } from './models';
import { hashPassword } from '../auth/passwords';

// Get passwords from environment variables
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD;
const FACULTY_PASSWORD = process.env.SEED_FACULTY_PASSWORD;

async function seed() {
  const confirmFlag = process.argv.includes('--confirm');

  console.log('--- SEEDING PLAN ---');
  console.log('1. Ensure departments CS, ENG, ARTS exist.');
  console.log('2. Create or Update SUPER_ADMIN: admin@university.edu');
  console.log('3. Create or Update DEPARTMENT_ADMIN: faculty@university.edu');

  if (!ADMIN_PASSWORD || !FACULTY_PASSWORD) {
    console.error('ERROR: SEED_ADMIN_PASSWORD and SEED_FACULTY_PASSWORD environment variables are required.');
    process.exit(1);
  }

  if (!confirmFlag) {
    console.log('\nThis script is currently in DRY RUN mode.');
    console.log('To execute the changes, run with the --confirm flag:');
    console.log('  ts-node server/src/lib/db/seed.ts --confirm');
    process.exit(0);
  }

  console.log('\nConnecting to database...');
  await dbConnect();
  
  console.log('Seeding departments...');
  const cs = await Department.findOneAndUpdate(
    { code: 'CS' },
    { name: 'Computer Science', code: 'CS', institutionDomain: 'university.edu' },
    { upsert: true, new: true }
  );
  await Department.findOneAndUpdate(
    { code: 'ENG' },
    { name: 'Engineering', code: 'ENG', institutionDomain: 'university.edu' },
    { upsert: true, new: true }
  );
  await Department.findOneAndUpdate(
    { code: 'ARTS' },
    { name: 'Arts', code: 'ARTS', institutionDomain: 'university.edu' },
    { upsert: true, new: true }
  );

  console.log('Seeding SUPER_ADMIN user...');
  const adminEmail = 'admin@university.edu';
  const adminPasswordHash = await hashPassword(ADMIN_PASSWORD);
  
  await User.findOneAndUpdate(
    { email: adminEmail },
    {
      email: adminEmail,
      passwordHash: adminPasswordHash,
      emailVerified: true,
      emailVerifiedAt: new Date(),
      role: 'SUPER_ADMIN',
      departmentId: cs._id,
      fullName: 'System Administrator',
      isActive: true
    },
    { upsert: true, new: true }
  );
  console.log(`Admin user ${adminEmail} created/updated.`);

  console.log('Seeding DEPARTMENT_ADMIN user...');
  const facultyEmail = 'faculty@university.edu';
  const facultyPasswordHash = await hashPassword(FACULTY_PASSWORD);

  await User.findOneAndUpdate(
    { email: facultyEmail },
    {
      email: facultyEmail,
      passwordHash: facultyPasswordHash,
      emailVerified: true,
      emailVerifiedAt: new Date(),
      role: 'DEPARTMENT_ADMIN',
      departmentId: cs._id,
      fullName: 'Faculty Member',
      isActive: true
    },
    { upsert: true, new: true }
  );
  console.log(`Faculty user ${facultyEmail} created/updated.`);
  
  console.log('\nSeed completed successfully.');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
