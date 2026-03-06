import { useState, useEffect } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { HiFolder, HiUsers, HiCreditCard, HiPlus, HiPencil, HiTrash, HiX, HiLightningBolt, HiCheck } from 'react-icons/hi';

const PROGRESS_STAGES = [
    'Pending Approval', 'Approved', 'Research Stage', 'Architecture Building',
    'Development Stage', 'Testing Phase', 'Documentation Preparation', 'Ready for Delivery', 'Completed',
];

const tabs = [
    { id: 'projects', label: 'Projects', icon: HiFolder },
    { id: 'requests', label: 'Requests', icon: HiLightningBolt },
    { id: 'users', label: 'Users', icon: HiUsers },
    { id: 'payments', label: 'Payments', icon: HiCreditCard },
];

const inputClass = "w-full px-3 py-2 rounded-lg bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 focus:ring-2 focus:ring-primary-500 outline-none text-sm text-surface-900 dark:text-white";

const Admin = () => {
    const [tab, setTab] = useState('projects');
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [payments, setPayments] = useState([]);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editProject, setEditProject] = useState(null);
    const [form, setForm] = useState({ title: '', description: '', category: 'ai-ml', technologies: '', price: '', status: 'pending', featured: false });

    // Request filters
    const [reqFilters, setReqFilters] = useState({ domain: '', status: '', plan: '' });

    useEffect(() => { fetchAll(); }, []);

    const fetchAll = async () => {
        setLoading(true);
        try {
            const [p, u, pay, req] = await Promise.all([
                api.get('/projects'), api.get('/auth/users'), api.get('/payments'),
                api.get('/project-requests').catch(() => ({ data: [] })),
            ]);
            setProjects(p.data.projects);
            setUsers(u.data.users);
            setPayments(pay.data.payments);
            setRequests(req.data || []);
        } catch (err) { toast.error('Failed to load data'); }
        finally { setLoading(false); }
    };

    const fetchRequests = async () => {
        try {
            const params = new URLSearchParams();
            if (reqFilters.domain) params.append('domain', reqFilters.domain);
            if (reqFilters.status) params.append('status', reqFilters.status);
            if (reqFilters.plan) params.append('plan', reqFilters.plan);
            const res = await api.get(`/project-requests?${params.toString()}`);
            setRequests(res.data || []);
        } catch (err) { toast.error('Failed to load requests'); }
    };

    useEffect(() => { if (!loading) fetchRequests(); }, [reqFilters]);

    const handleApprove = async (id) => {
        try {
            await api.patch(`/project-requests/${id}/approve`);
            toast.success('Request approved! Email sent to student.');
            fetchRequests();
        } catch (err) { toast.error('Failed to approve'); }
    };

    const handleProgressUpdate = async (id, status) => {
        try {
            await api.patch(`/project-requests/${id}/progress`, { status });
            toast.success(`Progress updated to: ${status}`);
            fetchRequests();
        } catch (err) { toast.error('Failed to update progress'); }
    };

    const openAddModal = () => {
        setEditProject(null);
        setForm({ title: '', description: '', category: 'ai-ml', technologies: '', price: '', status: 'pending', featured: false });
        setShowModal(true);
    };

    const openEditModal = (p) => {
        setEditProject(p);
        setForm({ title: p.title, description: p.description, category: p.category, technologies: p.technologies?.join(', '), price: p.price, status: p.status, featured: p.featured });
        setShowModal(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const data = { ...form, technologies: form.technologies.split(',').map(t => t.trim()).filter(Boolean), price: Number(form.price) };
        try {
            if (editProject) {
                await api.put(`/projects/${editProject._id}`, data);
                toast.success('Project updated');
            } else {
                await api.post('/projects', data);
                toast.success('Project created');
            }
            setShowModal(false);
            fetchAll();
        } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this project?')) return;
        try {
            await api.delete(`/projects/${id}`);
            toast.success('Deleted');
            fetchAll();
        } catch (err) { toast.error('Failed to delete'); }
    };

    const filteredRequests = requests;

    return (
        <div className="pt-20 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-heading font-bold text-surface-900 dark:text-white">Admin Panel</h1>
                    <p className="text-surface-700/50 dark:text-surface-200/40 mt-1">Manage projects, requests, users, and payments</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar */}
                    <div className="lg:w-56 flex-shrink-0">
                        <div className="glass-card !p-3 flex lg:flex-col gap-1 overflow-x-auto">
                            {tabs.map((t) => (
                                <button key={t.id} onClick={() => setTab(t.id)} className={`sidebar-link whitespace-nowrap cursor-pointer ${tab === t.id ? 'active' : ''}`}>
                                    <t.icon size={18} /> {t.label}
                                    {t.id === 'requests' && requests.filter(r => r.status === 'Pending Approval').length > 0 && (
                                        <span className="ml-auto px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold">{requests.filter(r => r.status === 'Pending Approval').length}</span>
                                    )}
                                </button>
                            ))}
                        </div>
                        {/* Stats cards */}
                        <div className="hidden lg:block mt-4 space-y-3">
                            {[{ label: 'Projects', val: projects.length, color: 'text-primary-500' },
                            { label: 'Requests', val: requests.length, color: 'text-orange-500' },
                            { label: 'Users', val: users.length, color: 'text-green-500' },
                            { label: 'Payments', val: payments.length, color: 'text-accent-500' }
                            ].map(s => (
                                <div key={s.label} className="glass-card !p-4 text-center">
                                    <p className={`text-2xl font-heading font-bold ${s.color}`}>{s.val}</p>
                                    <p className="text-xs text-surface-700/50 dark:text-surface-200/40">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        {loading ? (
                            <div className="glass-card flex items-center justify-center h-64">
                                <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <>
                                {/* Projects Tab */}
                                {tab === 'projects' && (
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <h2 className="text-lg font-heading font-semibold text-surface-900 dark:text-white">All Projects</h2>
                                            <button onClick={openAddModal} className="btn-primary !py-2 !px-4 text-sm flex items-center gap-1 cursor-pointer"><HiPlus /> Add Project</button>
                                        </div>
                                        <div className="glass-card overflow-x-auto">
                                            <table className="w-full text-sm">
                                                <thead><tr className="border-b border-surface-200 dark:border-surface-700">
                                                    <th className="py-3 px-3 text-left text-surface-700/60 dark:text-surface-200/50">Title</th>
                                                    <th className="py-3 px-3 text-left text-surface-700/60 dark:text-surface-200/50">Category</th>
                                                    <th className="py-3 px-3 text-left text-surface-700/60 dark:text-surface-200/50">Price</th>
                                                    <th className="py-3 px-3 text-left text-surface-700/60 dark:text-surface-200/50">Status</th>
                                                    <th className="py-3 px-3 text-left text-surface-700/60 dark:text-surface-200/50">Actions</th>
                                                </tr></thead>
                                                <tbody>
                                                    {projects.map((p) => (
                                                        <tr key={p._id} className="border-b border-surface-100 dark:border-surface-800">
                                                            <td className="py-3 px-3 text-surface-900 dark:text-white font-medium">{p.title}</td>
                                                            <td className="py-3 px-3"><span className="px-2 py-0.5 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 text-xs">{p.category}</span></td>
                                                            <td className="py-3 px-3 text-surface-900 dark:text-white">₹{p.price?.toLocaleString()}</td>
                                                            <td className="py-3 px-3"><span className="capitalize text-xs font-medium">{p.status}</span></td>
                                                            <td className="py-3 px-3 flex gap-2">
                                                                <button onClick={() => openEditModal(p)} className="p-1.5 rounded-lg hover:bg-primary-50 dark:hover:bg-surface-800 text-primary-500 cursor-pointer"><HiPencil /></button>
                                                                <button onClick={() => handleDelete(p._id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-surface-800 text-red-500 cursor-pointer"><HiTrash /></button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {/* Requests Tab */}
                                {tab === 'requests' && (
                                    <div>
                                        <h2 className="text-lg font-heading font-semibold text-surface-900 dark:text-white mb-4">Project Requests</h2>

                                        {/* Filters */}
                                        <div className="glass-card !p-4 mb-4">
                                            <div className="flex flex-wrap gap-3">
                                                <select value={reqFilters.domain} onChange={(e) => setReqFilters(f => ({ ...f, domain: e.target.value }))}
                                                    className={`${inputClass} !w-auto min-w-[140px] cursor-pointer`}>
                                                    <option value="">All Domains</option>
                                                    {['AIML', 'Web Development', 'Data Science', 'Cyber Security', 'IoT', 'Blockchain', 'Custom'].map(d => <option key={d} value={d}>{d}</option>)}
                                                </select>
                                                <select value={reqFilters.status} onChange={(e) => setReqFilters(f => ({ ...f, status: e.target.value }))}
                                                    className={`${inputClass} !w-auto min-w-[160px] cursor-pointer`}>
                                                    <option value="">All Statuses</option>
                                                    {PROGRESS_STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                                                </select>
                                                <select value={reqFilters.plan} onChange={(e) => setReqFilters(f => ({ ...f, plan: e.target.value }))}
                                                    className={`${inputClass} !w-auto min-w-[120px] cursor-pointer`}>
                                                    <option value="">All Plans</option>
                                                    {['Basic', 'Pro', 'Premium'].map(p => <option key={p} value={p}>{p}</option>)}
                                                </select>
                                                {(reqFilters.domain || reqFilters.status || reqFilters.plan) && (
                                                    <button onClick={() => setReqFilters({ domain: '', status: '', plan: '' })} className="text-xs text-red-500 hover:text-red-600 font-medium cursor-pointer">Clear Filters</button>
                                                )}
                                            </div>
                                        </div>

                                        {filteredRequests.length === 0 ? (
                                            <div className="glass-card text-center py-12">
                                                <HiLightningBolt className="mx-auto text-4xl text-surface-200 dark:text-surface-700 mb-3" />
                                                <p className="text-surface-700/50 dark:text-surface-200/40">No project requests found.</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                {filteredRequests.map((r) => (
                                                    <div key={r._id} className="glass-card !p-4">
                                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                                                            <div className="flex-1 min-w-0">
                                                                <h3 className="font-semibold text-surface-900 dark:text-white text-sm truncate">{r.problemStatement}</h3>
                                                                <div className="flex flex-wrap items-center gap-2 mt-1">
                                                                    <span className="px-2 py-0.5 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 text-xs">{r.domain === 'Custom' ? r.customDomain : r.domain}</span>
                                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${r.suggestedPlan === 'Premium' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : r.suggestedPlan === 'Pro' ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>{r.suggestedPlan}</span>
                                                                    <span className="text-xs text-surface-700/40 dark:text-surface-200/30">by {r.userId?.name || '—'} ({r.userId?.email})</span>
                                                                </div>
                                                                <div className="flex flex-wrap gap-1 mt-2">
                                                                    {r.deliverables.map(d => <span key={d} className="px-1.5 py-0.5 rounded bg-surface-100 dark:bg-surface-800 text-[10px] text-surface-700 dark:text-surface-200">{d}</span>)}
                                                                </div>
                                                                <p className="text-xs text-surface-700/40 dark:text-surface-200/30 mt-1">Deadline: {new Date(r.deadline).toLocaleDateString('en-IN')} | Submitted: {new Date(r.createdAt).toLocaleDateString('en-IN')}</p>
                                                            </div>
                                                            <div className="flex flex-col gap-2 sm:items-end flex-shrink-0">
                                                                {r.status === 'Pending Approval' && (
                                                                    <button onClick={() => handleApprove(r._id)} className="inline-flex items-center gap-1 px-4 py-1.5 rounded-lg bg-green-500 hover:bg-green-600 text-white text-xs font-semibold transition-colors cursor-pointer">
                                                                        <HiCheck /> Approve
                                                                    </button>
                                                                )}
                                                                <select value={r.status} onChange={(e) => handleProgressUpdate(r._id, e.target.value)}
                                                                    className={`${inputClass} !w-auto text-xs !py-1.5 min-w-[170px] cursor-pointer`}>
                                                                    {PROGRESS_STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Users Tab */}
                                {tab === 'users' && (
                                    <div>
                                        <h2 className="text-lg font-heading font-semibold text-surface-900 dark:text-white mb-4">All Users</h2>
                                        <div className="glass-card overflow-x-auto">
                                            <table className="w-full text-sm">
                                                <thead><tr className="border-b border-surface-200 dark:border-surface-700">
                                                    <th className="py-3 px-3 text-left text-surface-700/60 dark:text-surface-200/50">Name</th>
                                                    <th className="py-3 px-3 text-left text-surface-700/60 dark:text-surface-200/50">Email</th>
                                                    <th className="py-3 px-3 text-left text-surface-700/60 dark:text-surface-200/50">Role</th>
                                                    <th className="py-3 px-3 text-left text-surface-700/60 dark:text-surface-200/50">Joined</th>
                                                </tr></thead>
                                                <tbody>
                                                    {users.map((u) => (
                                                        <tr key={u._id} className="border-b border-surface-100 dark:border-surface-800">
                                                            <td className="py-3 px-3 text-surface-900 dark:text-white font-medium">{u.name}</td>
                                                            <td className="py-3 px-3 text-surface-700/60 dark:text-surface-200/50">{u.email}</td>
                                                            <td className="py-3 px-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${u.role === 'admin' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>{u.role}</span></td>
                                                            <td className="py-3 px-3 text-surface-700/50 dark:text-surface-200/40">{new Date(u.createdAt).toLocaleDateString()}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {/* Payments Tab */}
                                {tab === 'payments' && (
                                    <div>
                                        <h2 className="text-lg font-heading font-semibold text-surface-900 dark:text-white mb-4">All Payments</h2>
                                        <div className="glass-card overflow-x-auto">
                                            <table className="w-full text-sm">
                                                <thead><tr className="border-b border-surface-200 dark:border-surface-700">
                                                    <th className="py-3 px-3 text-left text-surface-700/60 dark:text-surface-200/50">User</th>
                                                    <th className="py-3 px-3 text-left text-surface-700/60 dark:text-surface-200/50">Project</th>
                                                    <th className="py-3 px-3 text-left text-surface-700/60 dark:text-surface-200/50">Amount</th>
                                                    <th className="py-3 px-3 text-left text-surface-700/60 dark:text-surface-200/50">Status</th>
                                                    <th className="py-3 px-3 text-left text-surface-700/60 dark:text-surface-200/50">Date</th>
                                                </tr></thead>
                                                <tbody>
                                                    {payments.map((pay) => (
                                                        <tr key={pay._id} className="border-b border-surface-100 dark:border-surface-800">
                                                            <td className="py-3 px-3 text-surface-900 dark:text-white">{pay.user?.name || '—'}</td>
                                                            <td className="py-3 px-3 text-surface-700/60 dark:text-surface-200/50">{pay.project?.title || '—'}</td>
                                                            <td className="py-3 px-3 text-surface-900 dark:text-white font-medium">₹{pay.amount?.toLocaleString()}</td>
                                                            <td className="py-3 px-3"><span className={`text-xs font-medium ${pay.status === 'paid' ? 'text-green-500' : 'text-yellow-500'}`}>{pay.status}</span></td>
                                                            <td className="py-3 px-3 text-surface-700/50 dark:text-surface-200/40">{new Date(pay.createdAt).toLocaleDateString()}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="glass-card w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-heading font-bold text-surface-900 dark:text-white">{editProject ? 'Edit' : 'Add'} Project</h3>
                            <button onClick={() => setShowModal(false)} className="p-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 cursor-pointer"><HiX size={20} /></button>
                        </div>
                        <form onSubmit={handleSave} className="space-y-3">
                            <div><label className="block text-xs font-medium mb-1 text-surface-700 dark:text-surface-200">Title</label>
                                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inputClass} required /></div>
                            <div><label className="block text-xs font-medium mb-1 text-surface-700 dark:text-surface-200">Description</label>
                                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className={inputClass} required /></div>
                            <div className="grid grid-cols-2 gap-3">
                                <div><label className="block text-xs font-medium mb-1 text-surface-700 dark:text-surface-200">Category</label>
                                    <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={inputClass}>
                                        <option value="ai-ml">AI/ML</option><option value="web-development">Web Dev</option>
                                        <option value="mini-project">Mini Project</option><option value="custom">Custom</option>
                                    </select></div>
                                <div><label className="block text-xs font-medium mb-1 text-surface-700 dark:text-surface-200">Price (₹)</label>
                                    <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className={inputClass} required /></div>
                            </div>
                            <div><label className="block text-xs font-medium mb-1 text-surface-700 dark:text-surface-200">Technologies (comma separated)</label>
                                <input value={form.technologies} onChange={e => setForm({ ...form, technologies: e.target.value })} className={inputClass} placeholder="React, Node.js, MongoDB" /></div>
                            <div className="grid grid-cols-2 gap-3">
                                <div><label className="block text-xs font-medium mb-1 text-surface-700 dark:text-surface-200">Status</label>
                                    <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className={inputClass}>
                                        <option value="pending">Pending</option><option value="in-progress">In Progress</option>
                                        <option value="review">Review</option><option value="completed">Completed</option><option value="delivered">Delivered</option>
                                    </select></div>
                                <div className="flex items-end pb-1"><label className="flex items-center gap-2 text-sm text-surface-700 dark:text-surface-200 cursor-pointer">
                                    <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} /> Featured</label></div>
                            </div>
                            <button type="submit" className="btn-primary w-full cursor-pointer">{editProject ? 'Update' : 'Create'} Project</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
