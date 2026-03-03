import mongoose from 'mongoose';
import dbConnect from './mongoose';
import { User, Department } from './models';
import { hashPassword } from '../auth/passwords';

async function seed() {
  await dbConnect();
  
  console.log('Seeding departments...');
  const cs = await Department.findOneAndUpdate(
    { code: 'CS' },
    { name: 'Computer Science', code: 'CS', institutionDomain: 'university.edu' },
    { upsert: true, new: true }
  );
  const eng = await Department.findOneAndUpdate(
    { code: 'ENG' },
    { name: 'Engineering', code: 'ENG', institutionDomain: 'university.edu' },
    { upsert: true, new: true }
  );
  const arts = await Department.findOneAndUpdate(
    { code: 'ARTS' },
    { name: 'Arts', code: 'ARTS', institutionDomain: 'university.edu' },
    { upsert: true, new: true }
  );

  console.log('Seeding SUPER_ADMIN user...');
  const adminEmail = 'admin@university.edu';
  const existingAdmin = await User.findOne({ email: adminEmail });
  
  if (!existingAdmin) {
    const passwordHash = await hashPassword('AdminPass123!');
    await User.create({
      email: adminEmail,
      passwordHash,
      emailVerified: true,
      emailVerifiedAt: new Date(),
      role: 'SUPER_ADMIN',
      departmentId: cs._id,
      fullName: 'System Administrator',
      isActive: true
    });
    console.log('Admin user created.');
  } else {
    console.log('Admin user already exists.');
  }
  
  console.log('Seed completed successfully.');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
