import { useState, useEffect, useCallback } from 'react';
import { authRepository } from '../adapters/AuthRepository';
import type { User, LoginDto, RegisterDto } from '../types/auth.types';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const checkAuth = useCallback(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        } else {
            setUser(null);
            setIsAuthenticated(false);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const login = async (credentials: LoginDto) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authRepository.login(credentials);
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            setUser(response.user);
            setIsAuthenticated(true);

            if (response.user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (err: any) {
            console.error(err);
            setError(err.response?.data?.message || 'Login failed');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (data: RegisterDto) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authRepository.register(data);
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            setUser(response.user);
            setIsAuthenticated(true);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        authRepository.logout();
        setUser(null);
        setIsAuthenticated(false);
        navigate('/login');
    };

    return {
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        register,
        logout
    };
};
