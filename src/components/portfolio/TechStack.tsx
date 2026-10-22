import React from 'react';
import { useSkills } from '../../context/SkillContext';
import { useProfile } from '../../context/ProfileContext';
import * as LucideIcons from 'lucide-react';

export const TechStack: React.FC = () => {
  const { categories } = useSkills();
  const { profile } = useProfile();

  // Helper to safely render dynamic icons
  const renderIcon = (iconName: string, colorClass: string) => {
    const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Layers;
    return <IconComponent className={`w-5 h-5 ${colorClass}`} />;
  };

  return (
    <section id="habilidades" className="py-24 relative overflow-hidden">
      {/* Background Cyber Glow */}
      <div aria-hidden="true" className="absolute top-1/2 right-10 w-112.5 h-75 bg-violet-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-semibold">
            <LucideIcons.Cpu className="w-3.5 h-3.5 text-sky-400" />
            <span>Stack Tecnológica &amp; Ferramentas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {profile.skillsTitle || 'Habilidades & Tecnologias'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {profile.skillsSubtitle || 'Domínio de ferramentas modernas para desenvolvimento de APIs robustas, microsserviços e interfaces reativas de alto desempenho.'}
          </p>
        </div>

        {/* Bento Grid Skills */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
          {categories.map((cat, idx) => {
            const sortedSkills = [...(cat.skills || [])].sort((a, b) => a.position - b.position);

            return (
              <div 
                key={cat.id || idx} 
                className="bento-card p-6 md:p-8 rounded-3xl flex flex-col justify-between space-y-6 text-left group hover:border-violet-500/40 w-full"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                    <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-white/10 group-hover:border-violet-500/30 transition-colors">
                      {renderIcon(cat.icon, 'text-violet-400')}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-violet-200 transition-colors">
                        {cat.title}
                      </h3>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {sortedSkills.length} tecnologias dominadas
                      </span>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-2.5 pt-4">
                    {sortedSkills.map((skill, sIdx) => (
                      <div 
                        key={skill.id || sIdx} 
                        className="p-3 rounded-2xl bg-slate-900/40 hover:bg-slate-900/80 border border-white/5 hover:border-violet-500/20 flex items-center justify-between transition-colors"
                      >
                        <div className="space-y-0.5">
                          <h4 className="text-xs font-semibold text-slate-200">{skill.name}</h4>
                          {skill.description && (
                            <p className="text-[11px] text-slate-400 line-clamp-1">{skill.description}</p>
                          )}
                        </div>
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-violet-950/80 text-violet-300 font-medium border border-violet-800/40 shrink-0 ml-2">
                          {skill.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Sub-status */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Ecossistema Ativo</span>
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
