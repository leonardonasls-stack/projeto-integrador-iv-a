import React from 'react';
import { useSkills } from '../../context/SkillContext';
import { useProfile } from '../../context/ProfileContext';
import * as LucideIcons from 'lucide-react';

// Pre-defined static IHC Principles since they change rarely
const ihcPrinciples = [
  {
    title: '1. Feedback Visual Imediato',
    desc: 'Notificações Toast em ações de CRUD, efeito de foco/hover em botões e estados de carregamento em formulários.',
    icon: <LucideIcons.Zap className="w-4 h-4 text-amber-400" />
  },
  {
    title: '2. Visibilidade do Estado do Sistema',
    desc: 'Indicador visual da página ativa na Navbar, status da autenticação de administrador e contador de projetos filtrados.',
    icon: <LucideIcons.Eye className="w-4 h-4 text-indigo-400" />
  },
  {
    title: '3. Prevenção de Erros',
    desc: 'Modais de confirmação para ações destrutivas (como exclusão de projetos) e validação em tempo real.',
    icon: <LucideIcons.AlertTriangle className="w-4 h-4 text-rose-400" />
  },
  {
    title: '4. Affordance & Consistência',
    desc: 'Botões claramente identificáveis com cursores adequados, paleta de cores harmoniosa e padrões visuais unificados.',
    icon: <LucideIcons.MousePointerClick className="w-4 h-4 text-emerald-400" />
  },
  {
    title: '5. Responsividade & Adaptabilidade',
    desc: 'Layout Mobile-First fluido que se reorganiza sem perda de conteúdo em telas pequenas, médias e grandes.',
    icon: <LucideIcons.Smartphone className="w-4 h-4 text-cyan-400" />
  },
  {
    title: '6. Controle do Usuário',
    desc: 'Possibilidade de resetar dados locais a qualquer momento, fechar modais via ESC ou clique no overlay e busca em tempo real.',
    icon: <LucideIcons.RefreshCw className="w-4 h-4 text-purple-400" />
  }
];

export const TechStack: React.FC = () => {
  const { categories } = useSkills();
  const { profile } = useProfile();

  // Helper to safely render dynamic icons
  const renderIcon = (iconName: string, colorClass: string) => {
    const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Layers;
    return <IconComponent className={`w-5 h-5 ${colorClass}`} />;
  };

  return (
    <section id="habilidades" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <LucideIcons.Cpu className="w-3.5 h-3.5" />
            <span>Stack &amp; Dev</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {profile.skillsTitle || 'Tecnologias & Princípios de Usabilidade'}
          </h2>
          <p className="text-slate-400 text-base">
            {profile.skillsSubtitle || 'Stack tecnológica completa combinada com boas práticas de UX, acessibilidade e design de interfaces que tornam a experiência do usuário fluida e intuitiva.'}
          </p>
        </div>

        {/* Tech Stack Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {categories.map((cat, idx) => {
            // Map the color name from DB to a Tailwind text color
            const colorClass = `text-${cat.color}-400`;
            const sortedSkills = [...(cat.skills || [])].sort((a, b) => a.position - b.position);

            return (
              <div key={cat.id || idx} className="glass-panel p-6 rounded-2xl border border-slate-800 text-left space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                    {renderIcon(cat.icon, colorClass)}
                  </div>
                  <h3 className="text-lg font-bold text-white">{cat.title}</h3>
                </div>

                <div className="space-y-3">
                  {sortedSkills.map((skill, sIdx) => (
                    <div key={skill.id || sIdx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-white">{skill.name}</h4>
                        {skill.description && (
                          <p className="text-xs text-slate-400">{skill.description}</p>
                        )}
                      </div>
                      <span className="text-[11px] px-2.5 py-1 rounded-full bg-indigo-950 text-indigo-300 font-medium border border-indigo-800/60">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* IHC Principles Table / Grid */}
        <div className="glass-panel p-8 rounded-2xl border border-slate-800 text-left space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-2">
            <div>
              <h3 className="text-xl font-bold text-white">Boas Práticas de UX &amp; Usabilidade</h3>
              <p className="text-xs text-slate-400">Princípios aplicados na arquitetura e navegação do portfólio para entregar uma experiência de qualidade</p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 font-medium border border-emerald-800 self-start sm:self-auto">
              UX / Acessibilidade
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
