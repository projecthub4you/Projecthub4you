// components/LoadingSpinner.jsx — Full-screen loading spinner
const LoadingSpinner = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface-50/80 dark:bg-surface-950/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-surface-700 dark:text-surface-200">Loading...</p>
        </div>
    </div>
);

export default LoadingSpinner;
