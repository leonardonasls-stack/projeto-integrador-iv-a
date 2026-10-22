import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { SkillCategory } from '../types';
import { portfolioSkillCategories } from '../data/portfolioData';

interface SkillContextType {
  categories: SkillCategory[];
}

const SkillContext = createContext<SkillContextType | undefined>(undefined);

export const SkillProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories] = useState<SkillCategory[]>(portfolioSkillCategories);

  return (
    <SkillContext.Provider value={{ categories }}>
      {children}
    </SkillContext.Provider>
  );
};

export const useSkills = (): SkillContextType => {
  const context = useContext(SkillContext);
  if (!context) {
    throw new Error('useSkills must be used within a SkillProvider');
  }
  return context;
};
