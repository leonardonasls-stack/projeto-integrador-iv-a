import React from 'react';
import { Code2, ArrowUp, ShieldCheck } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-left relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-slate-900 pb-8">
          
          {/* Brand Info (6 cols) */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-base">Leonardo Nascimento</span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Portfólio pessoal de <strong>Leonardo Nascimento</strong> — Desenvolvedor backend especializado em <strong>Python</strong> e <strong>FastAPI</strong>. Aberto a oportunidades e colaborações.
            </p>
          </div>

          {/* Nav & Action (6 cols) */}
          <div className="md:col-span-6 flex flex-col sm:flex-row items-start sm:items-center justify-between md:justify-end gap-4">
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <a
                href="https://github.com/leonardonasls-stack"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5 p-2 rounded-lg bg-slate-900 border border-slate-800"
              >
                <GithubIcon className="w-4 h-4 text-indigo-400" />
                <span>GitHub</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5 p-2 rounded-lg bg-slate-900 border border-slate-800"
              >
                <LinkedinIcon className="w-4 h-4 text-indigo-400" />
                <span>LinkedIn</span>
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors flex items-center gap-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-400"
              title="Voltar ao topo da página"
              aria-label="Voltar para o topo da página"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Topo</span>
            </button>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 Leonardo Nascimento. Desenvolvido com React, TypeScript e Tailwind CSS.</p>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Validação de Acessibilidade & Usabilidade (WCAG / Nielsen)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
