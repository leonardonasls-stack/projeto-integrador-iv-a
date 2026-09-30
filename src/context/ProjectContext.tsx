import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Project } from '../types';
import { useToast } from './ToastContext';
import { ProjectService } from '../services/projectService';

interface ProjectContextType {
  projects: Project[];
  filteredProjects: Project[];
  isLoading: boolean;
  error: string | null;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => Promise<boolean>;
  updateProject: (project: Project) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  updateProjectPositions: (projects: Project[]) => Promise<boolean>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { addToast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  // Carrega os projetos do banco
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await ProjectService.getProjects();
        setProjects(data);
      } catch (err: any) {
        const msg = err.message || 'Erro ao carregar projetos';
        setError(msg);
        addToast('error', 'Falha no Carregamento', msg);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, [addToast]);

  const addProject = async (newProject: Omit<Project, 'id' | 'createdAt'>): Promise<boolean> => {
    // Definimos uma nova posição para o projeto se ele não tiver uma (último lugar)
    const position = newProject.position ?? (projects.length > 0 ? Math.max(...projects.map(p => p.position || 0)) + 1 : 0);
    
    const created = await ProjectService.createProject({ ...newProject, position });
    if (created) {
      setProjects(prev => [...prev, created].sort((a, b) => (a.position || 0) - (b.position || 0)));
      addToast('success', 'Projeto Cadastrado', `${created.title} foi adicionado à vitrine.`);
      return true;
    }
    
    addToast('error', 'Falha ao Cadastrar', 'Ocorreu um erro ao tentar salvar o projeto no banco.');
    return false;
  };

  const updateProject = async (updatedProject: Project): Promise<boolean> => {
    const success = await ProjectService.updateProject(updatedProject);
    if (success) {
      setProjects(prev => prev.map((p) => (p.id === updatedProject.id ? updatedProject : p)).sort((a, b) => (a.position || 0) - (b.position || 0)));
      addToast('success', 'Projeto Atualizado', `${updatedProject.title} foi salvo com sucesso.`);
      return true;
    }

    addToast('error', 'Falha ao Atualizar', 'Não foi possível salvar as alterações.');
    return false;
  };

  const deleteProject = async (id: string): Promise<boolean> => {
    const projectToDelete = projects.find((p) => p.id === id);
    if (!projectToDelete) return false;

    const success = await ProjectService.deleteProject(id);
    if (success) {
      setProjects(prev => prev.filter((p) => p.id !== id));
      addToast('info', 'Projeto Excluído', `${projectToDelete.title} foi removido.`);
      return true;
    }

    addToast('error', 'Falha ao Excluir', 'Não foi possível remover o projeto.');
    return false;
  };

  const updateProjectPositions = async (reorderedProjects: Project[]): Promise<boolean> => {
    // Atualiza estado local imediatamente (otimista)
    setProjects(reorderedProjects);

    // Salva no banco as posições
    const updates = reorderedProjects.map((p, index) => ({ id: p.id, position: index }));
    const success = await ProjectService.updatePositions(updates);
    
    if (success) {
      addToast('success', 'Ordenação Salva', 'A ordem dos projetos foi atualizada.');
      return true;
    }

    // Se falhar, poderia reverter, mas por enquanto mantemos simples
    addToast('error', 'Falha na Ordenação', 'A nova ordem não foi salva no banco.');
    return false;
  };

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => (a.position || 0) - (b.position || 0));
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return sortedProjects.filter(p => {
      if (p.visible === false) return false;
      const matchCat = selectedCategory === 'Todas' || p.category === selectedCategory;
      const search = searchQuery.toLowerCase();
      const matchSearch = p.title.toLowerCase().includes(search) || 
                          p.description.toLowerCase().includes(search) || 
                          p.techs.some(t => t.toLowerCase().includes(search));
      return matchCat && matchSearch;
    });
  }, [sortedProjects, selectedCategory, searchQuery]);

  return (
    <ProjectContext.Provider
      value={{
        projects: sortedProjects,
        filteredProjects,
        isLoading,
        error,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        addProject,
        updateProject,
        deleteProject,
        updateProjectPositions
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
