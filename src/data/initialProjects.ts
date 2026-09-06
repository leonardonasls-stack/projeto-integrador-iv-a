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
    id: 'proj-1',
    title: 'API RESTful FastAPI & Microserviços Python',
    description: 'Backend assíncrono de alta performance desenvolvido em Python com FastAPI, Pydantic v2 e PostgreSQL.',
    fullDescription: 'API completa desenvolvida com Python e FastAPI focada em alta concorrência e baixa latência. Conta com rotas assíncronas (async/await), validação de schemas estrita com Pydantic v2, autenticação OAuth2 com JWT, ORM assíncrono com SQLAlchemy 2.0, migrations com Alembic e documentação interativa Swagger/ReDoc automática.',
    category: 'Backend',
    techs: ['Python 3.12', 'FastAPI', 'PostgreSQL', 'Pydantic v2', 'Docker', 'SQLAlchemy'],
    githubUrl: 'https://github.com/leodev/fastapi-backend-core',
    demoUrl: 'https://fastapi-backend-demo.up.railway.app/docs',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1000&q=80',
    featured: true,
    createdAt: '2026-08-20'
  },
  {
    id: 'proj-2',
    title: 'Plataforma DevConnect Fullstack',
    description: 'Rede profissional e hub de portfólios conectada a serviços backend Python e frontend em React.',
    fullDescription: 'Aplicação desenvolvida para conectar desenvolvedores e recrutadores. Interface moderna em React integrada a endpoints FastAPI com alto contraste visual e navegabilidade fluida.',
    category: 'Fullstack',
    techs: ['React', 'TypeScript', 'Python', 'FastAPI', 'Tailwind CSS', 'PostgreSQL'],
    githubUrl: 'https://github.com/leodev/devconnect-fastapi',
    demoUrl: 'https://devconnect-demo.vercel.app',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
    featured: true,
    createdAt: '2026-08-15'
  },
  {
    id: 'proj-3',
    title: 'TaskFlow — Gestão de Tarefas Kanban',
    description: 'Sistema Kanban interativo com drag-and-drop, estatísticas em tempo real e persistência local.',
    fullDescription: 'Dashboard produtivo de tarefas com suporte a drag-and-drop, categorização por prioridade, prazos e notificações visuais de alteração de estado.',
    category: 'Frontend',
    techs: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/leodev/taskflow-kanban',
    demoUrl: 'https://taskflow-kanban.vercel.app',
    imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1000&q=80',
    featured: true,
    createdAt: '2026-07-20'
  },
  {
    id: 'proj-4',
    title: 'EcoTracker Mobile',
    description: 'App mobile para monitoramento e pegada de carbono com gráficos dinâmicos e sugestões sustentáveis.',
    fullDescription: 'Aplicativo desenvolvido para ajudar usuários a mensurarem seu consumo diário de carbono com feedback de IHC positivo através de gamificação e recompensas virtuais.',
    category: 'Mobile',
    techs: ['React Native', 'Expo', 'TypeScript', 'Reanimated'],
    githubUrl: 'https://github.com/leodev/ecotracker-app',
    demoUrl: 'https://expo.dev/@leodev/ecotracker',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80',
    featured: true,
    createdAt: '2026-05-02'
  },
  {
    id: 'proj-5',
    title: 'Design System & Guia de IHC',
    description: 'Biblioteca de componentes acessíveis e escaláveis com documentação de IHC e guias de usabilidade.',
    fullDescription: 'Um Design System completo com botões, modais, formulários validados e cards prontos para reuso com padrões A11y (ARIA standards).',
    category: 'IHC / UX',
    techs: ['React', 'Storybook', 'Tailwind CSS', 'Radix UI'],
    githubUrl: 'https://github.com/leodev/ihc-design-system',
    demoUrl: 'https://ihc-design-system.chromatic.com',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80',
    featured: false,
    createdAt: '2026-04-18'
  }
];
