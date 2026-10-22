import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { useProfile } from '../../context/ProfileContext';
import type { Project, ProjectCategory } from '../../types';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { FolderGit2, Search, Filter, Sparkles, X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export const ProjectGrid: React.FC = () => {
  const { profile } = useProfile();
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    filteredProjects,
    projects
  } = useProjects();

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories: (ProjectCategory | 'Todas')[] = [
    'Todas',
    'Frontend',
    'Fullstack',
    'Backend',
    'Mobile',
    'IHC / UX'
  ];

  return (
    <section id="projetos" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div aria-hidden="true" className="absolute top-1/3 left-10 w-125 h-87.5 bg-sky-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-semibold">
            <FolderGit2 className="w-3.5 h-3.5 text-sky-400" />
            <span>Showcase de Engenharia</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {profile.projectsTitle || 'Projetos em Destaque'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {profile.projectsSubtitle || 'Aplicações completas, APIs RESTful e interfaces desenvolvidas com foco em performance, arquitetura escalável e experiência do usuário.'}
          </p>
        </div>

        {/* Search & Filter Controls Bar */}
        <div className="bento-card p-3 rounded-2xl mb-12 space-y-3 md:space-y-0 md:flex md:items-center md:justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por tecnologia, nome ou arquitetura (ex: FastAPI, Docker)..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-900/60 border border-white/5 text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all font-mono"
              aria-label="Campo de busca de projetos"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                aria-label="Limpar busca"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1 hidden sm:block" />
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-violet-400 ${
                    isSelected
                      ? 'bg-linear-to-r from-violet-600 via-indigo-600 to-sky-500 text-white shadow-md shadow-violet-600/30'
                      : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>

        {/* Status Counter */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-8 px-1 font-mono">
          <span>
            Exibindo <strong className="text-violet-300">{filteredProjects.length}</strong> de <strong className="text-white">{projects.length}</strong> projetos
          </span>
          {(selectedCategory !== 'Todas' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('Todas');
                setSearchQuery('');
              }}
              className="text-sky-400 hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Limpar filtros</span>
            </button>
          )}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={(p) => setSelectedProject(p)}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          /* Empty State */
          <div className="glass-panel p-12 rounded-2xl border border-slate-800 text-center space-y-4 my-8">
            <FolderGit2 className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">Nenhum projeto encontrado</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Não encontramos projetos correspondentes ao filtro "{searchQuery || selectedCategory}". Tente pesquisar com outros termos.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Todas');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
            >
              Restaurar todos os projetos
            </button>
          </div>
        )}

      </div>

      {/* Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
