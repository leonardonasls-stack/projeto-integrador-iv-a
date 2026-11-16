import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { WhatsappIcon } from '../ui/SocialIcons';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'sobre', 'habilidades', 'projetos', 'contato'];
      const scrollPosition = window.scrollY + 140;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'inicio', label: 'Início' },
    { id: 'sobre', label: 'Sobre' },
    { id: 'habilidades', label: 'Stack' },
    { id: 'projetos', label: 'Projetos' },
    { id: 'contato', label: 'Contato' },
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-40 px-4 pointer-events-none">
      <div className="max-w-fit mx-auto pointer-events-auto">
        <div className="bg-surface/85 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 shadow-2xl shadow-black/60 flex items-center gap-3 sm:gap-5">
          {/* Brand Logo */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('inicio');
            }}
            className="pl-2 pr-1 py-0.5 rounded-full hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 flex items-center"
            aria-label="Ir para o início do portfólio"
          >
            <img src="/icons.svg" alt="Leonardo Nascimento" className="h-9 sm:h-10 w-auto" />
          </a>

          {/* Desktop Floating Pill Navigation */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Navegação principal">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                    isActive ? 'text-canvas font-semibold' : 'text-gray-400 hover:text-white'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 bg-emerald-400 rounded-full z-0"
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/5582999974649?text=${encodeURIComponent('Olá Leonardo! Vim através do seu portfólio e gostaria de conversar.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center p-2.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 hover:bg-emerald-500/20 hover:border-emerald-400/50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            aria-label="Conversar no WhatsApp"
            title="WhatsApp"
          >
            <WhatsappIcon className="w-5 h-5 text-emerald-400" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-gray-300 hover:text-white rounded-full hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="mt-2 md:hidden bg-surface/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`w-full text-left px-4 py-2 text-xs font-medium rounded-xl transition-colors ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-300 font-semibold'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
};
