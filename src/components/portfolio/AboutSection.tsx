import React, { useState } from 'react';
import { User, GraduationCap, Award, Check, Code, Eye, ChevronDown, HelpCircle } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';
import { Logo } from '../ui/Logo';

export const AboutSection: React.FC = () => {
  const { profile } = useProfile();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section id="sobre" className="py-24 relative overflow-hidden">
      {/* Background Cyber Glow */}
      <div aria-hidden="true" className="absolute top-1/3 left-1/4 w-100 h-75 bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-semibold">
            <User className="w-3.5 h-3.5 text-sky-400" />
            <span>Perfil &amp; Trajetória Técnica</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Sobre Mim
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Construindo soluções digitais modernas, equilibrando precisão lógica de backend com excelência de experiência de usuário.
          </p>
        </div>

        {/* Bento Grid Layout - Grade 2x2 com alinhamento milimétrico por linha */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          
          {/* Row 1, Col 1: Profile & Bio Card Compacto */}
          <div className="bento-card p-6 md:p-8 rounded-3xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-linear-to-tr from-violet-950/90 via-slate-900 to-slate-900 border border-violet-500/30 flex items-center justify-center p-2.5 shadow-lg shadow-violet-500/20">
                    <Logo variant="symbol" className="w-9 h-9" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold font-mono text-white tracking-tight">[leo nascimento]</h3>
                    <p className="text-xs font-mono text-sky-400 font-semibold mt-0.5">desenvolvimento de sistemas</p>
                    <p className="text-[11px] text-slate-400 font-mono">Maceió, AL · Brasil</p>
                  </div>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed font-normal">
                {profile.aboutBio}
              </p>
            </div>

            {/* Checkmarks integrados no rodapé do próprio card para nivelar a base */}
            <div className="mt-6 pt-4 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Mobile First &amp; A11y</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Clean Code &amp; SOLID</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>APIs RESTful</span>
              </div>
            </div>
          </div>

          {/* Row 1, Col 2: Education Tile */}
          <div className="bento-card p-6 md:p-8 rounded-3xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-violet-400 font-bold text-sm mb-4">
                <GraduationCap className="w-5 h-5 text-sky-400" />
                <span>Formação Acadêmica</span>
              </div>

              <div className="space-y-3 font-mono text-xs text-slate-300">
                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1.5">
                  <div className="flex justify-between items-center text-white font-semibold">
                    <span className="text-xs">{profile.academicTitle || 'Análise e Desenvolvimento de Sistemas'}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-950 text-violet-300 border border-violet-800/40">
                      {profile.academicPeriod || '2024 - Presente'}
                    </span>
                  </div>
                  <p className="text-[11px] text-sky-300">
                    🏛️ {profile.academicInstitution || 'Centro Universitário CESMAC'}
                  </p>
                  <p className="text-[11px] text-slate-400 font-sans">
                    Formação com ênfase em Engenharia de Software, Estrutura de Dados, Bancos Relacionais e Arquitetura Web.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 space-y-1.5">
                  <div className="flex justify-between items-center text-white font-semibold">
                    <span className="text-xs">Bootcamp Full Stack &amp; Ecossistema Python</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/40">Concluído</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-sans">
                    APIs com FastAPI, Validação Pydantic v2, PostgreSQL, Docker e Frontend com React/TypeScript.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2, Col 1: Os dois cards de pilares técnicos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bento-card p-5 rounded-2xl flex flex-col justify-between">
              <div className="flex items-center gap-2 text-violet-400 font-semibold text-xs font-mono">
                <Code className="w-4 h-4" />
                <span>{profile.techPillar1Title}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mt-2">
                {profile.techPillar1Desc}
              </p>
            </div>

            <div className="bento-card p-5 rounded-2xl flex flex-col justify-between">
              <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs font-mono">
                <Eye className="w-4 h-4" />
                <span>{profile.techPillar2Title}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mt-2">
                {profile.techPillar2Desc}
              </p>
            </div>
          </div>

          {/* Row 2, Col 2: Goals & Principles */}
          <div className="bento-card p-5 rounded-2xl flex flex-col justify-between">
            <div className="flex items-center gap-2.5 text-sky-400 font-bold text-xs font-mono">
              <Award className="w-4 h-4 text-violet-400" />
              <span>Metas &amp; Princípios de Engenharia</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300 font-sans mt-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-1.5 shrink-0" />
                <span>Construir APIs assíncronas de alta concorrência e escalabilidade horizontal.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                <span>Entregar interfaces fluidas com microinterações, zero lag e acessibilidade.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Quick Hiring FAQ Accordion - Centralizado Abaixo do Grid */}
        <div className="max-w-3xl mx-auto mt-8">
          <div className="bento-card p-6 md:p-8 rounded-3xl space-y-4">
            <div className="flex items-center justify-center gap-2.5 text-violet-300 font-bold text-base text-center">
              <HelpCircle className="w-5 h-5 text-sky-400" />
              <span>Disponibilidade &amp; Contratação</span>
            </div>

            <div className="space-y-2.5 pt-1">
              {[
                {
                  q: 'Qual é sua disponibilidade atual?',
                  a: 'Disponível para início imediato em oportunidades de estágio, júnior ou projetos PJ freelance.'
                },
                {
                  q: 'Quais modalidades de trabalho aceita?',
                  a: 'Remoto (100%), híbrido ou presencial em Maceió e região.'
                },
                {
                  q: 'Qual o foco principal de atuação?',
                  a: 'Desenvolvimento Backend com Python e FastAPI, modelagem de dados PostgreSQL/SQLAlchemy e interfaces modernas com React e TypeScript.'
                }
              ].map((item, idx) => (
                <div key={idx} className="rounded-2xl bg-slate-900/60 border border-white/5 overflow-hidden transition-colors">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-4 flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-slate-200 hover:text-violet-300 transition-colors focus:outline-none"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-2 ${
                        openFaq === idx ? 'rotate-180 text-violet-400' : ''
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <div className="px-4 pb-4 text-xs sm:text-sm text-slate-400 font-sans leading-relaxed border-t border-white/5 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
