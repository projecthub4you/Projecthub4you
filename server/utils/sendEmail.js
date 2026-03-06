// utils/sendEmail.js — Email utility using Nodemailer
const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, html }) => {
    // Create transporter with SMTP config from env
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: `"ProjectHub" <${process.env.SMTP_USER}>`,
        to,
        subject,
        html,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
