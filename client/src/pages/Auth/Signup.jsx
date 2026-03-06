import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const inputClass = "w-full px-4 py-3 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-surface-900 dark:text-white";

const Signup = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', phone: '', college: '' });
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();
    const set = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.password) return toast.error('Fill all required fields');
        if (form.password.length < 6) return toast.error('Password must be 6+ chars');
        if (form.password !== form.confirmPassword) return toast.error('Passwords do not match');
        setLoading(true);
        try {
            const user = await register(form);
            toast.success(`Welcome, ${user.name}!`);
            navigate('/dashboard');
        } catch (err) { toast.error(err.response?.data?.message || 'Registration failed'); }
        finally { setLoading(false); }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-24">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 via-transparent to-accent-500/5"></div>
            <div className="relative w-full max-w-md">
                <div className="glass-card">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-0.5 mb-4">
                            <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900 }} className="text-2xl text-surface-900 dark:text-white tracking-tight">Project</span>
                            <span className="inline-flex items-center justify-center rounded-md px-1.5 py-0.5" style={{ background: 'linear-gradient(145deg, #FFAA00, #F07800)' }}>
                                <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900 }} className="text-2xl text-black tracking-tight">Hub</span>
                            </span>
                        </div>
                        <h1 className="text-2xl font-heading font-bold text-surface-900 dark:text-white">Create Account</h1>
                        <p className="text-sm text-surface-700/50 dark:text-surface-200/40 mt-1">Join ProjectHub and build your dream project</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Full Name *</label>
                            <input type="text" name="name" value={form.name} onChange={set} className={inputClass} placeholder="Rahul Sharma" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Email *</label>
                            <input type="email" name="email" value={form.email} onChange={set} className={inputClass} placeholder="your@email.com" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Password *</label>
                                <input type="password" name="password" value={form.password} onChange={set} className={inputClass} placeholder="••••••••" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Confirm *</label>
                                <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={set} className={inputClass} placeholder="••••••••" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Phone</label>
                                <input type="tel" name="phone" value={form.phone} onChange={set} className={inputClass} placeholder="+91 98765" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">College</label>
                                <input type="text" name="college" value={form.college} onChange={set} className={inputClass} placeholder="VIT University" />
                            </div>
                        </div>
                        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50 flex items-center justify-center gap-2">
                            {loading ? <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Creating...</> : 'Create Account'}
                        </button>
                    </form>
                    <p className="text-center text-sm text-surface-700/50 dark:text-surface-200/40 mt-6">
                        Already have an account? <Link to="/login" className="text-primary-500 font-medium">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
