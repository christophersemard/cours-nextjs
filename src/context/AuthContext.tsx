'use client';

import { createContext, useState } from 'react';
import { useRouter } from 'next/navigation';

type AuthUser = {
    id: number;
    username: string;
} | null;

type AuthContextType = {
    user: AuthUser;
    setUser: (user: AuthUser) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ initialUser, children }: { initialUser: AuthUser; children: React.ReactNode }) {
    const [user, setUser] = useState<AuthUser>(initialUser);
    const router = useRouter();

    const logout = () => {
        setUser(null);
        fetch('/logout', { method: 'POST' }).then(() => router.refresh());
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
