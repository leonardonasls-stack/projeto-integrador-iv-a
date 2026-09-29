export interface ProfileData {
  name: string;
  role: string;
  statusBadge: string;
  heroTitlePrefix: string;
  heroTitleHighlight: string;
  heroDescription: string;
  aboutBio: string;
  academicTitle: string;
  academicInstitution: string;
  academicPeriod: string;
  techPillar1Title: string;
  techPillar1Desc: string;
  techPillar2Title: string;
  techPillar2Desc: string;
  
  // Novos campos adicionados (Fase 2 - CMS Supabase)
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  projectsTitle: string;
  projectsSubtitle: string;
  skillsTitle: string;
  skillsSubtitle: string;
  contactTitle: string;
  contactSubtitle: string;
  footerText: string;
}

export const INSTITUTION_OPTIONS = [
  'CESMAC - Centro Universitário CESMAC',
  'UFAL - Universidade Federal de Alagoas',
  'IFAL - Instituto Federal de Alagoas',
  'UNIT - Centro Universitário Tiradentes',
  'UNIMA / Afya - Centro Universitário Unima',
  'Outra Instituição'
];

export const defaultProfileData: ProfileData = {
  name: 'Leonardo Nascimento',
  role: 'Estudante de ADS no CESMAC & Desenvolvedor Backend Python',
  statusBadge: 'Estudante de ADS no CESMAC | Python & FastAPI',
  heroTitlePrefix: 'Desenvolvedor de Software',
  heroTitleHighlight: 'Backend Python & Frontend Web',
  heroDescription: 'Olá! Sou Leonardo Nascimento, estudante de Análise e Desenvolvimento de Sistemas no CESMAC. Crio APIs RESTful de alta performance e microsserviços com Python (FastAPI), além de desenvolver interfaces e aplicações web modernas e responsivas com TypeScript, JavaScript e React. Trabalho com modelagem de dados, Docker e integrações assíncronas, sempre com foco em arquitetura eficiente, código limpo e sistemas altamente escaláveis.',
  aboutBio: 'Estudante de Análise e Desenvolvimento de Sistemas no CESMAC com foco prático no ecossistema Python com FastAPI. Desenvolvo APIs RESTful de alta performance, aplicando arquitetura limpa, validação estrita de dados com Pydantic v2 e integração eficiente com soluções web.',
  academicTitle: 'Análise e Desenvolvimento de Sistemas',
  academicInstitution: 'CESMAC - Centro Universitário CESMAC',
  academicPeriod: '4º Período de 6 (2024 - 2026)',
  techPillar1Title: 'Python & FastAPI',
  techPillar1Desc: 'Construção de APIs assíncronas de alta concorrência com Pydantic v2 e SQLAlchemy.',
  techPillar2Title: 'Interfaces & Usabilidade',
  techPillar2Desc: 'Integração com frontends React/TypeScript mantendo excelente experiência de usuário.',
  
  email: 'seu.email@exemplo.com',
  githubUrl: 'https://github.com/leonardonasls',
  linkedinUrl: 'https://linkedin.com/in/leonardonasls',
  projectsTitle: 'Projetos em Destaque',
  projectsSubtitle: 'Uma seleção dos meus melhores trabalhos.',
  skillsTitle: 'Tecnologias & Princípios de Usabilidade',
  skillsSubtitle: 'Stack tecnológica completa combinada com boas práticas de UX.',
  contactTitle: 'Entre em Contato',
  contactSubtitle: 'Vamos conversar sobre projetos, vagas ou apenas trocar ideias sobre tecnologia.',
  footerText: '© 2026 Leonardo Nascimento. Todos os direitos reservados.'
};
