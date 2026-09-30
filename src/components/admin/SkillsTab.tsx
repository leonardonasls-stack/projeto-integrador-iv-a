import React, { useState } from 'react';
import { useSkills } from '../../context/SkillContext';
import type { Skill, SkillCategory } from '../../types';
import { Plus, Edit2, Trash2, ShieldCheck, Layers, Save } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

export const SkillsTab: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory, addSkill, updateSkill, deleteSkill } = useSkills();
  
  // Category Form State
  const [editingCategory, setEditingCategory] = useState<Partial<SkillCategory> | null>(null);
  
  // Skill Form State
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);

  const handleSaveCategory = async () => {
    if (!editingCategory?.title) return;
    if (editingCategory.id) {
      await updateCategory(editingCategory as SkillCategory);
    } else {
      await addCategory({
        title: editingCategory.title,
        icon: editingCategory.icon || 'Layers',
        color: editingCategory.color || 'indigo',
        position: categories.length
      });
    }
    setEditingCategory(null);
  };

  const handleSaveSkill = async () => {
    if (!editingSkill?.name || !editingSkill?.categoryId) return;
    if (editingSkill.id) {
      await updateSkill(editingSkill as Skill);
    } else {
      await addSkill({
        categoryId: editingSkill.categoryId,
        name: editingSkill.name,
        level: editingSkill.level || 'Iniciante',
        description: editingSkill.description || '',
        position: categories.find(c => c.id === editingSkill.categoryId)?.skills?.length || 0
      });
    }
    setEditingSkill(null);
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Layers;
    return <IconComponent className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      
      {/* Category Management */}
      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <h4 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            <span>Categorias de Skills</span>
          </h4>
          <button 
            onClick={() => setEditingCategory({ title: '', icon: 'Layers', color: 'indigo' })}
            className="text-xs font-semibold text-emerald-400 flex items-center gap-1 hover:text-emerald-300"
          >
            <Plus className="w-3.5 h-3.5" /> Adicionar Categoria
          </button>
        </div>

        {editingCategory && (
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Nome (Ex: Frontend)"
                value={editingCategory.title || ''}
                onChange={e => setEditingCategory({ ...editingCategory, title: e.target.value })}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:ring-2 focus:ring-indigo-400"
              />
              <input
                type="text"
                placeholder="Ícone (Ex: Layers, Cpu)"
                value={editingCategory.icon || ''}
                onChange={e => setEditingCategory({ ...editingCategory, icon: e.target.value })}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:ring-2 focus:ring-indigo-400"
              />
              <select
                value={editingCategory.color || 'indigo'}
                onChange={e => setEditingCategory({ ...editingCategory, color: e.target.value })}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:ring-2 focus:ring-indigo-400"
              >
                <option value="indigo">Indigo</option>
                <option value="emerald">Emerald</option>
                <option value="amber">Amber</option>
                <option value="rose">Rose</option>
                <option value="cyan">Cyan</option>
                <option value="purple">Purple</option>
              </select>
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setEditingCategory(null)} className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white">Cancelar</button>
              <button onClick={handleSaveCategory} className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1">
                <Save className="w-3.5 h-3.5" /> Salvar
              </button>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {categories.sort((a, b) => a.position - b.position).map(cat => (
            <div key={cat.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 gap-2">
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded bg-slate-900 text-${cat.color}-400`}>
                  {renderIcon(cat.icon)}
                </div>
                <span className="text-sm font-semibold text-white">{cat.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setEditingCategory(cat)} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"><Edit2 className="w-3.5 h-3.5" /></button>
                <button onClick={() => { if(confirm('Tem certeza?')) deleteCategory(cat.id); }} className="p-1.5 rounded-lg text-rose-400 hover:text-white hover:bg-rose-900/50"><Trash2 className="w-3.5 h-3.5" /></button>
                <button onClick={() => setEditingSkill({ categoryId: cat.id, level: 'Iniciante' })} className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold ml-2">
                  + Skill
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Management */}
      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 space-y-4">
        <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2 border-b border-slate-800 pb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>Habilidades Cadastradas</span>
        </h4>

        {editingSkill && (
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Nome da Skill (Ex: React)"
                value={editingSkill.name || ''}
                onChange={e => setEditingSkill({ ...editingSkill, name: e.target.value })}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:ring-2 focus:ring-indigo-400"
              />
              <select
                value={editingSkill.level || 'Iniciante'}
                onChange={e => setEditingSkill({ ...editingSkill, level: e.target.value as any })}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:ring-2 focus:ring-indigo-400"
              >
                <option value="Iniciante">Iniciante</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Intermediário+">Intermediário+</option>
                <option value="Avançado">Avançado</option>
              </select>
              <input
                type="text"
                placeholder="Breve descrição (opcional)"
                value={editingSkill.description || ''}
                onChange={e => setEditingSkill({ ...editingSkill, description: e.target.value })}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:ring-2 focus:ring-indigo-400 sm:col-span-2"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setEditingSkill(null)} className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white">Cancelar</button>
              <button onClick={handleSaveSkill} className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1">
                <Save className="w-3.5 h-3.5" /> Salvar
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {categories.sort((a, b) => a.position - b.position).map(cat => (
            <div key={`skills-of-${cat.id}`} className="space-y-2">
              <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">{cat.title}</h5>
              <div className="space-y-2">
                {cat.skills?.sort((a, b) => a.position - b.position).map(skill => (
                  <div key={skill.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div>
                      <h6 className="text-xs font-semibold text-white">{skill.name} <span className="text-[10px] text-indigo-400 font-mono ml-2">[{skill.level}]</span></h6>
                      {skill.description && <p className="text-[10px] text-slate-500 mt-1">{skill.description}</p>}
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => setEditingSkill(skill)} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => { if(confirm('Tem certeza?')) deleteSkill(skill.id); }} className="p-1.5 rounded-lg text-rose-400 hover:text-white hover:bg-rose-900/50"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
