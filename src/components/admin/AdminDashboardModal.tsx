import React, { useState, useEffect } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../context/ProfileContext';
import type { Project, ProjectCategory } from '../../types';
import { defaultProfileData } from '../../types/profile';
import { X, Plus, ShieldCheck, AlertTriangle, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { AdminTabsNav } from './AdminTabsNav';
import { ProjectTable } from './ProjectTable';
import { ProjectFormModal, type ProjectFormData } from './ProjectFormModal';
import { ProfileFormTab } from './ProfileFormTab';

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
  const [formData, setFormData] = useState<ProjectFormData>({
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
      githubUrl: proj.githubUrl || '',
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
                  Painel de Gerenciamento &amp; Edição
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

          {/* Tab Navigation */}
          <AdminTabsNav
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            projectsCount={projects.length}
          />

          {/* TAB 1: PROJECTS MANAGEMENT */}
          {activeTab === 'projects' && (
            <>
              {isFormOpen && (
                <ProjectFormModal
                  isEditing={Boolean(editingProjectId)}
                  formData={formData}
                  setFormData={setFormData}
                  onSave={handleSaveProject}
                  onCancel={() => setIsFormOpen(false)}
                />
              )}

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

              <ProjectTable
                projects={projects}
                onEdit={openEditForm}
                onDeleteRequest={(id) => setDeleteConfirmId(id)}
              />

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
            <ProfileFormTab
              profileForm={profileForm}
              setProfileForm={setProfileForm}
              onSave={handleSaveProfile}
              onReset={handleResetProfile}
            />
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
