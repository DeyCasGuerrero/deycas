"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { TokenManager, User } from "@/lib/token-manager";
import api from "@/shared/api/axios";
import { useRouter } from "next/navigation";

interface AuthContextType {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(TokenManager.getUser());
    const [accessToken, setAccessToken] = useState<string | null>(TokenManager.getAccessToken());
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    // Subscribe to TokenManager changes (synced with Axios interceptor)
    useEffect(() => {
        const unsubscribe = TokenManager.subscribe(() => {
            setUser(TokenManager.getUser());
            setAccessToken(TokenManager.getAccessToken());
        });
        return () => unsubscribe();
    }, []);

    // Perform silent refresh on mount
    useEffect(() => {
        const initAuth = async () => {
            // Skip silent refresh if we are already on the login page
            if (typeof window !== "undefined" && (window.location.pathname === "/login" || window.location.pathname === "/") ) {
                setIsLoading(false);
                return;
            }

            try {
                // If there's no token in memory, try to refresh using cookie
                if (!TokenManager.getAccessToken()) {
                    await refreshSession();
                } else {
                    setIsLoading(false);
                }
            } catch (err) {
                // Silent catch: since the user is not logged in yet, failing to restore session is normal
                setIsLoading(false);
            }
        };

        initAuth();
    }, []);

    const refreshSession = async () => {
        try {
            // Under the hood, this axios post endpoint will return { accessToken, user } or { data: { accessToken, user } }
            const response = await api.post("auth/refresh", {}, { withCredentials: true });
            console.log("refreshSession response", response.data);
            
            const resData = response.data?.data || response.data;
            const newToken = resData?.accessToken || resData?.token;
            const userData = resData?.user;
            
            if (newToken) {
                TokenManager.setAccessToken(newToken);
            }
            if (userData) {
                TokenManager.setUser(userData);
            }
        } catch (error) {
            TokenManager.clearSession();
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await api.post("/auth/login", { email, password });
            console.log("login response", response.data);
            
            const resData = response.data?.data || response.data;
            const token = resData?.accessToken || resData?.token;
            const userData = resData?.user;
            
            if (token) {
                TokenManager.setAccessToken(token);
            }
            if (userData) {
                TokenManager.setUser(userData);
            }
            router.push("/cms"); // Redirect to cms dashboard upon login
        } catch (error) {
            TokenManager.clearSession();
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await api.post("/auth/logout", {}, { withCredentials: true });
        } catch (error) {
            console.error("Failed to call logout endpoint on backend", error);
        } finally {
            TokenManager.clearSession();
            setIsLoading(false);
            router.push("/login");
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                accessToken,
                isAuthenticated: !!accessToken,
                isLoading,
                login,
                logout,
                refreshSession,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
