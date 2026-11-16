import React from 'react';
import { useSkills } from '../../context/SkillContext';
import { useProfile } from '../../context/ProfileContext';
import * as LucideIcons from 'lucide-react';

export const TechStack: React.FC = () => {
  const { categories } = useSkills();
  const { profile } = useProfile();

  const renderIcon = (iconName: string, colorClass: string) => {
    const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName] || LucideIcons.Layers;
    return <IconComponent className={`w-4 h-4 ${colorClass}`} />;
  };

  return (
    <section id="habilidades" className="py-24 border-t border-white/8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3 mb-14">
          <p className="font-mono text-xs uppercase tracking-widest text-emerald-400">
            // 02. stack_tecnologica
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {profile.skillsTitle || 'Habilidades & Tecnologias'}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            {profile.skillsSubtitle || 'Ferramentas modernas para desenvolvimento de APIs robustas, microsserviços e interfaces reativas de alto desempenho.'}
          </p>
        </div>

        {/* Clean Architectural 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {categories.map((cat, idx) => {
            const sortedSkills = [...(cat.skills || [])].sort((a, b) => a.position - b.position);

            return (
              <div key={cat.id || idx} className="space-y-4">
                {/* Category Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    {renderIcon(cat.icon, 'text-emerald-400')}
                    <h3 className="text-base font-semibold text-white tracking-tight">
                      {cat.title}
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] text-gray-500">
                    [{String(sortedSkills.length).padStart(2, '0')}]
                  </span>
                </div>

                {/* Skills List */}
                <div className="divide-y divide-white/6">
                  {sortedSkills.map((skill, sIdx) => (
                    <div
                      key={skill.id || sIdx}
                      className="py-3 px-2 -mx-2 rounded-lg hover:bg-white/[0.025] transition-colors flex items-center justify-between gap-4 group"
                    >
                      <div className="min-w-0 space-y-0.5">
                        <h4 className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                          {skill.name}
                        </h4>
                        {skill.description && (
                          <p className="text-xs text-gray-500 line-clamp-1">
                            {skill.description}
                          </p>
                        )}
                      </div>
                      <span className="font-mono text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full shrink-0">
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
