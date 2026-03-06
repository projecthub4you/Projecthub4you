// models/ProjectRequest.js — Project request schema with progress tracking
const mongoose = require('mongoose');

const PROGRESS_STAGES = [
    'Pending Approval',
    'Approved',
    'Research Stage',
    'Architecture Building',
    'Development Stage',
    'Testing Phase',
    'Documentation Preparation',
    'Ready for Delivery',
    'Completed',
];

const projectRequestSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        domain: {
            type: String,
            required: [true, 'Domain is required'],
            enum: ['AIML', 'Web Development', 'Data Science', 'Cyber Security', 'IoT', 'Blockchain', 'Custom'],
        },
        customDomain: {
            type: String,
            default: '',
        },
        problemStatement: {
            type: String,
            required: [true, 'Problem statement is required'],
        },
        isCustomProblem: {
            type: Boolean,
            default: false,
        },
        deliverables: {
            type: [String],
            required: [true, 'At least one deliverable is required'],
            validate: {
                validator: (v) => v.length > 0,
                message: 'Select at least one deliverable',
            },
        },
        deadline: {
            type: Date,
            required: [true, 'Deadline is required'],
        },
        budget: {
            type: String,
            default: '',
        },
        notes: {
            type: String,
            default: '',
        },
        suggestedPlan: {
            type: String,
            enum: ['Basic', 'Pro', 'Premium'],
            default: 'Basic',
        },
        status: {
            type: String,
            enum: PROGRESS_STAGES,
            default: 'Pending Approval',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('ProjectRequest', projectRequestSchema);
module.exports.PROGRESS_STAGES = PROGRESS_STAGES;
