import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import connectDB from '../config/db';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // 1. Clear existing users (optional, be careful!)
    await User.deleteMany();

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt); // Default Password

    // 3. Create the Admin User
    const adminUser = {
      name: 'Faculty Admin',
      email: 'faculty@unheardindia.org', // Default Email
      password: hashedPassword,
      role: 'admin',
    };

    await User.create(adminUser);

    console.log('Admin User Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

importData();