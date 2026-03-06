// controllers/projectController.js — CRUD for projects
const Project = require('../models/Project');

// @desc    Get all projects (public — for listings)
// @route   GET /api/projects
exports.getProjects = async (req, res, next) => {
    try {
        const { category, status, featured } = req.query;
        const filter = {};
        if (category) filter.category = category;
        if (status) filter.status = status;
        if (featured) filter.featured = featured === 'true';

        const projects = await Project.find(filter)
            .populate('assignedTo', 'name email')
            .sort({ createdAt: -1 });

        res.json({ success: true, count: projects.length, projects });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single project
// @route   GET /api/projects/:id
exports.getProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id).populate('assignedTo', 'name email');
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.json({ success: true, project });
    } catch (error) {
        next(error);
    }
};

// @desc    Get projects assigned to current user
// @route   GET /api/projects/my-projects
exports.getMyProjects = async (req, res, next) => {
    try {
        const projects = await Project.find({ assignedTo: req.user._id }).sort({ createdAt: -1 });
        res.json({ success: true, count: projects.length, projects });
    } catch (error) {
        next(error);
    }
};

// @desc    Create project (Admin only)
// @route   POST /api/projects
exports.createProject = async (req, res, next) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json({ success: true, project });
    } catch (error) {
        next(error);
    }
};

// @desc    Update project (Admin only)
// @route   PUT /api/projects/:id
exports.updateProject = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.json({ success: true, project });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete project (Admin only)
// @route   DELETE /api/projects/:id
exports.deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found' });
        }
        res.json({ success: true, message: 'Project deleted' });
    } catch (error) {
        next(error);
    }
};
