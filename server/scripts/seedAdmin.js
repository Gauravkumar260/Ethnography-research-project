const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const connectDB = require('../config/db');

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