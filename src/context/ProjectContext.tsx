import React, { createContext, useContext, useState, useEffect, useMemo, useDeferredValue } from 'react';
import type { ReactNode } from 'react';
import type { Project, ProjectCategory } from '../types';
import { initialProjects } from '../data/initialProjects';
import { useToast } from './ToastContext';
import { StorageService } from '../services/storageService';

interface ProjectContextType {
  projects: Project[];
  selectedCategory: ProjectCategory | 'Todas';
  setSelectedCategory: (category: ProjectCategory | 'Todas') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addProject: (projectData: Omit<Project, 'id' | 'createdAt'>) => void;
  updateProject: (id: string, projectData: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  resetProjects: () => void;
  filteredProjects: Project[];
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'dev_portfolio_projects_v6';

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { addToast } = useToast();
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = StorageService.getItem<Project[] | null>(LOCAL_STORAGE_KEY, null);
    if (saved) {
      const existingIds = new Set(saved.map((p) => p.id));
      const missingInitial = initialProjects.filter((p) => !existingIds.has(p.id));
      if (missingInitial.length > 0) {
        return [...missingInitial, ...saved];
      }
      return saved;
    }
    return initialProjects;
  });

  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'Todas'>('Todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const deferredSearchQuery = useDeferredValue(searchQuery);

  useEffect(() => {
    StorageService.setItem(LOCAL_STORAGE_KEY, projects);
  }, [projects]);

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: `proj-${crypto.randomUUID()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProjects((prev) => [newProject, ...prev]);
    addToast('success', 'Projeto Cadastrado!', `O projeto "${newProject.title}" foi adicionado com sucesso.`);
  };

  const updateProject = (id: string, updatedFields: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((proj) => (proj.id === id ? { ...proj, ...updatedFields } : proj))
    );
    addToast('info', 'Projeto Atualizado', 'As alterações do projeto foram salvas.');
  };

  const deleteProject = (id: string) => {
    const projToDelete = projects.find((p) => p.id === id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
    addToast('error', 'Projeto Removido', `O projeto "${projToDelete?.title || ''}" foi excluído.`);
  };

  const resetProjects = () => {
    setProjects(initialProjects);
    StorageService.removeItem(LOCAL_STORAGE_KEY);
    addToast('info', 'Projetos Restaurados', 'A lista de projetos foi restaurada para o estado inicial.');
  };

  const filteredProjects = useMemo(() => {
    const query = deferredSearchQuery.toLowerCase();
    return projects.filter((project) => {
      const matchesCategory = selectedCategory === 'Todas' || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.techs.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, deferredSearchQuery]);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        addProject,
        updateProject,
        deleteProject,
        resetProjects,
        filteredProjects
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
