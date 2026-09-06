import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Project, ProjectCategory } from '../types';
import { initialProjects } from '../data/initialProjects';
import { useToast } from './ToastContext';

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

const LOCAL_STORAGE_KEY = 'dev_portfolio_projects_v2';

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { addToast } = useToast();
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed: Project[] = JSON.parse(saved);
        // Ensure any new initial projects (like proj-docker-bot) are merged if missing
        const existingIds = new Set(parsed.map((p) => p.id));
        const missingInitial = initialProjects.filter((p) => !existingIds.has(p.id));
        if (missingInitial.length > 0) {
          return [...missingInitial, ...parsed];
        }
        return parsed;
      } catch (e) {
        console.error('Failed to parse local projects:', e);
      }
    }
    return initialProjects;
  });

  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'Todas'>('Todas');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
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
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    addToast('info', 'Projetos Restaurados', 'A lista de projetos foi restaurada para o estado inicial.');
  };

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'Todas' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techs.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

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
