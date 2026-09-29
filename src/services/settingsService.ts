import { supabase } from './supabaseClient';
import type { ProfileData } from '../types/profile';
import { defaultProfileData } from '../types/profile';

// Função para converter do formato do DB (snake_case) para o front (camelCase)
const mapDbToProfile = (dbData: any): ProfileData => {
  return {
    name: dbData.name || defaultProfileData.name,
    role: dbData.role || defaultProfileData.role,
    statusBadge: dbData.status_badge || defaultProfileData.statusBadge,
    heroTitlePrefix: dbData.hero_title_prefix || defaultProfileData.heroTitlePrefix,
    heroTitleHighlight: dbData.hero_title_highlight || defaultProfileData.heroTitleHighlight,
    heroDescription: dbData.hero_description || defaultProfileData.heroDescription,
    aboutBio: dbData.about_bio || defaultProfileData.aboutBio,
    academicTitle: dbData.academic_title || defaultProfileData.academicTitle,
    academicInstitution: dbData.academic_institution || defaultProfileData.academicInstitution,
    academicPeriod: dbData.academic_period || defaultProfileData.academicPeriod,
    techPillar1Title: dbData.tech_pillar1_title || defaultProfileData.techPillar1Title,
    techPillar1Desc: dbData.tech_pillar1_desc || defaultProfileData.techPillar1Desc,
    techPillar2Title: dbData.tech_pillar2_title || defaultProfileData.techPillar2Title,
    techPillar2Desc: dbData.tech_pillar2_desc || defaultProfileData.techPillar2Desc,
    email: dbData.email || defaultProfileData.email,
    githubUrl: dbData.github_url || defaultProfileData.githubUrl,
    linkedinUrl: dbData.linkedin_url || defaultProfileData.linkedinUrl,
    projectsTitle: dbData.projects_title || defaultProfileData.projectsTitle,
    projectsSubtitle: dbData.projects_subtitle || defaultProfileData.projectsSubtitle,
    skillsTitle: dbData.skills_title || defaultProfileData.skillsTitle,
    skillsSubtitle: dbData.skills_subtitle || defaultProfileData.skillsSubtitle,
    contactTitle: dbData.contact_title || defaultProfileData.contactTitle,
    contactSubtitle: dbData.contact_subtitle || defaultProfileData.contactSubtitle,
    footerText: dbData.footer_text || defaultProfileData.footerText,
  };
};

// Converte do front (camelCase) para o banco (snake_case)
const mapProfileToDb = (profile: Partial<ProfileData>) => {
  return {
    name: profile.name,
    role: profile.role,
    status_badge: profile.statusBadge,
    hero_title_prefix: profile.heroTitlePrefix,
    hero_title_highlight: profile.heroTitleHighlight,
    hero_description: profile.heroDescription,
    about_bio: profile.aboutBio,
    academic_title: profile.academicTitle,
    academic_institution: profile.academicInstitution,
    academic_period: profile.academicPeriod,
    tech_pillar1_title: profile.techPillar1Title,
    tech_pillar1_desc: profile.techPillar1Desc,
    tech_pillar2_title: profile.techPillar2Title,
    tech_pillar2_desc: profile.techPillar2Desc,
    email: profile.email,
    github_url: profile.githubUrl,
    linkedin_url: profile.linkedinUrl,
    projects_title: profile.projectsTitle,
    projects_subtitle: profile.projectsSubtitle,
    skills_title: profile.skillsTitle,
    skills_subtitle: profile.skillsSubtitle,
    contact_title: profile.contactTitle,
    contact_subtitle: profile.contactSubtitle,
    footer_text: profile.footerText,
  };
};

export const SettingsService = {
  async getSettings(): Promise<ProfileData> {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 1)
      .single();

    if (error || !data) {
      console.error('Erro ao buscar configurações:', error);
      return defaultProfileData;
    }
    
    return mapDbToProfile(data);
  },

  async updateSettings(settings: Partial<ProfileData>): Promise<boolean> {
    const dbData = mapProfileToDb(settings);
    // Remove os campos undefined para não sobrescrever com null indesejado
    Object.keys(dbData).forEach(key => (dbData as any)[key] === undefined && delete (dbData as any)[key]);
    
    (dbData as any).updated_at = new Date().toISOString();

    const { error } = await supabase
      .from('site_settings')
      .update(dbData)
      .eq('id', 1);

    if (error) {
      console.error('Erro ao atualizar configurações:', error);
      return false;
    }
    return true;
  }
};
