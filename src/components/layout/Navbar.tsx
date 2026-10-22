import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Logo } from '../ui/Logo';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['inicio', 'sobre', 'habilidades', 'projetos', 'contato'];
      const scrollPosition = window.scrollY + 120;

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'inicio', label: 'Início' },
    { id: 'sobre', label: 'Sobre Mim' },
    { id: 'habilidades', label: 'Habilidades' },
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
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel px-4 py-2.5 rounded-2xl border border-white/10 shadow-2xl shadow-black/80 flex items-center justify-between backdrop-blur-xl">
          {/* Brand Logo */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('inicio');
            }}
            className="flex items-center group focus:outline-none focus:ring-2 focus:ring-violet-400 rounded-xl p-1 transition-transform hover:opacity-95"
            aria-label="Ir para o início do portfólio"
          >
            <Logo />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-white/5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-400 ${
                    isActive
                      ? 'bg-linear-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-600/30 font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => scrollTo('contato')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-linear-to-r from-violet-600/20 to-sky-500/20 text-sky-200 border border-violet-500/30 hover:border-violet-400 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-violet-400"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Disponível para Projetos</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1 text-sky-400" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-900 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-400"
              aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="max-w-7xl mx-auto px-4 mt-2 md:hidden">
          <div className="glass-panel border border-white/10 rounded-2xl p-3 space-y-1.5 shadow-2xl">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-linear-to-r from-violet-600 to-indigo-600 text-white font-semibold'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contato')}
              className="w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold bg-violet-600/20 text-violet-200 border border-violet-500/30 flex items-center justify-between"
            >
              <span>Falar Comigo</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
