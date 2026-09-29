import { supabase } from './supabaseClient';
import type { Project } from '../types';

export const ProjectService = {
  async getProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('position', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar projetos:', error);
      return [];
    }
    
    // Mapear snake_case para camelCase
    return data.map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      fullDescription: p.full_description,
      category: p.category,
      techs: p.techs || [],
      githubUrl: p.github_url,
      demoUrl: p.demo_url,
      imageUrl: p.image_url,
      featured: p.featured,
      visible: p.visible,
      position: p.position
    }));
  },

  async createProject(project: Omit<Project, 'id'>): Promise<Project | null> {
    const dbProject = {
      title: project.title,
      description: project.description,
      full_description: project.fullDescription,
      category: project.category,
      techs: project.techs,
      github_url: project.githubUrl,
      demo_url: project.demoUrl,
      image_url: project.imageUrl,
      featured: project.featured,
      visible: project.visible !== undefined ? project.visible : true,
      position: project.position || 0
    };

    const { data, error } = await supabase
      .from('projects')
      .insert(dbProject)
      .select()
      .single();

    if (error || !data) {
      console.error('Erro ao criar projeto:', error);
      return null;
    }

    return {
      ...project,
      id: data.id,
      visible: data.visible,
      position: data.position
    } as Project;
  },

  async updateProject(project: Project): Promise<boolean> {
    const dbProject = {
      title: project.title,
      description: project.description,
      full_description: project.fullDescription,
      category: project.category,
      techs: project.techs,
      github_url: project.githubUrl,
      demo_url: project.demoUrl,
      image_url: project.imageUrl,
      featured: project.featured,
      visible: project.visible,
      position: project.position
    };

    const { error } = await supabase
      .from('projects')
      .update(dbProject)
      .eq('id', project.id);

    if (error) {
      console.error('Erro ao atualizar projeto:', error);
      return false;
    }
    return true;
  },

  async deleteProject(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao excluir projeto:', error);
      return false;
    }
    return true;
  },

  async updatePositions(updates: { id: string; position: number }[]): Promise<boolean> {
    // Para simplificar, faremos requisições individuais em paralelo.
    // Em produção com muitos dados, seria melhor usar uma RPC (stored procedure).
    const promises = updates.map(u => 
      supabase.from('projects').update({ position: u.position }).eq('id', u.id)
    );
    
    const results = await Promise.all(promises);
    const hasError = results.some(r => r.error);
    
    if (hasError) {
      console.error('Erro ao atualizar ordenação.');
      return false;
    }
    return true;
  }
};
