export interface ProfileData {
  name: string;
  role: string;
  statusBadge: string;
  heroTitlePrefix: string;
  heroTitleHighlight: string;
  heroDescription: string;
  aboutBio: string;
  academicTitle: string;
  academicPeriod: string;
  techPillar1Title: string;
  techPillar1Desc: string;
  techPillar2Title: string;
  techPillar2Desc: string;
}

export const defaultProfileData: ProfileData = {
  name: 'Leonardo Silveira',
  role: 'Estudante de ADS (4º/6º Período) & Dev Backend Python',
  statusBadge: '4º Período de ADS | Focado em Python & FastAPI',
  heroTitlePrefix: 'Desenvolvimento Web & Backend com',
  heroTitleHighlight: 'Python & FastAPI',
  heroDescription: 'Olá! Sou estudante de Análise e Desenvolvimento de Sistemas (4º período de 6), dedicado ao desenvolvimento de APIs RESTful de alta performance, microsserviços e sistemas assíncronos utilizando Python com FastAPI.',
  aboutBio: 'Estudante de Análise e Desenvolvimento de Sistemas (atualmente no 4º período de 6), com foco prático no ecossistema Python com FastAPI. Desenvolvo APIs RESTful de alta performance, aplicando arquitetura limpa, validação estrita de dados com Pydantic v2 e integração eficiente com soluções web.',
  academicTitle: 'Análise e Desenvolvimento de Sistemas',
  academicPeriod: '4º Período de 6 (2024 - 2026)',
  techPillar1Title: 'Python & FastAPI',
  techPillar1Desc: 'Construção de APIs assíncronas de alta concorrência com Pydantic v2 e SQLAlchemy.',
  techPillar2Title: 'Interfaces & Usabilidade',
  techPillar2Desc: 'Integração com frontends React/TypeScript mantendo excelente experiência de usuário.'
};
