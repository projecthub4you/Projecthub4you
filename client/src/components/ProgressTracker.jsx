// components/ProgressTracker.jsx — Visual stepper for project request progress
const STAGES = [
    'Pending Approval',
    'Approved',
    'Research Stage',
    'Architecture Building',
    'Development Stage',
    'Testing Phase',
    'Documentation Preparation',
    'Ready for Delivery',
    'Completed',
];

const stageIcons = ['📋', '✅', '🔍', '🏗️', '💻', '🧪', '📄', '📦', '🎉'];

const ProgressTracker = ({ currentStatus }) => {
    const currentIndex = STAGES.indexOf(currentStatus);

    return (
        <div className="w-full py-4">
            <div className="flex items-center justify-between relative">
                {/* Background line */}
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-surface-200 dark:bg-surface-700"></div>
                {/* Progress line */}
                <div
                    className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-700"
                    style={{ width: `${(currentIndex / (STAGES.length - 1)) * 100}%` }}
                ></div>

                {STAGES.map((stage, i) => {
                    const isCompleted = i < currentIndex;
                    const isCurrent = i === currentIndex;
                    const isPending = i > currentIndex;

                    return (
                        <div key={stage} className="relative flex flex-col items-center z-10" style={{ width: `${100 / STAGES.length}%` }}>
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500
                                    ${isCompleted ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' : ''}
                                    ${isCurrent ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/40 scale-110 ring-4 ring-primary-500/20' : ''}
                                    ${isPending ? 'bg-surface-200 dark:bg-surface-700 text-surface-700/50 dark:text-surface-200/30' : ''}
                                `}
                            >
                                {isCompleted ? '✓' : stageIcons[i]}
                            </div>
                            <p className={`text-[10px] mt-2 text-center leading-tight max-w-[70px]
                                ${isCurrent ? 'text-primary-500 font-bold' : ''}
                                ${isCompleted ? 'text-surface-700 dark:text-surface-200' : ''}
                                ${isPending ? 'text-surface-700/30 dark:text-surface-200/20' : ''}
                            `}>
                                {stage}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProgressTracker;
export { STAGES };
