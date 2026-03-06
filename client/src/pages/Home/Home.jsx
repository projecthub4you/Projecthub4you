// pages/Home/Home.jsx — Landing page with all sections
import { Link } from 'react-router-dom';
import { HiArrowRight, HiCode, HiLightningBolt, HiChip, HiAcademicCap, HiShieldCheck, HiClock, HiChat, HiDocumentText } from 'react-icons/hi';
import ScrollReveal from '../../components/ScrollReveal';
import StatsCounter from '../../components/StatsCounter';
import TestimonialCarousel from '../../components/TestimonialCarousel';
import FAQAccordion from '../../components/FAQAccordion';

// ===== Hero Section =====
const Hero = () => (
    <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-surface-950 via-primary-900/20 to-surface-950 dark:block hidden"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:hidden"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-float"></div>

        <div className="relative section-padding w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left — Text */}
                <div className="animate-fade-up">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-300 text-sm font-medium mb-6">
                        <HiLightningBolt /> #1 Project Platform for Engineers
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-tight mb-6">
                        Build Your <span className="gradient-text">Final Year Project</span> Like a Pro
                    </h1>
                    <p className="text-lg sm:text-xl text-surface-700/70 dark:text-surface-200/60 max-w-xl mb-8 leading-relaxed">
                        Get production-ready engineering projects with expert AI/ML mentorship. Perfect documentation, clean code, and 1-on-1 guidance for CSE, AIML and other students.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link to="/services" className="btn-primary inline-flex items-center gap-2 text-lg">
                            Explore Projects <HiArrowRight />
                        </Link>
                        <Link to="/pricing" className="btn-outline inline-flex items-center gap-2 text-lg">
                            View Pricing
                        </Link>
                    </div>
                    {/* Trust badges */}
                    <div className="flex items-center gap-6 mt-8 text-sm text-surface-700/50 dark:text-surface-200/40">

                        <span className="flex items-center gap-1"><HiClock className="text-accent-500" /> Fast Delivery</span>
                    </div>
                </div>

                {/* Right — Mini Dashboard Mockup */}
                <div className="hidden lg:block animate-fade-up" style={{ animationDelay: '200ms' }}>
                    <div className="relative">
                        <div className="glass-card p-6 space-y-5">
                            {/* Dashboard header */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-surface-700/50 dark:text-surface-200/40 uppercase tracking-wider">Student Dashboard</p>
                                    <h3 className="font-heading font-bold text-surface-900 dark:text-white text-lg">AI Sentiment Analyzer</h3>
                                </div>
                                <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-semibold">In Progress</span>
                            </div>

                            {/* Progress ring + stats */}
                            <div className="flex items-center gap-6">
                                {/* SVG ring */}
                                <div className="relative w-24 h-24 flex-shrink-0">
                                    <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-surface-200 dark:text-surface-700" />
                                        <circle cx="50" cy="50" r="42" fill="none" stroke="url(#gradient)" strokeWidth="8" strokeLinecap="round" strokeDasharray="264" strokeDashoffset="40" style={{ transition: 'stroke-dashoffset 1.5s ease-out' }} />
                                        <defs><linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#0ea5e9" /></linearGradient></defs>
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-xl font-heading font-bold text-surface-900 dark:text-white">85%</span>
                                    </div>
                                </div>
                                {/* Mini stats */}
                                <div className="space-y-2 flex-1">
                                    {[{ label: 'Code', pct: 95, color: 'bg-primary-500' }, { label: 'Documentation', pct: 70, color: 'bg-accent-500' }, { label: 'Testing', pct: 60, color: 'bg-purple-500' }].map((s) => (
                                        <div key={s.label}>
                                            <div className="flex justify-between text-xs mb-1">
                                                <span className="text-surface-700 dark:text-surface-200">{s.label}</span>
                                                <span className="text-surface-700/50 dark:text-surface-200/40">{s.pct}%</span>
                                            </div>
                                            <div className="h-1.5 rounded-full bg-surface-200 dark:bg-surface-700 overflow-hidden">
                                                <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.pct}%`, transition: 'width 1.5s ease-out' }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent activity */}
                            <div className="space-y-2.5 pt-2 border-t border-surface-200/50 dark:border-surface-700/50">
                                <p className="text-xs font-semibold text-surface-700/50 dark:text-surface-200/40 uppercase tracking-wider">Recent Activity</p>
                                {[
                                    { icon: '✅', text: 'Model training completed', time: '2h ago', highlight: true },
                                    { icon: '📄', text: 'IEEE report draft uploaded', time: '5h ago', highlight: false },
                                    { icon: '💬', text: 'Mentor feedback received', time: '1d ago', highlight: false },
                                ].map((a, i) => (
                                    <div key={i} className={`flex items-center gap-3 p-2 rounded-lg text-sm ${a.highlight ? 'bg-primary-50 dark:bg-primary-900/20' : ''}`}>
                                        <span>{a.icon}</span>
                                        <span className="flex-1 text-surface-700 dark:text-surface-200">{a.text}</span>
                                        <span className="text-xs text-surface-700/40 dark:text-surface-200/30">{a.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Floating badges */}
                        <div className="absolute -top-4 -right-4 glass-card !p-3 animate-float">
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <HiAcademicCap className="text-primary-500" /> 99+ Projects
                            </div>
                        </div>
                        <div className="absolute -bottom-4 -left-4 glass-card !p-3 animate-float" style={{ animationDelay: '2s' }}>
                            <div className="flex items-center gap-2 text-sm font-medium">
                                <HiClock className="text-accent-500" /> Delivery: 4 days
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// ===== Services Overview =====
const services = [
    { icon: HiChip, title: 'AI/ML Projects', desc: 'NLP, Computer Vision, Deep Learning, TensorFlow, PyTorch — research-backed projects with full implementation.', color: 'from-purple-500 to-pink-500' },
    { icon: HiCode, title: 'Web Development', desc: 'Full-stack MERN, Django, Flask applications with modern UI, database integration, and deployment.', color: 'from-blue-500 to-cyan-500' },
    { icon: HiLightningBolt, title: 'Mini Projects', desc: 'Quick, impressive mini projects for lab submissions and internships. Clean code and documentation included.', color: 'from-orange-500 to-yellow-500' },
    { icon: HiDocumentText, title: 'Custom Projects', desc: 'Have a unique idea? We\'ll build it from scratch with your specifications, complete with reports and guides.', color: 'from-green-500 to-emerald-500' },
];

const ServicesOverview = () => (
    <section className="section-padding">
        <ScrollReveal>
            <h2 className="section-title">What We <span className="gradient-text">Offer</span></h2>
            <p className="section-subtitle">Comprehensive project development and mentorship tailored for final year students</p>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
                <ScrollReveal key={s.title} delay={i * 100}>
                    <div className="glass-card group hover:-translate-y-2 transition-all duration-300 h-full">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${s.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                            <s.icon size={24} />
                        </div>
                        <h3 className="font-heading font-semibold text-lg mb-2 text-surface-900 dark:text-white">{s.title}</h3>
                        <p className="text-sm text-surface-700/60 dark:text-surface-200/50 leading-relaxed">{s.desc}</p>
                    </div>
                </ScrollReveal>
            ))}
        </div>
    </section>
);

// ===== Why Choose Us =====
const whyUs = [
    { icon: '🎯', title: 'Production-Ready Code', desc: 'Not tutorial-level code. We deliver clean, scalable, well-architected projects.' },
    { icon: '📝', title: 'Complete Documentation', desc: 'IEEE reports, PPTs, UML diagrams, and code walkthroughs included.' },
    { icon: '🧑‍🏫', title: 'Expert Mentorship', desc: '1-on-1 sessions with industry mentors to help you understand and present your project.' },
    { icon: '⚡', title: 'Fast Delivery', desc: 'Most projects delivered in 3-7 days. Priority delivery available.' },
    { icon: '🔒', title: '100% Original', desc: 'Every project is built from scratch — no templates, no plagiarism.' },
    { icon: '🔄', title: 'Free Revisions', desc: 'Not satisfied? We offer free modifications to match your exact requirements.' },
];

const WhyChooseUs = () => (
    <section className="section-padding bg-surface-100/50 dark:bg-surface-900/30">
        <ScrollReveal>
            <h2 className="section-title">Why Choose <span className="gradient-text">ProjectHub</span>?</h2>
            <p className="section-subtitle">We're not just another project shop — we're your engineering success partner</p>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 80}>
                    <div className="glass-card group hover:-translate-y-1 transition-all duration-300 h-full">
                        <span className="text-3xl mb-3 block">{item.icon}</span>
                        <h3 className="font-heading font-semibold text-lg mb-2 text-surface-900 dark:text-white">{item.title}</h3>
                        <p className="text-sm text-surface-700/60 dark:text-surface-200/50 leading-relaxed">{item.desc}</p>
                    </div>
                </ScrollReveal>
            ))}
        </div>
    </section>
);

// ===== Pricing Preview =====
const plans = [
    { name: 'Basic', price: '₹1399', features: ['Source code', 'Documentation', '1 Revision', 'Email support'], color: 'border-surface-200 dark:border-surface-700' },
    { name: 'Pro', price: '₹1999', features: ['Everything in Basic', 'IEEE Report + PPT', '3 Revisions', '1-on-1 Mentorship', 'Code walkthrough'], popular: true, color: 'border-primary-500' },
    { name: 'Premium', price: '₹2999', features: ['Everything in Pro', 'Research paper support', 'Unlimited revisions', 'Priority delivery', 'Deployment help', 'Video explanation'], color: 'border-surface-200 dark:border-surface-700' },
];

const PricingPreview = () => (
    <section className="section-padding">
        <ScrollReveal>
            <h2 className="section-title">Simple, Transparent <span className="gradient-text">Pricing</span></h2>
            <p className="section-subtitle">Choose the plan that fits your needs. No hidden charges.</p>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
                <ScrollReveal key={plan.name} delay={i * 120}>
                    <div className={`glass-card relative border-2 ${plan.color} ${plan.popular ? 'scale-105' : ''} hover:-translate-y-2 transition-all duration-300 h-full flex flex-col`}>
                        {plan.popular && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-bg text-white text-xs font-bold">
                                MOST POPULAR
                            </div>
                        )}
                        <h3 className="font-heading font-bold text-xl text-surface-900 dark:text-white">{plan.name}</h3>
                        <div className="my-4">
                            <span className="text-4xl font-heading font-bold gradient-text">{plan.price}</span>
                            <span className="text-surface-700/50 dark:text-surface-200/40 text-sm"> / project</span>
                        </div>
                        <ul className="space-y-3 mb-6 flex-1">
                            {plan.features.map((f) => (
                                <li key={f} className="flex items-start gap-2 text-sm text-surface-700/70 dark:text-surface-200/60">
                                    <span className="text-green-500 mt-0.5">✓</span> {f}
                                </li>
                            ))}
                        </ul>
                        <Link
                            to="/pricing"
                            className={plan.popular ? 'btn-primary text-center' : 'btn-outline text-center'}
                        >
                            Get Started
                        </Link>
                    </div>
                </ScrollReveal>
            ))}
        </div>
    </section>
);

// ===== Contact CTA =====
const ContactCTA = () => (
    <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-90"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgZmlsbD0idXJsKCNhKSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIvPjwvc3ZnPg==')] opacity-30"></div>
        <ScrollReveal>
            <div className="relative text-center max-w-3xl mx-auto px-4">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
                    Ready to Build Your Dream Project?
                </h2>
                <p className="text-lg text-white/70 mb-8">
                    Get started today and submit your project by the deadline with confidence.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link to="/contact" className="px-8 py-3.5 rounded-xl font-semibold bg-white text-primary-600 hover:bg-surface-100 hover:shadow-lg transition-all duration-300">
                        Contact Us
                    </Link>
                    <a
                        href="https://wa.me/917892611458?text=Hi%20ProjectHub!%20I'm%20interested%20in%20a%20project."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-3.5 rounded-xl font-semibold border-2 border-white text-white hover:bg-white hover:text-primary-600 transition-all duration-300"
                    >
                        WhatsApp Us
                    </a>
                </div>
            </div>
        </ScrollReveal>
    </section>
);

// ===== Home Page Assembly =====
const Home = () => {
    return (
        <>
            <Hero />
            <ServicesOverview />
            <StatsCounter />
            <WhyChooseUs />
            <TestimonialCarousel />
            <PricingPreview />
            <FAQAccordion />
            <ContactCTA />
        </>
    );
};

export default Home;
