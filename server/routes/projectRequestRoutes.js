// routes/projectRequestRoutes.js — Routes for project request builder
const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth');
const {
    createRequest,
    getMyRequests,
    getAllRequests,
    approveRequest,
    updateProgress,
} = require('../controllers/projectRequestController');

// Student routes
router.post('/', protect, createRequest);
router.get('/my-requests', protect, getMyRequests);

// Admin routes
router.get('/', protect, adminOnly, getAllRequests);
router.patch('/:id/approve', protect, adminOnly, approveRequest);
router.patch('/:id/progress', protect, adminOnly, updateProgress);

module.exports = router;
