import React from 'react';
import { ArrowUp, ShieldCheck } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import { useProfile } from '../../context/ProfileContext';

export const Footer: React.FC = () => {
  const { profile } = useProfile();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/5 py-12 text-left relative bg-[#02050c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-white/5 pb-8">
          
          {/* Brand Info (6 cols) */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center">
              <img src="/icons.svg" alt="Leonardo Nascimento" className="h-10 w-auto" />
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed font-sans">
              Engenharia de Software &amp; Desenvolvimento Full Stack com foco prático em <strong className="text-violet-300">Python (FastAPI)</strong> e <strong className="text-sky-300">React (TypeScript)</strong>.
            </p>
          </div>

          {/* Nav & Action (6 cols) */}
          <div className="md:col-span-6 flex flex-col sm:flex-row items-start sm:items-center justify-between md:justify-end gap-4">
            <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
              <a
                href={profile.githubUrl || "https://github.com/leonardonasls-stack"}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5 p-2 rounded-xl bg-slate-900/80 border border-white/10 text-slate-200"
              >
                <GithubIcon className="w-4 h-4 text-violet-400" />
                <span>GitHub</span>
              </a>
              <a
                href={profile.linkedinUrl || "https://linkedin.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5 p-2 rounded-xl bg-slate-900/80 border border-white/10 text-slate-200"
              >
                <LinkedinIcon className="w-4 h-4 text-sky-400" />
                <span>LinkedIn</span>
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2.5 px-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/10 transition-colors flex items-center gap-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-violet-400 font-mono"
              title="Voltar ao topo da página"
              aria-label="Voltar para o topo da página"
            >
              <ArrowUp className="w-3.5 h-3.5 text-violet-400" />
              <span>Topo</span>
            </button>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
          <p>{profile.footerText || '© 2026 Leonardo Nascimento · Construído com React 19, TypeScript, Tailwind CSS e Framer Motion.'}</p>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>Design System &amp; Arquitetura Bento Grid</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
