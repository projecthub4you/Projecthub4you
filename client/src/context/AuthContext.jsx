// context/AuthContext.jsx — Authentication context with JWT token management
import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('projecthub-token'));
    const [loading, setLoading] = useState(true);

    // Fetch user profile on mount (if token exists)
    useEffect(() => {
        if (token) {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUser = async () => {
        try {
            const res = await api.get('/auth/me');
            setUser(res.data.user);
        } catch {
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        const { token: newToken, user: userData } = res.data;
        localStorage.setItem('projecthub-token', newToken);
        setToken(newToken);
        setUser(userData);
        return userData;
    };

    const register = async (data) => {
        const res = await api.post('/auth/register', data);
        const { token: newToken, user: userData } = res.data;
        localStorage.setItem('projecthub-token', newToken);
        setToken(newToken);
        setUser(userData);
        return userData;
    };

    const logout = () => {
        localStorage.removeItem('projecthub-token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAdmin: user?.role === 'admin' }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
