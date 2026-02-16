import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'superadmin' | 'admin' | 'staff' | null;

interface User {
    username: string;
    role: UserRole;
    name: string;
    password?: string; // Optional for other users, but we'll show it for superadmin's view
}

interface AuthContextType {
    user: User | null;
    allUsers: User[];
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
    createUser: (newUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: User[] = [
    { username: 'superadmin', role: 'superadmin', name: 'Super Admin Rembang', password: 'admin123' },
    { username: 'admin', role: 'admin', name: 'Admin Bidang Tata Ruang', password: 'admin123' },
    { username: 'staff', role: 'staff', name: 'Staff DPU', password: 'admin123' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [allUsers, setAllUsers] = useState<User[]>(DEMO_USERS);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('simtaru_user');
        const savedAllUsers = localStorage.getItem('simtaru_all_users');
        
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        if (savedAllUsers) {
            setAllUsers(JSON.parse(savedAllUsers));
        } else {
            localStorage.setItem('simtaru_all_users', JSON.stringify(DEMO_USERS));
        }
        setIsLoading(false);
    }, []);

    const login = async (username: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));

        const foundUser = allUsers.find(u => u.username === username && u.password === password);

        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem('simtaru_user', JSON.stringify(foundUser));
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

    const createUser = (newUser: User) => {
        const updatedUsers = [...allUsers, newUser];
        setAllUsers(updatedUsers);
        localStorage.setItem('simtaru_all_users', JSON.stringify(updatedUsers));
    };

    return (
        <AuthContext.Provider value={{ user, allUsers, login, logout, isLoading, createUser }}>
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
