import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { HiFolder, HiCreditCard, HiDownload, HiChat, HiClock, HiCheckCircle, HiLightningBolt } from 'react-icons/hi';
import ProgressTracker from '../../components/ProgressTracker';

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
    'in-progress': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    review: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    delivered: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
};

const planColors = {
    Basic: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    Pro: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
    Premium: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
};

const tabs = [
    { id: 'projects', label: 'My Projects', icon: HiFolder },
    { id: 'requests', label: 'My Requests', icon: HiLightningBolt },
    { id: 'payments', label: 'Payments', icon: HiCreditCard },
    { id: 'downloads', label: 'Downloads', icon: HiDownload },
    { id: 'chat', label: 'Live Chat', icon: HiChat },
];

const Dashboard = () => {
    const { user } = useAuth();
    const [tab, setTab] = useState('projects');
    const [projects, setProjects] = useState([]);
    const [payments, setPayments] = useState([]);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projRes, payRes, reqRes] = await Promise.all([
                    api.get('/projects/user/my-projects').catch(() => ({ data: { projects: [] } })),
                    api.get('/payments/my-payments').catch(() => ({ data: { payments: [] } })),
                    api.get('/project-requests/my-requests').catch(() => ({ data: [] })),
                ]);
                setProjects(projRes.data.projects || []);
                setPayments(payRes.data.payments || []);
                setRequests(reqRes.data || []);
            } catch (err) { toast.error('Failed to load data'); }
            finally { setLoading(false); }
        };
        fetchData();
    }, []);

    return (
        <div className="pt-20 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-surface-900 dark:text-white">Welcome back, {user?.name} 👋</h1>
                        <p className="text-surface-700/50 dark:text-surface-200/40 mt-1">Track your projects, requests, and payments</p>
                    </div>
                    <Link to="/custom-project" className="btn-primary !py-2 !px-5 text-sm inline-flex items-center gap-2 w-fit">
                        <HiLightningBolt /> Build New Project
                    </Link>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar */}
                    <div className="lg:w-56 flex-shrink-0">
                        <div className="glass-card !p-3 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
                            {tabs.map((t) => (
                                <button key={t.id} onClick={() => setTab(t.id)}
                                    className={`sidebar-link whitespace-nowrap cursor-pointer ${tab === t.id ? 'active' : ''}`}>
                                    <t.icon size={18} /> {t.label}
                                </button>
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
                                {tab === 'projects' && (() => {
                                    const completedRequests = requests.filter(r => r.status === 'Completed');
                                    const hasAny = projects.length > 0 || completedRequests.length > 0;
                                    return (
                                        <div className="space-y-4">
                                            <h2 className="text-lg font-heading font-semibold text-surface-900 dark:text-white">Your Projects</h2>
                                            {!hasAny ? (
                                                <div className="glass-card text-center py-12">
                                                    <HiFolder className="mx-auto text-4xl text-surface-200 dark:text-surface-700 mb-3" />
                                                    <p className="text-surface-700/50 dark:text-surface-200/40">No projects yet. Browse our services to get started!</p>
                                                </div>
                                            ) : (
                                                <div className="grid sm:grid-cols-2 gap-4">
                                                    {/* Completed Requests as Projects */}
                                                    {completedRequests.map((r) => (
                                                        <div key={r._id} className="glass-card border border-green-500/20 relative overflow-hidden">
                                                            <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                                                            <div className="flex items-start justify-between mb-3">
                                                                <h3 className="font-semibold text-surface-900 dark:text-white text-sm">{r.problemStatement}</h3>
                                                                <span className="px-2 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 flex items-center gap-1">
                                                                    <HiCheckCircle /> Completed
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2 mb-3">
                                                                <span className="px-2 py-0.5 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 text-xs">{r.domain === 'Custom' ? r.customDomain : r.domain}</span>
                                                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${planColors[r.suggestedPlan]}`}>{r.suggestedPlan} Plan</span>
                                                            </div>
                                                            <div className="flex flex-wrap gap-1 mb-3">
                                                                {r.deliverables?.map((d) => (
                                                                    <span key={d} className="px-2 py-0.5 rounded-full bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-200 text-[10px]">{d}</span>
                                                                ))}
                                                            </div>
                                                            <p className="text-[11px] text-surface-700/40 dark:text-surface-200/30">Completed on {new Date(r.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                                        </div>
                                                    ))}
                                                    {/* Regular Projects */}
                                                    {projects.map((p) => (
                                                        <div key={p._id} className="glass-card">
                                                            <div className="flex items-start justify-between mb-3">
                                                                <h3 className="font-semibold text-surface-900 dark:text-white text-sm">{p.title}</h3>
                                                                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${statusColors[p.status]}`}>{p.status}</span>
                                                            </div>
                                                            <p className="text-xs text-surface-700/50 dark:text-surface-200/40 mb-3 line-clamp-2">{p.description}</p>
                                                            <div className="flex flex-wrap gap-1">
                                                                {p.technologies?.slice(0, 3).map((t) => (
                                                                    <span key={t} className="px-2 py-0.5 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 text-xs">{t}</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })()}

                                {/* My Requests Tab */}
                                {tab === 'requests' && (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-lg font-heading font-semibold text-surface-900 dark:text-white">My Project Requests</h2>
                                            <Link to="/custom-project" className="text-sm text-primary-500 hover:text-primary-600 font-medium">+ New Request</Link>
                                        </div>
                                        {requests.length === 0 ? (
                                            <div className="glass-card text-center py-12">
                                                <HiLightningBolt className="mx-auto text-4xl text-surface-200 dark:text-surface-700 mb-3" />
                                                <p className="text-surface-700/50 dark:text-surface-200/40 mb-4">No project requests yet.</p>
                                                <Link to="/custom-project" className="btn-primary !py-2 !px-5 text-sm inline-flex items-center gap-2">
                                                    <HiLightningBolt /> Build Your First Project
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {requests.map((r) => (
                                                    <div key={r._id} className="glass-card">
                                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                                                            <div>
                                                                <h3 className="font-semibold text-surface-900 dark:text-white">{r.problemStatement}</h3>
                                                                <div className="flex items-center gap-2 mt-1">
                                                                    <span className="px-2 py-0.5 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 text-xs">{r.domain === 'Custom' ? r.customDomain : r.domain}</span>
                                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${planColors[r.suggestedPlan]}`}>{r.suggestedPlan} Plan</span>
                                                                </div>
                                                            </div>
                                                            <div className="text-right">
                                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${r.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : r.status === 'Pending Approval' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'}`}>{r.status}</span>
                                                                <p className="text-xs text-surface-700/40 dark:text-surface-200/30 mt-1">Deadline: {new Date(r.deadline).toLocaleDateString('en-IN')}</p>
                                                            </div>
                                                        </div>
                                                        {/* Deliverables */}
                                                        <div className="flex flex-wrap gap-1 mb-4">
                                                            {r.deliverables.map((d) => (
                                                                <span key={d} className="px-2 py-0.5 rounded-full bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-200 text-xs">{d}</span>
                                                            ))}
                                                        </div>
                                                        {/* Progress Tracker */}
                                                        <div className="overflow-x-auto">
                                                            <div className="min-w-[600px]">
                                                                <ProgressTracker currentStatus={r.status} />
                                                            </div>
                                                        </div>
                                                        {/* WhatsApp Payment Button — only enabled after approval */}
                                                        <div className="mt-4 flex items-center gap-3">
                                                            {r.status === 'Pending Approval' ? (
                                                                <button disabled className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-200 dark:bg-surface-700 text-surface-700/40 dark:text-surface-200/30 text-sm font-semibold cursor-not-allowed">
                                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.783-1.344A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.239 0-4.332-.726-6.033-1.96l-.424-.318-2.845.799.832-2.715-.348-.55A9.948 9.948 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" /></svg>
                                                                    Pay via WhatsApp
                                                                </button>
                                                            ) : (
                                                                <a href={`https://wa.me/917892611458?text=${encodeURIComponent(`Hi ProjectHub! I'd like to make payment for my project:\n\n📋 Project: ${r.problemStatement}\n🔧 Domain: ${r.domain === 'Custom' ? r.customDomain : r.domain}\n📦 Plan: ${r.suggestedPlan}\n📅 Deadline: ${new Date(r.deadline).toLocaleDateString('en-IN')}\n\nPlease share the payment details.`)}`}
                                                                    target="_blank" rel="noopener noreferrer"
                                                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-all shadow-lg shadow-green-500/20 hover:shadow-green-500/30 cursor-pointer">
                                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.783-1.344A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.239 0-4.332-.726-6.033-1.96l-.424-.318-2.845.799.832-2.715-.348-.55A9.948 9.948 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" /></svg>
                                                                    Pay via WhatsApp
                                                                </a>
                                                            )}
                                                            {r.status === 'Pending Approval' && (
                                                                <p className="text-xs text-surface-700/40 dark:text-surface-200/30 italic">Payment enabled after admin approval</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Payments Tab */}
                                {tab === 'payments' && (
                                    <div className="space-y-4">
                                        <h2 className="text-lg font-heading font-semibold text-surface-900 dark:text-white">Payment History</h2>
                                        {payments.length === 0 ? (
                                            <div className="glass-card text-center py-12">
                                                <HiCreditCard className="mx-auto text-4xl text-surface-200 dark:text-surface-700 mb-3" />
                                                <p className="text-surface-700/50 dark:text-surface-200/40">No payments yet.</p>
                                            </div>
                                        ) : (
                                            <div className="glass-card overflow-x-auto">
                                                <table className="w-full text-sm">
                                                    <thead><tr className="border-b border-surface-200 dark:border-surface-700">
                                                        <th className="py-3 px-4 text-left font-medium text-surface-700/60 dark:text-surface-200/50">Project</th>
                                                        <th className="py-3 px-4 text-left font-medium text-surface-700/60 dark:text-surface-200/50">Amount</th>
                                                        <th className="py-3 px-4 text-left font-medium text-surface-700/60 dark:text-surface-200/50">Plan</th>
                                                        <th className="py-3 px-4 text-left font-medium text-surface-700/60 dark:text-surface-200/50">Status</th>
                                                        <th className="py-3 px-4 text-left font-medium text-surface-700/60 dark:text-surface-200/50">Date</th>
                                                    </tr></thead>
                                                    <tbody>
                                                        {payments.map((pay) => (
                                                            <tr key={pay._id} className="border-b border-surface-100 dark:border-surface-800">
                                                                <td className="py-3 px-4 text-surface-900 dark:text-white">{pay.project?.title || '—'}</td>
                                                                <td className="py-3 px-4 font-medium text-surface-900 dark:text-white">₹{pay.amount?.toLocaleString()}</td>
                                                                <td className="py-3 px-4"><span className="px-2 py-0.5 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 text-xs capitalize">{pay.plan}</span></td>
                                                                <td className="py-3 px-4">
                                                                    <span className={`inline-flex items-center gap-1 text-xs font-medium ${pay.status === 'paid' ? 'text-green-500' : 'text-yellow-500'}`}>
                                                                        {pay.status === 'paid' ? <HiCheckCircle /> : <HiClock />} {pay.status}
                                                                    </span>
                                                                </td>
                                                                <td className="py-3 px-4 text-surface-700/50 dark:text-surface-200/40">{new Date(pay.createdAt).toLocaleDateString()}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Downloads Tab */}
                                {tab === 'downloads' && (
                                    <div className="space-y-4">
                                        <h2 className="text-lg font-heading font-semibold text-surface-900 dark:text-white">Downloads</h2>
                                        <div className="glass-card text-center py-12">
                                            <HiDownload className="mx-auto text-4xl text-surface-200 dark:text-surface-700 mb-3" />
                                            <p className="text-surface-700/50 dark:text-surface-200/40">Downloads will appear here once your project is delivered.</p>
                                        </div>
                                    </div>
                                )}

                                {/* Chat Tab */}
                                {tab === 'chat' && (
                                    <div className="space-y-4">
                                        <h2 className="text-lg font-heading font-semibold text-surface-900 dark:text-white">Live Chat</h2>
                                        <div className="glass-card flex flex-col h-96">
                                            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                                                <HiChat className="text-4xl text-primary-500 mb-3" />
                                                <p className="font-medium text-surface-900 dark:text-white mb-1">Chat with our team</p>
                                                <p className="text-sm text-surface-700/50 dark:text-surface-200/40">Our support team typically replies within 2 hours</p>
                                            </div>
                                            <div className="border-t border-surface-200 dark:border-surface-700 p-4 flex gap-2">
                                                <input type="text" placeholder="Type a message..."
                                                    className="flex-1 px-4 py-2 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 outline-none text-sm text-surface-900 dark:text-white" />
                                                <button className="btn-primary !py-2 !px-4 text-sm cursor-pointer">Send</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
