// pages/CustomProject/CustomProjectBuilder.jsx — Smart project request form with plan suggestion
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiLightningBolt, HiCheckCircle, HiClock, HiAcademicCap } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const DOMAINS = ['AIML', 'Web Development', 'Data Science', 'Cyber Security', 'IoT', 'Blockchain', 'Custom'];

const PROBLEM_STATEMENTS = {
    'AIML': ['Sentiment Analysis using NLP', 'Image Classification with CNN', 'Chatbot using Transformers', 'Object Detection System', 'Recommendation Engine'],
    'Web Development': ['E-Commerce Platform', 'Social Media Dashboard', 'Learning Management System', 'Job Portal', 'Real-Time Chat App'],
    'Data Science': ['Sales Forecasting', 'Customer Churn Prediction', 'Stock Price Prediction', 'Fraud Detection System', 'Data Visualization Dashboard'],
    'Cyber Security': ['Intrusion Detection System', 'Phishing Detection Tool', 'Network Traffic Analyzer', 'Vulnerability Scanner', 'Secure File Transfer App'],
    'IoT': ['Smart Home Automation', 'Health Monitoring System', 'Smart Agriculture System', 'Automated Parking System', 'Environmental Monitoring'],
    'Blockchain': ['Supply Chain Tracking', 'Voting System on Blockchain', 'NFT Marketplace', 'Decentralized Chat App', 'Crypto Portfolio Tracker'],
};

const DELIVERABLES = [
    'Source Code', 'PPT', 'Detailed Report', 'IEEE Format Paper',
    'Deployment', 'Live Demo', 'Viva Training', 'Internship Guidance',
];

const BUDGETS = ['₹2,000 – ₹5,000', '₹5,000 – ₹10,000', '₹10,000 – ₹15,000', '₹15,000 – ₹25,000', '₹25,000+'];

const PLAN_DETAILS = {
    Basic: { price: '₹1,399', color: 'from-blue-500 to-cyan-500', services: ['Source Code', 'PPT', 'Documentation', '1 Revision', 'Email Support'] },
    Pro: { price: '₹1,999', color: 'from-primary-500 to-accent-500', services: ['Everything in Basic', 'Deployment', 'Detailed Report', '3 Revisions', 'Priority Support', 'Code Walkthrough'] },
    Premium: { price: '₹2,999', color: 'from-orange-500 to-rose-500', services: ['Everything in Pro', 'IEEE Paper', 'Viva Training', 'Internship Guidance', 'Unlimited Revisions', 'Live Demo', 'Video Explanation'] },
};

