// utils/sendEmail.js — Email utility using Nodemailer (IPv4 forced for Render)
const nodemailer = require('nodemailer');
const dns = require('dns');

const sendEmail = async ({ to, subject, html }) => {
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';

    // Manually resolve hostname to IPv4 address (fixes Render IPv6 issue)
    let resolvedHost = smtpHost;
    try {
        const addresses = await dns.promises.resolve4(smtpHost);
        if (addresses.length > 0) {
            resolvedHost = addresses[0];
            console.log(`SMTP: Resolved ${smtpHost} to IPv4: ${resolvedHost}`);
        }
    } catch (err) {
        console.log(`SMTP: Could not resolve IPv4, using hostname: ${smtpHost}`);
    }

    const transporter = nodemailer.createTransport({
        host: resolvedHost,
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        tls: {
            servername: smtpHost, // Required for TLS when connecting by IP
            rejectUnauthorized: true,
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
