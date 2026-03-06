// pages/Services/Services.jsx — Services page with detailed category cards
import { Link } from 'react-router-dom';
import { HiChip, HiCode, HiLightningBolt, HiDocumentText, HiArrowRight } from 'react-icons/hi';
import ScrollReveal from '../../components/ScrollReveal';

const serviceCategories = [
    {
        icon: HiChip,
        title: 'AI/ML Projects',
        gradient: 'from-purple-500 to-pink-500',
        description: 'Cutting-edge artificial intelligence and machine learning projects built with the latest frameworks and research papers.',
        projects: [
            'Sentiment Analysis using BERT/Transformers',
            'Face Recognition Attendance System',
            'Object Detection with YOLO',
            'Chatbot using NLP & Rasa',
            'Image Classification (CNN/ResNet)',
            'Recommendation System',
            'Deepfake Detection',
            'Medical Image Analysis',
        ],
        technologies: ['Python', 'TensorFlow', 'PyTorch', 'scikit-learn', 'OpenCV', 'HuggingFace', 'Flask/FastAPI'],
    },
    {
        icon: HiCode,
        title: 'Web Development Projects',
        gradient: 'from-blue-500 to-cyan-500',
        description: 'Full-stack web applications built with modern frameworks, complete with authentication, payments, and admin panels.',
        projects: [
            'E-Commerce Platform (MERN Stack)',
            'Learning Management System',
            'Social Media Application',
            'Hospital Management System',
            'Job Portal with Resume Parser',
            'Event Management Platform',
            'Real-Time Chat Application',
            'Online Exam System',
        ],
        technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Django', 'Flask', 'PostgreSQL', 'Socket.io'],
    },
    {
        icon: HiLightningBolt,
        title: 'Mini Projects',
        gradient: 'from-orange-500 to-yellow-500',
        description: 'Quick, polished mini projects perfect for lab submissions, internship applications, and building your portfolio.',
        projects: [
            'Weather Forecasting App',
            'To-Do App with Authentication',
            'Quiz Application',
            'Portfolio Website',
            'Calculator with History',
            'URL Shortener',
            'Notes App with Cloud Sync',
            'Currency Converter',
        ],
        technologies: ['HTML/CSS/JS', 'React', 'Python', 'APIs', 'Firebase', 'Tailwind CSS'],
    },
    {
        icon: HiDocumentText,
        title: 'Custom Project Requests',
        gradient: 'from-green-500 to-emerald-500',
        description: 'Got a unique idea or specific requirements from your guide? We\'ll build exactly what you need from scratch.',
        projects: [
            'Any college-specific project requirement',
            'Guide-approved topic implementation',
            'Research paper implementation',
            'Industry-specific solutions',
            'IoT & Embedded Systems projects',
            'Blockchain / Web3 projects',
            'Cloud Computing projects',
            'Cybersecurity projects',
        ],
        technologies: ['Any Technology Stack', 'Based on Requirements', 'Custom Architecture'],
    },
];

const Services = () => {
    return (
        <div className="pt-24">
            {/* Header */}
            <section className="section-padding !pb-8">
                <ScrollReveal>
                    <h1 className="section-title">Our <span className="gradient-text">Services</span></h1>
                    <p className="section-subtitle">From AI/ML to web development — we cover every domain for your final year project</p>
                </ScrollReveal>
            </section>

            {/* Service Categories */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-8">
                {serviceCategories.map((cat, i) => (
                    <ScrollReveal key={cat.title} delay={i * 100}>
                        <div className="glass-card overflow-hidden">
                            <div className="flex flex-col lg:flex-row gap-8">
                                {/* Left Info */}
                                <div className="lg:w-1/3">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${cat.gradient} flex items-center justify-center text-white mb-4`}>
                                        <cat.icon size={28} />
                                    </div>
                                    <h2 className="text-2xl font-heading font-bold text-surface-900 dark:text-white mb-3">{cat.title}</h2>
                                    <p className="text-surface-700/60 dark:text-surface-200/50 leading-relaxed mb-4">{cat.description}</p>
                                    {/* Technologies */}
                                    <div className="flex flex-wrap gap-2">
                                        {cat.technologies.map((tech) => (
                                            <span key={tech} className="px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 text-xs font-medium">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Right — Project list */}
                                <div className="lg:w-2/3">
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {cat.projects.map((project) => (
                                            <div key={project} className="flex items-start gap-3 p-3 rounded-xl bg-surface-50 dark:bg-surface-800/50 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all">
                                                <span className="text-primary-500 mt-0.5 flex-shrink-0">▸</span>
                                                <span className="text-sm text-surface-700 dark:text-surface-200">{project}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </section>

            {/* CTA */}
            <section className="section-padding bg-surface-100/50 dark:bg-surface-900/30 text-center">
                <ScrollReveal>
                    <h2 className="text-2xl sm:text-3xl font-heading font-bold text-surface-900 dark:text-white mb-4">
                        Don't see what you're looking for?
                    </h2>
                    <p className="text-surface-700/60 dark:text-surface-200/50 mb-6 max-w-xl mx-auto">
                        We can build any project based on your requirements. Just tell us your idea!
                    </p>
                    <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                        Request Custom Project <HiArrowRight />
                    </Link>
                </ScrollReveal>
            </section>
        </div>
    );
};

export default Services;
