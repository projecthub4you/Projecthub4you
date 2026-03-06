// controllers/paymentController.js — Razorpay payment logic
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/Payment');
const Project = require('../models/Project');

// Initialize Razorpay instance
const getRazorpayInstance = () => {
    return new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
};

// @desc    Create Razorpay order
// @route   POST /api/payments/create-order
exports.createOrder = async (req, res, next) => {
    try {
        const { projectId, plan } = req.body;

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        // Calculate amount based on plan multiplier
        const planMultipliers = { basic: 1, pro: 1.5, premium: 2 };
        const amount = Math.round(project.price * (planMultipliers[plan] || 1) * 100); // Convert to paise

        const razorpay = getRazorpayInstance();
        const order = await razorpay.orders.create({
            amount,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            notes: {
                projectId: project._id.toString(),
                userId: req.user._id.toString(),
                plan,
            },
        });

        // Save payment record
        const payment = await Payment.create({
            user: req.user._id,
            project: project._id,
            razorpayOrderId: order.id,
            amount: amount / 100,
            plan,
            status: 'created',
        });

        res.json({
            success: true,
            order,
            payment,
            key: process.env.RAZORPAY_KEY_ID,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Verify Razorpay payment
// @route   POST /api/payments/verify
exports.verifyPayment = async (req, res, next) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        // Verify signature
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(sign)
            .digest('hex');

        if (expectedSign !== razorpay_signature) {
            return res.status(400).json({ success: false, message: 'Payment verification failed' });
        }

        // Update payment record
        const payment = await Payment.findOneAndUpdate(
            { razorpayOrderId: razorpay_order_id },
            {
                razorpayPaymentId: razorpay_payment_id,
                razorpaySignature: razorpay_signature,
                status: 'paid',
            },
            { new: true }
        );

        // Assign project to user
        if (payment) {
            await Project.findByIdAndUpdate(payment.project, {
                assignedTo: payment.user,
                status: 'in-progress',
            });
        }

        res.json({ success: true, message: 'Payment verified successfully', payment });
    } catch (error) {
        next(error);
    }
};

// @desc    Get payment history for current user
// @route   GET /api/payments/my-payments
exports.getMyPayments = async (req, res, next) => {
    try {
        const payments = await Payment.find({ user: req.user._id })
            .populate('project', 'title category')
            .sort({ createdAt: -1 });

        res.json({ success: true, count: payments.length, payments });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all payments (Admin only)
// @route   GET /api/payments
exports.getAllPayments = async (req, res, next) => {
    try {
        const payments = await Payment.find()
            .populate('user', 'name email')
            .populate('project', 'title category')
            .sort({ createdAt: -1 });

        res.json({ success: true, count: payments.length, payments });
    } catch (error) {
        next(error);
    }
};
