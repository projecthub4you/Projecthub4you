// components/ThemeToggle.jsx — Sun/Moon dark mode toggle button
import { HiSun, HiMoon } from 'react-icons/hi';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-200
                 hover:bg-surface-200 dark:hover:bg-surface-700 transition-all duration-300 cursor-pointer"
            aria-label="Toggle theme"
        >
            {darkMode ? <HiSun size={20} className="text-yellow-400" /> : <HiMoon size={20} className="text-primary-500" />}
        </button>
    );
};

export default ThemeToggle;
