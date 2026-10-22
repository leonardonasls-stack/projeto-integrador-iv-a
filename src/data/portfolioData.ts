import type { Project, SkillCategory, ProfileData } from '../types';

export const portfolioProfile: ProfileData = {
  name: 'Leonardo Nascimento',
  role: 'Desenvolvedor Full Stack | Python & React',
  statusBadge: 'Desenvolvedor de Software | Python, FastAPI & React',
  heroTitlePrefix: 'Desenvolvedor de Software',
  heroTitleHighlight: 'Backend Python & Frontend Web',
  heroDescription:
    'Olá! Sou Leonardo Nascimento, desenvolvedor Full Stack e graduando em Análise e Desenvolvimento de Sistemas pelo CESMAC. Foco na criação de aplicações web modernas, eficientes e escaláveis, desenvolvendo APIs RESTful de alta performance com Python e FastAPI, além de interfaces responsivas e interativas com TypeScript e React. Priorizo arquitetura limpa, conteinerização com Docker e uma excelente experiência de usuário.',
  aboutBio:
    'Desenvolvedor com sólida vivência prática no ecossistema Python com FastAPI e desenvolvimento web com React e TypeScript. Graduando em Análise e Desenvolvimento de Sistemas pelo CESMAC, aplico conceitos de arquitetura limpa, validação estrita com Pydantic v2, bancos relacionais e integração full stack de ponta a ponta.',
  academicTitle: 'Análise e Desenvolvimento de Sistemas',
  academicInstitution: 'CESMAC - Centro Universitário CESMAC',
  academicPeriod: '4º Período (2024 - Presente)',
  techPillar1Title: 'Python & FastAPI',
  techPillar1Desc: 'Construção de APIs assíncronas de alta concorrência com Pydantic v2 e SQLAlchemy.',
  techPillar2Title: 'Interfaces & Usabilidade',
  techPillar2Desc: 'Integração com frontends React/TypeScript mantendo excelente experiência de usuário.',
  email: 'leonardonasls@gmail.com',
  githubUrl: 'https://github.com/leonardonasls-stack',
  linkedinUrl: 'https://www.linkedin.com/in/leonardolnascimento',
  projectsTitle: 'Projetos em Destaque',
  projectsSubtitle: 'Soluções desenvolvidas com foco em arquitetura escalável, APIs robustas e interfaces intuitivas.',
  skillsTitle: 'Tecnologias & Ferramentas',
  skillsSubtitle: 'Stack técnica focada em desenvolvimento ágil, performance e boas práticas de engenharia de software.',
  contactTitle: 'Entre em Contato',
  contactSubtitle: 'Vamos conversar sobre novas oportunidades, parcerias ou projetos desafiadores.',
  footerText: '© 2026 Leonardo Nascimento. Todos os direitos reservados.'
};

