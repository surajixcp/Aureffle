import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, AuthMode, LoginCredentials, SignupCredentials, AuthContextType } from '@/types/auth';
import { useToast } from '@/context/ToastContext';

const STORAGE_KEY = 'aureffle_user_session';

const MOCK_DEFAULT_USER: User = {
  id: 'user-aur-8821',
  name: 'Élodie Laurent',
  email: 'elodie.laurent@aureffle.com',
  tier: 'Club Aureffle Noir',
  loyaltyPoints: 1450,
  reservationsCount: 4,
  joinedDate: 'October 2025',
  favoriteItem: 'Single-Origin Ethiopian Yirgacheffe & Gold Tartlet',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const toast = useToast();

  // Load existing session from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Failed to load user session', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sync session changes to localStorage
  const persistUser = (userData: User | null) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  // Login action handler
  const login = useCallback(
    async (credentials: LoginCredentials): Promise<boolean> => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 650));

      const isDemo = credentials.email.toLowerCase().includes('elodie') || credentials.email.toLowerCase().includes('demo');

      const loggedUser: User = isDemo
        ? MOCK_DEFAULT_USER
        : {
            id: `user-${Date.now()}`,
            name: credentials.email.split('@')[0].replace('.', ' ').replace(/^./, (str) => str.toUpperCase()) || 'Valued Guest',
            email: credentials.email,
            tier: 'Club Aureffle Gold',
            loyaltyPoints: 350,
            reservationsCount: 1,
            joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          };

      persistUser(loggedUser);
      setIsLoading(false);
      toast.success('Bienvenue à Aureffle Café', `Signed in successfully as ${loggedUser.name}`);
      return true;
    },
    [toast]
  );

  // Signup action handler
  const signup = useCallback(
    async (credentials: SignupCredentials): Promise<boolean> => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 750));

      const newUser: User = {
        id: `user-${Date.now()}`,
        name: credentials.name.trim(),
        email: credentials.email.trim(),
        tier: 'Club Aureffle Noir',
        loyaltyPoints: 250, // Welcome bonus points
        reservationsCount: 0,
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      };

      persistUser(newUser);
      setIsLoading(false);
      toast.success('Compte Créé Avec Succès', `Welcome to Aureffle Privilège, ${newUser.name}! 250 bonus points added.`);
      return true;
    },
    [toast]
  );

  // Logout handler
  const logout = useCallback(() => {
    persistUser(null);
    toast.info('Signed Out', 'We look forward to hosting your next dining experience at Aureffle.');
  }, [toast]);

  // Reset password simulation
  const requestPasswordReset = useCallback(
    async (email: string): Promise<boolean> => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 600));
      setIsLoading(false);
      toast.success('Reset Instructions Sent', `A secure link has been sent to ${email}`);
      return true;
    },
    [toast]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        authMode,
        setAuthMode,
        login,
        signup,
        logout,
        requestPasswordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
