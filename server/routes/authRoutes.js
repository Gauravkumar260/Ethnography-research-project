const express = require('express');
const router = express.Router();
const { loginUser, getMe } = require('../controllers/authController');

// Define Routes
router.post('/login', loginUser); // POST /api/auth/login
router.get('/me', getMe);         // GET /api/auth/me (Protected later)

module.exports = router;