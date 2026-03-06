// context/ThemeContext.jsx — Dark/light mode context with localStorage persistence
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('projecthub-theme');
        return saved ? saved === 'dark' : true; // Default to dark mode
    });

    useEffect(() => {
        const root = document.documentElement;
        if (darkMode) {
            root.classList.add('dark');
            localStorage.setItem('projecthub-theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('projecthub-theme', 'light');
        }
    }, [darkMode]);

    const toggleTheme = () => setDarkMode((prev) => !prev);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
