const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      lowercase: true, // Optimization: Ensure emails are always stored lowercase
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    role: {
      type: String,
      enum: ['admin', 'editor', 'student'], // Security: Restrict roles to specific values
      default: 'student',
    },
  },
  {
    timestamps: true,
  }
);

// --- METHOD: Check if entered password matches hashed password ---
// This is used in authController.js during Login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);