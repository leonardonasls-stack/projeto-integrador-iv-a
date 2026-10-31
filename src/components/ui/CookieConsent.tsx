import React, { useState, useEffect } from 'react';
import { StorageService } from '../../services/storageService';

export const COOKIE_CONSENT_KEY = 'cookieConsent';
export const COOKIE_POLICY_VERSION = '2.0';
export const OPEN_COOKIE_MODAL_EVENT = 'open-cookie-settings';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
  version: string;
  timestamp: string;
}

export const openCookieSettings = (): void => {
  window.dispatchEvent(new CustomEvent(OPEN_COOKIE_MODAL_EVENT));
};

const Toggle: React.FC<{ checked: boolean; onChange?: (checked: boolean) => void; disabled?: boolean; label: string }> = ({
  checked,
  onChange,
  disabled = false,
  label,
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    disabled={disabled}
    onClick={() => !disabled && onChange && onChange(!checked)}
    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
      checked ? 'bg-indigo-500' : 'bg-slate-700'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    <span
      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
        checked ? 'translate-x-4' : 'translate-x-0'
      }`}
    />
  </button>
);

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [preferences, setPreferences] = useState({
    analytics: false,
    functional: false,
    marketing: false,
  });

  useEffect(() => {
    const stored = StorageService.getItem<Partial<CookiePreferences> | string | null>(COOKIE_CONSENT_KEY, null);

    if (!stored || typeof stored !== 'object' || stored.version !== COOKIE_POLICY_VERSION) {
      setPreferences({
        analytics: false,
        functional: false,
        marketing: false,
      });
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }

    setPreferences({
      analytics: Boolean(stored.analytics),
      functional: Boolean(stored.functional),
      marketing: Boolean(stored.marketing),
    });
  }, []);

  useEffect(() => {
    const handleOpenSettings = () => {
      setIsModalOpen(true);
    };

    window.addEventListener(OPEN_COOKIE_MODAL_EVENT, handleOpenSettings);
    return () => window.removeEventListener(OPEN_COOKIE_MODAL_EVENT, handleOpenSettings);
  }, []);

  const savePreferences = (prefs: { analytics: boolean; functional: boolean; marketing: boolean }) => {
    const record: CookiePreferences = {
      essential: true,
      analytics: Boolean(prefs.analytics),
      functional: Boolean(prefs.functional),
      marketing: Boolean(prefs.marketing),
      version: COOKIE_POLICY_VERSION,
      timestamp: new Date().toISOString(),
    };

    StorageService.setItem(COOKIE_CONSENT_KEY, record);
    setPreferences({
      analytics: record.analytics,
      functional: record.functional,
      marketing: record.marketing,
    });
    setIsVisible(false);
    setIsModalOpen(false);
  };

  const handleAcceptAll = () =>
    savePreferences({ analytics: true, functional: true, marketing: true });

  const handleAcceptEssential = () =>
    savePreferences({ analytics: false, functional: false, marketing: false });

  const handleSaveCustom = () =>
    savePreferences({ ...preferences });

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {isVisible && (
        <div
          role="region"
          aria-label="Aviso de Cookies"
          className="fixed bottom-6 left-6 z-50 w-[calc(100%-3rem)] max-w-90 bg-slate-950/85 backdrop-blur-md border border-slate-800/70 rounded-2xl shadow-2xl animate-fade-in-up overflow-hidden"
        >
          <div className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-base">Sua Privacidade</h3>
            </div>

            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              Utilizamos cookies para melhorar sua experiência de navegação. Você pode escolher quais categorias deseja ativar em nossa{' '}
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="text-indigo-400 hover:text-indigo-300 font-medium hover:underline transition-colors cursor-pointer"
              >
                Política de Cookies
              </button>
              .
            </p>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="w-full px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                Aceitar Todos
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleAcceptEssential}
                  className="w-full px-4 py-2.5 text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  Essenciais
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="w-full px-4 py-2.5 text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  Opções
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div
            className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col animate-scale-in overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-policy-modal-title"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <h2 id="cookie-policy-modal-title" className="text-xl font-bold text-white">
                Política e Preferências de Cookies
              </h2>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors rounded-full p-1 hover:bg-slate-800 cursor-pointer"
                aria-label="Fechar"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto custom-scrollbar text-slate-300 text-sm space-y-4">
              <div>
                <h3 className="text-base font-semibold text-white mb-1.5">O que são cookies?</h3>
                <p className="text-slate-400 leading-relaxed">
                  Cookies e armazenamento local são pequenos arquivos salvos no seu navegador quando você visita um site. Eles servem para manter o site funcionando corretamente, lembrar suas escolhas e ajudar a entender como a página é utilizada.
                </p>
              </div>

              {/* 1. Necessários */}
              <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-semibold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    Necessários / Essenciais
                  </h3>
                  <Toggle checked={true} disabled={true} label="Cookies Essenciais (Sempre ativos)" />
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Indispensáveis para o funcionamento básico e segurança do portfólio. Incluem o registro local (<code>cookieConsent</code>) que salva suas preferências de cookies no navegador para não exibir o aviso a cada visita, além da proteção contra envios automáticos no formulário de contato.
                </p>
              </div>

              {/* 2. Analíticos */}
              <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-semibold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Desempenho e Analíticos
                  </h3>
                  <Toggle
                    checked={preferences.analytics}
                    onChange={() => togglePreference('analytics')}
                    label="Cookies de Desempenho e Analíticos"
                  />
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Ajudam a entender como os visitantes interagem com o portfólio, medindo de forma agregada as seções mais visitadas, o tempo de navegação e eventuais erros técnicos para melhorar a performance da página.
                </p>
              </div>

              {/* 3. Funcionalidade */}
              <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-semibold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    Funcionalidade
                  </h3>
                  <Toggle
                    checked={preferences.functional}
                    onChange={() => togglePreference('functional')}
                    label="Cookies de Funcionalidade"
                  />
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Permitem que o site lembre escolhas opcionais de navegação e interface (como filtros de projetos ou preferências visuais) para proporcionar uma experiência personalizada.
                </p>
              </div>

              {/* 4. Marketing */}
              <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-semibold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-pink-500" />
                    Publicidade e Marketing
                  </h3>
                  <Toggle
                    checked={preferences.marketing}
                    onChange={() => togglePreference('marketing')}
                    label="Cookies de Publicidade e Marketing"
                  />
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Utilizados para medir o alcance de campanhas e exibir conteúdos relevantes ao seu perfil profissional. Atualmente este portfólio não exibe anúncios de terceiros, mantendo esta opção desativada por padrão.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/80 flex flex-col sm:flex-row justify-end gap-2.5">
              <button
                type="button"
                onClick={handleAcceptEssential}
                className="px-4 py-2.5 text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors border border-slate-700 cursor-pointer"
              >
                Apenas Essenciais
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-4 py-2.5 text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors border border-slate-700 cursor-pointer"
              >
                Aceitar Todos
              </button>
              <button
                type="button"
                onClick={handleSaveCustom}
                className="px-5 py-2.5 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                Salvar Preferências
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
