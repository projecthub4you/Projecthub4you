// components/Footer.jsx — Site footer with links and socials
import { Link } from 'react-router-dom';
import { HiMail, HiPhone } from 'react-icons/hi';
import { FaWhatsapp, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-surface-900 dark:bg-surface-950 text-surface-200 border-t border-surface-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-0.5 mb-4">
                            <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900 }} className="text-xl text-white tracking-tight">Project</span>
                            <span className="inline-flex items-center justify-center rounded-md px-1.5 py-0.5" style={{ background: 'linear-gradient(145deg, #FFAA00, #F07800)' }}>
                                <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 900 }} className="text-xl text-black tracking-tight">Hub</span>
                            </span>
                        </div>
                        <p className="text-surface-200/60 text-sm leading-relaxed mb-4">
                            Helping final year engineering students build production-ready projects with expert mentorship in AI/ML and web development.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { Icon: FaWhatsapp, href: 'https://wa.me/917892611458?text=Hi%20ProjectHub!' },
                                { Icon: FaInstagram, href: 'https://www.instagram.com/projecthub4you?igsh=MWN5dTBqc2dmYjh0bQ==' },
                                { Icon: FaLinkedin, href: '#' },
                                { Icon: FaTwitter, href: '#' },
                            ].map((s, i) => (
                                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-surface-800 flex items-center justify-center text-surface-200/60 hover:text-primary-400 hover:bg-surface-700 transition-all">
                                    <s.Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-heading font-semibold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {[{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: 'Pricing', path: '/pricing' }, { name: 'Contact', path: '/contact' }].map((link) => (
                                <li key={link.path}>
                                    <Link to={link.path} className="text-sm text-surface-200/60 hover:text-primary-400 transition-colors">{link.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-heading font-semibold text-white mb-4">Services</h4>
                        <ul className="space-y-2">
                            {['AI/ML Projects', 'Web Development', 'Mini Projects', 'Custom Projects'].map((s) => (
                                <li key={s}>
                                    <Link to="/services" className="text-sm text-surface-200/60 hover:text-primary-400 transition-colors">{s}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-heading font-semibold text-white mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-sm text-surface-200/60">
                                <HiMail className="text-primary-400" /> projecthub4you@gmail.com
                            </li>
                            <li className="flex items-center gap-2 text-sm text-surface-200/60">
                                <HiPhone className="text-primary-400" /> +91 78926 11458
                            </li>
                            <li className="flex items-center gap-2 text-sm text-surface-200/60">
                                <FaWhatsapp className="text-green-400" /> WhatsApp Support
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-surface-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-surface-200/40">© 2026 ProjectHub. All rights reserved.</p>
                    <div className="flex gap-4 text-sm text-surface-200/40">
                        <a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-primary-400 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
