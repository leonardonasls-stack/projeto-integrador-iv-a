import React, { useState, useEffect } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../context/ProfileContext';
import type { Project, ProjectCategory } from '../../types';
import { defaultProfileData, INSTITUTION_OPTIONS } from '../../types/profile';
import { X, Plus, Edit2, Trash2, ShieldCheck, AlertTriangle, RotateCcw, FolderKanban, FileText, Save, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  const { projects, addProject, updateProject, deleteProject, resetProjects } = useProjects();
  const { user } = useAuth();
  const { profile, updateProfile, resetProfile } = useProfile();

  const [activeTab, setActiveTab] = useState<'projects' | 'profile'>('projects');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Project Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fullDescription: '',
    category: 'Frontend' as ProjectCategory,
    techsInput: '',
    githubUrl: '',
    demoUrl: '',
    imageUrl: '',
    featured: false
  });

  // Profile Form State
  const [profileForm, setProfileForm] = useState(profile);

  useEffect(() => {
    if (isOpen) {
      setProfileForm(profile);
    }
  }, [isOpen, profile]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFormOpen) {
          setIsFormOpen(false);
        } else if (deleteConfirmId) {
          setDeleteConfirmId(null);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFormOpen, deleteConfirmId, onClose]);

  if (!isOpen || !user.isLoggedIn) return null;

  const openNewForm = () => {
    setEditingProjectId(null);
    setFormData({
      title: '',
      description: '',
      fullDescription: '',
      category: 'Frontend',
      techsInput: 'React, Tailwind CSS',
      githubUrl: 'https://github.com/usuario/repo',
      demoUrl: 'https://demo.vercel.app',
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      featured: false
    });
    setIsFormOpen(true);
  };

  const openEditForm = (proj: Project) => {
    setEditingProjectId(proj.id);
    setFormData({
      title: proj.title,
      description: proj.description,
      fullDescription: proj.fullDescription || '',
      category: proj.category,
      techsInput: proj.techs.join(', '),
      githubUrl: proj.githubUrl,
      demoUrl: proj.demoUrl || '',
      imageUrl: proj.imageUrl,
      featured: proj.featured
    });
    setIsFormOpen(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();

    const techsArray = formData.techsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (editingProjectId) {
      updateProject(editingProjectId, {
        title: formData.title,
        description: formData.description,
        fullDescription: formData.fullDescription,
        category: formData.category,
        techs: techsArray,
        githubUrl: formData.githubUrl,
        demoUrl: formData.demoUrl || undefined,
        imageUrl: formData.imageUrl,
        featured: formData.featured
      });
    } else {
      addProject({
        title: formData.title,
        description: formData.description,
        fullDescription: formData.fullDescription,
        category: formData.category,
        techs: techsArray,
        githubUrl: formData.githubUrl,
        demoUrl: formData.demoUrl || undefined,
        imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
        featured: formData.featured
      });
    }

    setIsFormOpen(false);
  };

  const handleSaveProfile = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateProfile(profileForm);
  };

  const handleResetProfile = () => {
    resetProfile();
    setProfileForm(defaultProfileData);
  };

  const confirmDelete = (id: string) => {
    deleteProject(id);
    setDeleteConfirmId(null);
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dashboard-modal-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-panel w-full max-w-5xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 shadow-2xl p-6 sm:p-8 text-left relative my-8"
        >
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 mb-4 gap-4">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <ShieldCheck className="w-5 h-5" />
                <h3 id="dashboard-modal-title" className="text-xl font-bold text-white">
                  Painel de Gerenciamento & Edição
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Conectado como <strong>{user.username}</strong> | Edite projetos ou atualize os textos da Home diretamente pela interface
              </p>
            </div>

            <div className="flex items-center gap-2">
              {activeTab === 'projects' && (
                <button
                  onClick={openNewForm}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-600/30 flex items-center gap-1.5 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  <Plus className="w-4 h-4" />
                  <span>Novo Projeto</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Fechar Dashboard"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tab Selection */}
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
              <span>Gerenciar Projetos ({projects.length})</span>
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

          {/* TAB 1: PROJECTS MANAGEMENT */}
          {activeTab === 'projects' && (
            <>
              {/* Form Modal / Section */}
              {isFormOpen && (
                <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 mb-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h4 className="text-base font-bold text-white">
                      {editingProjectId ? 'Editar Projeto' : 'Cadastrar Novo Projeto'}
                    </h4>
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Cancelar
                    </button>
                  </div>

                  <form onSubmit={handleSaveProject} className="space-y-4">
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
                        onClick={() => setIsFormOpen(false)}
                        className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                      >
                        {editingProjectId ? 'Salvar Alterações' : 'Cadastrar Projeto'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Delete Confirmation Alert Modal */}
              {deleteConfirmId && (
                <div className="p-4 rounded-xl bg-rose-950/80 border border-rose-500/40 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3 text-rose-200 text-xs">
                    <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                    <span>
                      <strong>Prevenção de Erros (IHC):</strong> Tem certeza que deseja excluir este projeto da lista?
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setDeleteConfirmId(null)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300 hover:text-white"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => confirmDelete(deleteConfirmId)}
                      className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-xs text-white font-semibold"
                    >
                      Sim, Excluir
                    </button>
                  </div>
                </div>
              )}

              {/* Table of Registered Projects */}
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
                            onClick={() => openEditForm(proj)}
                            className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-indigo-400 border border-slate-800"
                            title="Editar Projeto"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(proj.id)}
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

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2 border-t border-slate-800 pt-4">
                <button
                  onClick={resetProjects}
                  className="text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restaurar lista de projetos padrão</span>
                </button>
                <span>Total: <strong>{projects.length}</strong> projetos salvos localmente</span>
              </div>
            </>
          )}

          {/* TAB 2: PROFILE & TEXTS EDITING */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2 border-b border-slate-800 pb-2">
                  <FileText className="w-4 h-4" />
                  <span>Textos Principais do Hero & Identificação</span>
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

              {/* Seção Formação & Faculdade */}
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
                  onClick={handleResetProfile}
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
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
