const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const colors = require('colors');
const connectDB = require('./config/db');
const User = require('./models/User'); // Ensure you have this model

dotenv.config();
connectDB();

const createAdmin = async () => {
  try {
    // 1. Delete existing users (Optional - keeps it clean)
    await User.deleteMany();
    console.log('🗑️  Old users removed...'.red.inverse);

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    // 3. Create the Admin User
    const adminUser = new User({
      name: 'Faculty Admin',
      email: 'admin@university.edu',
      password: hashedPassword, // Saving the hash, not the plain text
      role: 'admin',
    });

    await adminUser.save();

    console.log('✅ Admin User Created Successfully!'.green.inverse);
    console.log('📧 Email: admin@university.edu');
    console.log('🔑 Pass:  admin123');
    
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

createAdmin();