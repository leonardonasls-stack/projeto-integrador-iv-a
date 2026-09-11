import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: User;
  login: (passcode: string) => Promise<boolean>;
  logout: () => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_TTL_MS = 2 * 60 * 60 * 1000; // 2 horas de validade da sessão admin

const hashInput = async (input: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { addToast } = useToast();
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('dev_portfolio_auth');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.expiresAt && parsed.expiresAt > Date.now()) {
          return parsed;
        }
        localStorage.removeItem('dev_portfolio_auth');
      } catch (e) {
        console.error('Failed to load auth:', e);
      }
    }
    return { username: 'Convidado', role: 'guest', isLoggedIn: false };
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const login = async (passcode: string): Promise<boolean> => {
    const hashedPasscode = await hashInput(passcode);
    const expectedHash = import.meta.env.VITE_ADMIN_HASH || '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9'; // default hash for 'admin123' if env not set

    if (hashedPasscode === expectedHash) {
      const adminUser: User & { expiresAt?: number } = {
        username: 'Administrador',
        role: 'admin',
        isLoggedIn: true,
        expiresAt: Date.now() + SESSION_TTL_MS
      };
      setUser(adminUser);
      localStorage.setItem('dev_portfolio_auth', JSON.stringify(adminUser));
      setIsLoginModalOpen(false);
      addToast('success', 'Acesso Concedido!', 'Você está no modo Administrador (CRUD liberado).');
      return true;
    } else {
      addToast('error', 'Senha Incorreta', 'Credenciais inválidas.');
      return false;
    }
  };

  const logout = () => {
    const guestUser: User = { username: 'Convidado', role: 'guest', isLoggedIn: false };
    setUser(guestUser);
    localStorage.removeItem('dev_portfolio_auth');
    addToast('info', 'Sessão Encerrada', 'Você voltou para o modo de navegação pública.');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoginModalOpen,
        setIsLoginModalOpen
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
