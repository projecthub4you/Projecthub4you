// routes/authRoutes.js — Authentication routes
const express = require('express');
const router = express.Router();
const { register, login, getMe, forgotPassword } = require('../controllers/authController');
const { getUsers } = require('../controllers/contactController');
const { protect } = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/forgot-password', forgotPassword);
router.get('/users', protect, admin, getUsers);

module.exports = router;
