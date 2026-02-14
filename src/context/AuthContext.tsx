import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'superadmin' | 'admin' | 'staff' | null;

interface User {
    username: string;
    role: UserRole;
    name: string;
}

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for "remembered" session (FE demo only)
        const savedUser = localStorage.getItem('simtaru_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        // Demo logic
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800)); // Simulating network lag

        let demoUser: User | null = null;

        if (username === 'superadmin' && password === 'admin123') {
            demoUser = { username, role: 'superadmin', name: 'Super Admin Rembang' };
        } else if (username === 'admin' && password === 'admin123') {
            demoUser = { username, role: 'admin', name: 'Admin Bidang' };
        } else if (username === 'staff' && password === 'admin123') {
            demoUser = { username, role: 'staff', name: 'Staff DPU' };
        }

        if (demoUser) {
            setUser(demoUser);
            localStorage.setItem('simtaru_user', JSON.stringify(demoUser));
            setIsLoading(false);
            return true;
        }

        setIsLoading(false);
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('simtaru_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
