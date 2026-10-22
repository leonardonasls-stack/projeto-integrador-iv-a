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
    <section id="habilidades" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <LucideIcons.Cpu className="w-3.5 h-3.5" />
            <span>Stack &amp; Tecnologias</span>
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
                      <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 font-medium border border-emerald-800/60">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
