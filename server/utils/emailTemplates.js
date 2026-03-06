// utils/emailTemplates.js — HTML email templates for project requests

const adminNotificationEmail = (data) => {
    const deliverablesList = data.deliverables.map((d) => `<li style="padding:4px 0">${d}</li>`).join('');

    return {
        subject: `🆕 New Project Request — ${data.domain} | ${data.studentName}`,
        html: `
        <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0f172a;color:#e2e8f0;border-radius:12px;overflow:hidden">
            <div style="background:linear-gradient(135deg,#6366f1,#0ea5e9);padding:24px 32px">
                <h1 style="margin:0;font-size:22px;color:#fff">📋 New Project Request</h1>
                <p style="margin:4px 0 0;color:rgba(255,255,255,0.8);font-size:14px">ProjectHub — Custom Project Builder</p>
            </div>
            <div style="padding:24px 32px">
                <table style="width:100%;border-collapse:collapse;font-size:14px">
                    <tr><td style="padding:8px 0;color:#94a3b8;width:140px">Student Name</td><td style="padding:8px 0;font-weight:600">${data.studentName}</td></tr>
                    <tr><td style="padding:8px 0;color:#94a3b8">Student Email</td><td style="padding:8px 0">${data.studentEmail}</td></tr>
                    <tr><td style="padding:8px 0;color:#94a3b8">Domain</td><td style="padding:8px 0"><span style="background:#4f46e5;color:#fff;padding:2px 10px;border-radius:20px;font-size:12px">${data.domain}${data.customDomain ? ` (${data.customDomain})` : ''}</span></td></tr>
                    <tr><td style="padding:8px 0;color:#94a3b8;vertical-align:top">Problem Statement</td><td style="padding:8px 0">${data.problemStatement}</td></tr>
                    <tr><td style="padding:8px 0;color:#94a3b8">Deadline</td><td style="padding:8px 0;font-weight:600">${new Date(data.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</td></tr>
                    <tr><td style="padding:8px 0;color:#94a3b8">Budget</td><td style="padding:8px 0">${data.budget || 'Not specified'}</td></tr>
                    <tr><td style="padding:8px 0;color:#94a3b8">Suggested Plan</td><td style="padding:8px 0"><span style="background:linear-gradient(135deg,#f59e0b,#ef4444);color:#fff;padding:4px 12px;border-radius:20px;font-weight:700;font-size:13px">${data.suggestedPlan}</span></td></tr>
                </table>
                <div style="margin-top:16px">
                    <p style="color:#94a3b8;margin:0 0 8px;font-size:13px">Deliverables</p>
                    <ul style="margin:0;padding-left:20px;color:#e2e8f0;font-size:14px">${deliverablesList}</ul>
                </div>
                ${data.notes ? `<div style="margin-top:16px;padding:12px;background:rgba(99,102,241,0.1);border-radius:8px;font-size:13px"><strong>Notes:</strong> ${data.notes}</div>` : ''}
                <p style="margin:20px 0 0;color:#64748b;font-size:12px">Submitted: ${new Date().toLocaleString('en-IN')}</p>
            </div>
        </div>`,
    };
};

const studentApprovalEmail = (data) => {
    return {
        subject: `✅ Your Project Request has been Approved — ProjectHub`,
        html: `
        <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0f172a;color:#e2e8f0;border-radius:12px;overflow:hidden">
            <div style="background:linear-gradient(135deg,#10b981,#06b6d4);padding:24px 32px">
                <h1 style="margin:0;font-size:22px;color:#fff">🎉 Project Approved!</h1>
                <p style="margin:4px 0 0;color:rgba(255,255,255,0.8);font-size:14px">Great news, ${data.studentName}!</p>
            </div>
            <div style="padding:24px 32px">
                <p style="font-size:15px;line-height:1.6">Your project request for <strong>${data.domain}</strong> has been approved by our team. We'll start working on it right away.</p>
                <div style="background:rgba(99,102,241,0.1);padding:16px;border-radius:8px;margin:16px 0">
                    <p style="margin:0 0 8px;color:#94a3b8;font-size:13px">Project Details</p>
                    <p style="margin:0;font-weight:600;font-size:15px">${data.problemStatement}</p>
                    <p style="margin:8px 0 0;font-size:13px;color:#94a3b8">Plan: <span style="color:#f59e0b;font-weight:600">${data.suggestedPlan}</span> | Deadline: <strong>${new Date(data.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</strong></p>
                </div>
                <p style="font-size:14px;color:#94a3b8">Track your project progress anytime from your <strong>ProjectHub Dashboard</strong>.</p>
                <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/dashboard" style="display:inline-block;margin-top:12px;background:linear-gradient(135deg,#6366f1,#0ea5e9);color:#fff;padding:10px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">Open Dashboard →</a>
                <p style="margin:24px 0 0;color:#64748b;font-size:12px">— Team ProjectHub</p>
            </div>
        </div>`,
    };
};

module.exports = { adminNotificationEmail, studentApprovalEmail };
