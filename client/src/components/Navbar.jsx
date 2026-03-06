// components/Navbar.jsx — Sticky navigation with mobile menu and theme toggle
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Build Project', path: '/custom-project' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const location = useLocation();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-18">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-0.5 group">
                        <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900 }} className="text-xl text-surface-900 dark:text-white tracking-tight">Project</span>
                        <span className="inline-flex items-center justify-center rounded-md px-1.5 py-0.5" style={{ background: 'linear-gradient(145deg, #FFAA00, #F07800)' }}>
                            <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900 }} className="text-xl text-black tracking-tight">Hub</span>
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${location.pathname === link.path
                                        ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/30'
                                        : 'text-surface-700 dark:text-surface-200 hover:text-primary-500 hover:bg-surface-100 dark:hover:bg-surface-800'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Section */}
                    <div className="hidden md:flex items-center gap-3">
                        <ThemeToggle />
                        {user ? (
                            <div className="flex items-center gap-3">
                                <Link
                                    to={user.role === 'admin' ? '/admin' : '/dashboard'}
                                    className="btn-outline !py-2 !px-4 text-sm"
                                >
                                    {user.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
                                </Link>
                                <button onClick={logout} className="text-sm text-surface-700 dark:text-surface-200 hover:text-red-500 transition-colors cursor-pointer">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link to="/login" className="btn-outline !py-2 !px-4 text-sm">Login</Link>
                                <Link to="/signup" className="btn-primary !py-2 !px-4 text-sm">Sign Up</Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-2">
                        <ThemeToggle />
                        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg text-surface-700 dark:text-surface-200 cursor-pointer">
                            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden glass border-t border-white/10 animate-fade-in">
                    <div className="px-4 py-4 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all
                  ${location.pathname === link.path
                                        ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/30'
                                        : 'text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-2 border-t border-surface-200 dark:border-surface-700">
                            {user ? (
                                <>
                                    <Link
                                        to={user.role === 'admin' ? '/admin' : '/dashboard'}
                                        onClick={() => setIsOpen(false)}
                                        className="block px-4 py-3 rounded-xl text-sm font-medium text-primary-500"
                                    >
                                        {user.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
                                    </Link>
                                    <button onClick={() => { logout(); setIsOpen(false); }} className="block w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-red-500 cursor-pointer">
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <div className="flex gap-2 pt-2">
                                    <Link to="/login" onClick={() => setIsOpen(false)} className="btn-outline !py-2 flex-1 text-center text-sm">Login</Link>
                                    <Link to="/signup" onClick={() => setIsOpen(false)} className="btn-primary !py-2 flex-1 text-center text-sm">Sign Up</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
