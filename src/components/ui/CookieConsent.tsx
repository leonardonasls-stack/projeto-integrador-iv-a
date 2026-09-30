import React, { useState, useEffect } from 'react';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show with a slight delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsent', 'all');
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem('cookieConsent', 'essential');
    setIsVisible(false);
  };

  return (
    <>
      {/* Cookie Window - Bottom Left */}
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
              Utilizamos cookies para melhorar sua experiência. Você pode escolher quais cookies deseja aceitar ou ler nossa{' '}
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
              <button
                onClick={handleAcceptEssential}
                className="w-full px-4 py-2.5 text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 rounded-lg transition-colors"
              >
                Apenas Essenciais
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Policy Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div 
            className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] flex flex-col animate-scale-in overflow-hidden"
            role="dialog"
            aria-modal="true"
          >
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <h2 className="text-xl font-bold text-white">Política de Cookies</h2>
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
              <p>
                Esta Política de Cookies explica como utilizamos cookies e tecnologias semelhantes
                para reconhecê-lo quando você visita nosso site.
              </p>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  Cookies Essenciais
                </h3>
                <p className="text-slate-400">
                  São necessários para o funcionamento do site e não podem ser desativados em nossos sistemas.
                  Geralmente, são definidos apenas em resposta a ações feitas por você, que equivalem a uma
                  solicitação de serviços, como definir suas preferências de privacidade ou fazer login.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  Cookies Analíticos & Desempenho
                </h3>
                <p className="text-slate-400">
                  Permitem-nos contar visitas e fontes de tráfego, para que possamos medir e melhorar o desempenho
                  do nosso site. Eles nos ajudam a saber quais páginas são mais e menos populares e ver como os
                  visitantes navegam pelo site.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  Seus Direitos
                </h3>
                <p className="text-slate-400">
                  Você pode alterar sua preferência a qualquer momento. Se optar por usar apenas cookies essenciais,
                  sua experiência no site continuará funcional, mas funcionalidades que dependem de personalização ou
                  análise de terceiros podem não funcionar conforme o esperado.
                </p>
              </div>
            </div>
            
            <div className="p-6 border-t border-slate-800 bg-slate-900/80 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2.5 text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-colors border border-slate-700"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
