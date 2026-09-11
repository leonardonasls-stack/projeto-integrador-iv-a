import React from 'react';
import type { Project } from '../../types';
import { Edit2, Trash2 } from 'lucide-react';

interface ProjectTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDeleteRequest: (id: string) => void;
}

export const ProjectTable: React.FC<ProjectTableProps> = ({
  projects,
  onEdit,
  onDeleteRequest
}) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800">
      <table className="w-full text-left text-xs text-slate-300">
        <thead className="bg-slate-900 text-slate-400 font-semibold border-b border-slate-800">
          <tr>
            <th className="p-3">Projeto</th>
            <th className="p-3">Categoria</th>
            <th className="p-3">Tecnologias</th>
            <th className="p-3">Data</th>
            <th className="p-3 text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
          {projects.map((proj) => (
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
                <span className="truncate max-w-[180px] inline-block text-slate-400">
                  {proj.techs.join(', ')}
                </span>
              </td>
              <td className="p-3 font-mono text-slate-400">{proj.createdAt}</td>
              <td className="p-3 text-right space-x-1">
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
