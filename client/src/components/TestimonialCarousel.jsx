// components/TestimonialCarousel.jsx — Auto-scrolling testimonial carousel
import { useState, useEffect } from 'react';
import { HiChevronLeft, HiChevronRight, HiStar } from 'react-icons/hi';
import ScrollReveal from './ScrollReveal';

const testimonials = [
    {
        name: 'Priya Sharma',
        college: 'VIT Vellore',
        branch: 'CSE',
        text: 'ProjectHub delivered my AI-based sentiment analysis project ahead of schedule. The code quality was production-level and my guide was really impressed!',
        rating: 5,
    },
    {
        name: 'Arjun Reddy',
        college: 'SRM University',
        branch: 'AIML',
        text: 'The mentorship I received for my deep learning project was incredible. They didn\'t just build it — they taught me every concept along the way.',
        rating: 5,
    },
    {
        name: 'Sneha Patel',
        college: 'BITS Pilani',
        branch: 'ECE',
        text: 'Got my IoT home automation project with complete documentation and a working demo. Best investment for my final year!',
        rating: 5,
    },
    {
        name: 'Karthik Nair',
        college: 'NIT Trichy',
        branch: 'CSE',
        text: 'The e-commerce project with Razorpay integration was exactly what I needed. Clean code, great UI, and proper deployment guide.',
        rating: 4,
    },
    {
        name: 'Ananya Gupta',
        college: 'PESIT Bangalore',
        branch: 'AIML',
        text: 'Their custom project service is amazing. I gave them my unique idea and they turned it into a fully working project with research paper support.',
        rating: 5,
    },
];

const TestimonialCarousel = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
    const next = () => setCurrent((c) => (c + 1) % testimonials.length);

    return (
        <section className="section-padding">
            <ScrollReveal>
                <h2 className="section-title">What Students Say</h2>
                <p className="section-subtitle">Trusted by 1200+ students across 50+ engineering colleges in India</p>
            </ScrollReveal>

            <div className="relative max-w-3xl mx-auto">
                {/* Testimonial Card */}
                <div className="glass-card text-center min-h-[260px] flex flex-col items-center justify-center">
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                            <HiStar key={i} className={`w-5 h-5 ${i < testimonials[current].rating ? 'text-yellow-400' : 'text-surface-200 dark:text-surface-700'}`} />
                        ))}
                    </div>
                    {/* Quote */}
                    <p className="text-lg sm:text-xl text-surface-700 dark:text-surface-200 leading-relaxed mb-6 italic">
                        "{testimonials[current].text}"
                    </p>
                    {/* Author */}
                    <div>
                        <p className="font-heading font-semibold text-surface-900 dark:text-white">{testimonials[current].name}</p>
                        <p className="text-sm text-surface-700/60 dark:text-surface-200/50">
                            {testimonials[current].branch} · {testimonials[current].college}
                        </p>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-center gap-4 mt-6">
                    <button onClick={prev} className="p-2 rounded-full glass hover:bg-primary-50 dark:hover:bg-surface-800 transition-all cursor-pointer">
                        <HiChevronLeft size={20} />
                    </button>
                    <div className="flex gap-2">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${i === current ? 'bg-primary-500 w-6' : 'bg-surface-200 dark:bg-surface-700'}`}
                            />
                        ))}
                    </div>
                    <button onClick={next} className="p-2 rounded-full glass hover:bg-primary-50 dark:hover:bg-surface-800 transition-all cursor-pointer">
                        <HiChevronRight size={20} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TestimonialCarousel;