export const portfolioSkillCategories: SkillCategory[] = [
  {
    id: '719b2a1d-4fab-44e2-bf17-dffa1c324f6c',
    title: 'Frontend & UI',
    icon: 'Layers',
    color: 'indigo',
    position: 0,
    skills: [
      {
        id: '0fca2379-a8fc-4b18-a08a-641d98866ce7',
        categoryId: '719b2a1d-4fab-44e2-bf17-dffa1c324f6c',
        name: 'React 19',
        level: 'Avançado',
        description: 'SPA modular & Context API',
        position: 0
      },
      {
        id: '6aa2aee3-17f4-4a9e-88be-b8c4a59013ba',
        categoryId: '719b2a1d-4fab-44e2-bf17-dffa1c324f6c',
        name: 'TypeScript',
        level: 'Intermediário+',
        description: 'Tipagem estática segura',
        position: 1
      },
      {
        id: '0c6e3999-9ed1-4d2e-8460-aebedf10dac6',
        categoryId: '719b2a1d-4fab-44e2-bf17-dffa1c324f6c',
        name: 'Tailwind CSS',
        level: 'Avançado',
        description: 'Estilização ágil e responsiva',
        position: 2
      },
      {
        id: '887b8c36-0126-46ff-837a-46bdb20379ae',
        categoryId: '719b2a1d-4fab-44e2-bf17-dffa1c324f6c',
        name: 'Vite',
        level: 'Avançado',
        description: 'Build ultra-rápido & HMR',
        position: 3
      },
      {
        id: 'e35138cb-ae87-4d36-9796-6660b81ff4b2',
        categoryId: '719b2a1d-4fab-44e2-bf17-dffa1c324f6c',
        name: 'Framer Motion',
        level: 'Intermediário',
        description: 'Animações fluidas de IHC',
        position: 4
      }
    ]
  },
  {
    id: '607d3a6f-2fb4-4ed4-beca-b5a8d8d0b178',
    title: 'Backend & Ecossistema Python',
    icon: 'Cpu',
    color: 'emerald',
    position: 1,
    skills: [
      {
        id: 'ef07eb57-f6bc-4578-b3ba-508e65cf7285',
        categoryId: '607d3a6f-2fb4-4ed4-beca-b5a8d8d0b178',
        name: 'Python 3.12',
        level: 'Avançado',
        description: 'Linguagem principal backend & scripts',
        position: 0
      },
      {
        id: 'c33bd6df-ecb0-4031-8040-1e0c1a025667',
        categoryId: '607d3a6f-2fb4-4ed4-beca-b5a8d8d0b178',
        name: 'FastAPI',
        level: 'Avançado',
        description: 'Framework RESTful assíncrono de alta performance',
        position: 1
      },
      {
        id: '868ec870-7551-4c0c-b300-b668353b7332',
        categoryId: '607d3a6f-2fb4-4ed4-beca-b5a8d8d0b178',
        name: 'Pydantic v2',
        level: 'Avançado',
        description: 'Validação de dados e schemas tipados',
        position: 2
      },
      {
        id: '138c1253-fe6d-49d2-ba09-f3f62d094d66',
        categoryId: '607d3a6f-2fb4-4ed4-beca-b5a8d8d0b178',
        name: 'SQLAlchemy / Async',
        level: 'Intermediário+',
        description: 'ORM e persistência assíncrona com PostgreSQL',
        position: 3
      },
      {
        id: '085a4846-7f84-4ffc-b29e-f443a75f0a46',
        categoryId: '607d3a6f-2fb4-4ed4-beca-b5a8d8d0b178',
        name: 'Docker',
        level: 'Intermediário',
        description: 'Containerização de aplicações e APIs',
        position: 4
      }
    ]
  }
];

