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
    <section id="projetos" className="py-24 border-t border-white/8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3 mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-emerald-400">
            // 03. projetos
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {profile.projectsTitle || 'Projetos em Destaque'}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            {profile.projectsSubtitle || 'Aplicações completas, APIs RESTful e interfaces desenvolvidas com foco em performance, arquitetura escalável e experiência do usuário.'}
          </p>
        </div>

        {/* Search & Filter Controls Bar */}
        <div className="pb-6 mb-10 border-b border-white/8 space-y-3 md:space-y-0 md:flex md:items-center md:justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por tecnologia, nome ou arquitetura..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-surface border border-white/10 text-gray-100 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 transition-all font-mono"
              aria-label="Campo de busca de projetos"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                aria-label="Limpar busca"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <Filter className="w-3.5 h-3.5 text-gray-400 shrink-0 ml-1 hidden sm:block" />
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                    isSelected
                      ? 'bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-500 text-white shadow-md shadow-emerald-600/30'
                      : 'bg-surface/60 text-gray-400 hover:text-gray-200 hover:bg-surface-elevated/60 border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>

        {/* Status Counter */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-8 px-1 font-mono">
          <span>
            Exibindo <strong className="text-emerald-300">{filteredProjects.length}</strong> de <strong className="text-white">{projects.length}</strong> projetos
          </span>
          {(selectedCategory !== 'Todas' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('Todas');
                setSearchQuery('');
              }}
              className="text-cyan-400 hover:underline flex items-center gap-1"
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
          <div className="glass-panel p-12 rounded-2xl border border-white/10 text-center space-y-4 my-8">
            <FolderGit2 className="w-12 h-12 text-gray-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">Nenhum projeto encontrado</h3>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Não encontramos projetos correspondentes ao filtro "{searchQuery || selectedCategory}". Tente pesquisar com outros termos.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Todas');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-semibold"
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
