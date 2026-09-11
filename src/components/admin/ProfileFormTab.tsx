import React from 'react';
import type { ProfileData } from '../../types/profile';
import { INSTITUTION_OPTIONS } from '../../types/profile';
import { FileText, GraduationCap, RotateCcw, Save } from 'lucide-react';

interface ProfileFormTabProps {
  profileForm: ProfileData;
  setProfileForm: React.Dispatch<React.SetStateAction<ProfileData>>;
  onSave: (e?: React.FormEvent) => void;
  onReset: () => void;
}

export const ProfileFormTab: React.FC<ProfileFormTabProps> = ({
  profileForm,
  setProfileForm,
  onSave,
  onReset
}) => {
  return (
    <form onSubmit={onSave} className="space-y-6">
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2 border-b border-slate-800 pb-2">
          <FileText className="w-4 h-4" />
          <span>Textos Principais do Hero &amp; Identificação</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Seu Nome *</label>
            <input
              type="text"
              value={profileForm.name}
              onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
              required
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Tag de Status (Badge Superior) *</label>
            <input
              type="text"
              value={profileForm.statusBadge}
              onChange={(e) => setProfileForm({ ...profileForm, statusBadge: e.target.value })}
              required
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Cargo / Subtítulo *</label>
          <input
            type="text"
            value={profileForm.role}
            onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
            required
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Título Hero (Primeira Parte) *</label>
            <input
              type="text"
              value={profileForm.heroTitlePrefix}
              onChange={(e) => setProfileForm({ ...profileForm, heroTitlePrefix: e.target.value })}
              required
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Título Hero (Destaque Colorido) *</label>
            <input
              type="text"
              value={profileForm.heroTitleHighlight}
              onChange={(e) => setProfileForm({ ...profileForm, heroTitleHighlight: e.target.value })}
              required
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Descrição Completa do Hero *</label>
          <textarea
            rows={3}
            value={profileForm.heroDescription}
            onChange={(e) => setProfileForm({ ...profileForm, heroDescription: e.target.value })}
            required
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400 resize-none"
          />
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2 border-b border-slate-800 pb-2">
          <FileText className="w-4 h-4" />
          <span>Textos da Seção "Sobre Mim"</span>
        </h4>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Biografia / Apresentação *</label>
          <textarea
            rows={4}
            value={profileForm.aboutBio}
            onChange={(e) => setProfileForm({ ...profileForm, aboutBio: e.target.value })}
            required
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Pilar 1 - Título *</label>
            <input
              type="text"
              value={profileForm.techPillar1Title}
              onChange={(e) => setProfileForm({ ...profileForm, techPillar1Title: e.target.value })}
              required
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Pilar 1 - Descrição *</label>
            <input
              type="text"
              value={profileForm.techPillar1Desc}
              onChange={(e) => setProfileForm({ ...profileForm, techPillar1Desc: e.target.value })}
              required
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Pilar 2 - Título *</label>
            <input
              type="text"
              value={profileForm.techPillar2Title}
              onChange={(e) => setProfileForm({ ...profileForm, techPillar2Title: e.target.value })}
              required
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Pilar 2 - Descrição *</label>
            <input
              type="text"
              value={profileForm.techPillar2Desc}
              onChange={(e) => setProfileForm({ ...profileForm, techPillar2Desc: e.target.value })}
              required
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h4 className="text-sm font-bold text-indigo-400 flex items-center gap-2 border-b border-slate-800 pb-2">
          <GraduationCap className="w-4 h-4" />
          <span>Formação Acadêmica &amp; Instituição / Faculdade</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Curso / Titulação *</label>
            <input
              type="text"
              value={profileForm.academicTitle}
              onChange={(e) => setProfileForm({ ...profileForm, academicTitle: e.target.value })}
              required
              placeholder="Ex: Análise e Desenvolvimento de Sistemas"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Instituição / Faculdade *</label>
            <select
              value={profileForm.academicInstitution || INSTITUTION_OPTIONS[0]}
              onChange={(e) => setProfileForm({ ...profileForm, academicInstitution: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400"
            >
              {INSTITUTION_OPTIONS.map((inst) => (
                <option key={inst} value={inst}>
                  {inst}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Período / Ano *</label>
            <input
              type="text"
              value={profileForm.academicPeriod}
              onChange={(e) => setProfileForm({ ...profileForm, academicPeriod: e.target.value })}
              required
              placeholder="Ex: 4º Período (2024 - 2026)"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800 pt-4">
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restaurar textos padrão originais</span>
        </button>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/30 flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Salvar Alterações de Texto</span>
        </button>
      </div>
    </form>
  );
};
