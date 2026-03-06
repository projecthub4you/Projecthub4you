// controllers/projectRequestController.js — CRUD + plan suggestion + email notifications
const ProjectRequest = require('../models/ProjectRequest');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const { adminNotificationEmail, studentApprovalEmail } = require('../utils/emailTemplates');

// Calculate suggested plan based on deliverables + deadline
const calculateSuggestedPlan = (deliverables, deadline) => {
    const daysUntilDeadline = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));
    const hasIEEE = deliverables.includes('IEEE Format Paper');
    const hasDeployment = deliverables.includes('Deployment');
    const hasViva = deliverables.includes('Viva Training');
    const hasInternship = deliverables.includes('Internship Guidance');
    const hasReport = deliverables.includes('Detailed Report');
    const hasLiveDemo = deliverables.includes('Live Demo');

    // Premium: IEEE + Deployment + (Viva or Internship) or deadline < 15 days with many deliverables
    if ((hasIEEE && hasDeployment && (hasViva || hasInternship)) || (daysUntilDeadline < 15 && deliverables.length >= 5)) {
        return 'Premium';
    }

    // Pro: Code + Report/PPT + Deployment or deadline 15-30 days with moderate deliverables
    if ((hasDeployment && (hasReport || hasLiveDemo)) || (daysUntilDeadline <= 30 && daysUntilDeadline >= 15 && deliverables.length >= 3)) {
        return 'Pro';
    }

    // Basic: Simple requirements
    return 'Basic';
};

// @desc    Create a project request
// @route   POST /api/project-requests
// @access  Private
exports.createRequest = async (req, res) => {
    try {
        const { domain, customDomain, problemStatement, isCustomProblem, deliverables, deadline, budget, notes } = req.body;

        // Validate future date
        if (new Date(deadline) <= new Date()) {
            return res.status(400).json({ message: 'Deadline must be a future date' });
        }

        const suggestedPlan = calculateSuggestedPlan(deliverables, deadline);

        const projectRequest = await ProjectRequest.create({
            userId: req.user._id,
            domain,
            customDomain: domain === 'Custom' ? customDomain : '',
            problemStatement,
            isCustomProblem,
            deliverables,
            deadline,
            budget,
            notes,
            suggestedPlan,
        });

        // Send email notification to admin
        try {
            const emailData = adminNotificationEmail({
                studentName: req.user.name,
                studentEmail: req.user.email,
                domain: domain === 'Custom' ? customDomain : domain,
                customDomain,
                problemStatement,
                deliverables,
                deadline,
                budget,
                suggestedPlan,
                notes,
            });
            await sendEmail({
                to: process.env.SMTP_USER || 'projecthub4you@gmail.com',
                subject: emailData.subject,
                html: emailData.html,
            });
        } catch (emailErr) {
            console.error('Email notification failed:', emailErr.message);
            // Don't fail the request if email fails
        }

        res.status(201).json(projectRequest);
    } catch (error) {
        console.error('Create request error:', error);
        res.status(500).json({ message: error.message || 'Server error' });
    }
};

// @desc    Get logged-in student's requests
// @route   GET /api/project-requests/my-requests
// @access  Private
exports.getMyRequests = async (req, res) => {
    try {
        const requests = await ProjectRequest.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get all requests (admin)
// @route   GET /api/project-requests
// @access  Admin
exports.getAllRequests = async (req, res) => {
    try {
        const { domain, status, plan } = req.query;
        const filter = {};
        if (domain) filter.domain = domain;
        if (status) filter.status = status;
        if (plan) filter.suggestedPlan = plan;

        const requests = await ProjectRequest.find(filter)
            .populate('userId', 'name email phone college')
            .sort({ createdAt: -1 });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Approve a request (admin)
// @route   PATCH /api/project-requests/:id/approve
// @access  Admin
exports.approveRequest = async (req, res) => {
    try {
        const request = await ProjectRequest.findById(req.params.id).populate('userId', 'name email');
        if (!request) return res.status(404).json({ message: 'Request not found' });

        request.status = 'Approved';
        await request.save();

        // Send approval notification to admin (Resend free tier: can only send to verified email)
        try {
            const emailData = studentApprovalEmail({
                studentName: request.userId.name,
                domain: request.domain === 'Custom' ? request.customDomain : request.domain,
                problemStatement: request.problemStatement,
                suggestedPlan: request.suggestedPlan,
                deadline: request.deadline,
            });
            await sendEmail({
                to: process.env.SMTP_USER || 'projecthub4you@gmail.com',
                subject: `Approved: ${request.userId.name} (${request.userId.email}) - ${emailData.subject}`,
                html: emailData.html,
            });
        } catch (emailErr) {
            console.error('Approval email failed:', emailErr.message);
        }

        res.json(request);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update progress stage (admin)
// @route   PATCH /api/project-requests/:id/progress
// @access  Admin
exports.updateProgress = async (req, res) => {
    try {
        const { status } = req.body;
        const request = await ProjectRequest.findById(req.params.id);
        if (!request) return res.status(404).json({ message: 'Request not found' });

        request.status = status;
        await request.save();

        res.json(request);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
