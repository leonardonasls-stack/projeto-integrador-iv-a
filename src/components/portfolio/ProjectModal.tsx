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
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md"
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
          className="glass-panel w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 shadow-2xl text-left relative my-8"
        >
          {/* Modal Header Media */}
          <div className="relative h-64 w-full bg-slate-900">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white border border-slate-700 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
              aria-label="Fechar detalhes do projeto"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-md">
                {project.category}
              </span>
              <div className="flex items-center gap-2 text-xs text-slate-300 font-mono bg-slate-950/70 px-3 py-1 rounded-full border border-slate-800">
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
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                {project.fullDescription || project.description}
              </p>
            </div>

            {/* Technologies */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-indigo-400" />
                <span>Tecnologias & Ferramentas</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techs.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-900 text-indigo-300 border border-slate-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* UX/Usabilidade applied to this project */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <Shield className="w-4 h-4" />
                <span>Boas Práticas de UX & Usabilidade</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Este projeto atende aos requisitos de responsividade, hierarquia visual de tipografia, leitores de tela e estados de feedback imediato ao usuário.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>Ver Repositório GitHub</span>
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-indigo-600/30 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Acessar Demo On-line</span>
                  </a>
                )}
              </div>

              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white text-xs font-medium transition-colors"
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
