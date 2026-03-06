// pages/Contact/Contact.jsx — Contact form with validation and WhatsApp redirect
import { useState } from 'react';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';
import api from '../../services/api';
import ScrollReveal from '../../components/ScrollReveal';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errs = {};
        if (!formData.name.trim()) errs.name = 'Name is required';
        if (!formData.email.trim()) errs.email = 'Email is required';
        else if (!/^\S+@\S+\.\S+$/.test(formData.email)) errs.email = 'Invalid email';
        if (!formData.message.trim()) errs.message = 'Message is required';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            const res = await api.post('/contact', formData);
            toast.success(res.data.message || 'Message sent!');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            setErrors({});
        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
    };

    return (
        <div className="pt-24">
            <section className="section-padding">
                <ScrollReveal>
                    <h1 className="section-title">Get in <span className="gradient-text">Touch</span></h1>
                    <p className="section-subtitle">Have a question or want to start a project? We'd love to hear from you!</p>
                </ScrollReveal>

                <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <ScrollReveal>
                            <div className="glass-card space-y-6">
                                <h3 className="font-heading font-bold text-xl text-surface-900 dark:text-white">Contact Information</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-500 flex-shrink-0">
                                            <HiMail size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-surface-900 dark:text-white">Email</p>
                                            <p className="text-sm text-surface-700/60 dark:text-surface-200/50">projecthub4you@gmail.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-500 flex-shrink-0">
                                            <HiPhone size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-surface-900 dark:text-white">Phone</p>
                                            <p className="text-sm text-surface-700/60 dark:text-surface-200/50">+91 78926 11458</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-500 flex-shrink-0">
                                            <HiLocationMarker size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-surface-900 dark:text-white">Location</p>
                                            <p className="text-sm text-surface-700/60 dark:text-surface-200/50">Bangalore, India</p>
                                        </div>
                                    </div>
                                </div>

                                {/* WhatsApp Button */}
                                <a
                                    href="https://wa.me/917892611458?text=Hi%20ProjectHub!%20I'm%20interested%20in%20a%20project."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-all duration-300"
                                >
                                    <FaWhatsapp size={20} /> Chat on WhatsApp
                                </a>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-3">
                        <ScrollReveal delay={100}>
                            <form onSubmit={handleSubmit} className="glass-card space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Name *</label>
                                        <input
                                            type="text" name="name" value={formData.name} onChange={handleChange}
                                            className={`w-full px-4 py-3 rounded-xl bg-surface-50 dark:bg-surface-800 border ${errors.name ? 'border-red-500' : 'border-surface-200 dark:border-surface-700'} focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-surface-900 dark:text-white`}
                                            placeholder="Your name"
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Email *</label>
                                        <input
                                            type="email" name="email" value={formData.email} onChange={handleChange}
                                            className={`w-full px-4 py-3 rounded-xl bg-surface-50 dark:bg-surface-800 border ${errors.email ? 'border-red-500' : 'border-surface-200 dark:border-surface-700'} focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-surface-900 dark:text-white`}
                                            placeholder="your@email.com"
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Phone</label>
                                        <input
                                            type="tel" name="phone" value={formData.phone} onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-surface-900 dark:text-white"
                                            placeholder="+91 78926 11458"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Subject</label>
                                        <input
                                            type="text" name="subject" value={formData.subject} onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-surface-900 dark:text-white"
                                            placeholder="Project inquiry"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-1">Message *</label>
                                    <textarea
                                        name="message" value={formData.message} onChange={handleChange} rows={4}
                                        className={`w-full px-4 py-3 rounded-xl bg-surface-50 dark:bg-surface-800 border ${errors.message ? 'border-red-500' : 'border-surface-200 dark:border-surface-700'} focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none text-surface-900 dark:text-white`}
                                        placeholder="Tell us about your project..."
                                    />
                                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                                </div>
                                <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50 flex items-center justify-center gap-2">
                                    {loading ? (
                                        <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Sending...</>
                                    ) : (
                                        'Send Message'
                                    )}
                                </button>
                            </form>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
