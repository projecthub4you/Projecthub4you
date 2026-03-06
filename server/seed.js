// seed.js — Seed sample data into MongoDB
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const User = require('./models/User');
const Project = require('./models/Project');
const Payment = require('./models/Payment');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Project.deleteMany({});
        await Payment.deleteMany({});
        console.log('Cleared existing data');

        // Create admin user
        const admin = await User.create({
            name: 'Admin',
            email: 'projecthub4you@gmail.com',
            password: 'admin123',
            role: 'admin',
            phone: '9876543210',
        });

        // Create student user
        const student = await User.create({
            name: 'Rahul Sharma',
            email: 'rahul@example.com',
            password: 'student123',
            role: 'student',
            phone: '9123456789',
            college: 'VIT University',
        });

        console.log('✅ Users seeded');

        // Create projects
        const projects = await Project.insertMany([
            {
                title: 'AI-Based Sentiment Analysis System',
                description: 'Complete sentiment analysis project using NLP, BERT transformer, and Flask API. Includes dataset preprocessing, model training, evaluation metrics, and deployment-ready code.',
                category: 'ai-ml',
                technologies: ['Python', 'TensorFlow', 'BERT', 'Flask', 'React'],
                price: 4999,
                status: 'in-progress',
                assignedTo: student._id,
                featured: true,
            },
            {
                title: 'Smart Attendance System using Face Recognition',
                description: 'Real-time face detection and recognition system for automated attendance. Uses OpenCV, dlib, and deep learning face embeddings.',
                category: 'ai-ml',
                technologies: ['Python', 'OpenCV', 'dlib', 'SQLite', 'Tkinter'],
                price: 5999,
                status: 'completed',
                featured: true,
            },
            {
                title: 'E-Commerce Platform with Payment Gateway',
                description: 'Full-stack MERN e-commerce site with admin panel, cart, wishlist, Razorpay payment, order tracking, and email notifications.',
                category: 'web-development',
                technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Razorpay'],
                price: 6999,
                featured: true,
            },
            {
                title: 'Real-Time Chat Application',
                description: 'WebSocket-based chat app with private messaging, group chats, file sharing, typing indicators, and online status.',
                category: 'web-development',
                technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
                price: 4499,
                status: 'pending',
            },
            {
                title: 'Weather Forecasting App',
                description: 'Mini project using OpenWeatherMap API with 5-day forecast, location search, and beautiful UI with charts.',
                category: 'mini-project',
                technologies: ['HTML', 'CSS', 'JavaScript', 'Chart.js'],
                price: 1499,
                status: 'completed',
            },
            {
                title: 'Smart IoT Home Automation',
                description: 'IoT-based home automation with ESP32, relay modules, mobile app control, and voice assistant integration.',
                category: 'custom',
                technologies: ['Arduino', 'ESP32', 'Flutter', 'Firebase'],
                price: 7999,
                status: 'pending',
                featured: true,
            },
        ]);

        console.log('✅ Projects seeded');

        // Create sample payments
        await Payment.insertMany([
            {
                user: student._id,
                project: projects[0]._id,
                razorpayOrderId: 'order_sample_001',
                razorpayPaymentId: 'pay_sample_001',
                amount: 4999,
                status: 'paid',
                plan: 'pro',
            },
            {
                user: student._id,
                project: projects[3]._id,
                razorpayOrderId: 'order_sample_002',
                amount: 4499,
                status: 'created',
                plan: 'basic',
            },
        ]);

        console.log('✅ Payments seeded');
        console.log('\n--- Seed Complete ---');
        console.log('Admin login:  projecthub4you@gmail.com / admin123');
        console.log('Student login: rahul@example.com / student123');

        process.exit(0);
    } catch (error) {
        console.error('Seed error:', error);
        process.exit(1);
    }
};

seedData();
