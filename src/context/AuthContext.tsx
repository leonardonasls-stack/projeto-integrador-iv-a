import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import { useToast } from './ToastContext';
import { StorageService } from '../services/storageService';

interface AuthContextType {
  user: User;
  login: (passcode: string) => Promise<boolean>;
  logout: () => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'dev_portfolio_auth';
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
    const saved = StorageService.getItem<(User & { expiresAt?: number }) | null>(AUTH_STORAGE_KEY, null);
    if (saved) {
      if (saved.expiresAt && saved.expiresAt > Date.now()) {
        return saved;
      }
      StorageService.removeItem(AUTH_STORAGE_KEY);
    }
    return { username: 'Convidado', role: 'guest', isLoggedIn: false };
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const login = async (passcode: string): Promise<boolean> => {
    const expectedHash = import.meta.env.VITE_ADMIN_HASH;

    if (!expectedHash) {
      addToast(
        'error',
        'Painel Admin Indisponível',
        'A variável de ambiente VITE_ADMIN_HASH não foi configurada neste ambiente.'
      );
      return false;
    }

    const hashedPasscode = await hashInput(passcode);

    if (hashedPasscode === expectedHash) {
      const adminUser: User & { expiresAt?: number } = {
        username: 'Administrador',
        role: 'admin',
        isLoggedIn: true,
        expiresAt: Date.now() + SESSION_TTL_MS
      };
      setUser(adminUser);
      StorageService.setItem(AUTH_STORAGE_KEY, adminUser);
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
    StorageService.removeItem(AUTH_STORAGE_KEY);
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
