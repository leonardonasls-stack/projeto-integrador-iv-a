import React from 'react';
import type { Project } from '../../types';
import { ExternalLink, Info, Star, Calendar } from 'lucide-react';
import { GithubIcon } from '../ui/SocialIcons';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="bento-card rounded-3xl overflow-hidden flex flex-col justify-between text-left group relative border border-white/5 hover:border-violet-500/40"
    >
      <div>
        {/* Project Thumbnail Image with Category Badge */}
        <div className="relative h-52 w-full overflow-hidden bg-slate-950">
          <img
            src={project.imageUrl}
            alt={`Captura de tela do projeto ${project.title}`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80';
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#030712] via-[#030712]/40 to-transparent" />
          
          {/* Category Tag */}
          <div className="absolute top-3.5 left-3.5">
            <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-slate-950/80 backdrop-blur-md text-sky-300 border border-sky-500/30 shadow-md">
              {project.category}
            </span>
          </div>

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-3.5 right-3.5">
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 backdrop-blur-md text-amber-300 border border-amber-500/40">
                <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                <span>Destaque</span>
              </span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <Calendar className="w-3.5 h-3.5 text-violet-400" />
            <span>{project.createdAt}</span>
          </div>

          <h3 className="text-xl font-bold text-white group-hover:text-violet-300 transition-colors line-clamp-1">
            {project.title}
          </h3>

          <p className="text-slate-300 text-xs leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.techs.map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-medium bg-slate-900/80 text-violet-300 border border-white/5"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="px-6 pb-6 pt-4 mt-2 flex items-center justify-between border-t border-white/5">
        <button
          onClick={() => onSelect(project)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-400 rounded px-2 min-h-11"
          aria-label={`Ver detalhes do projeto ${project.title}`}
        >
          <Info className="w-4 h-4" />
          <span>Detalhes</span>
        </button>

        <div className="flex items-center gap-2">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-10 min-h-10 flex items-center justify-center rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-400"
              title="GitHub"
              aria-label={`Abrir repositório GitHub do projeto ${project.title}`}
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          ) : (
            <div 
              className="min-w-10 min-h-10 flex items-center justify-center rounded-xl bg-slate-900/40 text-slate-600 border border-white/5 cursor-not-allowed"
              title="Repositório Privado"
              aria-label="Repositório Privado"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
          )}

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-w-10 min-h-10 px-3 flex items-center justify-center rounded-xl bg-linear-to-r from-violet-600 to-sky-500 hover:from-violet-500 hover:to-sky-400 text-white shadow-md shadow-violet-600/30 transition-all focus:outline-none focus:ring-2 focus:ring-violet-400 text-xs font-semibold gap-1.5"
              title="Ver Demonstração Online"
              aria-label={`Abrir demonstração online do projeto ${project.title}`}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};
