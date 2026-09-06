import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: User;
  login: (passcode: string) => boolean;
  logout: () => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { addToast } = useToast();
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('dev_portfolio_auth');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to load auth:', e);
      }
    }
    return { username: 'Convidado', role: 'guest', isLoggedIn: false };
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const login = (passcode: string): boolean => {
    if (passcode === 'admin123' || passcode === 'admin') {
      const adminUser: User = {
        username: 'Administrador',
        role: 'admin',
        isLoggedIn: true
      };
      setUser(adminUser);
      localStorage.setItem('dev_portfolio_auth', JSON.stringify(adminUser));
      setIsLoginModalOpen(false);
      addToast('success', 'Acesso Concedido!', 'Você está no modo Administrador (CRUD liberado).');
      return true;
    } else {
      addToast('error', 'Senha Incorreta', 'Dica para teste: utilize "admin123" ou "admin".');
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
