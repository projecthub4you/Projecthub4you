// components/ScrollReveal.jsx — Wrapper that fades in on scroll
import { useScrollReveal } from '../hooks/useScrollReveal';

const ScrollReveal = ({ children, className = '', delay = 0 }) => {
    const [ref, isVisible] = useScrollReveal(0.1);

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${className}
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

export default ScrollReveal;
