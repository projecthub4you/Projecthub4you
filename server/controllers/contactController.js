// controllers/contactController.js — Contact form handler
const Contact = require('../models/Contact');
const sendEmail = require('../utils/sendEmail');

// @desc    Submit contact form
// @route   POST /api/contact
exports.submitContact = async (req, res, next) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        // Save to database
        const contact = await Contact.create({ name, email, phone, subject, message });

        // Send notification email to admin
        try {
            const html = `
        <h2>New Contact Form Submission</h2>
        <table style="border-collapse:collapse;width:100%;">
          <tr><td style="padding:8px;font-weight:bold;">Name:</td><td style="padding:8px;">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Email:</td><td style="padding:8px;">${email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Phone:</td><td style="padding:8px;">${phone || 'N/A'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Subject:</td><td style="padding:8px;">${subject || 'General Inquiry'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Message:</td><td style="padding:8px;">${message}</td></tr>
        </table>
      `;
            await sendEmail({
                to: process.env.SMTP_USER,
                subject: `ProjectHub Contact: ${subject || 'New Message'}`,
                html,
            });
        } catch (emailError) {
            console.error('Email notification failed:', emailError.message);
            // Don't fail the request if email fails
        }

        res.status(201).json({
            success: true,
            message: 'Thank you! We will get back to you within 24 hours.',
            contact,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all contact submissions (Admin only)
// @route   GET /api/contact
exports.getContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json({ success: true, count: contacts.length, contacts });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all users (Admin only)
// @route   GET /api/auth/users
const User = require('../models/User');

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json({ success: true, count: users.length, users });
    } catch (error) {
        next(error);
    }
};
