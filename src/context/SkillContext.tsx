import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { SkillService } from '../services/skillService';
import type { Skill, SkillCategory } from '../types';
import { useToast } from './ToastContext';

interface SkillContextType {
  categories: SkillCategory[];
  isLoading: boolean;
  addCategory: (category: Omit<SkillCategory, 'id' | 'skills'>) => Promise<boolean>;
  updateCategory: (category: Omit<SkillCategory, 'skills'>) => Promise<boolean>;
  deleteCategory: (id: string) => Promise<boolean>;
  addSkill: (skill: Omit<Skill, 'id'>) => Promise<boolean>;
  updateSkill: (skill: Skill) => Promise<boolean>;
  deleteSkill: (id: string) => Promise<boolean>;
}

const SkillContext = createContext<SkillContextType | undefined>(undefined);

export const SkillProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { addToast } = useToast();
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const data = await SkillService.getCategoriesWithSkills();
      setCategories(data);
    } catch (error: any) {
      console.error('Erro ao buscar skills:', error);
      addToast('error', 'Erro', 'Falha ao carregar as habilidades do banco.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async (category: Omit<SkillCategory, 'id' | 'skills'>) => {
    try {
      const id = await SkillService.addCategory(category);
      setCategories(prev => [...prev, { ...category, id, skills: [] }]);
      addToast('success', 'Sucesso', 'Categoria adicionada.');
      return true;
    } catch (error: any) {
      addToast('error', 'Erro', error.message);
      return false;
    }
  };

  const updateCategory = async (category: Omit<SkillCategory, 'skills'>) => {
    try {
      await SkillService.updateCategory(category.id, category);
      setCategories(prev =>
        prev.map(c => (c.id === category.id ? { ...c, ...category } : c))
      );
      addToast('success', 'Sucesso', 'Categoria atualizada.');
      return true;
    } catch (error: any) {
      addToast('error', 'Erro', error.message);
      return false;
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await SkillService.deleteCategory(id);
      setCategories(prev => prev.filter(c => c.id !== id));
      addToast('success', 'Sucesso', 'Categoria excluída.');
      return true;
    } catch (error: any) {
      addToast('error', 'Erro', error.message);
      return false;
    }
  };

  const addSkill = async (skill: Omit<Skill, 'id'>) => {
    try {
      const id = await SkillService.addSkill(skill);
      setCategories(prev =>
        prev.map(c => {
          if (c.id === skill.categoryId) {
            return { ...c, skills: [...(c.skills || []), { ...skill, id }] };
          }
          return c;
        })
      );
      addToast('success', 'Sucesso', 'Habilidade adicionada.');
      return true;
    } catch (error: any) {
      addToast('error', 'Erro', error.message);
      return false;
    }
  };

  const updateSkill = async (skill: Skill) => {
    try {
      await SkillService.updateSkill(skill.id, skill);
      setCategories(prev =>
        prev.map(c => {
          if (c.id === skill.categoryId) {
            return {
              ...c,
              skills: (c.skills || []).map(s => (s.id === skill.id ? skill : s))
            };
          }
          return c;
        })
      );
      addToast('success', 'Sucesso', 'Habilidade atualizada.');
      return true;
    } catch (error: any) {
      addToast('error', 'Erro', error.message);
      return false;
    }
  };

  const deleteSkill = async (id: string) => {
    try {
      await SkillService.deleteSkill(id);
      setCategories(prev =>
        prev.map(c => ({
          ...c,
          skills: (c.skills || []).filter(s => s.id !== id)
        }))
      );
      addToast('success', 'Sucesso', 'Habilidade excluída.');
      return true;
    } catch (error: any) {
      addToast('error', 'Erro', error.message);
      return false;
    }
  };

  return (
    <SkillContext.Provider
      value={{
        categories,
        isLoading,
        addCategory,
        updateCategory,
        deleteCategory,
        addSkill,
        updateSkill,
        deleteSkill
      }}
    >
      {children}
    </SkillContext.Provider>
  );
};

export const useSkills = () => {
  const context = useContext(SkillContext);
  if (context === undefined) {
    throw new Error('useSkills must be used within a SkillProvider');
  }
  return context;
};
