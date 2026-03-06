// models/Project.js — Project schema for tracking student projects
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Project title is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        category: {
            type: String,
            enum: ['ai-ml', 'web-development', 'mini-project', 'custom'],
            required: true,
        },
        technologies: [String],
        price: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'in-progress', 'review', 'completed', 'delivered'],
            default: 'pending',
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
        files: [
            {
                name: String,
                url: String,
                uploadedAt: { type: Date, default: Date.now },
            },
        ],
        thumbnail: {
            type: String,
            default: '',
        },
        featured: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
