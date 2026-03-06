// routes/projectRoutes.js — Project CRUD routes
const express = require('express');
const router = express.Router();
const {
    getProjects,
    getProject,
    getMyProjects,
    createProject,
    updateProject,
    deleteProject,
} = require('../controllers/projectController');
const { protect } = require('../middleware/auth');
const admin = require('../middleware/admin');

// Public routes
router.get('/', getProjects);
router.get('/:id', getProject);

// Protected routes
router.get('/user/my-projects', protect, getMyProjects);

// Admin-only routes
router.post('/', protect, admin, createProject);
router.put('/:id', protect, admin, updateProject);
router.delete('/:id', protect, admin, deleteProject);

module.exports = router;
