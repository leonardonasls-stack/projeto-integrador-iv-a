import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, X, Key, Info, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, login } = useAuth();
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLoginModalOpen(false);
      }
    };
    if (isLoginModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLoginModalOpen, setIsLoginModalOpen]);

  if (!isLoginModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(passcode);
    if (success) {
      setPasscode('');
      setErrorMsg('');
    } else {
      setErrorMsg('Senha incorreta. Verifique suas credenciais.');
    }
  };

  return (
    <AnimatePresence mode="wait">
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
        onClick={() => setIsLoginModalOpen(false)}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-panel w-full max-w-md max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 shadow-2xl p-6 text-left relative"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <ShieldCheck className="w-5 h-5" />
              <h3 id="login-modal-title" className="text-white text-base font-bold">
                Acesso de Administrador (CRUD)
              </h3>
            </div>
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Fechar janela de login"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-slate-300 mb-4 leading-relaxed">
            O modo Administrador permite cadastrar novos projetos, editar projetos existentes e excluí-los diretamente pelo painel de gerenciamento.
          </p>

          {/* Quick Demo Hint */}
          <div className="p-3 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-xs text-indigo-200 mb-4 flex items-start gap-2">
            <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <span>
              <strong>Acesso restrito:</strong> Digite a senha administrativa para entrar.
            </span>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="admin-passcode" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-indigo-400" />
                <span>Senha de Acesso</span>
              </label>
              <input
                id="admin-passcode"
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Digite sua senha..."
                autoFocus
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 placeholder:text-slate-500"
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-400 font-medium">{errorMsg}</p>
            )}

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsLoginModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <span>Entrar como Admin</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
