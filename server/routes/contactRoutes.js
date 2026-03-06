// routes/contactRoutes.js — Contact form routes
const express = require('express');
const router = express.Router();
const { submitContact, getContacts } = require('../controllers/contactController');
const { protect } = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/', submitContact);
router.get('/', protect, admin, getContacts);

module.exports = router;
