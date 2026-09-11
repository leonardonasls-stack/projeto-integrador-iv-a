import React from 'react';
import { FolderKanban, FileText } from 'lucide-react';

interface AdminTabsNavProps {
  activeTab: 'projects' | 'profile';
  setActiveTab: (tab: 'projects' | 'profile') => void;
  projectsCount: number;
}

export const AdminTabsNav: React.FC<AdminTabsNavProps> = ({
  activeTab,
  setActiveTab,
  projectsCount
}) => {
  return (
    <div className="flex items-center gap-2 mb-6 border-b border-slate-800/80 pb-2">
      <button
        onClick={() => setActiveTab('projects')}
        className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
          activeTab === 'projects'
            ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
            : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
        }`}
      >
        <FolderKanban className="w-4 h-4" />
        <span>Gerenciar Projetos ({projectsCount})</span>
      </button>

      <button
        onClick={() => setActiveTab('profile')}
        className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
          activeTab === 'profile'
            ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
            : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
        }`}
      >
        <FileText className="w-4 h-4" />
        <span>Editar Textos da Home</span>
      </button>
    </div>
  );
};
