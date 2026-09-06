import React from 'react';
import { User, GraduationCap, Award, Check, Code, Eye } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';

export const AboutSection: React.FC = () => {
  const { profile } = useProfile();

  // Extract initials from name for avatar badge
  const initials = profile.name
    ? profile.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'LS';

  return (
    <section id="sobre" className="py-20 bg-slate-950/60 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <User className="w-3.5 h-3.5" />
            <span>Apresentação & Formação</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Sobre o Desenvolvedor
          </h2>
          <p className="text-slate-400 text-base">
            Desenvolvedor apaixonado por resolver problemas reais com código limpo, arquitetura sólida e experiências de usuário que realmente funcionam.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card Profile / Bio (7 cols) */}
          <div className="lg:col-span-7 glass-panel p-8 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-4">
              <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-500/20">
                  {initials}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{profile.name}</h3>
                  <p className="text-sm text-emerald-400 font-medium">{profile.role}</p>
                  <p className="text-xs text-slate-400">Python &amp; FastAPI Developer</p>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                {profile.aboutBio}
              </p>

              {/* Key Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-1">
                    <Code className="w-4 h-4" />
                    <span>{profile.techPillar1Title}</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {profile.techPillar1Desc}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm mb-1">
                    <Eye className="w-4 h-4" />
                    <span>{profile.techPillar2Title}</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {profile.techPillar2Desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Checklists */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Responsivo (Mobile First)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Navegação por Teclado</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Semântica HTML5</span>
              </div>
            </div>
          </div>

          {/* Academic & Timeline Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                <GraduationCap className="w-5 h-5" />
                <span>Formação &amp; Experiência</span>
              </div>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1">
                  <div className="flex justify-between items-center text-white font-semibold">
                    <span>Análise e Desenvolvimento de Sistemas</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300">2024 - 2026</span>
                  </div>
                  <p className="text-slate-400">Enfâse em Engenharia de Software, Web e IHC.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1">
                  <div className="flex justify-between items-center text-white font-semibold">
                    <span>Cursos Complementares & Bootcamp Fullstack</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300">Concluído</span>
                  </div>
                  <p className="text-slate-400">React, TypeScript, Node.js, Design Systems e Acessibilidade Web.</p>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Award className="w-5 h-5" />
                <span>Objetivos Profissionais</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5" />
                  <span>Construir soluções backend robustas e de alta disponibilidade.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5" />
                  <span>Contribuir com projetos open source e comunidades de Python.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5" />
                  <span>Crescer em ambientes ágeis com código limpo e boas práticas de engenharia.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
