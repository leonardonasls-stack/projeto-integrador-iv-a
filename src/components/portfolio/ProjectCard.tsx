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
      className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between text-left group relative border border-slate-800"
    >
      <div>
        {/* Project Thumbnail Image with Category Badge */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-900">
          <img
            src={project.imageUrl}
            alt={`Captura de tela do projeto ${project.title}`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80';
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          
          {/* Category Tag */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-950/80 backdrop-blur-md text-indigo-300 border border-indigo-500/30 shadow-md">
              {project.category}
            </span>
          </div>

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-3 right-3">
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
            <Calendar className="w-3.5 h-3.5" />
            <span>{project.createdAt}</span>
          </div>

          <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
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
                className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-800/80 text-slate-300 border border-slate-700/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Buttons (IHC Affordance) */}
      <div className="p-6 pt-0 mt-2 flex items-center justify-between border-t border-slate-800/60 pt-4">
        <button
          onClick={() => onSelect(project)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded px-1"
          aria-label={`Ver detalhes do projeto ${project.title}`}
        >
          <Info className="w-4 h-4" />
          <span>Detalhes</span>
        </button>

        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
              title="Código no GitHub"
              aria-label={`Abrir repositório GitHub do projeto ${project.title}`}
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-600/30 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
              title="Ver Demonstração Online"
              aria-label={`Abrir demonstração online do projeto ${project.title}`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};
