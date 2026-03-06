// controllers/authController.js — Authentication logic
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @desc    Register new user
// @route   POST /api/auth/register
exports.register = async (req, res, next) => {
    try {
        const { name, email, password, phone, college } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }

        const user = await User.create({ name, email, password, phone, college });
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide email and password' });
        }

        // Find user and include password field
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = generateToken(user._id);

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                college: user.college,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Forgot password — send reset email
// @route   POST /api/auth/forgot-password
exports.forgotPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'No account with that email' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes
        await user.save({ validateBeforeSave: false });

        // Send email
        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
        const html = `
      <h2>Password Reset Request</h2>
      <p>You requested a password reset for your ProjectHub account.</p>
      <p>Click the link below to reset your password (valid for 30 minutes):</p>
      <a href="${resetUrl}" style="display:inline-block;padding:12px 24px;background:#6366f1;color:#fff;border-radius:8px;text-decoration:none;">Reset Password</a>
      <p>If you didn't request this, please ignore this email.</p>
    `;

        try {
            await sendEmail({ to: user.email, subject: 'ProjectHub — Password Reset', html });
            res.json({ success: true, message: 'Reset email sent' });
        } catch (emailError) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });
            return res.status(500).json({ success: false, message: 'Email could not be sent' });
        }
    } catch (error) {
        next(error);
    }
};
