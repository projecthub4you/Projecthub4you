// server.js — Express application entry point
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first'); // Force IPv4 (fixes email on Render)

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// --- Middleware ---
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// --- API Routes ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/project-requests', require('./routes/projectRequestRoutes'));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ success: true, message: 'ProjectHub API is running 🚀' });
});

// --- Error Handler (must be last) ---
app.use(errorHandler);

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
