import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../services/api';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return toast.error('Enter your email');
        setLoading(true);
        try {
            await api.post('/auth/forgot-password', { email });
            setSent(true);
            toast.success('Reset email sent!');
        } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
        finally { setLoading(false); }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-24">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 via-transparent to-accent-500/5"></div>
            <div className="relative w-full max-w-md glass-card text-center">
                <div className="flex items-center justify-center gap-0.5 mb-4">
                    <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900 }} className="text-2xl text-surface-900 dark:text-white tracking-tight">Project</span>
                    <span className="inline-flex items-center justify-center rounded-md px-1.5 py-0.5" style={{ background: 'linear-gradient(145deg, #FFAA00, #F07800)' }}>
                        <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900 }} className="text-2xl text-black tracking-tight">Hub</span>
                    </span>
                </div>
                <h1 className="text-2xl font-heading font-bold text-surface-900 dark:text-white mb-2">Reset Password</h1>
                {sent ? (
                    <div>
                        <p className="text-surface-700/60 dark:text-surface-200/50 mb-4">Check your email for a reset link.</p>
                        <Link to="/login" className="btn-primary inline-block">Back to Login</Link>
                    </div>
                ) : (
                    <>
                        <p className="text-sm text-surface-700/50 dark:text-surface-200/40 mb-6">Enter your email and we'll send a reset link</p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-surface-900 dark:text-white"
                                placeholder="your@email.com" />
                            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </button>
                        </form>
                        <p className="text-sm text-surface-700/50 dark:text-surface-200/40 mt-4">
                            <Link to="/login" className="text-primary-500 font-medium">Back to Login</Link>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
