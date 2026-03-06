// pages/Pricing/Pricing.jsx — Pricing page with comparison table

import { Link } from 'react-router-dom';
import { HiCheck, HiX } from 'react-icons/hi';
import ScrollReveal from '../../components/ScrollReveal';

const plans = [
    {
        name: 'Basic',
        price: 1399,
        description: 'Perfect for simple projects and lab submissions',
        features: {
            'Complete source code': true,
            'Project documentation': true,
            'Setup guide': true,
            'Email support': true,
            'Revisions': '1',
            'IEEE format report': false,
            'PPT presentation': false,
            '1-on-1 mentorship': false,
            'Code walkthrough': false,
            'Research paper support': false,
            'Priority delivery': false,
            'Deployment assistance': false,
            'Video explanation': false,
        },
    },
    {
        name: 'Pro',
        price: 1999,
        description: 'Best for impressive projects with full documentation',
        popular: true,
        features: {
            'Complete source code': true,
            'Project documentation': true,
            'Setup guide': true,
            'Email support': true,
            'Revisions': '3',
            'IEEE format report': true,
            'PPT presentation': true,
            '1-on-1 mentorship': true,
            'Code walkthrough': true,
            'Research paper support': false,
            'Priority delivery': false,
            'Deployment assistance': false,
            'Video explanation': false,
        },
    },
    {
        name: 'Premium',
        price: 2999,
        description: 'Complete package with mentorship and publication support',
        features: {
            'Complete source code': true,
            'Project documentation': true,
            'Setup guide': true,
            'Email support': true,
            'Revisions': 'Unlimited',
            'IEEE format report': true,
            'PPT presentation': true,
            '1-on-1 mentorship': true,
            'Code walkthrough': true,
            'Research paper support': true,
            'Priority delivery': true,
            'Deployment assistance': true,
            'Video explanation': true,
        },
    },
];

const Pricing = () => {
    return (
        <div className="pt-24">
            {/* Header */}
            <section className="section-padding !pb-8">
                <ScrollReveal>
                    <h1 className="section-title">Choose Your <span className="gradient-text">Plan</span></h1>
                    <p className="section-subtitle">Transparent pricing with no hidden fees. Pick what works for you.</p>
                </ScrollReveal>
            </section>

            {/* Pricing Cards */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {plans.map((plan, i) => (
                        <ScrollReveal key={plan.name} delay={i * 120}>
                            <div className={`glass-card relative border-2 h-full flex flex-col ${plan.popular ? 'border-primary-500 scale-105' : 'border-surface-200 dark:border-surface-700'}`}>
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-bg text-white text-xs font-bold whitespace-nowrap">
                                        MOST POPULAR
                                    </div>
                                )}
                                <h3 className="text-xl font-heading font-bold text-surface-900 dark:text-white">{plan.name}</h3>
                                <p className="text-sm text-surface-700/50 dark:text-surface-200/40 mb-4">{plan.description}</p>
                                <div className="mb-6">
                                    <span className="text-4xl font-heading font-bold gradient-text">
                                        ₹{plan.price.toLocaleString()}
                                    </span>
                                    <span className="text-surface-700/40 dark:text-surface-200/30 text-sm">
                                        {' / project'}
                                    </span>
                                </div>
                                <ul className="space-y-3 mb-8 flex-1">
                                    {Object.entries(plan.features).map(([feature, value]) => (
                                        <li key={feature} className="flex items-start gap-2 text-sm">
                                            {value === false ? (
                                                <HiX className="text-surface-200 dark:text-surface-700 mt-0.5 flex-shrink-0" />
                                            ) : (
                                                <HiCheck className="text-green-500 mt-0.5 flex-shrink-0" />
                                            )}
                                            <span className={value === false ? 'text-surface-700/30 dark:text-surface-200/20' : 'text-surface-700/70 dark:text-surface-200/60'}>
                                                {feature}{typeof value === 'string' ? ` (${value})` : ''}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    to="/contact"
                                    className={plan.popular ? 'btn-primary text-center' : 'btn-outline text-center'}
                                >
                                    Get Started
                                </Link>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* Comparison Table */}
            <section className="section-padding bg-surface-100/50 dark:bg-surface-900/30">
                <ScrollReveal>
                    <h2 className="text-2xl sm:text-3xl font-heading font-bold text-center text-surface-900 dark:text-white mb-8">
                        Plan Comparison
                    </h2>
                </ScrollReveal>
                <ScrollReveal delay={100}>
                    <div className="overflow-x-auto">
                        <table className="w-full max-w-4xl mx-auto text-sm">
                            <thead>
                                <tr className="border-b border-surface-200 dark:border-surface-700">
                                    <th className="py-3 px-4 text-left font-heading font-semibold text-surface-900 dark:text-white">Feature</th>
                                    {plans.map((p) => (
                                        <th key={p.name} className="py-3 px-4 text-center font-heading font-semibold text-surface-900 dark:text-white">{p.name}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(plans[0].features).map((feature) => (
                                    <tr key={feature} className="border-b border-surface-200/50 dark:border-surface-800">
                                        <td className="py-3 px-4 text-surface-700 dark:text-surface-200">{feature}</td>
                                        {plans.map((plan) => (
                                            <td key={plan.name} className="py-3 px-4 text-center">
                                                {plan.features[feature] === false ? (
                                                    <HiX className="inline text-surface-200 dark:text-surface-700" />
                                                ) : plan.features[feature] === true ? (
                                                    <HiCheck className="inline text-green-500" />
                                                ) : (
                                                    <span className="text-surface-700 dark:text-surface-200 font-medium">{plan.features[feature]}</span>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </ScrollReveal>
            </section>
        </div>
    );
};

export default Pricing;
