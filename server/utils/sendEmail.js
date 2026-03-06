// utils/sendEmail.js — Email utility using Resend (HTTP-based, works on all platforms)
const { Resend } = require('resend');

const sendEmail = async ({ to, subject, html }) => {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
        from: 'ProjectHub <onboarding@resend.dev>',
        to: [to],
        subject,
        html,
    });

    if (error) {
        console.error('Resend email error:', error);
        throw new Error(error.message);
    }

    console.log('Email sent successfully via Resend:', data?.id);
    return data;
};

module.exports = sendEmail;
