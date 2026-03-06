// routes/paymentRoutes.js — Payment routes
const express = require('express');
const router = express.Router();
const {
    createOrder,
    verifyPayment,
    getMyPayments,
    getAllPayments,
} = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');
const admin = require('../middleware/admin');

router.post('/create-order', protect, createOrder);
router.post('/verify', protect, verifyPayment);
router.get('/my-payments', protect, getMyPayments);
router.get('/', protect, admin, getAllPayments);

module.exports = router;
