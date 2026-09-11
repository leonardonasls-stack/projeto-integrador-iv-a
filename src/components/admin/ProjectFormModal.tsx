import React from 'react';
import type { ProjectCategory } from '../../types';

export interface ProjectFormData {
  title: string;
  description: string;
  fullDescription: string;
  category: ProjectCategory;
  techsInput: string;
  githubUrl: string;
  demoUrl: string;
  imageUrl: string;
  featured: boolean;
}

interface ProjectFormModalProps {
  isEditing: boolean;
  formData: ProjectFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProjectFormData>>;
  onSave: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  isEditing,
  formData,
  setFormData,
  onSave,
  onCancel
}) => {
  return (
    <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 mb-6 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h4 className="text-base font-bold text-white">
          {isEditing ? 'Editar Projeto' : 'Cadastrar Novo Projeto'}
        </h4>
        <button
          type="button"
          onClick={onCancel}
          className="text-xs text-slate-400 hover:text-white"
        >
          Cancelar
        </button>
      </div>

      <form onSubmit={onSave} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Título do Projeto *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ex: E-commerce de Eletrônicos"
              required
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Categoria *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as ProjectCategory })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400"
            >
              <option value="Frontend">Frontend</option>
              <option value="Fullstack">Fullstack</option>
              <option value="Backend">Backend</option>
              <option value="Mobile">Mobile</option>
              <option value="IHC / UX">IHC / UX</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Descrição Curta *</label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Breve resumo para o card do projeto..."
            required
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Descrição Detalhada (Modal)</label>
          <textarea
            rows={2}
            value={formData.fullDescription}
            onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
            placeholder="Detalhes sobre usabilidade, IHC, arquitetura ou banco de dados..."
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Tecnologias (separadas por vírgula) *</label>
            <input
              type="text"
              value={formData.techsInput}
              onChange={(e) => setFormData({ ...formData, techsInput: e.target.value })}
              placeholder="React, TypeScript, Tailwind"
              required
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">URL da Imagem / Thumbnail</label>
            <input
              type="text"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Link Repositório GitHub</label>
            <input
              type="url"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              placeholder="https://github.com/..."
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Link Demo Online (Opcional)</label>
            <input
              type="url"
              value={formData.demoUrl}
              onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
              placeholder="https://demo.vercel.app"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <input
            id="proj-featured"
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-400 bg-slate-950 border-slate-800"
          />
          <label htmlFor="proj-featured" className="text-xs font-medium text-slate-300">
            Marcar como Projeto em Destaque
          </label>
        </div>

        <div className="pt-2 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
          >
            {isEditing ? 'Salvar Alterações' : 'Cadastrar Projeto'}
          </button>
        </div>
      </form>
    </div>
  );
};
