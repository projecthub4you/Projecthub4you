// components/FAQAccordion.jsx — Expandable FAQ section
import { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import ScrollReveal from './ScrollReveal';

const faqs = [
    {
        q: 'What type of projects do you offer?',
        a: 'We offer AI/ML projects (NLP, Computer Vision, Deep Learning), web development projects (MERN, Django, Flask), mini projects, and fully custom project development for CSE, AIML, and ECE branches.',
    },
    {
        q: 'Do you provide documentation and PPT?',
        a: 'Yes! All our plans include project documentation. Pro and Premium plans include IEEE-format reports, PPTs, and research paper support.',
    },
    {
        q: 'How long does it take to deliver a project?',
        a: 'Delivery time depends on complexity. Simple projects take 3-5 days, while complex AI/ML projects may take 7-14 days. We also offer priority delivery.',
    },
    {
        q: 'Will you help me understand the project?',
        a: 'Absolutely! We provide code walkthrough sessions, explanation videos, and mentorship support to help you understand and present your project confidently.',
    },
    {
        q: 'Is the code plagiarism-free?',
        a: 'Yes, every project is built from scratch. We provide clean, well-documented, original code that passes plagiarism checks.',
    },
    {
        q: 'What if I need modifications after delivery?',
        a: 'Basic plans include 1 revision. Pro includes 3 revisions, and Premium includes unlimited revisions within 30 days of delivery.',
    },
];

const FAQAccordion = () => {
    const [open, setOpen] = useState(null);

    return (
        <section className="section-padding">
            <ScrollReveal>
                <h2 className="section-title">Frequently Asked Questions</h2>
                <p className="section-subtitle">Got questions? We've got answers.</p>
            </ScrollReveal>

            <div className="max-w-3xl mx-auto space-y-3">
                {faqs.map((faq, i) => (
                    <ScrollReveal key={i} delay={i * 80}>
                        <div className="glass-card !p-0 overflow-hidden">
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                className="w-full px-6 py-4 flex items-center justify-between text-left cursor-pointer"
                            >
                                <span className="font-medium text-surface-900 dark:text-white pr-4">{faq.q}</span>
                                <HiChevronDown
                                    className={`w-5 h-5 text-primary-500 transition-transform duration-300 flex-shrink-0 ${open === i ? 'rotate-180' : ''}`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${open === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <p className="px-6 pb-4 text-sm text-surface-700/70 dark:text-surface-200/60 leading-relaxed">{faq.a}</p>
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    );
};

export default FAQAccordion;