export const portfolioProjects: Project[] = [
  {
    id: 'd2b24c51-fd20-46da-9a39-0549be502820',
    title: 'billy-assistente-financeiro',
    description: 'Aplicativo de gestão financeira com React Native e Expo.',
    fullDescription: '',
    category: 'Mobile',
    techs: ['React', 'Tailwind CSS', 'TypeScript'],
    githubUrl: 'https://github.com/leonardonasls-stack/billy-assistente-financeiro',
    demoUrl: undefined,
    imageUrl: 'https://raw.githubusercontent.com/leonardonasls-stack/billy-assistente-financeiro/refs/heads/main/assets/logo.png',
    featured: false,
    visible: true,
    position: 0,
    createdAt: '2026'
  },
  {
    id: 'ce6cc9c1-1256-4ce0-9887-dff53f951ab5',
    title: 'Gerador-de-OS-e-recibo',
    description:
      'O Gerador de OS é uma aplicação web progressiva (PWA) voltada para prestadores de serviço, técnicos e pequenas empresas que precisam emitir Ordens de Serviço profissionais de forma rápida e organizada.',
    fullDescription: '',
    category: 'Fullstack',
    techs: ['React', 'Tailwind CSS', 'JavaScript'],
    githubUrl: 'https://github.com/leonardonasls-stack/Gerador-de-OS-e-recibo',
    demoUrl: 'https://gerador-de-os-e-recibo.vercel.app',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    featured: false,
    visible: true,
    position: 1,
    createdAt: '2026'
  },
  {
    id: '079dccac-c9cb-4e2e-9502-c497cbc918b7',
    title: 'Milagres Transparente',
    description: 'Site Oficial da agencia Milagres Transparente',
    fullDescription:
      'O Milagres Transparente é uma aplicação web (Single Page Application - SPA) desenvolvida para a agência de turismo homônima situada em São Miguel dos Milagres, Alagoas.\n\nA plataforma apresenta os roteiros turísticos, mídias reais de clientes e converte o tráfego de visitantes em atendimentos imediatos via WhatsApp, com mensagens personalizadas pré-preenchidas para cada passeio.',
    category: 'Frontend',
    techs: ['React', 'Tailwind CSS', 'vite JavaScript'],
    githubUrl: undefined,
    demoUrl: 'https://milagres-transparente.vercel.app/',
    imageUrl: 'https://raw.githubusercontent.com/leonardonasls-stack/milagres/main/src/assets/images/brand/logo_principal.webp',
    featured: false,
    visible: true,
    position: 2,
    createdAt: '2026'
  },
  {
    id: 'da38e0c9-639c-4c51-97ef-c232e3ace23b',
    title: 'Console-Telegram-Bot',
    description: 'Bot para gerenciar container no docker e Tunel ngrok',
    fullDescription: '',
    category: 'Backend',
    techs: ['React', 'Tailwind CSS', 'Python'],
    githubUrl: 'https://github.com/leonardonasls-stack/Console-Telegram-Bot',
    demoUrl: undefined,
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    featured: false,
    visible: true,
    position: 3,
    createdAt: '2026'
  },
  {
    id: '3562f4be-c35e-4047-9a84-655c308987a0',
    title: 'LLSystem v3 — Sistema de Ordens de Serviço & Gestão Multi-Tenant',
    description:
      ' Sistema completo de gerenciamento de assistência técnica e gestão multi-tenant com API REST assíncrona, frontend web, integração com WhatsApp, geração de PDFs, armazenamento de fotos e controle financeiro.',
    fullDescription:
      'O LLSystem v3 é uma plataforma moderna para gestão de Ordens de Serviço (OS) e empresas licenciadas (Multi-Tenant). O sistema gerencia todo o ciclo de vida operacional de uma assistência técnica — da abertura ao pagamento —, oferece suporte a múltiplos tenants isolados, notificações automáticas via WhatsApp, portal de acompanhamento para clientes e console global para o Superadmin.',
    category: 'Frontend',
    techs: ['FastAPI + Python 3.12 (async)', 'MySQL 8.0 via SQLAlchemy 2.0 + aiomysql', 'HTML5 / TailwindCSS / Vanilla JS servido via FastAPI/Jinja2'],
    githubUrl: undefined,
    demoUrl: undefined,
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    featured: false,
    visible: true,
    position: 5,
    createdAt: '2026'
  },
  {
    id: 'e7c609ec-049e-439a-bc71-f2cd1eacd99a',
    title: 'LLSystem PDV ',
    description:
      'Sistema moderno, ágil e autônomo de Ponto de Venda (PDV) e Frente de Caixa construído com Arquitetura SaaS Multi-Tenant Defense-in-Dept',
    fullDescription:
      'O sistema foi desenvolvido para funcionar como PWA. Com foco em pequenos negociantes como, depositos de bebias, mercearias ou lojas de produtos iniciantes.',
    category: 'Fullstack',
    techs: ['FastAPI (100% async) + SQLAlchemy 2.0 (asyncpg / psycopg2) + Alembic + JWT + Pydantic v'],
    githubUrl: undefined,
    demoUrl: undefined,
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    featured: false,
    visible: true,
    position: 6,
    createdAt: '2026'
  }
];
