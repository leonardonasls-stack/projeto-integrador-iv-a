import React from 'react';
import { ArrowUp, ShieldCheck } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import { openCookieSettings } from '../ui/CookieConsent';
import { useProfile } from '../../context/ProfileContext';

export const Footer: React.FC = () => {
  const { profile } = useProfile();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'inicio', label: 'Início' },
    { id: 'sobre', label: 'Sobre' },
    { id: 'habilidades', label: 'Stack' },
    { id: 'projetos', label: 'Projetos' },
    { id: 'contato', label: 'Contato' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/8 py-12 text-left bg-canvas">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Row: Brand + Quick Nav + Social Icons */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/8">
          <div className="space-y-2.5 max-w-sm">
            <img src="/icons.svg" alt="Leonardo Nascimento" className="h-9 w-auto" />
            <p className="text-xs text-gray-400 leading-relaxed">
              Engenharia de Software &amp; Desenvolvimento Full Stack com foco prático em{' '}
              <strong className="text-emerald-400 font-medium">Python (FastAPI)</strong> e{' '}
              <strong className="text-cyan-400 font-medium">React (TypeScript)</strong>.
            </p>
          </div>

          {/* Quick Navigation */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-gray-400" aria-label="Links do rodapé">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollTo(link.id)}
                className="hover:text-emerald-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Minimal Social Links */}
          <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
            <a
              href={profile.githubUrl || 'https://github.com/leonardonasls-stack'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href={profile.linkedinUrl || 'https://linkedin.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors inline-flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright + Cookies + Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-gray-500">
          <p>
            {profile.footerText || '© 2026 Leonardo Nascimento · Construído com React 19, TypeScript e Tailwind CSS.'}
          </p>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={openCookieSettings}
              className="inline-flex items-center gap-1.5 text-gray-400 hover:text-emerald-300 underline underline-offset-4 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
              title="Gerenciar preferências de cookies"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Preferências de Cookies</span>
            </button>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface hover:bg-surface-elevated text-gray-300 hover:text-white border border-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              title="Voltar ao topo da página"
              aria-label="Voltar para o topo da página"
            >
              <ArrowUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Topo</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
