import React, { useState, useEffect } from 'react';

const Toggle: React.FC<{ checked: boolean; onChange?: (checked: boolean) => void; disabled?: boolean }> = ({ checked, onChange, disabled = false }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    onClick={() => !disabled && onChange && onChange(!checked)}
    className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
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
    analytics: true,
    functional: true,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    } else {
      try {
        const parsed = JSON.parse(consent);
        if (parsed && typeof parsed === 'object') {
          setPreferences({
            analytics: !!parsed.analytics,
            functional: !!parsed.functional,
            marketing: !!parsed.marketing,
          });
        }
      } catch (e) {
        if (consent === 'all') {
          setPreferences({ analytics: true, functional: true, marketing: true });
        } else if (consent === 'essential') {
          setPreferences({ analytics: false, functional: false, marketing: false });
        }
      }
    }
  }, []);

  const savePreferences = (prefs: any) => {
    localStorage.setItem('cookieConsent', JSON.stringify(prefs));
    setPreferences({
      analytics: prefs.analytics,
      functional: prefs.functional,
      marketing: prefs.marketing,
    });
    setIsVisible(false);
    setIsModalOpen(false);
  };

  const handleAcceptAll = () => savePreferences({ essential: true, analytics: true, functional: true, marketing: true });
  const handleAcceptEssential = () => savePreferences({ essential: true, analytics: false, functional: false, marketing: false });
  const handleSaveCustom = () => savePreferences({ essential: true, ...preferences });

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-6 left-6 z-50 w-full max-w-[360px] bg-slate-950/70 backdrop-blur-md border border-slate-800/50 rounded-2xl shadow-2xl animate-fade-in-up overflow-hidden">
          <div className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-base">Sua Privacidade</h3>
            </div>
            
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              Utilizamos cookies para melhorar sua experiência. Você pode escolher quais cookies deseja aceitar ou configurar em nossa{' '}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="text-indigo-400 hover:text-indigo-300 font-medium hover:underline transition-colors"
              >
                Política de Cookies
              </button>
              .
            </p>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleAcceptAll}
                className="w-full px-4 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
              >
                Aceitar Todos
              </button>
              <div className="flex gap-2">
                <button
                  onClick={handleAcceptEssential}
                  className="w-full px-4 py-2.5 text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 rounded-lg transition-colors"
                >
                  Essenciais
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full px-4 py-2.5 text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 rounded-lg transition-colors"
                >
                  Opções
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div 
            className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col animate-scale-in overflow-hidden"
            role="dialog"
            aria-modal="true"
          >
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <h2 className="text-xl font-bold text-white">Política e Preferências de Cookies</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors rounded-full p-1 hover:bg-slate-800"
                aria-label="Fechar"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar text-slate-300 text-sm space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">O que são cookies?</h3>
                <p className="text-slate-400">
                  Cookies são pequenos arquivos de texto salvos no seu navegador quando você visita um site. Eles servem para fazer o site funcionar corretamente e de forma mais segura, além de proporcionar uma experiência melhor e personalizada para você.
                </p>
              </div>
              
              <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                    Necessários / Essenciais
                  </h3>
                  <Toggle checked={true} disabled={true} />
                </div>
                <p className="text-slate-400">
                  Fundamentais para o site funcionar (ex: login, carrinho de compras, segurança). Não exigem consentimento prévio, pois sem eles o site não pode operar.
                </p>
              </div>

              <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    Desempenho / Analíticos
                  </h3>
                  <Toggle checked={preferences.analytics} onChange={() => togglePreference('analytics')} />
                </div>
                <p className="text-slate-400">
                  Medem visitas e erros para melhorar o site (ex: Google Analytics). Eles nos ajudam a saber quais páginas são mais e menos populares e como você navega pelo site.
                </p>
              </div>

              <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    Funcionalidade
                  </h3>
                  <Toggle checked={preferences.functional} onChange={() => togglePreference('functional')} />
                </div>
                <p className="text-slate-400">
                  Lembram suas preferências (ex: idioma, região, tema escolhido), para que você não precise configurá-las a cada visita ao site.
                </p>
              </div>

              <div className="bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                    Publicidade / Marketing
                  </h3>
                  <Toggle checked={preferences.marketing} onChange={() => togglePreference('marketing')} />
                </div>
                <p className="text-slate-400">
                  Rastreiam hábitos de navegação para mostrar anúncios direcionados e relevantes aos seus interesses, limitando a quantidade de vezes que você vê um anúncio.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  Cookies de Terceiros e Seus Direitos
                </h3>
                <p className="text-slate-400">
                  Informamos que algumas ferramentas externas (como Facebook, Google, etc.) também podem coletar dados através do nosso site. Você pode alterar sua preferência a qualquer momento alterando as chaves acima. Se optar por usar apenas cookies essenciais, funcionalidades que dependem de terceiros podem não funcionar conforme o esperado.
                </p>
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-800 bg-slate-900/80 flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 text-sm font-medium bg-transparent hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors border border-transparent hover:border-slate-700"
              >
                Cancelar
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2.5 text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors border border-slate-700"
              >
                Aceitar Todos
              </button>
              <button
                onClick={handleSaveCustom}
                className="px-6 py-2.5 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-sm"
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
