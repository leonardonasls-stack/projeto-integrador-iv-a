import type { Project } from '../types';

export const initialProjects: Project[] = [
  {
    id: 'proj-docker-bot',
    title: 'Console Telegram Bot — Gestão de Containers Docker',
    description: 'Bot do Telegram desenvolvido em Python para gerenciamento, monitoramento e controle remoto de containers Docker.',
    fullDescription: 'Ferramenta de automação via Telegram Bot construída em Python para administração remota de containers Docker. Permite listar containers ativos e inativos, verificar status e consumo de recursos (CPU/Memória), visualizar logs em tempo real e executar comandos de start/stop/restart com segurança.',
    category: 'Backend',
    techs: ['Python 3.12', 'Docker API', 'Telegram Bot API', 'Asyncio', 'Linux'],
    githubUrl: 'https://github.com/leonardonasls-stack/Console-Telegram-Bot',
    imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1000&q=80',
    featured: true,
    createdAt: '2026-09-01'
  },
  {
    id: 'proj-os-generator',
    title: 'Gerador de OS — Sistema de Ordens de Serviço',
    description: 'Sistema web completo e PWA para geração e gestão de Ordens de Serviço (OS), orçamentos e recibos com suporte a impressão A4 e Supabase.',
    fullDescription: 'Aplicação web progressiva (PWA) voltada para prestadores de serviço, técnicos e pequenas empresas que precisam emitir Ordens de Serviço profissionais de forma rápida e organizada. Permite cadastrar empresa, clientes e produtos/serviços, criar e gerenciar OS com numeração automática sequencial (ex: 0001/2026), visualizar a OS em formato A4 pronto para impressão (window.print()), e acompanhar métricas financeiras (KPIs em tempo real) através de um painel de controle. Desenvolvido com React 19, Vite 8, Supabase (PostgreSQL + Auth + Row Level Security) e Tailwind CSS 4, com suporte a cache offline (Workbox).',
    category: 'Fullstack',
    techs: ['React 19', 'Vite 8', 'Supabase', 'Tailwind CSS 4', 'TypeScript', 'PWA'],
    githubUrl: 'https://github.com/leonardonasls-stack/Gerador-de-OS-e-recibo',
    demoUrl: 'https://gerador-de-os-e-recibo.vercel.app/',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
    featured: true,
    createdAt: '2026-09-09'
  },
  {
    id: 'proj-billy-finance',
    title: 'Billy — Assistente Financeiro',
    description: 'Aplicativo mobile de gestão financeira pessoal com React Native, Expo, Firebase, biometria e análise 50-30-20.',
    fullDescription: 'Aplicativo móvel de gestão financeira pessoal construído com React Native, Expo e Firebase. Permite registrar, visualizar e analisar transações financeiras com suporte offline-first, autenticação biométrica (FaceID/Digital), controle de saldo em tempo real, calendário interativo de transações, resumo mensal por categoria e recomendações inteligentes baseadas na metodologia 50-30-20.',
    category: 'Mobile',
    techs: ['React Native', 'Expo', 'Firebase', 'TypeScript', 'AsyncStorage', 'Biometria'],
    githubUrl: 'https://github.com/leonardonasls-stack/billy-assistente-financeiro',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1000&q=80',
    featured: true,
    createdAt: '2026-09-09'
  }
];
