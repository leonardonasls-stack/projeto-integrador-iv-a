import React, { useEffect } from 'react';
import type { Project } from '../../types';
import { X, ExternalLink, Calendar, Tag, Shield } from 'lucide-react';
import { GithubIcon } from '../ui/SocialIcons';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence mode="wait">
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-canvas/80 backdrop-blur-md"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-panel w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 shadow-2xl text-left relative my-8"
        >
          {/* Modal Header Media */}
          <div className="relative h-64 w-full bg-surface">
            <img
              src={project.imageUrl}
              alt={project.title}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80';
              }}
              className={`w-full h-full ${project.imageUrl.includes('logo') ? 'object-contain p-6' : 'object-cover'}`}
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-canvas/80 text-gray-300 hover:text-white border border-white/15 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-teal-400 transition-colors"
              aria-label="Fechar detalhes do projeto"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-600 text-white shadow-md">
                {project.category}
              </span>
              <div className="flex items-center gap-2 text-xs text-gray-300 font-mono bg-canvas/70 px-3 py-1 rounded-full border border-white/10">
                <Calendar className="w-3.5 h-3.5" />
                <span>Criado em: {project.createdAt}</span>
              </div>
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h3 id="modal-project-title" className="text-2xl sm:text-3xl font-extrabold text-white">
                {project.title}
              </h3>
              <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                {project.fullDescription || project.description}
              </p>
            </div>

            {/* Technologies */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-teal-400" />
                <span>Tecnologias & Ferramentas</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techs.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-surface text-teal-300 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* UX/Usabilidade applied to this project */}
            <div className="p-4 rounded-xl bg-surface/60 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <Shield className="w-4 h-4" />
                <span>Boas Práticas de UX & Usabilidade</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Este projeto atende aos requisitos de responsividade, hierarquia visual de tipografia, leitores de tela e estados de feedback imediato ao usuário.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-surface hover:bg-surface-elevated text-gray-200 border border-white/15 text-xs font-semibold flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>Ver Repositório GitHub</span>
                  </a>
                ) : (
                  <div className="px-4 py-2.5 rounded-xl bg-surface/50 text-gray-500 border border-white/10/50 text-xs font-semibold flex items-center gap-2 cursor-not-allowed">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    <span>Repositório Privado</span>
                  </div>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-emerald-600/30 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Acessar Demo On-line</span>
                  </a>
                )}
              </div>

              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-gray-400 hover:text-white text-xs font-medium transition-colors"
              >
                Fechar janela
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
