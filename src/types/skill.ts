export type SkillLevel = 'Iniciante' | 'Intermediário' | 'Intermediário+' | 'Avançado';

export interface Skill {
  id: string;
  categoryId: string;
  name: string;
  level: SkillLevel;
  description?: string;
  position: number;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  position: number;
  skills?: Skill[]; // This is useful when fetching categories with their related skills
}
