import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { resolve } from 'path';

// Carrega as variáveis de ambiente do .env.local baseado na pasta raiz do projeto
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Para seed usamos a Service Role Key para ignorar RLS

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ VITE_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não encontrados no .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// --- Dados Iniciais ---
const defaultProfileData = {
  name: 'Leonardo Nascimento',
  role: 'Desenvolvedor Backend Python',
  status_badge: 'Python & FastAPI',
  hero_title_prefix: 'Desenvolvedor de Software',
  hero_title_highlight: 'Backend Python & Frontend Web',
  hero_description: 'Olá! Sou Leonardo Nascimento, estudante de Análise e Desenvolvimento de Sistemas no CESMAC. Crio APIs RESTful de alta performance e microsserviços com Python (FastAPI), além de desenvolver interfaces e aplicações web modernas e responsivas com TypeScript, JavaScript e React. Trabalho com modelagem de dados, Docker e integrações assíncronas, sempre com foco em arquitetura eficiente, código limpo e sistemas altamente escaláveis.',
  about_bio: 'Estudante de Análise e Desenvolvimento de Sistemas no CESMAC com foco prático no ecossistema Python com FastAPI. Desenvolvo APIs RESTful de alta performance, aplicando arquitetura limpa, validação estrita de dados com Pydantic v2 e integração eficiente com soluções web.',
  academic_title: 'Análise e Desenvolvimento de Sistemas',
  academic_institution: 'CESMAC - Centro Universitário CESMAC',
  academic_period: '4º Período de 6 (2024 - 2026)',
  tech_pillar1_title: 'Python & FastAPI',
  tech_pillar1_desc: 'Construção de APIs assíncronas de alta concorrência com Pydantic v2 e SQLAlchemy.',
  tech_pillar2_title: 'Interfaces & Usabilidade',
  tech_pillar2_desc: 'Integração com frontends React/TypeScript mantendo excelente experiência de usuário.',
  email: 'seu.email@exemplo.com',
  github_url: 'https://github.com/leonardonasls',
  linkedin_url: 'https://linkedin.com/in/leonardonasls',
  projects_title: 'Projetos em Destaque',
  projects_subtitle: 'Uma seleção dos meus melhores trabalhos.',
  skills_title: 'Tecnologias & Princípios de Usabilidade',
  skills_subtitle: 'Stack tecnológica completa combinada com boas práticas de UX.',
  contact_title: 'Entre em Contato',
  contact_subtitle: 'Vamos conversar sobre projetos, vagas ou apenas trocar ideias sobre tecnologia.',
  footer_text: '© 2026 Leonardo Nascimento. Todos os direitos reservados.'
};

const initialProjects = [
  {
    title: 'Portfólio Pessoal (Este Site)',
    description: 'Um portfólio completo com painel administrativo (mini-CMS) para gestão de conteúdo dinâmico, desenvolvido com React, TypeScript, Tailwind CSS e Framer Motion. Integração com banco de dados para edição de projetos, habilidades e perfil diretamente na interface sem necessidade de alterar o código.',
    category: 'Frontend',
    techs: ['React', 'TypeScript', 'Tailwind', 'Vite', 'Framer Motion'],
    github_url: 'https://github.com/seu-usuario/portfolio',
    demo_url: 'https://seu-portfolio.vercel.app',
    featured: true,
    visible: true,
    position: 0
  },
  {
    title: 'API de Gestão Financeira',
    description: 'Uma API RESTful robusta para controle de finanças pessoais. Permite cadastro de receitas, despesas, categorização, geração de relatórios mensais e autenticação JWT.',
    category: 'Backend',
    techs: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Docker'],
    github_url: 'https://github.com/seu-usuario/api-financas',
    demo_url: null,
    featured: true,
    visible: true,
    position: 1
  }
];

const techCategories = [
  {
    title: 'Frontend & UI',
    icon: 'Layers',
    color: 'indigo',
    position: 0,
    skills: [
      { name: 'React 19', level: 'Avançado', description: 'SPA modular & Context API', position: 0 },
      { name: 'TypeScript', level: 'Intermediário+', description: 'Tipagem estática segura', position: 1 },
      { name: 'Tailwind CSS', level: 'Avançado', description: 'Estilização ágil e responsiva', position: 2 },
      { name: 'Vite', level: 'Avançado', description: 'Build ultra-rápido & HMR', position: 3 },
      { name: 'Framer Motion', level: 'Intermediário', description: 'Animações fluidas de IHC', position: 4 }
    ]
  },
  {
    title: 'Backend & Ecossistema Python',
    icon: 'Cpu',
    color: 'emerald',
    position: 1,
    skills: [
      { name: 'Python 3.12', level: 'Avançado', description: 'Linguagem principal backend & scripts', position: 0 },
      { name: 'FastAPI', level: 'Avançado', description: 'Framework RESTful assíncrono de alta performance', position: 1 },
      { name: 'Pydantic v2', level: 'Avançado', description: 'Validação de dados e schemas tipados', position: 2 },
      { name: 'SQLAlchemy / Async', level: 'Intermediário+', description: 'ORM e persistência assíncrona com PostgreSQL', position: 3 },
      { name: 'Docker', level: 'Intermediário', description: 'Containerização de aplicações e APIs', position: 4 }
    ]
  }
];

async function seed() {
  console.log('🚀 Iniciando seed do banco de dados...');

  // 1. Inserir Site Settings
  const { error: settingsError } = await supabase
    .from('site_settings')
    .upsert({ id: 1, ...defaultProfileData });

  if (settingsError) console.error('Erro em site_settings:', settingsError);
  else console.log('✅ site_settings inserido/atualizado.');

  // 2. Inserir Projetos
  for (const project of initialProjects) {
    const { error } = await supabase.from('projects').insert(project);
    if (error) console.error(`Erro ao inserir projeto ${project.title}:`, error);
    else console.log(`✅ Projeto ${project.title} inserido.`);
  }

  // 3. Inserir Categorias e Skills
  for (const cat of techCategories) {
    const { data: catData, error: catError } = await supabase
      .from('skill_categories')
      .insert({ title: cat.title, icon: cat.icon, color: cat.color, position: cat.position })
      .select('id')
      .single();

    if (catError || !catData) {
      console.error(`Erro ao inserir categoria ${cat.title}:`, catError);
      continue;
    }

    console.log(`✅ Categoria ${cat.title} inserida.`);

    const skillsToInsert = cat.skills.map(skill => ({
      category_id: catData.id,
      name: skill.name,
      level: skill.level,
      description: skill.description,
      position: skill.position
    }));

    const { error: skillError } = await supabase.from('skills').insert(skillsToInsert);
    if (skillError) console.error(`Erro ao inserir skills da categoria ${cat.title}:`, skillError);
    else console.log(`✅ Skills da categoria ${cat.title} inseridas.`);
  }

  console.log('🎉 Seed concluído! (Verifique os erros acima, caso o RLS tenha bloqueado as inserções, talvez seja necessário usar a Service Role Key ou desativar o RLS temporariamente)');
}

seed();
