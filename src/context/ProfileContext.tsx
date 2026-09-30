import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { ProfileData } from '../types/profile';
import { defaultProfileData } from '../types/profile';
import { useToast } from './ToastContext';
import { StorageService } from '../services/storageService';
import { SettingsService } from '../services/settingsService';

interface ProfileContextType {
  profile: ProfileData;
  updateProfile: (updatedData: Partial<ProfileData>) => Promise<boolean>;
  resetProfile: () => void;
  isLoading: boolean;
  error: string | null;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'dev_portfolio_profile_v3';

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileData>(() => {
    // Inicializa com o cache local (stale-while-revalidate) para não piscar a tela
    const saved = StorageService.getItem<ProfileData | null>(LOCAL_STORAGE_KEY, null);
    if (saved) {
      return { ...defaultProfileData, ...saved };
    }
    return defaultProfileData;
  });

  useEffect(() => {
    // Busca dados atualizados do banco ao carregar
    const fetchSettings = async () => {
      setError(null);
      try {
        const data = await SettingsService.getSettings();
        setProfile(data);
        StorageService.setItem(LOCAL_STORAGE_KEY, data);
      } catch (err: any) {
        console.error("Falha ao buscar configurações:", err);
        const msg = err.message || 'Erro ao carregar configurações do perfil.';
        setError(msg);
        addToast('error', 'Falha no Carregamento', msg);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSettings();
  }, [addToast]);

  const updateProfile = async (updatedData: Partial<ProfileData>): Promise<boolean> => {
    // Otimista: atualiza o estado local primeiro
    const nextProfile = { ...profile, ...updatedData };
    setProfile(nextProfile);
    
    // Tenta salvar no Supabase
    const success = await SettingsService.updateSettings(updatedData);
    
    if (success) {
      StorageService.setItem(LOCAL_STORAGE_KEY, nextProfile);
      addToast('success', 'Textos Atualizados!', 'As configurações foram salvas com sucesso no banco de dados.');
      return true;
    } else {
      // Reverte se falhou
      setProfile(profile);
      addToast('error', 'Erro ao Salvar', 'Não foi possível salvar as configurações. Verifique sua conexão e permissões.');
      return false;
    }
  };

  const resetProfile = () => {
    // Apenas visual para esta função, idealmente o admin atualizaria para o padrão manualmente
    setProfile(defaultProfileData);
    StorageService.setItem(LOCAL_STORAGE_KEY, defaultProfileData);
    addToast('info', 'Textos Padrão Restaurados', 'Os textos foram restaurados localmente. Clique em Salvar para persistir no banco.');
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, resetProfile, isLoading, error }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
