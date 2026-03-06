// pages/Auth/Login.jsx — Login page with glassmorphism card
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) return toast.error('Please fill all fields');
        setLoading(true);
        try {
            const user = await login(email, password);
            toast.success(`Welcome back, ${user.name}!`);
            navigate(user.role === 'admin' ? '/admin' : '/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-24">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 via-transparent to-accent-500/5"></div>
            <div className="relative w-full max-w-md">
                <div className="glass-card">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-0.5 mb-4">
                            <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900 }} className="text-2xl text-surface-900 dark:text-white tracking-tight">Project</span>
                            <span className="inline-flex items-center justify-center rounded-md px-1.5 py-0.5" style={{ background: 'linear-gradient(145deg, #FFAA00, #F07800)' }}>
                                <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900 }} className="text-2xl text-black tracking-tight">Hub</span>
                            </span>
                        </div>
                        <h1 className="text-2xl font-heading font-bold text-surface-900 dark:text-white">Welcome Back</h1>
                        <p className="text-sm text-surface-700/50 dark:text-surface-200/40 mt-1">Sign in to your ProjectHub account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Email</label>
                            <input
                                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-surface-900 dark:text-white"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Password</label>
                            <input
                                type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-surface-900 dark:text-white"
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-surface-700/60 dark:text-surface-200/50 cursor-pointer">
                                <input type="checkbox" className="rounded" /> Remember me
                            </label>
                            <Link to="/forgot-password" className="text-primary-500 hover:text-primary-600 font-medium">Forgot password?</Link>
                        </div>
                        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50 flex items-center justify-center gap-2">
                            {loading ? <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Signing in...</> : 'Sign In'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-surface-700/50 dark:text-surface-200/40 mt-6">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-primary-500 font-medium hover:text-primary-600">Sign Up</Link>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Login;
