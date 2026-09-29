import React from 'react';
import type { Project } from '../../types';
import { Edit2, Trash2, ArrowUp, ArrowDown, EyeOff } from 'lucide-react';

interface ProjectTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDeleteRequest: (id: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
}

export const ProjectTable: React.FC<ProjectTableProps> = ({
  projects,
  onEdit,
  onDeleteRequest,
  onMoveUp,
  onMoveDown
}) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800">
      <table className="w-full text-left text-xs text-slate-300">
        <thead className="bg-slate-900 text-slate-400 font-semibold border-b border-slate-800">
          <tr>
            <th className="p-3">Projeto</th>
            <th className="p-3">Categoria</th>
            <th className="p-3">Visibilidade</th>
            <th className="p-3">Tecnologias</th>
            <th className="p-3 text-right">Ordem / Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
          {projects.map((proj, index) => (
            <tr key={proj.id} className="hover:bg-slate-900/60 transition-colors">
              <td className="p-3 font-semibold text-white">
                <div className="flex items-center gap-2">
                  <img
                    src={proj.imageUrl}
                    alt=""
                    className="w-8 h-8 rounded object-cover border border-slate-800"
                  />
                  <span>{proj.title}</span>
                </div>
              </td>
              <td className="p-3">
                <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-900">
                  {proj.category}
                </span>
              </td>
              <td className="p-3">
                {proj.visible === false ? (
                  <span className="flex items-center gap-1 text-slate-500">
                    <EyeOff className="w-3.5 h-3.5" />
                    Oculto
                  </span>
                ) : (
                  <span className="text-emerald-400">Visível</span>
                )}
              </td>
              <td className="p-3">
                <span className="truncate max-w-[150px] inline-block text-slate-400">
                  {proj.techs.join(', ')}
                </span>
              </td>
              <td className="p-3 text-right space-x-1 whitespace-nowrap">
                <button
                  onClick={() => onMoveUp(index)}
                  disabled={index === 0}
                  className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-emerald-400 disabled:opacity-30 border border-slate-800"
                  title="Mover para cima"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onMoveDown(index)}
                  disabled={index === projects.length - 1}
                  className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-emerald-400 disabled:opacity-30 border border-slate-800 mr-2"
                  title="Mover para baixo"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onEdit(proj)}
                  className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-indigo-400 border border-slate-800"
                  title="Editar Projeto"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDeleteRequest(proj.id)}
                  className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-rose-400 border border-slate-800"
                  title="Excluir Projeto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
