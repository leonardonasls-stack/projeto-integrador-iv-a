import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { ProfileData } from '../types/profile';
import { defaultProfileData } from '../types/profile';
import { useToast } from './ToastContext';

interface ProfileContextType {
  profile: ProfileData;
  updateProfile: (updatedData: Partial<ProfileData>) => void;
  resetProfile: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'dev_portfolio_profile_v2';

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { addToast } = useToast();
  const [profile, setProfile] = useState<ProfileData>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Clean up any residual Java mentions in saved browser cache
        if (parsed.heroDescription && parsed.heroDescription.includes('Java')) {
          parsed.heroDescription = defaultProfileData.heroDescription;
        }
        return { ...defaultProfileData, ...parsed };
      } catch (e) {
        console.error('Failed to parse local profile:', e);
      }
    }
    return defaultProfileData;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (updatedData: Partial<ProfileData>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updatedData };
      return next;
    });
    addToast('success', 'Textos Atualizados!', 'Os textos da página inicial foram salvos com sucesso.');
  };

  const resetProfile = () => {
    setProfile(defaultProfileData);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    addToast('info', 'Textos Padrão Restaurados', 'Os textos da home foram restaurados para a versão padrão.');
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, resetProfile }}>
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