const CustomProjectBuilder = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const [form, setForm] = useState({
        domain: '',
        customDomain: '',
        problemStatement: '',
        isCustomProblem: false,
        customProblemStatement: '',
        deliverables: [],
        deadline: '',
        budget: '',
        notes: '',
    });

    // Smart plan suggestion
    const suggestedPlan = useMemo(() => {
        if (form.deliverables.length === 0 || !form.deadline) return null;

        const daysLeft = Math.ceil((new Date(form.deadline) - new Date()) / (1000 * 60 * 60 * 24));
        const has = (d) => form.deliverables.includes(d);

        if ((has('IEEE Format Paper') && has('Deployment') && (has('Viva Training') || has('Internship Guidance'))) || (daysLeft < 15 && form.deliverables.length >= 5)) {
            return 'Premium';
        }
        if ((has('Deployment') && (has('Detailed Report') || has('Live Demo'))) || (daysLeft <= 30 && daysLeft >= 15 && form.deliverables.length >= 3)) {
            return 'Pro';
        }
        return 'Basic';
    }, [form.deliverables, form.deadline]);

    const daysLeft = form.deadline ? Math.ceil((new Date(form.deadline) - new Date()) / (1000 * 60 * 60 * 24)) : null;

    const handleDeliverableToggle = (d) => {
        setForm((prev) => ({
            ...prev,
            deliverables: prev.deliverables.includes(d)
                ? prev.deliverables.filter((x) => x !== d)
                : [...prev.deliverables, d],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!user) { navigate('/login'); return; }
        if (!form.domain) { setError('Please select a project domain'); return; }
        if (form.domain === 'Custom' && !form.customDomain.trim()) { setError('Enter your custom domain'); return; }
        if (!form.isCustomProblem && !form.problemStatement) { setError('Select or enter a problem statement'); return; }
        if (form.isCustomProblem && !form.customProblemStatement.trim()) { setError('Enter your custom problem statement'); return; }
        if (form.deliverables.length === 0) { setError('Select at least one deliverable'); return; }
        if (!form.deadline) { setError('Please set a deadline'); return; }
        if (new Date(form.deadline) <= new Date()) { setError('Deadline must be a future date'); return; }

        setLoading(true);
        try {
            await api.post('/project-requests', {
                domain: form.domain,
                customDomain: form.customDomain,
                problemStatement: form.isCustomProblem ? form.customProblemStatement : form.problemStatement,
                isCustomProblem: form.isCustomProblem,
                deliverables: form.deliverables,
                deadline: form.deadline,
                budget: form.budget,
                notes: form.notes,
            });
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 py-24">
                <div className="glass-card text-center max-w-md animate-fade-up">
                    <div className="text-5xl mb-4">🎉</div>
                    <h2 className="text-2xl font-heading font-bold text-surface-900 dark:text-white mb-2">Request Submitted!</h2>
                    <p className="text-surface-700/60 dark:text-surface-200/50 mb-2">Your project request has been sent to our team. We'll review it and get back to you soon.</p>
                    <p className="text-sm text-primary-500 font-semibold mb-6">Suggested Plan: {suggestedPlan}</p>
                    <div className="flex gap-3 justify-center">
                        <button onClick={() => navigate('/dashboard')} className="btn-primary !py-2 !px-6 text-sm cursor-pointer">Go to Dashboard</button>
                        <button onClick={() => { setSuccess(false); setForm({ domain: '', customDomain: '', problemStatement: '', isCustomProblem: false, customProblemStatement: '', deliverables: [], deadline: '', budget: '', notes: '' }); }} className="btn-outline !py-2 !px-6 text-sm cursor-pointer">Submit Another</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-24 px-4">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 via-transparent to-accent-500/5 pointer-events-none"></div>
            <div className="relative max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10 animate-fade-up">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-semibold mb-4">
                        <HiLightningBolt /> Smart Project Builder
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-heading font-bold text-surface-900 dark:text-white mb-3">
                        Build Your <span className="gradient-text">Custom Project</span>
                    </h1>
                    <p className="text-surface-700/60 dark:text-surface-200/50 max-w-lg mx-auto">
                        Tell us what you need and we'll suggest the best plan for you. Our team will start working on it right away.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Form — 2 columns */}
                    <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
                        {error && <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">{error}</div>}

                        {/* Domain */}
                        <div className="glass-card !p-5 space-y-4">
                            <h3 className="font-heading font-bold text-surface-900 dark:text-white flex items-center gap-2"><HiAcademicCap className="text-primary-500" /> Project Domain</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {DOMAINS.map((d) => (
                                    <button key={d} type="button" onClick={() => setForm((p) => ({ ...p, domain: d, problemStatement: '', isCustomProblem: false }))}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer border
                                            ${form.domain === d ? 'bg-primary-500 text-white border-primary-500 shadow-lg shadow-primary-500/20' : 'border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-200 hover:border-primary-400'}
                                        `}>
                                        {d}
                                    </button>
                                ))}
                            </div>
                            {form.domain === 'Custom' && (
                                <input type="text" placeholder="Enter your custom domain..." value={form.customDomain} onChange={(e) => setForm((p) => ({ ...p, customDomain: e.target.value }))}
                                    className="w-full px-4 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white/50 dark:bg-surface-800/50 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none text-sm" />
                            )}
                        </div>

                        {/* Problem Statement */}
                        {form.domain && form.domain !== 'Custom' && (
                            <div className="glass-card !p-5 space-y-4">
                                <h3 className="font-heading font-bold text-surface-900 dark:text-white">Problem Statement</h3>
                                <div className="flex gap-3 mb-3">
                                    <button type="button" onClick={() => setForm((p) => ({ ...p, isCustomProblem: false }))}
                                        className={`px-4 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all ${!form.isCustomProblem ? 'bg-primary-500 text-white' : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-200'}`}>
                                        Choose from list
                                    </button>
                                    <button type="button" onClick={() => setForm((p) => ({ ...p, isCustomProblem: true }))}
                                        className={`px-4 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all ${form.isCustomProblem ? 'bg-primary-500 text-white' : 'bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-200'}`}>
                                        Custom idea
                                    </button>
                                </div>
                                {!form.isCustomProblem ? (
                                    <div className="space-y-2">
                                        {(PROBLEM_STATEMENTS[form.domain] || []).map((ps) => (
                                            <label key={ps} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${form.problemStatement === ps ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-transparent hover:bg-surface-100 dark:hover:bg-surface-800'}`}>
                                                <input type="radio" name="problemStatement" value={ps} checked={form.problemStatement === ps} onChange={(e) => setForm((p) => ({ ...p, problemStatement: e.target.value }))}
                                                    className="accent-primary-500" />
                                                <span className="text-sm text-surface-700 dark:text-surface-200">{ps}</span>
                                            </label>
                                        ))}
                                    </div>
                                ) : (
                                    <textarea placeholder="Describe your project idea..." value={form.customProblemStatement} onChange={(e) => setForm((p) => ({ ...p, customProblemStatement: e.target.value }))}
                                        rows={3} className="w-full px-4 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white/50 dark:bg-surface-800/50 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none text-sm resize-none" />
                                )}
                            </div>
                        )}

                        {form.domain === 'Custom' && (
                            <div className="glass-card !p-5 space-y-4">
                                <h3 className="font-heading font-bold text-surface-900 dark:text-white">Problem Statement</h3>
                                <textarea placeholder="Describe your project idea in detail..." value={form.customProblemStatement} onChange={(e) => setForm((p) => ({ ...p, customProblemStatement: e.target.value, isCustomProblem: true }))}
                                    rows={3} className="w-full px-4 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white/50 dark:bg-surface-800/50 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none text-sm resize-none" />
                            </div>
                        )}

                        {/* Deliverables */}
                        <div className="glass-card !p-5 space-y-4">
                            <h3 className="font-heading font-bold text-surface-900 dark:text-white">Required Deliverables</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {DELIVERABLES.map((d) => (
                                    <label key={d} className={`flex items-center gap-2 p-3 rounded-xl cursor-pointer transition-all border text-sm
                                        ${form.deliverables.includes(d) ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium' : 'border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-200 hover:border-primary-400'}
                                    `}>
                                        <input type="checkbox" checked={form.deliverables.includes(d)} onChange={() => handleDeliverableToggle(d)} className="accent-primary-500" />
                                        {d}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Deadline + Budget */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="glass-card !p-5 space-y-3">
                                <h3 className="font-heading font-bold text-surface-900 dark:text-white flex items-center gap-2"><HiClock className="text-accent-500" /> Deadline</h3>
                                <input type="date" value={form.deadline} onChange={(e) => setForm((p) => ({ ...p, deadline: e.target.value }))}
                                    min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                                    className="w-full px-4 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white/50 dark:bg-surface-800/50 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none text-sm" />
                                {daysLeft !== null && daysLeft > 0 && (
                                    <p className={`text-xs font-medium ${daysLeft < 15 ? 'text-red-500' : daysLeft < 30 ? 'text-orange-500' : 'text-green-500'}`}>
                                        {daysLeft < 15 ? '⚡ Urgent' : daysLeft < 30 ? '⏰ Moderate' : '✅ Comfortable'} — {daysLeft} days left
                                    </p>
                                )}
                            </div>
                            <div className="glass-card !p-5 space-y-3">
                                <h3 className="font-heading font-bold text-surface-900 dark:text-white">Budget Range <span className="text-xs font-normal text-surface-700/40 dark:text-surface-200/30">(Optional)</span></h3>
                                <select value={form.budget} onChange={(e) => setForm((p) => ({ ...p, budget: e.target.value }))}
                                    className="w-full px-4 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white/50 dark:bg-surface-800/50 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none text-sm cursor-pointer">
                                    <option value="">Select budget</option>
                                    {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="glass-card !p-5 space-y-3">
                            <h3 className="font-heading font-bold text-surface-900 dark:text-white">Additional Notes <span className="text-xs font-normal text-surface-700/40 dark:text-surface-200/30">(Optional)</span></h3>
                            <textarea placeholder="Any specific requirements, references, or preferences..." value={form.notes} onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                                rows={3} className="w-full px-4 py-2.5 rounded-xl border border-surface-200 dark:border-surface-700 bg-white/50 dark:bg-surface-800/50 text-surface-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none text-sm resize-none" />
                        </div>

                        <button type="submit" disabled={loading} className="btn-primary w-full !py-3 text-base flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">
                            {loading ? <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Submitting...</> : <><HiLightningBolt /> Submit Project Request</>}
                        </button>
                    </form>

                    {/* Sidebar — Plan Suggestion */}
                    <div className="lg:col-span-1 animate-fade-up" style={{ animationDelay: '200ms' }}>
                        <div className="sticky top-24 space-y-4">
                            {suggestedPlan ? (
                                <div className={`glass-card !p-0 overflow-hidden`}>
                                    <div className={`bg-gradient-to-r ${PLAN_DETAILS[suggestedPlan].color} p-5 text-white`}>
                                        <p className="text-xs uppercase tracking-wider opacity-80">Suggested Plan</p>
                                        <h3 className="text-2xl font-heading font-bold">{suggestedPlan}</h3>
                                        <p className="text-3xl font-bold mt-1">{PLAN_DETAILS[suggestedPlan].price}</p>
                                        {daysLeft !== null && daysLeft < 15 && (
                                            <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">⚡ Urgent Delivery</span>
                                        )}
                                    </div>
                                    <div className="p-5 space-y-2">
                                        <p className="text-xs uppercase tracking-wider text-surface-700/50 dark:text-surface-200/40 font-semibold">Includes</p>
                                        {PLAN_DETAILS[suggestedPlan].services.map((s) => (
                                            <div key={s} className="flex items-center gap-2 text-sm text-surface-700 dark:text-surface-200">
                                                <HiCheckCircle className="text-green-500 flex-shrink-0" /> {s}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="glass-card text-center py-8">
                                    <div className="text-4xl mb-3">🧠</div>
                                    <p className="text-sm text-surface-700/50 dark:text-surface-200/40 font-medium">Select deliverables & deadline to see your suggested plan</p>
                                </div>
                            )}

                            {/* Quick tips */}
                            <div className="glass-card !p-4">
                                <p className="text-xs font-semibold uppercase tracking-wider text-surface-700/50 dark:text-surface-200/40 mb-3">💡 Quick Tips</p>
                                <ul className="space-y-2 text-xs text-surface-700/60 dark:text-surface-200/40">
                                    <li>• Be specific about your requirements for faster delivery</li>
                                    <li>• Include IEEE paper if you need a research publication</li>
                                    <li>• Viva training helps you present confidently</li>
                                    <li>• Set a realistic deadline for best results</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomProjectBuilder;
