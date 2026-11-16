import React from 'react';
import { GraduationCap, Check, Code, Eye, Award } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';

export const AboutSection: React.FC = () => {
  const { profile } = useProfile();

  return (
    <section id="sobre" className="py-24 border-t border-white/8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3 mb-14">
          <p className="font-mono text-xs uppercase tracking-widest text-emerald-400">
            // 01. sobre_mim
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Perfil &amp; Trajetória Técnica
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Construindo soluções digitais modernas, equilibrando precisão lógica de backend com excelência de experiência de usuário.
          </p>
        </div>

        {/* Editorial 2-Column Layout (No Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Bio, Pillars & Specialties */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-4 pb-6 border-b border-white/8">
              <img
                src="/favicon.svg"
                alt="Símbolo Leonardo Nascimento"
                className="w-11 h-11 shrink-0"
              />
              <div>
                <h3 className="text-xl font-bold font-mono text-white tracking-tight">
                  [Leo nascimento]
                </h3>
                <p className="text-xs font-mono text-cyan-400 mt-0.5">
                  desenvolvimento de sistemas &middot; Maceió, AL
                </p>
              </div>
            </div>

            <p className="text-gray-300 text-base leading-relaxed">
              {profile.aboutBio}
            </p>

            {/* Pillars */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-gray-300">
              <span className="inline-flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Mobile First &amp; A11y
              </span>
              <span className="inline-flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Clean Code &amp; SOLID
              </span>
              <span className="inline-flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                APIs RESTful
              </span>
            </div>

            {/* Specialties */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/8">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Code className="w-4 h-4 text-emerald-400" />
                  <span>Python &amp; FastAPI</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Construção de APIs assíncronas de alta concorrência com Pydantic v2 e SQLAlchemy.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Eye className="w-4 h-4 text-cyan-400" />
                  <span>Interfaces &amp; Usabilidade</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Integração com frontends React/TypeScript mantendo excelente experiência de usuário.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Academic Timeline & Principles */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-5">
                <GraduationCap className="w-4 h-4" />
                <span>Formação Acadêmica</span>
              </div>

              <div className="space-y-6 border-l border-white/10 pl-5">
                <div className="relative">
                  <span className="absolute -left-[25px] top-1.5 w-2 h-2 rounded-full bg-emerald-400" />
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-semibold text-white">
                      {profile.academicTitle || 'Análise e Desenvolvimento de Sistemas'}
                    </h4>
                    <span className="text-[11px] font-mono text-emerald-400 shrink-0">
                      {profile.academicPeriod || '2024 - Presente'}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-cyan-400 mt-0.5">
                    {profile.academicInstitution || 'Centro Universitário CESMAC'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                    Ênfase em Engenharia de Software, Estrutura de Dados, Bancos Relacionais e Arquitetura Web.
                  </p>
                </div>

                <div className="relative">
                  <span className="absolute -left-[25px] top-1.5 w-2 h-2 rounded-full bg-gray-600" />
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-semibold text-white">
                      Bootcamp Full Stack &amp; Python
                    </h4>
                    <span className="text-[11px] font-mono text-gray-400 shrink-0">
                      Concluído
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                    APIs com FastAPI, validação Pydantic v2, PostgreSQL, Docker e Frontend com React/TypeScript.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/8 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400">
                <Award className="w-4 h-4" />
                <span>Princípios de Engenharia</span>
              </div>
              <ul className="space-y-2 text-xs text-gray-400 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono">&gt;</span>
                  <span>APIs assíncronas de alta concorrência e escalabilidade horizontal.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-mono">&gt;</span>
                  <span>Interfaces fluidas com microinterações, zero lag e acessibilidade.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
