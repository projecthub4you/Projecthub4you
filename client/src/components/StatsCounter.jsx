// components/StatsCounter.jsx — Animated counting statistics section
import { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const stats = [
    { label: 'Projects Delivered', value: 500, suffix: '+' },
    { label: 'Happy Students', value: 1200, suffix: '+' },
    { label: 'Expert Mentors', value: 25, suffix: '+' },
    { label: 'College Partners', value: 50, suffix: '+' },
];

const Counter = ({ target, suffix }) => {
    const [count, setCount] = useState(0);
    const [ref, isVisible] = useScrollReveal(0.3);

    useEffect(() => {
        if (!isVisible) return;
        let start = 0;
        const duration = 2000;
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [isVisible, target]);

    return (
        <div ref={ref} className="text-center">
            <div className="text-4xl sm:text-5xl font-heading font-bold gradient-text mb-2">
                {count.toLocaleString()}{suffix}
            </div>
        </div>
    );
};

const StatsCounter = () => {
    return (
        <section className="relative py-16 sm:py-20">
            {/* Background accent */}
            <div className="absolute inset-0 gradient-bg opacity-5"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <Counter target={stat.value} suffix={stat.suffix} />
                            <p className="text-sm sm:text-base text-surface-700/60 dark:text-surface-200/50 mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsCounter;
