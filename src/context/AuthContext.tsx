import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import { useToast } from './ToastContext';
import { supabase } from '../services/supabaseClient';

interface AuthContextType {
  user: User;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { addToast } = useToast();
  const [user, setUser] = useState<User>({ username: 'Convidado', role: 'guest', isLoggedIn: false });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // Verifica sessão inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser({ username: 'Administrador', role: 'admin', isLoggedIn: true });
      }
    });

    // Escuta mudanças de auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser({ username: 'Administrador', role: 'admin', isLoggedIn: true });
      } else {
        setUser({ username: 'Convidado', role: 'guest', isLoggedIn: false });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      addToast('error', 'Falha no Login', error.message || 'Credenciais inválidas.');
      return false;
    }

    setIsLoginModalOpen(false);
    addToast('success', 'Acesso Concedido!', 'Você está no modo Administrador.');
    return true;
  };

  const logout = async () => {
    await supabase.auth.signOut();
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
