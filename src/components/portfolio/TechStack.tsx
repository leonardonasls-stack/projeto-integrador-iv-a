import React from 'react';
import { Cpu, Layers, Eye, Smartphone, Zap, MousePointerClick, RefreshCw, AlertTriangle } from 'lucide-react';

export const TechStack: React.FC = () => {
  const techCategories = [
    {
      title: 'Frontend & UI',
      icon: <Layers className="w-5 h-5 text-indigo-400" />,
      skills: [
        { name: 'React 18', level: 'Avançado', desc: 'SPA modular & Context API' },
        { name: 'TypeScript', level: 'Intermediário+', desc: 'Tipagem estática segura' },
        { name: 'Tailwind CSS', level: 'Avançado', desc: 'Estilização ágil e responsiva' },
        { name: 'Vite', level: 'Avançado', desc: 'Build ultra-rápido & HMR' },
        { name: 'Framer Motion', level: 'Intermediário', desc: 'Animações fluidas de IHC' },
      ]
    },
    {
      title: 'Backend & Ecossistema Python',
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
      skills: [
        { name: 'Python 3.12', level: 'Avançado', desc: 'Linguagem principal backend & scripts' },
        { name: 'FastAPI', level: 'Avançado', desc: 'Framework RESTful assíncrono de alta performance' },
        { name: 'Pydantic v2', level: 'Avançado', desc: 'Validação de dados e schemas tipados' },
        { name: 'SQLAlchemy / Async', level: 'Intermediário+', desc: 'ORM e persistência assíncrona com PostgreSQL' },
        { name: 'Docker', level: 'Intermediário', desc: 'Containerização de aplicações e APIs' },
      ]
    }
  ];

  const ihcPrinciples = [
    {
      title: '1. Feedback Visual Imediato',
      desc: 'Notificações Toast em ações de CRUD, efeito de foco/hover em botões e estados de carregamento em formulários.',
      icon: <Zap className="w-4 h-4 text-amber-400" />
    },
    {
      title: '2. Visibilidade do Estado do Sistema',
      desc: 'Indicador visual da página ativa na Navbar, status da autenticação de administrador e contador de projetos filtrados.',
      icon: <Eye className="w-4 h-4 text-indigo-400" />
    },
    {
      title: '3. Prevenção de Erros',
      desc: 'Modais de confirmação para ações destrutivas (como exclusão de projetos) e validação em tempo real.',
      icon: <AlertTriangle className="w-4 h-4 text-rose-400" />
    },
    {
      title: '4. Affordance & Consistência',
      desc: 'Botões claramente identificáveis com cursores adequados, paleta de cores harmoniosa e padrões visuais unificados.',
      icon: <MousePointerClick className="w-4 h-4 text-emerald-400" />
    },
    {
      title: '5. Responsividade & Adaptabilidade',
      desc: 'Layout Mobile-First fluido que se reorganiza sem perda de conteúdo em telas pequenas, médias e grandes.',
      icon: <Smartphone className="w-4 h-4 text-cyan-400" />
    },
    {
      title: '6. Controle do Usuário',
      desc: 'Possibilidade de resetar dados locais a qualquer momento, fechar modais via ESC ou clique no overlay e busca em tempo real.',
      icon: <RefreshCw className="w-4 h-4 text-purple-400" />
    }
  ];

  return (
    <section id="habilidades" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>Ferramentas & IHC</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tecnologias & Princípios de Usabilidade
          </h2>
          <p className="text-slate-400 text-base">
            Stack tecnológica completa combinada com a aplicação prática dos conceitos fundamentais de Interface Humano-Computador.
          </p>
        </div>

        {/* Tech Stack Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {techCategories.map((cat, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl border border-slate-800 text-left space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  {cat.icon}
                </div>
                <h3 className="text-lg font-bold text-white">{cat.title}</h3>
              </div>

              <div className="space-y-3">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-white">{skill.name}</h4>
                      <p className="text-xs text-slate-400">{skill.desc}</p>
                    </div>
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-indigo-950 text-indigo-300 font-medium border border-indigo-800/60">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* IHC Principles Table / Grid */}
        <div className="glass-panel p-8 rounded-2xl border border-slate-800 text-left space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-2">
            <div>
              <h3 className="text-xl font-bold text-white">Aplicação dos Princípios de IHC no Projeto</h3>
              <p className="text-xs text-slate-400">Heurísticas aplicadas na arquitetura e navegação do portfólio</p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 font-medium border border-emerald-800 self-start sm:self-auto">
              Avaliação de IHC 2026.2
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ihcPrinciples.map((item, index) => (
              <div key={index} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 space-y-2 hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-slate-800 border border-slate-700">
                    {item.icon}
                  </div>
                  <h4 className="text-sm font-bold text-slate-100">{item.title}</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pl-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
