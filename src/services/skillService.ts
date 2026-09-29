import { supabase } from './supabaseClient';
import type { Skill, SkillCategory } from '../types';

export const SkillService = {
  /**
   * Fetches all categories and their skills from Supabase
   * and maps them to the local types.
   */
  async getCategoriesWithSkills(): Promise<SkillCategory[]> {
    const { data: categoriesData, error: catError } = await supabase
      .from('skill_categories')
      .select('*')
      .order('position', { ascending: true });

    if (catError) throw new Error(catError.message);

    const { data: skillsData, error: skillError } = await supabase
      .from('skills')
      .select('*')
      .order('position', { ascending: true });

    if (skillError) throw new Error(skillError.message);

    return (categoriesData || []).map(cat => ({
      id: cat.id,
      title: cat.title,
      icon: cat.icon,
      color: cat.color,
      position: cat.position,
      skills: (skillsData || [])
        .filter(skill => skill.category_id === cat.id)
        .map(skill => ({
          id: skill.id,
          categoryId: skill.category_id,
          name: skill.name,
          level: skill.level,
          description: skill.description || undefined,
          position: skill.position
        }))
    }));
  },

  // Category CRUD
  async addCategory(category: Omit<SkillCategory, 'id' | 'skills'>): Promise<string> {
    const { data, error } = await supabase
      .from('skill_categories')
      .insert({
        title: category.title,
        icon: category.icon,
        color: category.color,
        position: category.position
      })
      .select('id')
      .single();

    if (error) throw new Error(error.message);
    return data.id;
  },

  async updateCategory(id: string, updates: Partial<Omit<SkillCategory, 'id' | 'skills'>>): Promise<void> {
    const dbUpdates: any = {};
    if (updates.title !== undefined) dbUpdates.title = updates.title;
    if (updates.icon !== undefined) dbUpdates.icon = updates.icon;
    if (updates.color !== undefined) dbUpdates.color = updates.color;
    if (updates.position !== undefined) dbUpdates.position = updates.position;

    const { error } = await supabase
      .from('skill_categories')
      .update(dbUpdates)
      .eq('id', id);

    if (error) throw new Error(error.message);
  },

  async deleteCategory(id: string): Promise<void> {
    const { error } = await supabase
      .from('skill_categories')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  },

  // Skill CRUD
  async addSkill(skill: Omit<Skill, 'id'>): Promise<string> {
    const { data, error } = await supabase
      .from('skills')
      .insert({
        category_id: skill.categoryId,
        name: skill.name,
        level: skill.level,
        description: skill.description,
        position: skill.position
      })
      .select('id')
      .single();

    if (error) throw new Error(error.message);
    return data.id;
  },

  async updateSkill(id: string, updates: Partial<Omit<Skill, 'id' | 'categoryId'>>): Promise<void> {
    const dbUpdates: any = {};
    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.level !== undefined) dbUpdates.level = updates.level;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.position !== undefined) dbUpdates.position = updates.position;

    const { error } = await supabase
      .from('skills')
      .update(dbUpdates)
      .eq('id', id);

    if (error) throw new Error(error.message);
  },

  async deleteSkill(id: string): Promise<void> {
    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }
};
