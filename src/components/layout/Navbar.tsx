import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useProjects } from '../../context/ProjectContext';
import { Code2, ShieldCheck, LogOut, Menu, X, PlusCircle, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenAdminDashboard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdminDashboard }) => {
  const { user, setIsLoginModalOpen, logout } = useAuth();
  const { resetProjects } = useProjects();
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
        scrolled ? 'glass-panel py-3 shadow-lg shadow-black/40 border-b border-slate-800/80' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('inicio');
          }}
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-lg p-1"
          aria-label="Ir para o início do portfólio"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Code2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-white tracking-tight leading-none group-hover:text-indigo-400 transition-colors">
              Leonardo Nascimento
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
              Python & FastAPI Dev
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 glass-card px-3 py-1.5 rounded-full border border-slate-800">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Controls (Admin / Mode) */}
        <div className="hidden lg:flex items-center gap-3">
          {user.isLoggedIn ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenAdminDashboard}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400"
                title="Abrir Dashboard de Gerenciamento"
              >
                <PlusCircle className="w-4 h-4 text-emerald-400" />
                <span>Dashboard Admin</span>
              </button>

              <button
                onClick={logout}
                className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800/80 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-400"
                title="Sair do modo Admin"
                aria-label="Logout do Modo Administrador"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400"
              title="Área Restrita — Acesso Administrativo"
            >
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Área Restrita</span>
            </button>
          )}

          <button
            onClick={resetProjects}
            className="p-1.5 text-slate-400 hover:text-indigo-400 rounded-lg hover:bg-slate-800/60 text-[11px] transition-colors flex items-center gap-1"
            title="Resetar dados locais de exemplo"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center gap-2">
          {!user.isLoggedIn && (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="p-2 rounded-lg bg-slate-800 text-indigo-400 border border-slate-700"
              aria-label="Abrir Login Admin"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-800/80 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-slate-800 px-4 pt-3 pb-5 space-y-2 mt-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeSection === link.id
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
          {user.isLoggedIn && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminDashboard();
              }}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Abrir Gerenciador de Projetos</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
