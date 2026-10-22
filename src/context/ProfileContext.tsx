import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { ProfileData } from '../types/profile';
import { portfolioProfile } from '../data/portfolioData';

interface ProfileContextType {
  profile: ProfileData;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile] = useState<ProfileData>(portfolioProfile);

  return (
    <ProfileContext.Provider value={{ profile }}>
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
