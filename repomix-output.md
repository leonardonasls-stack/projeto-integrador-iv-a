This file is a merged representation of the entire codebase, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
.agents/
  rules/
    changelog.md
.github/
  workflows/
    ci.yml
public/
  favicon.svg
  icons.svg
src/
  assets/
    hero.png
    react.svg
    vite.svg
  components/
    admin/
      AdminDashboardModal.tsx
      AdminTabsNav.tsx
      LoginModal.tsx
      MessagesTab.tsx
      ProfileFormTab.tsx
      ProjectFormModal.tsx
      ProjectTable.tsx
      SkillsTab.tsx
    layout/
      Footer.tsx
      Navbar.tsx
    portfolio/
      AboutSection.tsx
      ContactSection.tsx
      Hero.tsx
      ProjectCard.tsx
      ProjectGrid.tsx
      ProjectModal.tsx
      TechStack.tsx
    ui/
      CookieConsent.tsx
      ErrorBoundary.tsx
      SocialIcons.tsx
      ToastContainer.tsx
  context/
    AuthContext.tsx
    ProfileContext.tsx
    ProjectContext.tsx
    SkillContext.tsx
    ToastContext.tsx
  services/
    emailService.test.ts
    emailService.ts
    githubService.ts
    projectService.test.ts
    projectService.ts
    settingsService.ts
    skillService.ts
    storageService.test.ts
    storageService.ts
    supabaseClient.ts
  types/
    index.ts
    profile.ts
    skill.ts
  utils/
    urlHelper.ts
  App.tsx
  index.css
  main.tsx
supabase/
  schema.sql
  seed.ts
.editorconfig
.env.example
.gitignore
.oxlintrc.json
CHANGELOG.md
index.html
package.json
README.md
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="src/components/ui/CookieConsent.tsx">
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
</file>

<file path=".agents/rules/changelog.md">
# Regra de Projeto: Manutenção Obrigatória do CHANGELOG

Toda e qualquer alteração realizada no codebase (novas funcionalidades, correções de bugs, refatorações ou atualizações de documentação) **DEVE** seguir as seguintes diretrizes:

1. **Registro no CHANGELOG.md**:
   - Atualizar o arquivo [`CHANGELOG.md`](file:///c:/Users/Leo-dev/Projeto%20Integrador%20IV-A/CHANGELOG.md) na raiz do projeto a cada conjunto de alterações entregue.

2. **Inclusão Obrigatória do Código do Commit**:
   - Cada entrada no changelog deve conter o hash do commit Git (versão curta de 7 caracteres ou hash completo).
   - Exemplo: `### 📌 Commit 6a53f44 — feat(profile): ...`

3. **Estrutura dos Registros**:
   - Classificar as alterações em seções claras (*Formação Acadêmica*, *Fixes*, *Docs*, *Refatoração*, etc.).
   - Listar os arquivos principais modificados usando links markdown clicáveis com esquema `file://`.
</file>

<file path="public/favicon.svg">
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="46" fill="none" viewBox="0 0 48 46"><path fill="#863bff" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" style="fill:#863bff;fill:color(display-p3 .5252 .23 1);fill-opacity:1"/><mask id="a" width="48" height="46" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M25.842 44.938c-.664.844-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.183c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.498 0-3.579-1.842-3.579H1.133c-.92 0-1.456-1.04-.92-1.787L9.91.473c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.578 1.842 3.578h11.377c.943 0 1.473 1.088.89 1.832L25.843 44.94z" style="fill:#000;fill-opacity:1"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#ede6ff" rx="5.508" ry="14.704" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -4.47 31.516)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#ede6ff" rx="10.399" ry="29.851" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -39.328 7.883)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#7e14ff" rx="5.508" ry="30.487" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -25.913 -14.639)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -32.644 -3.334)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -34.34 30.47)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#ede6ff" rx="14.072" ry="22.078" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="rotate(93.35 24.506 48.493)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx=".387" cy="8.972" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(39.51 .387 8.972)"/></g><g filter="url(#k)"><ellipse cx="47.523" cy="-6.092" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 47.523 -6.092)"/></g><g filter="url(#l)"><ellipse cx="41.412" cy="6.333" fill="#47bfff" rx="5.971" ry="9.665" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 41.412 6.333)"/></g><g filter="url(#m)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#n)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#o)"><ellipse cx="35.651" cy="29.907" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 35.651 29.907)"/></g><g filter="url(#p)"><ellipse cx="38.418" cy="32.4" fill="#47bfff" rx="5.971" ry="15.297" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 38.418 32.4)"/></g></g><defs><filter id="b" width="60.045" height="41.654" x="-19.77" y="16.149" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-54.613" y="-7.533" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-49.64" y="2.03" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-45.045" y="20.029" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-43.513" y="21.178" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="15.756" y="-17.901" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-27.636" y="-22.853" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="20.116" y="-38.415" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="24.641" y="-11.323" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="8.244" y="-2.416" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="18.713" y="10.588" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter></defs></svg>
</file>

<file path="public/icons.svg">
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="bluesky-icon" viewBox="0 0 16 17">
    <g clip-path="url(#bluesky-clip)"><path fill="#08060d" d="M7.75 7.735c-.693-1.348-2.58-3.86-4.334-5.097-1.68-1.187-2.32-.981-2.74-.79C.188 2.065.1 2.812.1 3.251s.241 3.602.398 4.13c.52 1.744 2.367 2.333 4.07 2.145-2.495.37-4.71 1.278-1.805 4.512 3.196 3.309 4.38-.71 4.987-2.746.608 2.036 1.307 5.91 4.93 2.746 2.72-2.746.747-4.143-1.747-4.512 1.702.189 3.55-.4 4.07-2.145.156-.528.397-3.691.397-4.13s-.088-1.186-.575-1.406c-.42-.19-1.06-.395-2.741.79-1.755 1.24-3.64 3.752-4.334 5.099"/></g>
    <defs><clipPath id="bluesky-clip"><path fill="#fff" d="M.1.85h15.3v15.3H.1z"/></clipPath></defs>
  </symbol>
  <symbol id="discord-icon" viewBox="0 0 20 19">
    <path fill="#08060d" d="M16.224 3.768a14.5 14.5 0 0 0-3.67-1.153c-.158.286-.343.67-.47.976a13.5 13.5 0 0 0-4.067 0c-.128-.306-.317-.69-.476-.976A14.4 14.4 0 0 0 3.868 3.77C1.546 7.28.916 10.703 1.231 14.077a14.7 14.7 0 0 0 4.5 2.306q.545-.748.965-1.587a9.5 9.5 0 0 1-1.518-.74q.191-.14.372-.293c2.927 1.369 6.107 1.369 8.999 0q.183.152.372.294-.723.437-1.52.74.418.838.963 1.588a14.6 14.6 0 0 0 4.504-2.308c.37-3.911-.63-7.302-2.644-10.309m-9.13 8.234c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.894 0 1.614.82 1.599 1.82.001 1-.705 1.82-1.6 1.82m5.91 0c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.893 0 1.614.82 1.599 1.82 0 1-.706 1.82-1.6 1.82"/>
  </symbol>
  <symbol id="documentation-icon" viewBox="0 0 21 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="m15.5 13.333 1.533 1.322c.645.555.967.833.967 1.178s-.322.623-.967 1.179L15.5 18.333m-3.333-5-1.534 1.322c-.644.555-.966.833-.966 1.178s.322.623.966 1.179l1.534 1.321"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M17.167 10.836v-4.32c0-1.41 0-2.117-.224-2.68-.359-.906-1.118-1.621-2.08-1.96-.599-.21-1.349-.21-2.848-.21-2.623 0-3.935 0-4.983.369-1.684.591-3.013 1.842-3.641 3.428C3 6.449 3 7.684 3 10.154v2.122c0 2.558 0 3.838.706 4.726q.306.383.713.671c.76.536 1.79.64 3.581.66"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M3 10a2.78 2.78 0 0 1 2.778-2.778c.555 0 1.209.097 1.748-.047.48-.129.854-.503.982-.982.145-.54.048-1.194.048-1.749a2.78 2.78 0 0 1 2.777-2.777"/>
  </symbol>
  <symbol id="github-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844" clip-rule="evenodd"/>
  </symbol>
  <symbol id="social-icon" viewBox="0 0 20 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M12.5 6.667a4.167 4.167 0 1 0-8.334 0 4.167 4.167 0 0 0 8.334 0"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M2.5 16.667a5.833 5.833 0 0 1 8.75-5.053m3.837.474.513 1.035c.07.144.257.282.414.309l.93.155c.596.1.736.536.307.965l-.723.73a.64.64 0 0 0-.152.531l.207.903c.164.715-.213.991-.84.618l-.872-.52a.63.63 0 0 0-.577 0l-.872.52c-.624.373-1.003.094-.84-.618l.207-.903a.64.64 0 0 0-.152-.532l-.723-.729c-.426-.43-.289-.864.306-.964l.93-.156a.64.64 0 0 0 .412-.31l.513-1.034c.28-.562.735-.562 1.012 0"/>
  </symbol>
  <symbol id="x-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M1.893 1.98c.052.072 1.245 1.769 2.653 3.77l2.892 4.114c.183.261.333.48.333.486s-.068.089-.152.183l-.522.593-.765.867-3.597 4.087c-.375.426-.734.834-.798.905a1 1 0 0 0-.118.148c0 .01.236.017.664.017h.663l.729-.83c.4-.457.796-.906.879-.999a692 692 0 0 0 1.794-2.038c.034-.037.301-.34.594-.675l.551-.624.345-.392a7 7 0 0 1 .34-.374c.006 0 .93 1.306 2.052 2.903l2.084 2.965.045.063h2.275c1.87 0 2.273-.003 2.266-.021-.008-.02-1.098-1.572-3.894-5.547-2.013-2.862-2.28-3.246-2.273-3.266.008-.019.282-.332 2.085-2.38l2-2.274 1.567-1.782c.022-.028-.016-.03-.65-.03h-.674l-.3.342a871 871 0 0 1-1.782 2.025c-.067.075-.405.458-.75.852a100 100 0 0 1-.803.91c-.148.172-.299.344-.99 1.127-.304.343-.32.358-.345.327-.015-.019-.904-1.282-1.976-2.808L6.365 1.85H1.8zm1.782.91 8.078 11.294c.772 1.08 1.413 1.973 1.425 1.984.016.017.241.02 1.05.017l1.03-.004-2.694-3.766L7.796 5.75 5.722 2.852l-1.039-.004-1.039-.004z" clip-rule="evenodd"/>
  </symbol>
</svg>
</file>

<file path="src/assets/react.svg">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="35.93" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026a347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815a329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627a310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695a358.489 358.489 0 0 1 11.036 20.54a329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026c-.344 1.668-.73 3.367-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86Z"></path></svg>
</file>

<file path="src/assets/vite.svg">
<svg xmlns="http://www.w3.org/2000/svg" width="77" height="47" fill="none" aria-labelledby="vite-logo-title" viewBox="0 0 77 47"><title id="vite-logo-title">Vite</title><style>.parenthesis{fill:#000}@media (prefers-color-scheme:dark){.parenthesis{fill:#fff}}</style><path fill="#9135ff" d="M40.151 45.71c-.663.844-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.493c-.92 0-1.457-1.04-.92-1.788l7.479-10.471c1.07-1.498 0-3.578-1.842-3.578H15.443c-.92 0-1.456-1.04-.92-1.788l9.696-13.576c.213-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.472c-1.07 1.497 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.087.89 1.83L40.153 45.712z"/><mask id="a" width="48" height="47" x="14" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M40.047 45.71c-.663.843-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.389c-.92 0-1.457-1.04-.92-1.788l7.479-10.472c1.07-1.497 0-3.578-1.842-3.578H15.34c-.92 0-1.456-1.04-.92-1.788l9.696-13.575c.213-.297.556-.474.92-.474H53.93c.92 0 1.456 1.04.92 1.788L47.37 13.03c-1.07 1.498 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.088.89 1.831L40.049 45.712z"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#eee6ff" rx="5.508" ry="14.704" transform="rotate(269.814 20.96 11.29)scale(-1 1)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#eee6ff" rx="10.399" ry="29.851" transform="rotate(89.814 -16.902 -8.275)scale(1 -1)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#8900ff" rx="5.508" ry="30.487" transform="rotate(89.814 -19.197 -7.127)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#8900ff" rx="5.508" ry="30.599" transform="rotate(89.814 -25.928 4.177)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#8900ff" rx="5.508" ry="30.599" transform="rotate(89.814 -25.738 5.52)scale(1 -1)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#eee6ff" rx="14.072" ry="22.078" transform="rotate(93.35 31.245 55.578)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#8900ff" rx="3.47" ry="21.501" transform="rotate(89.009 35.419 55.202)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#8900ff" rx="3.47" ry="21.501" transform="rotate(89.009 35.419 55.202)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx="14.592" cy="9.743" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(39.51 14.592 9.743)"/></g><g filter="url(#k)"><ellipse cx="61.728" cy="-5.321" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 61.728 -5.32)"/></g><g filter="url(#l)"><ellipse cx="55.618" cy="7.104" fill="#00c2ff" rx="5.971" ry="9.665" transform="rotate(37.892 55.618 7.104)"/></g><g filter="url(#m)"><ellipse cx="12.326" cy="39.103" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 12.326 39.103)"/></g><g filter="url(#n)"><ellipse cx="12.326" cy="39.103" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 12.326 39.103)"/></g><g filter="url(#o)"><ellipse cx="49.857" cy="30.678" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 49.857 30.678)"/></g><g filter="url(#p)"><ellipse cx="52.623" cy="33.171" fill="#00c2ff" rx="5.971" ry="15.297" transform="rotate(37.892 52.623 33.17)"/></g></g><path d="M6.919 0c-9.198 13.166-9.252 33.575 0 46.789h6.215c-9.25-13.214-9.196-33.623 0-46.789zm62.424 0h-6.215c9.198 13.166 9.252 33.575 0 46.789h6.215c9.25-13.214 9.196-33.623 0-46.789" class="parenthesis"/><defs><filter id="b" width="60.045" height="41.654" x="-5.564" y="16.92" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-40.407" y="-6.762" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-35.435" y="2.801" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-30.84" y="20.8" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-29.307" y="21.949" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="29.961" y="-17.13" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="37.754" y="3.055" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="37.754" y="3.055" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-13.43" y="-22.082" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="34.321" y="-37.644" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="38.847" y="-10.552" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-15.081" y="6.78" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-15.081" y="6.78" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="22.45" y="-1.645" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="32.919" y="11.36" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter></defs></svg>
</file>

<file path="src/components/admin/MessagesTab.tsx">
import React, { useState, useEffect } from 'react';
import { EmailService } from '../../services/emailService';
import { Mail, Trash2, Calendar, User, AtSign, Loader2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export const MessagesTab: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const data = await EmailService.getMessages();
      setMessages(data || []);
    } catch (error: any) {
      addToast('error', 'Erro', 'Não foi possível carregar as mensagens.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Deseja excluir esta mensagem permanentemente?')) return;
    
    try {
      await EmailService.deleteMessage(id);
      setMessages(messages.filter(m => m.id !== id));
      addToast('success', 'Sucesso', 'Mensagem excluída.');
    } catch (error: any) {
      addToast('error', 'Erro', 'Falha ao excluir mensagem.');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin mb-4" />
        <p className="text-xs">Carregando mensagens...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <h4 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
          <Mail className="w-4 h-4" />
          <span>Mensagens de Contato ({messages.length})</span>
        </h4>
        <button 
          onClick={fetchMessages}
          className="text-xs font-semibold text-slate-400 hover:text-white"
        >
          Atualizar Lista
        </button>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-12 text-slate-500 text-xs">
          Nenhuma mensagem recebida ainda.
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 text-left">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-800 pb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-bold text-white">{msg.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AtSign className="w-4 h-4 text-slate-400" />
                    <a href={`mailto:${msg.email}`} className="text-xs text-indigo-400 hover:underline">
                      {msg.email}
                    </a>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(msg.created_at).toLocaleString('pt-BR')}</span>
                  </div>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 transition-colors bg-rose-950/30 px-2 py-1 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Excluir
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Assunto: {msg.subject || 'Sem Assunto'}
                </h5>
                <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-wrap">
                  {msg.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
</file>

<file path="src/components/portfolio/ProjectGrid.tsx">
import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import type { Project, ProjectCategory } from '../../types';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { FolderGit2, Search, Filter, Sparkles, X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export const ProjectGrid: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    filteredProjects,
    projects
  } = useProjects();

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories: (ProjectCategory | 'Todas')[] = [
    'Todas',
    'Frontend',
    'Fullstack',
    'Backend',
    'Mobile',
    'IHC / UX'
  ];

  return (
    <section id="projetos" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Portfólio Interativo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Projetos em Destaque
          </h2>
          <p className="text-slate-400 text-base">
            Explore as aplicações desenvolvidas. Utilize a busca ou os filtros para encontrar projetos por categoria ou tecnologias utilizadas.
          </p>
        </div>

        {/* Search & Filter Controls Bar */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 mb-10 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nome, descrição ou tecnologia (ex: React)..."
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 placeholder:text-slate-500 transition-all"
              aria-label="Campo de busca de projetos"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                aria-label="Limpar busca"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <Filter className="w-4 h-4 text-slate-500 shrink-0 ml-1 hidden sm:block" />
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>

        {/* Status Counter */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-6 px-1">
          <span>
            Exibindo <strong>{filteredProjects.length}</strong> de <strong>{projects.length}</strong> projetos
          </span>
          {(selectedCategory !== 'Todas' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('Todas');
                setSearchQuery('');
              }}
              className="text-indigo-400 hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Limpar filtros</span>
            </button>
          )}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={(p) => setSelectedProject(p)}
                />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          /* Empty State */
          <div className="glass-panel p-12 rounded-2xl border border-slate-800 text-center space-y-4 my-8">
            <FolderGit2 className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">Nenhum projeto encontrado</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Não encontramos projetos correspondentes ao filtro "{searchQuery || selectedCategory}". Tente pesquisar com outros termos.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Todas');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
            >
              Restaurar todos os projetos
            </button>
          </div>
        )}

      </div>

      {/* Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
</file>

<file path="src/components/ui/ErrorBoundary.tsx">
import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
          <div className="max-w-md w-full glass-panel p-8 rounded-2xl border border-slate-800 text-center space-y-4">
            <h1 className="text-2xl font-bold text-white">Oops, algo deu errado!</h1>
            <p className="text-slate-400 text-sm">
              Tivemos um problema inesperado ao carregar esta página.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-500 transition-colors"
            >
              Recarregar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
</file>

<file path="src/components/ui/SocialIcons.tsx">
import React from 'react';

export const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);
</file>

<file path="src/components/ui/ToastContainer.tsx">
import React from 'react';
import { useToast } from '../../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div 
      className="fixed bottom-5 right-5 z-[100] flex flex-col gap-3 max-w-md w-full px-4 pointer-events-none"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-2xl border backdrop-blur-md ${
              toast.type === 'success'
                ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-100'
                : toast.type === 'error'
                ? 'bg-rose-950/80 border-rose-500/40 text-rose-100'
                : 'bg-indigo-950/80 border-indigo-500/40 text-indigo-100'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-indigo-400" />}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm leading-tight">{toast.title}</h4>
              <p className="text-xs opacity-90 mt-1 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-label="Fechar notificação"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
</file>

<file path="src/context/ToastContext.tsx">
import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { ToastMessage } from '../types';

interface ToastContextType {
  toasts: ToastMessage[];
  addToast: (type: 'success' | 'error' | 'info', title: string, message: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', title: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { id, type, title, message };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
</file>

<file path="src/services/projectService.test.ts">
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProjectService } from './projectService';
import { supabase } from './supabaseClient';

vi.mock('./supabaseClient', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn()
    }))
  }
}));

describe('ProjectService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getProjects', () => {
    it('should map snake_case to camelCase correctly', async () => {
      const mockData = [
        {
          id: '1',
          title: 'Test',
          description: 'Desc',
          full_description: 'Full Desc',
          category: 'Frontend',
          techs: ['React'],
          github_url: 'http://github.com',
          demo_url: 'http://demo.com',
          image_url: 'http://image.com',
          featured: true,
          visible: true,
          position: 0
        }
      ];

      // Setup the mock chain to return mockData
      const orderMock = vi.fn().mockResolvedValue({ data: mockData, error: null });
      const orderMock2 = vi.fn().mockReturnValue({ order: orderMock });
      const selectMock = vi.fn().mockReturnValue({ order: orderMock2 });
      (supabase.from as any).mockReturnValue({ select: selectMock });

      const result = await ProjectService.getProjects();
      
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: '1',
        title: 'Test',
        description: 'Desc',
        fullDescription: 'Full Desc',
        category: 'Frontend',
        techs: ['React'],
        githubUrl: 'http://github.com',
        demoUrl: 'http://demo.com',
        imageUrl: 'http://image.com',
        featured: true,
        visible: true,
        position: 0
      });
    });

    it('should throw error on failure', async () => {
      const orderMock = vi.fn().mockResolvedValue({ data: null, error: new Error('DB Error') });
      const orderMock2 = vi.fn().mockReturnValue({ order: orderMock });
      const selectMock = vi.fn().mockReturnValue({ order: orderMock2 });
      (supabase.from as any).mockReturnValue({ select: selectMock });

      await expect(ProjectService.getProjects()).rejects.toThrow('Não foi possível carregar os projetos.');
    });
  });
});
</file>

<file path="src/services/skillService.ts">
import { supabase } from './supabaseClient';
import type { Skill, SkillCategory } from '../types';

export const SkillService = {
  /**
   * Fetches all categories and their skills from Supabase
   * and maps them to the local types.
   */
  async getCategoriesWithSkills(): Promise<SkillCategory[]> {
    const { data: categoriesData, error: catError } = await supabase
      .from('skill_categories')
      .select('*')
      .order('position', { ascending: true });

    if (catError) throw new Error(catError.message);

    const { data: skillsData, error: skillError } = await supabase
      .from('skills')
      .select('*')
      .order('position', { ascending: true });

    if (skillError) throw new Error(skillError.message);

    return (categoriesData || []).map(cat => ({
      id: cat.id,
      title: cat.title,
      icon: cat.icon,
      color: cat.color,
      position: cat.position,
      skills: (skillsData || [])
        .filter(skill => skill.category_id === cat.id)
        .map(skill => ({
          id: skill.id,
          categoryId: skill.category_id,
          name: skill.name,
          level: skill.level,
          description: skill.description || undefined,
          position: skill.position
        }))
    }));
  },

  // Category CRUD
  async addCategory(category: Omit<SkillCategory, 'id' | 'skills'>): Promise<string> {
    const { data, error } = await supabase
      .from('skill_categories')
      .insert({
        title: category.title,
        icon: category.icon,
        color: category.color,
        position: category.position
      })
      .select('id')
      .single();

    if (error) throw new Error(error.message);
    return data.id;
  },

  async updateCategory(id: string, updates: Partial<Omit<SkillCategory, 'id' | 'skills'>>): Promise<void> {
    const dbUpdates: any = {};
    if (updates.title !== undefined) dbUpdates.title = updates.title;
    if (updates.icon !== undefined) dbUpdates.icon = updates.icon;
    if (updates.color !== undefined) dbUpdates.color = updates.color;
    if (updates.position !== undefined) dbUpdates.position = updates.position;

    const { error } = await supabase
      .from('skill_categories')
      .update(dbUpdates)
      .eq('id', id);

    if (error) throw new Error(error.message);
  },

  async deleteCategory(id: string): Promise<void> {
    const { error } = await supabase
      .from('skill_categories')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  },

  // Skill CRUD
  async addSkill(skill: Omit<Skill, 'id'>): Promise<string> {
    const { data, error } = await supabase
      .from('skills')
      .insert({
        category_id: skill.categoryId,
        name: skill.name,
        level: skill.level,
        description: skill.description,
        position: skill.position
      })
      .select('id')
      .single();

    if (error) throw new Error(error.message);
    return data.id;
  },

  async updateSkill(id: string, updates: Partial<Omit<Skill, 'id' | 'categoryId'>>): Promise<void> {
    const dbUpdates: any = {};
    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.level !== undefined) dbUpdates.level = updates.level;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.position !== undefined) dbUpdates.position = updates.position;

    const { error } = await supabase
      .from('skills')
      .update(dbUpdates)
      .eq('id', id);

    if (error) throw new Error(error.message);
  },

  async deleteSkill(id: string): Promise<void> {
    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }
};
</file>

<file path="src/services/storageService.test.ts">
import { describe, it, expect, beforeEach } from 'vitest';
import { StorageService } from './storageService';

describe('StorageService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return fallback value if key does not exist', () => {
    const value = StorageService.getItem('non_existent', 'fallback');
    expect(value).toBe('fallback');
  });

  it('should set and get items correctly', () => {
    const data = { id: 1, name: 'Test' };
    const success = StorageService.setItem('test_key', data);
    expect(success).toBe(true);

    const retrieved = StorageService.getItem('test_key', null);
    expect(retrieved).toEqual(data);
  });

  it('should remove items correctly', () => {
    StorageService.setItem('to_remove', 'data');
    StorageService.removeItem('to_remove');

    const retrieved = StorageService.getItem('to_remove', null);
    expect(retrieved).toBeNull();
  });
});
</file>

<file path="src/services/storageService.ts">
/**
 * Storage Service - Infrastructure Layer
 * Isolates direct localStorage access and handles parsing errors or quota exceptions safely.
 */

export class StorageService {
  /**
   * Safe read from localStorage with JSON parsing and fallback.
   */
  static getItem<T>(key: string, fallback: T): T {
    try {
      const item = localStorage.getItem(key);
      if (!item) return fallback;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`[StorageService] Error reading key "${key}":`, error);
      return fallback;
    }
  }

  /**
   * Safe write to localStorage.
   */
  static setItem<T>(key: string, value: T): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`[StorageService] Error writing key "${key}":`, error);
      return false;
    }
  }

  /**
   * Safe remove item from localStorage.
   */
  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`[StorageService] Error removing key "${key}":`, error);
    }
  }
}
</file>

<file path="src/services/supabaseClient.ts">
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Atenção: VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY precisam estar definidos no seu .env.local.'
  );
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);
</file>

<file path="src/types/skill.ts">
export type SkillLevel = 'Iniciante' | 'Intermediário' | 'Intermediário+' | 'Avançado';

export interface Skill {
  id: string;
  categoryId: string;
  name: string;
  level: SkillLevel;
  description?: string;
  position: number;
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  position: number;
  skills?: Skill[]; // This is useful when fetching categories with their related skills
}
</file>

<file path="src/utils/urlHelper.ts">
export function safeHostPath(url: string | null | undefined): string {
  if (!url) return '';
  try {
    const parsed = new URL(url);
    return parsed.hostname + (parsed.pathname === '/' ? '' : parsed.pathname);
  } catch {
    return url; // Return original if not a valid URL (fallback)
  }
}

export function validateHttpUrl(url: string): boolean {
  if (!url) return true; // empty is ok usually, handled elsewhere if required
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}
</file>

<file path=".editorconfig">
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
</file>

<file path=".env.example">
VITE_SUPABASE_URL="sua_url_do_supabase_aqui"
VITE_SUPABASE_ANON_KEY="sua_anon_key_do_supabase_aqui"
VITE_FORMSPREE_ID="seu_id_do_formspree_aqui"
</file>

<file path=".oxlintrc.json">
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
</file>

<file path="tsconfig.json">
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
</file>

<file path="tsconfig.node.json">
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "module": "nodenext",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
</file>

<file path="src/components/admin/ProjectTable.tsx">
import React from 'react';
import type { Project } from '../../types';
import { Edit2, Trash2, ArrowUp, ArrowDown, EyeOff } from 'lucide-react';

interface ProjectTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDeleteRequest: (id: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
}

export const ProjectTable: React.FC<ProjectTableProps> = ({
  projects,
  onEdit,
  onDeleteRequest,
  onMoveUp,
  onMoveDown
}) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800">
      <table className="w-full text-left text-xs text-slate-300">
        <thead className="bg-slate-900 text-slate-400 font-semibold border-b border-slate-800">
          <tr>
            <th className="p-3">Projeto</th>
            <th className="p-3">Categoria</th>
            <th className="p-3">Visibilidade</th>
            <th className="p-3">Tecnologias</th>
            <th className="p-3 text-right">Ordem / Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
          {projects.map((proj, index) => (
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
                {proj.visible === false ? (
                  <span className="flex items-center gap-1 text-slate-500">
                    <EyeOff className="w-3.5 h-3.5" />
                    Oculto
                  </span>
                ) : (
                  <span className="text-emerald-400">Visível</span>
                )}
              </td>
              <td className="p-3">
                <span className="truncate max-w-[150px] inline-block text-slate-400">
                  {proj.techs.join(', ')}
                </span>
              </td>
              <td className="p-3 text-right space-x-1 whitespace-nowrap">
                <button
                  onClick={() => onMoveUp(index)}
                  disabled={index === 0}
                  className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-emerald-400 disabled:opacity-30 border border-slate-800"
                  title="Mover para cima"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onMoveDown(index)}
                  disabled={index === projects.length - 1}
                  className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-emerald-400 disabled:opacity-30 border border-slate-800 mr-2"
                  title="Mover para baixo"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onEdit(proj)}
                  className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-indigo-400 border border-slate-800"
                  title="Editar Projeto"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDeleteRequest(proj.id)}
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
  );
};
</file>

<file path="src/components/admin/SkillsTab.tsx">
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
</file>

<file path="src/context/SkillContext.tsx">
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { SkillService } from '../services/skillService';
import type { Skill, SkillCategory } from '../types';
import { useToast } from './ToastContext';

interface SkillContextType {
  categories: SkillCategory[];
  isLoading: boolean;
  addCategory: (category: Omit<SkillCategory, 'id' | 'skills'>) => Promise<boolean>;
  updateCategory: (category: Omit<SkillCategory, 'skills'>) => Promise<boolean>;
  deleteCategory: (id: string) => Promise<boolean>;
  addSkill: (skill: Omit<Skill, 'id'>) => Promise<boolean>;
  updateSkill: (skill: Skill) => Promise<boolean>;
  deleteSkill: (id: string) => Promise<boolean>;
}

const SkillContext = createContext<SkillContextType | undefined>(undefined);

export const SkillProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { addToast } = useToast();
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const data = await SkillService.getCategoriesWithSkills();
      setCategories(data);
    } catch (error: any) {
      console.error('Erro ao buscar skills:', error);
      addToast('error', 'Erro', 'Falha ao carregar as habilidades do banco.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async (category: Omit<SkillCategory, 'id' | 'skills'>) => {
    try {
      const id = await SkillService.addCategory(category);
      setCategories(prev => [...prev, { ...category, id, skills: [] }]);
      addToast('success', 'Sucesso', 'Categoria adicionada.');
      return true;
    } catch (error: any) {
      addToast('error', 'Erro', error.message);
      return false;
    }
  };

  const updateCategory = async (category: Omit<SkillCategory, 'skills'>) => {
    try {
      await SkillService.updateCategory(category.id, category);
      setCategories(prev =>
        prev.map(c => (c.id === category.id ? { ...c, ...category } : c))
      );
      addToast('success', 'Sucesso', 'Categoria atualizada.');
      return true;
    } catch (error: any) {
      addToast('error', 'Erro', error.message);
      return false;
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await SkillService.deleteCategory(id);
      setCategories(prev => prev.filter(c => c.id !== id));
      addToast('success', 'Sucesso', 'Categoria excluída.');
      return true;
    } catch (error: any) {
      addToast('error', 'Erro', error.message);
      return false;
    }
  };

  const addSkill = async (skill: Omit<Skill, 'id'>) => {
    try {
      const id = await SkillService.addSkill(skill);
      setCategories(prev =>
        prev.map(c => {
          if (c.id === skill.categoryId) {
            return { ...c, skills: [...(c.skills || []), { ...skill, id }] };
          }
          return c;
        })
      );
      addToast('success', 'Sucesso', 'Habilidade adicionada.');
      return true;
    } catch (error: any) {
      addToast('error', 'Erro', error.message);
      return false;
    }
  };

  const updateSkill = async (skill: Skill) => {
    try {
      await SkillService.updateSkill(skill.id, skill);
      setCategories(prev =>
        prev.map(c => {
          if (c.id === skill.categoryId) {
            return {
              ...c,
              skills: (c.skills || []).map(s => (s.id === skill.id ? skill : s))
            };
          }
          return c;
        })
      );
      addToast('success', 'Sucesso', 'Habilidade atualizada.');
      return true;
    } catch (error: any) {
      addToast('error', 'Erro', error.message);
      return false;
    }
  };

  const deleteSkill = async (id: string) => {
    try {
      await SkillService.deleteSkill(id);
      setCategories(prev =>
        prev.map(c => ({
          ...c,
          skills: (c.skills || []).filter(s => s.id !== id)
        }))
      );
      addToast('success', 'Sucesso', 'Habilidade excluída.');
      return true;
    } catch (error: any) {
      addToast('error', 'Erro', error.message);
      return false;
    }
  };

  return (
    <SkillContext.Provider
      value={{
        categories,
        isLoading,
        addCategory,
        updateCategory,
        deleteCategory,
        addSkill,
        updateSkill,
        deleteSkill
      }}
    >
      {children}
    </SkillContext.Provider>
  );
};

export const useSkills = () => {
  const context = useContext(SkillContext);
  if (context === undefined) {
    throw new Error('useSkills must be used within a SkillProvider');
  }
  return context;
};
</file>

<file path="src/services/emailService.test.ts">
import { describe, it, expect, vi, beforeEach, afterEach, type Mock } from 'vitest';
import { EmailService } from './emailService';

// Mock supabase client
vi.mock('./supabaseClient', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn(() => Promise.resolve({ error: null })),
      select: vi.fn(() => ({
        order: vi.fn(() => Promise.resolve({ data: [], error: null }))
      })),
      delete: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ error: null }))
      }))
    }))
  }
}));

describe('EmailService', () => {
  let globalFetchMock: Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    globalFetchMock = vi.fn();
    globalThis.fetch = globalFetchMock as any;
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('should return mailtoFallback if VITE_FORMSPREE_ID is missing', async () => {
    vi.stubEnv('VITE_FORMSPREE_ID', '');
    
    const result = await EmailService.sendContactMessage({
      name: 'Test',
      email: 'test@example.com',
      message: 'Hello'
    });
    
    expect(result.mailtoFallback).toBe(true);
    expect(result.success).toBe(true);
    expect(globalFetchMock).not.toHaveBeenCalled();
  });

  it('should send via Formspree if VITE_FORMSPREE_ID is present', async () => {
    vi.stubEnv('VITE_FORMSPREE_ID', 'test_id');
    globalFetchMock.mockResolvedValueOnce({ ok: true });
    
    const result = await EmailService.sendContactMessage({
      name: 'Test',
      email: 'test@example.com',
      message: 'Hello'
    });
    
    expect(result.mailtoFallback).toBeUndefined();
    expect(result.success).toBe(true);
    expect(globalFetchMock).toHaveBeenCalledWith('https://formspree.io/f/test_id', expect.any(Object));
  });

  it('should handle Formspree URL as ID', async () => {
    vi.stubEnv('VITE_FORMSPREE_ID', 'https://formspree.io/f/test_id');
    globalFetchMock.mockResolvedValueOnce({ ok: true });
    
    const result = await EmailService.sendContactMessage({
      name: 'Test',
      email: 'test@example.com',
      message: 'Hello'
    });
    
    expect(result.success).toBe(true);
    expect(globalFetchMock).toHaveBeenCalledWith('https://formspree.io/f/test_id', expect.any(Object));
  });

  it('should return error if Formspree request fails (HTTP error)', async () => {
    vi.stubEnv('VITE_FORMSPREE_ID', 'test_id');
    globalFetchMock.mockResolvedValueOnce({ ok: false });
    
    const result = await EmailService.sendContactMessage({
      name: 'Test',
      email: 'test@example.com',
      message: 'Hello'
    });
    
    expect(result.success).toBe(false);
    expect(result.error).toBe('Falha no servidor ao enviar a mensagem.');
  });
  
  it('should return error if fetch throws an exception', async () => {
    vi.stubEnv('VITE_FORMSPREE_ID', 'test_id');
    globalFetchMock.mockRejectedValueOnce(new Error('Network error'));
    
    const result = await EmailService.sendContactMessage({
      name: 'Test',
      email: 'test@example.com',
      message: 'Hello'
    });
    
    expect(result.success).toBe(false);
    expect(result.error).toBe('Não foi possível enviar sua mensagem. Tente novamente mais tarde.');
  });
});
</file>

<file path="src/services/emailService.ts">
/**
 * Email Service - External API Service
 * Encapsulates Formspree integration logic and Supabase message saving.
 */

import { supabase } from './supabaseClient';

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export class EmailService {
  /**
   * Saves message to Supabase and sends contact form data to Formspree endpoint.
   */
  static async sendContactMessage(formData: ContactFormData): Promise<{ success: boolean; error?: string; mailtoFallback?: boolean }> {
    // 1. Save to Supabase (Database Backup / Admin Panel)
    try {
      const { error: dbError } = await supabase
        .from('messages')
        .insert({
          name: formData.name.substring(0, 80),
          email: formData.email.substring(0, 200),
          subject: (formData.subject || '').substring(0, 120),
          message: formData.message.substring(0, 2000)
        });

      if (dbError) {
        console.error('[EmailService] Error saving to Supabase:', dbError);
        // We continue even if DB fails, to try Formspree
      }
    } catch (e) {
      console.error('[EmailService] Supabase exception:', e);
    }

    // 2. Send via Formspree
    let formspreeId = import.meta.env.VITE_FORMSPREE_ID;

    if (!formspreeId) {
      // Return success but indicate that a mailto fallback should be triggered
      return { success: true, mailtoFallback: true };
    }

    // Sanitize in case full URL was passed
    if (formspreeId.includes('formspree.io/f/')) {
      formspreeId = formspreeId.split('formspree.io/f/').pop()?.trim() || formspreeId;
    }

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        return { success: false, error: 'Falha no servidor ao enviar a mensagem.' };
      }

      return { success: true };
    } catch (error) {
      console.error('[EmailService] Error sending email:', error);
      return { success: false, error: 'Não foi possível enviar sua mensagem. Tente novamente mais tarde.' };
    }
  }

  /**
   * Retrieves messages from Supabase (for admin panel)
   */
  static async getMessages() {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw new Error(error.message);
    return data;
  }

  /**
   * Deletes a message from Supabase
   */
  static async deleteMessage(id: string) {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id);
    
    if (error) throw new Error(error.message);
  }
}
</file>

<file path="src/services/githubService.ts">
export const GithubService = {
  async importRepository(repoUrl: string) {
    try {
      const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
      if (!match) {
        throw new Error('URL do GitHub inválida. Use o formato: https://github.com/usuario/repositorio');
      }

      const [, owner, repo] = match;
      const cleanRepo = repo.replace(/\.git$/, '');

      const response = await fetch(`https://api.github.com/repos/${owner}/${cleanRepo}`);
      
      if (!response.ok) {
        if (response.status === 404) throw new Error('Repositório não encontrado (ou é privado).');
        if (response.status === 403) throw new Error('Limite de requisições da API do GitHub atingido.');
        throw new Error('Falha ao comunicar com a API do GitHub.');
      }

      const data = await response.json();

      const techs = [];
      if (data.language) techs.push(data.language);
      if (data.topics && Array.isArray(data.topics)) {
        // Pega até 4 tópicos relevantes
        techs.push(...data.topics.slice(0, 4));
      }

      return {
        title: data.name,
        description: data.description || '',
        githubUrl: data.html_url,
        demoUrl: data.homepage || '',
        techs: techs.length > 0 ? techs : ['GitHub']
      };
    } catch (error: any) {
      throw new Error(error.message || 'Erro ao importar repositório.');
    }
  }
};
</file>

<file path="src/services/projectService.ts">
import { supabase } from './supabaseClient';
import type { Project } from '../types';

export const ProjectService = {
  async getProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('position', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar projetos:', error);
      throw new Error('Não foi possível carregar os projetos.');
    }
    
    // Mapear snake_case para camelCase
    return data.map(p => ({
      id: p.id,
      title: p.title,
      description: p.description,
      fullDescription: p.full_description,
      category: p.category,
      techs: p.techs || [],
      githubUrl: p.github_url,
      demoUrl: p.demo_url,
      imageUrl: p.image_url,
      featured: p.featured,
      visible: p.visible,
      position: p.position
    }));
  },

  async createProject(project: Omit<Project, 'id'>): Promise<Project | null> {
    const dbProject = {
      title: project.title,
      description: project.description,
      full_description: project.fullDescription,
      category: project.category,
      techs: project.techs,
      github_url: project.githubUrl,
      demo_url: project.demoUrl,
      image_url: project.imageUrl,
      featured: project.featured,
      visible: project.visible !== undefined ? project.visible : true,
      position: project.position || 0
    };

    const { data, error } = await supabase
      .from('projects')
      .insert(dbProject)
      .select()
      .single();

    if (error || !data) {
      console.error('Erro ao criar projeto:', error);
      return null;
    }

    return {
      ...project,
      id: data.id,
      visible: data.visible,
      position: data.position
    } as Project;
  },

  async updateProject(project: Project): Promise<boolean> {
    const dbProject = {
      title: project.title,
      description: project.description,
      full_description: project.fullDescription,
      category: project.category,
      techs: project.techs,
      github_url: project.githubUrl,
      demo_url: project.demoUrl,
      image_url: project.imageUrl,
      featured: project.featured,
      visible: project.visible,
      position: project.position
    };

    const { error } = await supabase
      .from('projects')
      .update(dbProject)
      .eq('id', project.id);

    if (error) {
      console.error('Erro ao atualizar projeto:', error);
      return false;
    }
    return true;
  },

  async deleteProject(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao excluir projeto:', error);
      return false;
    }
    return true;
  },

  async updatePositions(updates: { id: string; position: number }[]): Promise<boolean> {
    // Para simplificar, faremos requisições individuais em paralelo.
    // Em produção com muitos dados, seria melhor usar uma RPC (stored procedure).
    const promises = updates.map(u => 
      supabase.from('projects').update({ position: u.position }).eq('id', u.id)
    );
    
    const results = await Promise.all(promises);
    const hasError = results.some(r => r.error);
    
    if (hasError) {
      console.error('Erro ao atualizar ordenação.');
      return false;
    }
    return true;
  }
};
</file>

<file path="src/main.tsx">
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from './components/ui/ErrorBoundary'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
</file>

<file path="supabase/schema.sql">
-- Configurações do site (linha única)
create table site_settings (
  id int primary key default 1 check (id = 1),
  name text, role text, status_badge text,
  hero_title_prefix text, hero_title_highlight text, hero_description text,
  about_bio text,
  academic_title text, academic_institution text, academic_period text,
  tech_pillar1_title text, tech_pillar1_desc text,
  tech_pillar2_title text, tech_pillar2_desc text,
  email text, github_url text, linkedin_url text,
  projects_title text, projects_subtitle text,
  skills_title text, skills_subtitle text,
  contact_title text, contact_subtitle text,
  footer_text text,
  updated_at timestamptz default now()
);

-- Projetos / repositórios
create table projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  full_description text,
  category text not null
    check (category in ('Frontend','Fullstack','Backend','Mobile','IHC / UX')),
  techs text[] not null default '{}',
  github_url text, demo_url text, image_url text,
  featured boolean not null default false,
  visible boolean not null default true,
  position int not null default 0,
  created_at timestamptz not null default now()
);

-- Categorias e skills
create table skill_categories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  icon text not null default 'Layers',
  color text not null default 'indigo',
  position int not null default 0
);

create table skills (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references skill_categories(id) on delete cascade,
  name text not null,
  level text not null
    check (level in ('Iniciante','Intermediário','Intermediário+','Avançado')),
  description text,
  position int not null default 0
);

-- Mensagens de contato
create table messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) <= 80),
  email text not null check (char_length(email) <= 200),
  subject text check (char_length(subject) <= 120),
  message text not null check (char_length(message) <= 2000),
  created_at timestamptz not null default now()
);

-- Políticas RLS
do $$
declare t text;
begin
  foreach t in array array['site_settings','projects','skill_categories','skills']
  loop
    execute format('alter table %I enable row level security', t);
    
    if t = 'projects' then
      execute format('create policy "leitura publica" on %I for select using (visible or auth.uid() = ''bb22c400-e89a-4943-9073-ce81fa4703c2'')', t);
    else
      execute format('create policy "leitura publica" on %I for select using (true)', t);
    end if;

    -- ATENÇÃO: Substitua <SEU-UUID> pelo ID do administrador criado no Supabase Auth
    execute format(
      'create policy "escrita admin" on %I for all
         using (auth.uid() = ''bb22c400-e89a-4943-9073-ce81fa4703c2'')
         with check (auth.uid() = ''bb22c400-e89a-4943-9073-ce81fa4703c2'')', t);
  end loop;
end $$;

-- RLS para Mensagens
alter table messages enable row level security;
create policy "insert publico" on messages for insert with check (true);
create policy "leitura admin"  on messages for select using (auth.uid() = 'bb22c400-e89a-4943-9073-ce81fa4703c2');
create policy "delete admin"   on messages for delete using (auth.uid() = 'bb22c400-e89a-4943-9073-ce81fa4703c2');
</file>

<file path="supabase/seed.ts">
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { resolve } from 'path';

// Carrega as variáveis de ambiente do .env.local baseado na pasta raiz do projeto
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Para seed usamos a Service Role Key para ignorar RLS

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ VITE_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não encontrados no .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// --- Dados Iniciais ---
const defaultProfileData = {
  name: 'Leonardo Nascimento',
  role: 'Desenvolvedor Backend Python',
  status_badge: 'Python & FastAPI',
  hero_title_prefix: 'Desenvolvedor de Software',
  hero_title_highlight: 'Backend Python & Frontend Web',
  hero_description: 'Olá! Sou Leonardo Nascimento, estudante de Análise e Desenvolvimento de Sistemas no CESMAC. Crio APIs RESTful de alta performance e microsserviços com Python (FastAPI), além de desenvolver interfaces e aplicações web modernas e responsivas com TypeScript, JavaScript e React. Trabalho com modelagem de dados, Docker e integrações assíncronas, sempre com foco em arquitetura eficiente, código limpo e sistemas altamente escaláveis.',
  about_bio: 'Estudante de Análise e Desenvolvimento de Sistemas no CESMAC com foco prático no ecossistema Python com FastAPI. Desenvolvo APIs RESTful de alta performance, aplicando arquitetura limpa, validação estrita de dados com Pydantic v2 e integração eficiente com soluções web.',
  academic_title: 'Análise e Desenvolvimento de Sistemas',
  academic_institution: 'CESMAC - Centro Universitário CESMAC',
  academic_period: '4º Período de 6 (2024 - 2026)',
  tech_pillar1_title: 'Python & FastAPI',
  tech_pillar1_desc: 'Construção de APIs assíncronas de alta concorrência com Pydantic v2 e SQLAlchemy.',
  tech_pillar2_title: 'Interfaces & Usabilidade',
  tech_pillar2_desc: 'Integração com frontends React/TypeScript mantendo excelente experiência de usuário.',
  email: 'seu.email@exemplo.com',
  github_url: 'https://github.com/leonardonasls',
  linkedin_url: 'https://linkedin.com/in/leonardonasls',
  projects_title: 'Projetos em Destaque',
  projects_subtitle: 'Uma seleção dos meus melhores trabalhos.',
  skills_title: 'Tecnologias & Princípios de Usabilidade',
  skills_subtitle: 'Stack tecnológica completa combinada com boas práticas de UX.',
  contact_title: 'Entre em Contato',
  contact_subtitle: 'Vamos conversar sobre projetos, vagas ou apenas trocar ideias sobre tecnologia.',
  footer_text: '© 2026 Leonardo Nascimento. Todos os direitos reservados.'
};

const initialProjects = [
  {
    title: 'Portfólio Pessoal (Este Site)',
    description: 'Um portfólio completo com painel administrativo (mini-CMS) para gestão de conteúdo dinâmico, desenvolvido com React, TypeScript, Tailwind CSS e Framer Motion. Integração com banco de dados para edição de projetos, habilidades e perfil diretamente na interface sem necessidade de alterar o código.',
    category: 'Frontend',
    techs: ['React', 'TypeScript', 'Tailwind', 'Vite', 'Framer Motion'],
    github_url: 'https://github.com/seu-usuario/portfolio',
    demo_url: 'https://seu-portfolio.vercel.app',
    featured: true,
    visible: true,
    position: 0
  },
  {
    title: 'API de Gestão Financeira',
    description: 'Uma API RESTful robusta para controle de finanças pessoais. Permite cadastro de receitas, despesas, categorização, geração de relatórios mensais e autenticação JWT.',
    category: 'Backend',
    techs: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Docker'],
    github_url: 'https://github.com/seu-usuario/api-financas',
    demo_url: null,
    featured: true,
    visible: true,
    position: 1
  }
];

const techCategories = [
  {
    title: 'Frontend & UI',
    icon: 'Layers',
    color: 'indigo',
    position: 0,
    skills: [
      { name: 'React 19', level: 'Avançado', description: 'SPA modular & Context API', position: 0 },
      { name: 'TypeScript', level: 'Intermediário+', description: 'Tipagem estática segura', position: 1 },
      { name: 'Tailwind CSS', level: 'Avançado', description: 'Estilização ágil e responsiva', position: 2 },
      { name: 'Vite', level: 'Avançado', description: 'Build ultra-rápido & HMR', position: 3 },
      { name: 'Framer Motion', level: 'Intermediário', description: 'Animações fluidas de IHC', position: 4 }
    ]
  },
  {
    title: 'Backend & Ecossistema Python',
    icon: 'Cpu',
    color: 'emerald',
    position: 1,
    skills: [
      { name: 'Python 3.12', level: 'Avançado', description: 'Linguagem principal backend & scripts', position: 0 },
      { name: 'FastAPI', level: 'Avançado', description: 'Framework RESTful assíncrono de alta performance', position: 1 },
      { name: 'Pydantic v2', level: 'Avançado', description: 'Validação de dados e schemas tipados', position: 2 },
      { name: 'SQLAlchemy / Async', level: 'Intermediário+', description: 'ORM e persistência assíncrona com PostgreSQL', position: 3 },
      { name: 'Docker', level: 'Intermediário', description: 'Containerização de aplicações e APIs', position: 4 }
    ]
  }
];

async function seed() {
  console.log('🚀 Iniciando seed do banco de dados...');

  // 1. Inserir Site Settings
  const { error: settingsError } = await supabase
    .from('site_settings')
    .upsert({ id: 1, ...defaultProfileData });

  if (settingsError) console.error('Erro em site_settings:', settingsError);
  else console.log('✅ site_settings inserido/atualizado.');

  // 2. Inserir Projetos
  for (const project of initialProjects) {
    const { error } = await supabase.from('projects').insert(project);
    if (error) console.error(`Erro ao inserir projeto ${project.title}:`, error);
    else console.log(`✅ Projeto ${project.title} inserido.`);
  }

  // 3. Inserir Categorias e Skills
  for (const cat of techCategories) {
    const { data: catData, error: catError } = await supabase
      .from('skill_categories')
      .insert({ title: cat.title, icon: cat.icon, color: cat.color, position: cat.position })
      .select('id')
      .single();

    if (catError || !catData) {
      console.error(`Erro ao inserir categoria ${cat.title}:`, catError);
      continue;
    }

    console.log(`✅ Categoria ${cat.title} inserida.`);

    const skillsToInsert = cat.skills.map(skill => ({
      category_id: catData.id,
      name: skill.name,
      level: skill.level,
      description: skill.description,
      position: skill.position
    }));

    const { error: skillError } = await supabase.from('skills').insert(skillsToInsert);
    if (skillError) console.error(`Erro ao inserir skills da categoria ${cat.title}:`, skillError);
    else console.log(`✅ Skills da categoria ${cat.title} inseridas.`);
  }

  console.log('🎉 Seed concluído! (Verifique os erros acima, caso o RLS tenha bloqueado as inserções, talvez seja necessário usar a Service Role Key ou desativar o RLS temporariamente)');
}

seed();
</file>

<file path=".gitignore">
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
.env
</file>

<file path="tsconfig.app.json">
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client"],
    "allowArbitraryExtensions": true,
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
</file>

<file path=".github/workflows/ci.yml">
name: CI — Integration & Build Check

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    name: Build & Verify Code
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run Linter (OxLint)
        run: npm run lint

      - name: Build Application
        run: npm run build

      - name: Run Tests
        run: npm run test
</file>

<file path="src/components/admin/AdminTabsNav.tsx">
import React from 'react';
import { FolderKanban, FileText, Mail } from 'lucide-react';

interface AdminTabsNavProps {
  activeTab: 'projects' | 'profile' | 'skills' | 'messages';
  setActiveTab: (tab: 'projects' | 'profile' | 'skills' | 'messages') => void;
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

      <button
        onClick={() => setActiveTab('skills')}
        className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
          activeTab === 'skills'
            ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
            : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
        }`}
      >
        <FileText className="w-4 h-4" />
        <span>Habilidades / Techs</span>
      </button>

      <button
        onClick={() => setActiveTab('messages')}
        className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
          activeTab === 'messages'
            ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
            : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
        }`}
      >
        <Mail className="w-4 h-4" />
        <span>Mensagens</span>
      </button>
    </div>
  );
};
</file>

<file path="src/components/admin/ProfileFormTab.tsx">
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
        <h4 className="text-sm font-bold text-violet-400 flex items-center gap-2 border-b border-slate-800 pb-2">
          <GraduationCap className="w-4 h-4" />
          <span>Formação Acadêmica & Instituição</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Curso / Formação *</label>
            <input
              type="text"
              value={profileForm.academicTitle}
              onChange={(e) => setProfileForm({ ...profileForm, academicTitle: e.target.value })}
              required
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Instituição *</label>
            <select
              value={profileForm.academicInstitution}
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

          <div className="space-y-1 sm:col-span-2">
            <label className="text-xs font-semibold text-slate-300">Período / Status *</label>
            <input
              type="text"
              value={profileForm.academicPeriod}
              onChange={(e) => setProfileForm({ ...profileForm, academicPeriod: e.target.value })}
              placeholder="Ex: 4º Período de 6 (2024 - 2026) ou Concluído (2023)"
              required
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h4 className="text-sm font-bold text-blue-400 flex items-center gap-2 border-b border-slate-800 pb-2">
          <FileText className="w-4 h-4" />
          <span>Links e Contato</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">E-mail *</label>
            <input
              type="email"
              value={profileForm.email || ''}
              onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
              required
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">URL GitHub *</label>
            <input
              type="url"
              value={profileForm.githubUrl || ''}
              onChange={(e) => setProfileForm({ ...profileForm, githubUrl: e.target.value })}
              required
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">URL LinkedIn *</label>
            <input
              type="url"
              value={profileForm.linkedinUrl || ''}
              onChange={(e) => setProfileForm({ ...profileForm, linkedinUrl: e.target.value })}
              required
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2 border-b border-slate-800 pb-2">
          <FileText className="w-4 h-4" />
          <span>Títulos das Seções & Rodapé</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Título - Projetos</label>
            <input
              type="text"
              value={profileForm.projectsTitle || ''}
              onChange={(e) => setProfileForm({ ...profileForm, projectsTitle: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Subtítulo - Projetos</label>
            <input
              type="text"
              value={profileForm.projectsSubtitle || ''}
              onChange={(e) => setProfileForm({ ...profileForm, projectsSubtitle: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Título - Skills</label>
            <input
              type="text"
              value={profileForm.skillsTitle || ''}
              onChange={(e) => setProfileForm({ ...profileForm, skillsTitle: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Subtítulo - Skills</label>
            <input
              type="text"
              value={profileForm.skillsSubtitle || ''}
              onChange={(e) => setProfileForm({ ...profileForm, skillsSubtitle: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Título - Contato</label>
            <input
              type="text"
              value={profileForm.contactTitle || ''}
              onChange={(e) => setProfileForm({ ...profileForm, contactTitle: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Subtítulo - Contato</label>
            <input
              type="text"
              value={profileForm.contactSubtitle || ''}
              onChange={(e) => setProfileForm({ ...profileForm, contactSubtitle: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>

        <div className="space-y-1 pt-2">
          <label className="text-xs font-semibold text-slate-300">Texto do Rodapé (Footer)</label>
          <input
            type="text"
            value={profileForm.footerText || ''}
            onChange={(e) => setProfileForm({ ...profileForm, footerText: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400"
          />
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
</file>

<file path="src/components/admin/ProjectFormModal.tsx">
import React, { useState } from 'react';
import type { ProjectCategory } from '../../types';
import { GithubService } from '../../services/githubService';
import { GithubIcon } from '../ui/SocialIcons';
import { Loader2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

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
  visible: boolean;
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
  const { addToast } = useToast();
  const [importUrl, setImportUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  const handleGithubImport = async () => {
    if (!importUrl) {
      addToast('error', 'URL Inválida', 'Insira uma URL do GitHub para importar.');
      return;
    }

    setIsImporting(true);
    try {
      const data = await GithubService.importRepository(importUrl);
      setFormData(prev => ({
        ...prev,
        title: prev.title || data.title,
        description: prev.description || data.description,
        githubUrl: data.githubUrl,
        demoUrl: prev.demoUrl || data.demoUrl,
        techsInput: prev.techsInput ? `${prev.techsInput}, ${data.techs.join(', ')}` : data.techs.join(', ')
      }));
      addToast('success', 'Repositório Importado', 'Os campos foram preenchidos com os dados do GitHub.');
      setImportUrl('');
    } catch (error: any) {
      addToast('error', 'Erro na Importação', error.message);
    } finally {
      setIsImporting(false);
    }
  };

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

      {!isEditing && (
        <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-3">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
            <GithubIcon className="w-4 h-4 text-slate-400" />
            <span>Importar do GitHub (Preenchimento Automático)</span>
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              value={importUrl}
              onChange={(e) => setImportUrl(e.target.value)}
              placeholder="Ex: https://github.com/usuario/repositorio"
              className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-100 text-xs focus:ring-2 focus:ring-emerald-400"
            />
            <button
              type="button"
              onClick={handleGithubImport}
              disabled={isImporting}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-2 disabled:opacity-50"
            >
              {isImporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Importar'}
            </button>
          </div>
        </div>
      )}

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
            <label className="text-xs font-semibold text-slate-300">Link Repositório GitHub (Opcional)</label>
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

        <div className="flex items-center gap-6 pt-1">
          <div className="flex items-center gap-2">
            <input
              id="proj-featured"
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-400 bg-slate-950 border-slate-800"
            />
            <label htmlFor="proj-featured" className="text-xs font-medium text-slate-300">
              Em Destaque
            </label>
          </div>
          
          <div className="flex items-center gap-2">
            <input
              id="proj-visible"
              type="checkbox"
              checked={formData.visible !== false}
              onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-400 bg-slate-950 border-slate-800"
            />
            <label htmlFor="proj-visible" className="text-xs font-medium text-slate-300">
              Visível na Vitrine
            </label>
          </div>
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
</file>

<file path="src/components/portfolio/AboutSection.tsx">
import React from 'react';
import { User, GraduationCap, Award, Check, Code, Eye } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';

export const AboutSection: React.FC = () => {
  const { profile } = useProfile();

  // Extract initials from name for avatar badge
  const initials = profile.name
    ? profile.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'LS';

  return (
    <section id="sobre" className="py-20 bg-slate-950/60 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <User className="w-3.5 h-3.5" />
            <span>Apresentação & Formação</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Sobre o Desenvolvedor
          </h2>
          <p className="text-slate-400 text-base">
            Desenvolvedor apaixonado por resolver problemas reais com código limpo, arquitetura sólida e experiências de usuário que realmente funcionam.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card Profile / Bio (7 cols) */}
          <div className="lg:col-span-7 glass-panel p-8 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-4">
              <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-500/20">
                  {initials}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{profile.name}</h3>
                  <p className="text-sm text-emerald-400 font-medium">{profile.role}</p>
                  <p className="text-xs text-slate-400">Python &amp; FastAPI Developer</p>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                {profile.aboutBio}
              </p>

              {/* Key Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-1">
                    <Code className="w-4 h-4" />
                    <span>{profile.techPillar1Title}</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {profile.techPillar1Desc}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm mb-1">
                    <Eye className="w-4 h-4" />
                    <span>{profile.techPillar2Title}</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    {profile.techPillar2Desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Checklists */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Responsivo (Mobile First)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Navegação por Teclado</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Semântica HTML5</span>
              </div>
            </div>
          </div>

          {/* Academic & Timeline Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                <GraduationCap className="w-5 h-5" />
                <span>Formação &amp; Experiência</span>
              </div>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1">
                  <div className="flex justify-between items-center text-white font-semibold">
                    <span>{profile.academicTitle || 'Análise e Desenvolvimento de Sistemas'}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300">{profile.academicPeriod || '2024 - 2026'}</span>
                  </div>
                  <p className="text-slate-400 font-medium text-[11px] text-indigo-300/90">
                    🏛️ {profile.academicInstitution || 'CESMAC - Centro Universitário CESMAC'}
                  </p>
                  <p className="text-slate-400">Ênfase em Engenharia de Software, Web e IHC.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1">
                  <div className="flex justify-between items-center text-white font-semibold">
                    <span>Cursos Complementares & Bootcamp Fullstack</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-300">Concluído</span>
                  </div>
                  <p className="text-slate-400">React, TypeScript, Node.js, Design Systems e Acessibilidade Web.</p>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Award className="w-5 h-5" />
                <span>Objetivos Profissionais</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5" />
                  <span>Construir soluções backend robustas e de alta disponibilidade.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5" />
                  <span>Contribuir com projetos open source e comunidades de Python.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5" />
                  <span>Crescer em ambientes ágeis com código limpo e boas práticas de engenharia.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
</file>

<file path="src/components/portfolio/ProjectCard.tsx">
import React from 'react';
import type { Project } from '../../types';
import { ExternalLink, Info, Star, Calendar } from 'lucide-react';
import { GithubIcon } from '../ui/SocialIcons';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect }) => {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between text-left group relative border border-slate-800"
    >
      <div>
        {/* Project Thumbnail Image with Category Badge */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-900">
          <img
            src={project.imageUrl}
            alt={`Captura de tela do projeto ${project.title}`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80';
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          
          {/* Category Tag */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-950/80 backdrop-blur-md text-indigo-300 border border-indigo-500/30 shadow-md">
              {project.category}
            </span>
          </div>

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-3 right-3">
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 backdrop-blur-md text-amber-300 border border-amber-500/40">
                <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                <span>Destaque</span>
              </span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <Calendar className="w-3.5 h-3.5" />
            <span>{project.createdAt}</span>
          </div>

          <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
            {project.title}
          </h3>

          <p className="text-slate-300 text-xs leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.techs.map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-800/80 text-slate-300 border border-slate-700/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Action Buttons (IHC Affordance) */}
      <div className="p-6 pt-0 mt-2 flex items-center justify-between border-t border-slate-800/60 pt-4">
        <button
          onClick={() => onSelect(project)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded px-1"
          aria-label={`Ver detalhes do projeto ${project.title}`}
        >
          <Info className="w-4 h-4" />
          <span>Detalhes</span>
        </button>

        <div className="flex items-center gap-2">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
              title="GitHub"
              aria-label={`Abrir repositório GitHub do projeto ${project.title}`}
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          ) : (
            <div 
              className="p-2 rounded-lg bg-slate-900/50 text-slate-500 border border-slate-800/50 cursor-not-allowed flex items-center gap-1.5"
              title="Repositório Privado"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
          )}

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-600/30 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
              title="Ver Demonstração Online"
              aria-label={`Abrir demonstração online do projeto ${project.title}`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};
</file>

<file path="src/services/settingsService.ts">
import { supabase } from './supabaseClient';
import type { ProfileData } from '../types/profile';
import { defaultProfileData } from '../types/profile';

// Função para converter do formato do DB (snake_case) para o front (camelCase)
const mapDbToProfile = (dbData: any): ProfileData => {
  return {
    name: dbData.name || defaultProfileData.name,
    role: dbData.role || defaultProfileData.role,
    statusBadge: dbData.status_badge || defaultProfileData.statusBadge,
    heroTitlePrefix: dbData.hero_title_prefix || defaultProfileData.heroTitlePrefix,
    heroTitleHighlight: dbData.hero_title_highlight || defaultProfileData.heroTitleHighlight,
    heroDescription: dbData.hero_description || defaultProfileData.heroDescription,
    aboutBio: dbData.about_bio || defaultProfileData.aboutBio,
    academicTitle: dbData.academic_title || defaultProfileData.academicTitle,
    academicInstitution: dbData.academic_institution || defaultProfileData.academicInstitution,
    academicPeriod: dbData.academic_period || defaultProfileData.academicPeriod,
    techPillar1Title: dbData.tech_pillar1_title || defaultProfileData.techPillar1Title,
    techPillar1Desc: dbData.tech_pillar1_desc || defaultProfileData.techPillar1Desc,
    techPillar2Title: dbData.tech_pillar2_title || defaultProfileData.techPillar2Title,
    techPillar2Desc: dbData.tech_pillar2_desc || defaultProfileData.techPillar2Desc,
    email: dbData.email || defaultProfileData.email,
    githubUrl: dbData.github_url || defaultProfileData.githubUrl,
    linkedinUrl: dbData.linkedin_url || defaultProfileData.linkedinUrl,
    projectsTitle: dbData.projects_title || defaultProfileData.projectsTitle,
    projectsSubtitle: dbData.projects_subtitle || defaultProfileData.projectsSubtitle,
    skillsTitle: dbData.skills_title || defaultProfileData.skillsTitle,
    skillsSubtitle: dbData.skills_subtitle || defaultProfileData.skillsSubtitle,
    contactTitle: dbData.contact_title || defaultProfileData.contactTitle,
    contactSubtitle: dbData.contact_subtitle || defaultProfileData.contactSubtitle,
    footerText: dbData.footer_text || defaultProfileData.footerText,
  };
};

// Converte do front (camelCase) para o banco (snake_case)
const mapProfileToDb = (profile: Partial<ProfileData>) => {
  return {
    name: profile.name,
    role: profile.role,
    status_badge: profile.statusBadge,
    hero_title_prefix: profile.heroTitlePrefix,
    hero_title_highlight: profile.heroTitleHighlight,
    hero_description: profile.heroDescription,
    about_bio: profile.aboutBio,
    academic_title: profile.academicTitle,
    academic_institution: profile.academicInstitution,
    academic_period: profile.academicPeriod,
    tech_pillar1_title: profile.techPillar1Title,
    tech_pillar1_desc: profile.techPillar1Desc,
    tech_pillar2_title: profile.techPillar2Title,
    tech_pillar2_desc: profile.techPillar2Desc,
    email: profile.email,
    github_url: profile.githubUrl,
    linkedin_url: profile.linkedinUrl,
    projects_title: profile.projectsTitle,
    projects_subtitle: profile.projectsSubtitle,
    skills_title: profile.skillsTitle,
    skills_subtitle: profile.skillsSubtitle,
    contact_title: profile.contactTitle,
    contact_subtitle: profile.contactSubtitle,
    footer_text: profile.footerText,
  };
};

export const SettingsService = {
  async getSettings(): Promise<ProfileData> {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 1)
      .single();

    if (error || !data) {
      console.error('Erro ao buscar configurações:', error);
      throw new Error('Não foi possível carregar as configurações do perfil.');
    }
    
    return mapDbToProfile(data);
  },

  async updateSettings(settings: Partial<ProfileData>): Promise<boolean> {
    const dbData = mapProfileToDb(settings);
    // Remove os campos undefined para não sobrescrever com null indesejado
    Object.keys(dbData).forEach(key => (dbData as any)[key] === undefined && delete (dbData as any)[key]);
    
    (dbData as any).updated_at = new Date().toISOString();

    const { error } = await supabase
      .from('site_settings')
      .update(dbData)
      .eq('id', 1);

    if (error) {
      console.error('Erro ao atualizar configurações:', error);
      return false;
    }
    return true;
  }
};
</file>

<file path="src/App.tsx">
import React, { useState } from 'react';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';
import { ProfileProvider } from './context/ProfileContext';
import { SkillProvider } from './context/SkillContext';

import { ToastContainer } from './components/ui/ToastContainer';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/portfolio/Hero';
import { AboutSection } from './components/portfolio/AboutSection';
import { TechStack } from './components/portfolio/TechStack';
import { ProjectGrid } from './components/portfolio/ProjectGrid';
import { ContactSection } from './components/portfolio/ContactSection';
import { Footer } from './components/layout/Footer';

const LoginModal = React.lazy(() => import('./components/admin/LoginModal').then(module => ({ default: module.LoginModal })));
const AdminDashboardModal = React.lazy(() => import('./components/admin/AdminDashboardModal').then(module => ({ default: module.AdminDashboardModal })));

const PortfolioApp: React.FC = () => {
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white flex flex-col font-sans">
      <ToastContainer />
      
      {/* Navigation Header */}
      <Navbar onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)} />

      {/* Main Sections */}
      <main className="flex-grow">
        <Hero />
        <AboutSection />
        <TechStack />
        <ProjectGrid />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modais */}
      <React.Suspense fallback={null}>
        <LoginModal />
        <AdminDashboardModal
          isOpen={isAdminDashboardOpen}
          onClose={() => setIsAdminDashboardOpen(false)}
        />
      </React.Suspense>
    </div>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <ProjectProvider>
          <SkillProvider>
            <ProfileProvider>
              <PortfolioApp />
            </ProfileProvider>
          </SkillProvider>
        </ProjectProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
</file>

<file path="src/index.css">
@import "tailwindcss";
@import "@fontsource/inter";

@layer base {
  :root {
    --font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  }
  
  html {
    scroll-behavior: smooth;
    font-family: var(--font-sans);
  }

  body {
    background-color: #090d16;
    color: #f1f5f9;
    min-height: 100vh;
  }
}

/* Explicit RGB color overrides for WCAG Accessibility & axe-core compatibility */
.bg-slate-950 { background-color: #020617 !important; }
.bg-slate-900 { background-color: #0f172a !important; }
.bg-slate-800 { background-color: #1e293b !important; }
.bg-emerald-950 { background-color: #022c22 !important; }
.text-purple-300 { color: #e9d5ff !important; }
.text-purple-200 { color: #f3e8ff !important; }
.text-indigo-300 { color: #c7d2fe !important; }
.text-indigo-200 { color: #e0e7ff !important; }
.text-blue-300 { color: #bfdbfe !important; }
.text-blue-200 { color: #dbeafe !important; }
.text-emerald-300 { color: #a7f3d0 !important; }
.text-emerald-200 { color: #d1fae5 !important; }
.text-teal-300 { color: #99f6e4 !important; }
.text-amber-300 { color: #fde68a !important; }
.text-amber-200 { color: #fef3c7 !important; }
.text-slate-500 { color: #94a3b8 !important; }
.text-slate-400 { color: #cbd5e1 !important; }
.text-slate-300 { color: #e2e8f0 !important; }
.text-slate-200 { color: #f1f5f9 !important; }

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.6);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb {
  background: #334155;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}
::-webkit-scrollbar-thumb:hover {
  background: #10b981;
}

/* Glassmorphism Utilities */
.glass-panel {
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.glass-card {
  background: rgba(30, 41, 59, 0.5);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card:hover {
  border-color: rgba(99, 102, 241, 0.4);
  box-shadow: 0 10px 30px -10px rgba(99, 102, 241, 0.25);
  transform: translateY(-3px);
}
</file>

<file path="src/components/admin/LoginModal.tsx">
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, X, Key, Info, ArrowRight, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    setErrorMsg('');
    const success = await login(email, password);
    if (success) {
      setEmail('');
      setPassword('');
      setErrorMsg('');
    } else {
      setErrorMsg('Falha no login. Verifique seu e-mail e senha.');
    }
    setIsLoading(false);
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
                Acesso de Administrador
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
            O modo Administrador permite gerenciar os projetos, textos e habilidades do portfólio de forma dinâmica.
          </p>

          {/* Quick Demo Hint */}
          <div className="p-3 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-xs text-indigo-200 mb-4 flex items-start gap-2">
            <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <span>
              <strong>Acesso restrito:</strong> Faça login com o seu e-mail e senha configurados no Supabase.
            </span>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="admin-email" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span>E-mail</span>
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                autoFocus
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="admin-passcode" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-indigo-400" />
                <span>Senha</span>
              </label>
              <input
                id="admin-passcode"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha secreta..."
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
                disabled={isLoading}
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isLoading ? 'Autenticando...' : 'Entrar como Admin'}</span>
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
</file>

<file path="src/components/layout/Navbar.tsx">
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../context/ProfileContext';
import { Code2, ShieldCheck, LogOut, Menu, X, PlusCircle } from 'lucide-react';

interface NavbarProps {
  onOpenAdminDashboard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdminDashboard }) => {
  const { user, setIsLoginModalOpen, logout } = useAuth();
  const { profile } = useProfile();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['inicio', 'sobre', 'habilidades', 'projetos', 'contato'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'inicio', label: 'Início' },
    { id: 'sobre', label: 'Sobre Mim' },
    { id: 'habilidades', label: 'Habilidades' },
    { id: 'projetos', label: 'Projetos' },
    { id: 'contato', label: 'Contato' },
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass-panel py-3 shadow-lg shadow-black/40 border-b border-slate-800/80' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('inicio');
          }}
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-lg p-1"
          aria-label="Ir para o início do portfólio"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Code2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-white tracking-tight leading-none group-hover:text-indigo-400 transition-colors">
              {profile.name || 'Leonardo Nascimento'}
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
              {profile.role || 'Python & FastAPI Dev'}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 glass-card px-3 py-1.5 rounded-full border border-slate-800">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/30 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Controls (Admin / Mode) */}
        <div className="hidden lg:flex items-center gap-3">
          {user.isLoggedIn ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenAdminDashboard}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400"
                title="Abrir Dashboard de Gerenciamento"
              >
                <PlusCircle className="w-4 h-4 text-emerald-400" />
                <span>Dashboard Admin</span>
              </button>

              <button
                onClick={logout}
                className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800/80 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-400"
                title="Sair do modo Admin"
                aria-label="Logout do Modo Administrador"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400"
              title="Área Restrita — Acesso Administrativo"
            >
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Área Restrita</span>
            </button>
          )}

        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center gap-2">
          {!user.isLoggedIn && (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="p-2 rounded-lg bg-slate-800 text-indigo-400 border border-slate-700"
              aria-label="Abrir Login Admin"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-800/80 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-slate-800 px-4 pt-3 pb-5 space-y-2 mt-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeSection === link.id
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
          {user.isLoggedIn && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminDashboard();
              }}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Abrir Gerenciador de Projetos</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
</file>

<file path="src/components/portfolio/ProjectModal.tsx">
import React, { useEffect } from 'react';
import type { Project } from '../../types';
import { X, ExternalLink, Calendar, Tag, Shield } from 'lucide-react';
import { GithubIcon } from '../ui/SocialIcons';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence mode="wait">
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-panel w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-800 shadow-2xl text-left relative my-8"
        >
          {/* Modal Header Media */}
          <div className="relative h-64 w-full bg-slate-900">
            <img
              src={project.imageUrl}
              alt={project.title}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80';
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white border border-slate-700 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors"
              aria-label="Fechar detalhes do projeto"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-md">
                {project.category}
              </span>
              <div className="flex items-center gap-2 text-xs text-slate-300 font-mono bg-slate-950/70 px-3 py-1 rounded-full border border-slate-800">
                <Calendar className="w-3.5 h-3.5" />
                <span>Criado em: {project.createdAt}</span>
              </div>
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h3 id="modal-project-title" className="text-2xl sm:text-3xl font-extrabold text-white">
                {project.title}
              </h3>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                {project.fullDescription || project.description}
              </p>
            </div>

            {/* Technologies */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-indigo-400" />
                <span>Tecnologias & Ferramentas</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techs.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-900 text-indigo-300 border border-slate-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* UX/Usabilidade applied to this project */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <Shield className="w-4 h-4" />
                <span>Boas Práticas de UX & Usabilidade</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Este projeto atende aos requisitos de responsividade, hierarquia visual de tipografia, leitores de tela e estados de feedback imediato ao usuário.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>Ver Repositório GitHub</span>
                  </a>
                ) : (
                  <div className="px-4 py-2.5 rounded-xl bg-slate-900/50 text-slate-500 border border-slate-800/50 text-xs font-semibold flex items-center gap-2 cursor-not-allowed">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    <span>Repositório Privado</span>
                  </div>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-indigo-600/30 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Acessar Demo On-line</span>
                  </a>
                )}
              </div>

              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white text-xs font-medium transition-colors"
              >
                Fechar janela
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
</file>

<file path="src/types/index.ts">
export type ProjectCategory = 'Frontend' | 'Fullstack' | 'Backend' | 'Mobile' | 'IHC / UX';

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  category: ProjectCategory;
  techs: string[];
  githubUrl?: string;
  demoUrl?: string;
  imageUrl: string;
  featured: boolean;
  visible?: boolean;
  position?: number;
  createdAt?: string;
}

export interface User {
  username: string;
  role: 'admin' | 'guest';
  isLoggedIn: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

export * from './profile';
export * from './skill';
</file>

<file path="CHANGELOG.md">
# 📜 CHANGELOG — Registo de Alterações

Todas as mudanças notáveis neste projeto são documentadas neste arquivo.

> **Regra de Projeto**: Toda nova funcionalidade, correção ou alteração relevante deve obrigatoriamente ser registrada neste changelog acompanhada do **código hash do commit Git** correspondente (`7 caracteres ou hash completo`).

---

## [2.0.0] — 2026-09-29

### 📌 Commit `Supabase CMS Migration` — `feat: migração completa do CMS para o Supabase`
- **Backend as a Service (BaaS):** Substituição completa do `localStorage` pelo **Supabase** (PostgreSQL + Auth).
- **Projetos dinâmicos:** A listagem, adição, edição, exclusão e reordenação de projetos agora reflete o banco de dados em tempo real.
- **Skills dinâmicas:** Criação da tabela de categorias e habilidades. Modificado `TechStack.tsx` para listar diretamente do banco de dados, com painel admin completo para gerenciá-las.
- **Textos e Configurações (Profile):** A biografia, títulos, hero, e links da Home agora são salvos na nuvem via tabela `site_settings`.
- **Formulário de Contato Inteligente:** Adição de honeypot, cooldown, limites de caracteres e integração com banco (`messages`). Adicionado Fallback via `mailto:` se Formspree estiver inativo.
- **Mensagens no Painel Admin:** Nova aba para ler e excluir mensagens recebidas no contato.
- **UX Privado:** Projetos sem link do GitHub recebem um selo visual dinâmico (cadeado "Repositório Privado").

---

## [Unreleased / Recent] — 2026-09-23

### 📌 Commit [`1b57570`](https://github.com/leonardonasls-stack/projeto-integrador-iv-a/commit/1b57570) — `docs: rewrite README with full project analysis`
- **README Completo**: Reescrita completa do [`README.md`](file:///c:/Users/Leo-dev/Projeto%20Integrador%20IV-A/README.md) com análise completa do projeto. Adicionadas seções de: badge de CI, stack de ferramentas de qualidade (Vitest, axe-core, OxLint, GitHub Actions), arquitetura atualizada com todos os 6 componentes admin (`AdminTabsNav`, `ProfileFormTab`, `ProjectFormModal`, `ProjectTable`), seção de Acessibilidade (WCAG com 0 violations), variáveis de ambiente documentadas (`VITE_FORMSPREE_ID` e `VITE_ADMIN_HASH`), pipeline de CI detalhado e testes unitários Vitest.

### 📌 Commit [`1b57570`](https://github.com/leonardonasls-stack/projeto-integrador-iv-a/commit/1b57570) — `Correções de acessibilidade`
- **Footer**: Adicionado `aria-label="Voltar para o topo da página"` ao botão de scroll-to-top e badge de validação WCAG/Nielsen em [`Footer.tsx`](file:///c:/Users/Leo-dev/Projeto%20Integrador%20IV-A/src/components/layout/Footer.tsx).
- **CSS global**: Melhorias em [`index.css`](file:///c:/Users/Leo-dev/Projeto%20Integrador%20IV-A/src/index.css) para garantir contraste e foco visível em elementos interativos.
- **Auditoria axe-core**: **0 violações** detectadas em `npx axe localhost:5173` (axe-core 4.13.0, Chrome headless).

---

## [Unreleased / Recent] — 2026-09-07

### 📌 Commit [`9f526c8`](https://github.com/leonardonasls-stack/projeto-integrador-iv-a/commit/9f526c8) — `feat(hero): atualiza texto de inicio com foco em Backend Python e Frontend Web`
- **Headline Dinâmico no Hero**: Atualizados o título principal e destaque visual em [`Hero.tsx`](file:///c:/Users/Leo-dev/Projeto%20Integrador%20IV-A/src/components/portfolio/Hero.tsx) para renderizar dinamicamente `Backend Python & Frontend Web` a partir do contexto.
- **Formação CESMAC & Cargo**: Atualizados `role`, `statusBadge` e `heroDescription` em [`profile.ts`](file:///c:/Users/Leo-dev/Projeto%20Integrador%20IV-A/src/types/profile.ts) para referenciar a formação em Análise e Desenvolvimento de Sistemas no **CESMAC** e a stack em **Python (FastAPI)**, **TypeScript**, **JavaScript** e **React**.

### 📌 Commit [`6a53f44`](https://github.com/leonardonasls-stack/projeto-integrador-iv-a/commit/6a53f448407a64c044ffa3a8a6bcc46b335edcea) — `feat(profile): adiciona faculdade CESMAC, atualiza links do GitHub e remove mencoes a Java`

#### 🎓 Formação Acadêmica & CESMAC
- **Opções de Instituição**: Adicionada a faculdade **CESMAC (Centro Universitário CESMAC)** como opção oficial de formação nas estruturas do perfil (`ProfileData` e `INSTITUTION_OPTIONS` em [`profile.ts`](file:///c:/Users/Leo-dev/Projeto%20Integrador%20IV-A/src/types/profile.ts)).
- **Painel Admin**: Adicionada a seção *"Formação Acadêmica & Instituição / Faculdade"* no painel administrativo ([`AdminDashboardModal.tsx`](file:///c:/Users/Leo-dev/Projeto%20Integrador%20IV-A/src/components/admin/AdminDashboardModal.tsx)), permitindo selecionar a instituição via dropdown e editar o curso/período.
- **Seção Sobre Mim**: Atualizada a exibição de formação acadêmica em [`AboutSection.tsx`](file:///c:/Users/Leo-dev/Projeto%20Integrador%20IV-A/src/components/portfolio/AboutSection.tsx) para renderizar a faculdade **CESMAC**.

#### 🔗 Links do Perfil GitHub
- Atualizados todos os links sociais e repositórios para o usuário oficial **[`leonardonasls-stack`](https://github.com/leonardonasls-stack)** nos componentes [`Hero.tsx`](file:///c:/Users/Leo-dev/Projeto%20Integrador%20IV-A/src/components/portfolio/Hero.tsx), [`Footer.tsx`](file:///c:/Users/Leo-dev/Projeto%20Integrador%20IV-A/src/components/layout/Footer.tsx), [`ContactSection.tsx`](file:///c:/Users/Leo-dev/Projeto%20Integrador%20IV-A/src/components/portfolio/ContactSection.tsx), [`initialProjects.ts`](file:///c:/Users/Leo-dev/Projeto%20Integrador%20IV-A/src/data/initialProjects.ts) e [`README.md`](file:///c:/Users/Leo-dev/Projeto%20Integrador%20IV-A/README.md).

#### 🐍 Foco Exclusivo em Python & Frontend Web
- **Remoção de Java**: Removidas todas as menções à linguagem Java da biografia, descrições e README.
- **Destaque em Stack**: Reafirmado o foco backend em **Python (FastAPI)** e frontend moderno com **TypeScript, JavaScript e React**.

---

## [1.1.0] — 2026-09-06

### 📌 Commit [`6a47ae9`](https://github.com/leonardonasls-stack/projeto-integrador-iv-a/commit/6a47ae9417bf75af4e1aa860cfef4e1238a7bd08) — `docs: rewrite README as personal portfolio`
- **Documentação Principal**: Reescrita completa do [`README.md`](file:///c:/Users/Leo-dev/Projeto%20Integrador%20IV-A/README.md) detalhando a arquitetura modular, stack tecnológica (React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion), fluxo do painel admin e persistência local.

### 📌 Commit [`7ffaa0f`](https://github.com/leonardonasls-stack/projeto-integrador-iv-a/commit/7ffaa0f75f2d1c1932252051fdba76a54fdcbc99) — `Atualização de Portifolio`
- Ajustes finos de textos e formatações no portfólio.

### 📌 Commit [`217ee11`](https://github.com/leonardonasls-stack/projeto-integrador-iv-a/commit/217ee11441edf362647a5d10ae3678fd24920d69) — `Edição de portifolio`
- Atualização e padronização dos textos do desenvolvedor Leonardo Nascimento em todos os componentes públicos e no formulário de edição do perfil.

---

## [1.0.0] — 2026-09-05

### 📌 Commit [`ca0aa27`](https://github.com/leonardonasls-stack/projeto-integrador-iv-a/commit/ca0aa27d2063b994fc6671ad9894a10eb2a07609) — `feat: atualizacao do portfolio com Python, FastAPI, editor de textos e modais responsivos`
- **Arquitetura Base**: Lançamento inicial da aplicação em React 19 + TypeScript + Vite.
- **Painel Administrativo (CRUD)**: Modal de autenticação por senha (`AdminDashboardModal.tsx`) para inclusão, alteração e exclusão de projetos, bem como edição em tempo real das seções da Home.
- **Filtros e Busca**: Grid interativo de projetos com filtragem por categorias (*Frontend, Fullstack, Backend, Mobile, IHC/UX*).
- **Acessibilidade e Usabilidade (IHC)**: Navegação completa por teclado (ESC, TAB, focus state), contraste adaptado e modais acessíveis.
</file>

<file path="index.html">
<!DOCTYPE html>
<html lang="pt-BR" class="dark scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Leonardo Nascimento | Desenvolvedor Python & FastAPI</title>
    <meta name="description" content="Portfólio pessoal de Leonardo Nascimento — Desenvolvedor backend especializado em Python, FastAPI, microsserviços e APIs RESTful de alta performance." />
    <meta property="og:title" content="Leonardo Nascimento | Desenvolvedor Backend" />
    <meta property="og:description" content="Portfólio de um Desenvolvedor de Software especializado em Python, FastAPI, React e Arquitetura Limpa." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://leonardonasls-stack.github.io/" />
  </head>
  <body class="bg-slate-950 text-slate-100 antialiased font-sans">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
</file>

<file path="vite.config.ts">
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1500,
  },
  test: {
    globals: true,
    environment: 'happy-dom',
  },
})
</file>

<file path="src/components/layout/Footer.tsx">
import React from 'react';
import { Code2, ArrowUp, ShieldCheck } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import { useProfile } from '../../context/ProfileContext';

export const Footer: React.FC = () => {
  const { profile } = useProfile();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-left relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-slate-900 pb-8">
          
          {/* Brand Info (6 cols) */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-base">Leonardo Nascimento</span>
            </div>
            <p className="text-xs text-slate-300 max-w-md leading-relaxed">
              Portfólio pessoal de <strong className="text-white">Leonardo Nascimento</strong> — Desenvolvedor backend especializado em <strong className="text-white">Python</strong> e <strong className="text-white">FastAPI</strong>. Aberto a oportunidades e colaborações.
            </p>
          </div>

          {/* Nav & Action (6 cols) */}
          <div className="md:col-span-6 flex flex-col sm:flex-row items-start sm:items-center justify-between md:justify-end gap-4">
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <a
                href={profile.githubUrl || "https://github.com/leonardonasls-stack"}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5 p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200"
              >
                <GithubIcon className="w-4 h-4 text-indigo-300" />
                <span>GitHub</span>
              </a>
              <a
                href={profile.linkedinUrl || "https://linkedin.com/in/leodev"}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5 p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200"
              >
                <LinkedinIcon className="w-4 h-4 text-indigo-300" />
                <span>LinkedIn</span>
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 transition-colors flex items-center gap-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-400"
              title="Voltar ao topo da página"
              aria-label="Voltar para o topo da página"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Topo</span>
            </button>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-300">
          <p>{profile.footerText || '© 2026 Leonardo Nascimento. Desenvolvido com React, TypeScript e Tailwind CSS.'}</p>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>Validação de Acessibilidade & Usabilidade (WCAG / Nielsen)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
</file>

<file path="src/components/portfolio/TechStack.tsx">
import React from 'react';
import { useSkills } from '../../context/SkillContext';
import { useProfile } from '../../context/ProfileContext';
import * as LucideIcons from 'lucide-react';

// Pre-defined static IHC Principles since they change rarely
const ihcPrinciples = [
  {
    title: '1. Feedback Visual Imediato',
    desc: 'Notificações Toast em ações de CRUD, efeito de foco/hover em botões e estados de carregamento em formulários.',
    icon: <LucideIcons.Zap className="w-4 h-4 text-amber-400" />
  },
  {
    title: '2. Visibilidade do Estado do Sistema',
    desc: 'Indicador visual da página ativa na Navbar, status da autenticação de administrador e contador de projetos filtrados.',
    icon: <LucideIcons.Eye className="w-4 h-4 text-indigo-400" />
  },
  {
    title: '3. Prevenção de Erros',
    desc: 'Modais de confirmação para ações destrutivas (como exclusão de projetos) e validação em tempo real.',
    icon: <LucideIcons.AlertTriangle className="w-4 h-4 text-rose-400" />
  },
  {
    title: '4. Affordance & Consistência',
    desc: 'Botões claramente identificáveis com cursores adequados, paleta de cores harmoniosa e padrões visuais unificados.',
    icon: <LucideIcons.MousePointerClick className="w-4 h-4 text-emerald-400" />
  },
  {
    title: '5. Responsividade & Adaptabilidade',
    desc: 'Layout Mobile-First fluido que se reorganiza sem perda de conteúdo em telas pequenas, médias e grandes.',
    icon: <LucideIcons.Smartphone className="w-4 h-4 text-cyan-400" />
  },
  {
    title: '6. Controle do Usuário',
    desc: 'Possibilidade de resetar dados locais a qualquer momento, fechar modais via ESC ou clique no overlay e busca em tempo real.',
    icon: <LucideIcons.RefreshCw className="w-4 h-4 text-purple-400" />
  }
];

export const TechStack: React.FC = () => {
  const { categories } = useSkills();
  const { profile } = useProfile();

  // Helper to safely render dynamic icons
  const renderIcon = (iconName: string, colorClass: string) => {
    const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Layers;
    return <IconComponent className={`w-5 h-5 ${colorClass}`} />;
  };

  return (
    <section id="habilidades" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <LucideIcons.Cpu className="w-3.5 h-3.5" />
            <span>Stack &amp; Dev</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {profile.skillsTitle || 'Tecnologias & Princípios de Usabilidade'}
          </h2>
          <p className="text-slate-400 text-base">
            {profile.skillsSubtitle || 'Stack tecnológica completa combinada com boas práticas de UX, acessibilidade e design de interfaces que tornam a experiência do usuário fluida e intuitiva.'}
          </p>
        </div>

        {/* Tech Stack Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {categories.map((cat, idx) => {
            // Map the color name from DB to a Tailwind text color
            const colorClass = `text-${cat.color}-400`;
            const sortedSkills = [...(cat.skills || [])].sort((a, b) => a.position - b.position);

            return (
              <div key={cat.id || idx} className="glass-panel p-6 rounded-2xl border border-slate-800 text-left space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                    {renderIcon(cat.icon, colorClass)}
                  </div>
                  <h3 className="text-lg font-bold text-white">{cat.title}</h3>
                </div>

                <div className="space-y-3">
                  {sortedSkills.map((skill, sIdx) => (
                    <div key={skill.id || sIdx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-white">{skill.name}</h4>
                        {skill.description && (
                          <p className="text-xs text-slate-400">{skill.description}</p>
                        )}
                      </div>
                      <span className="text-[11px] px-2.5 py-1 rounded-full bg-indigo-950 text-indigo-300 font-medium border border-indigo-800/60">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* IHC Principles Table / Grid */}
        <div className="glass-panel p-8 rounded-2xl border border-slate-800 text-left space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-2">
            <div>
              <h3 className="text-xl font-bold text-white">Boas Práticas de UX &amp; Usabilidade</h3>
              <p className="text-xs text-slate-400">Princípios aplicados na arquitetura e navegação do portfólio para entregar uma experiência de qualidade</p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 font-medium border border-emerald-800 self-start sm:self-auto">
              UX / Acessibilidade
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ihcPrinciples.map((item, index) => (
              <div key={index} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 space-y-2 hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-slate-800 border border-slate-700">
                    {item.icon}
                  </div>
                  <h4 className="text-sm font-bold text-slate-100">{item.title}</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pl-1">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
</file>

<file path="src/context/AuthContext.tsx">
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import { useToast } from './ToastContext';
import { supabase } from '../services/supabaseClient';

interface AuthContextType {
  user: User;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { addToast } = useToast();
  const [user, setUser] = useState<User>({ username: 'Convidado', role: 'guest', isLoggedIn: false });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // Verifica sessão inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser({ username: 'Administrador', role: 'admin', isLoggedIn: true });
      }
    });

    // Escuta mudanças de auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser({ username: 'Administrador', role: 'admin', isLoggedIn: true });
      } else {
        setUser({ username: 'Convidado', role: 'guest', isLoggedIn: false });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      addToast('error', 'Falha no Login', error.message || 'Credenciais inválidas.');
      return false;
    }

    setIsLoginModalOpen(false);
    addToast('success', 'Acesso Concedido!', 'Você está no modo Administrador.');
    return true;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    addToast('info', 'Sessão Encerrada', 'Você voltou para o modo de navegação pública.');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoginModalOpen,
        setIsLoginModalOpen
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
</file>

<file path="src/context/ProfileContext.tsx">
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { ProfileData } from '../types/profile';
import { defaultProfileData } from '../types/profile';
import { useToast } from './ToastContext';
import { StorageService } from '../services/storageService';
import { SettingsService } from '../services/settingsService';

interface ProfileContextType {
  profile: ProfileData;
  updateProfile: (updatedData: Partial<ProfileData>) => Promise<boolean>;
  resetProfile: () => void;
  isLoading: boolean;
  error: string | null;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'dev_portfolio_profile_v4';

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileData>(() => {
    // Inicializa com o cache local (stale-while-revalidate) para não piscar a tela
    const saved = StorageService.getItem<ProfileData | null>(LOCAL_STORAGE_KEY, null);
    if (saved) {
      return { ...defaultProfileData, ...saved };
    }
    return defaultProfileData;
  });

  useEffect(() => {
    // Busca dados atualizados do banco ao carregar
    const fetchSettings = async () => {
      setError(null);
      try {
        const data = await SettingsService.getSettings();
        setProfile(data);
        StorageService.setItem(LOCAL_STORAGE_KEY, data);
      } catch (err: any) {
        console.error("Falha ao buscar configurações:", err);
        const msg = err.message || 'Erro ao carregar configurações do perfil.';
        setError(msg);
        addToast('error', 'Falha no Carregamento', msg);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSettings();
  }, [addToast]);

  const updateProfile = async (updatedData: Partial<ProfileData>): Promise<boolean> => {
    // Otimista: atualiza o estado local primeiro
    const nextProfile = { ...profile, ...updatedData };
    setProfile(nextProfile);
    
    // Tenta salvar no Supabase
    const success = await SettingsService.updateSettings(updatedData);
    
    if (success) {
      StorageService.setItem(LOCAL_STORAGE_KEY, nextProfile);
      addToast('success', 'Textos Atualizados!', 'As configurações foram salvas com sucesso no banco de dados.');
      return true;
    } else {
      // Reverte se falhou
      setProfile(profile);
      addToast('error', 'Erro ao Salvar', 'Não foi possível salvar as configurações. Verifique sua conexão e permissões.');
      return false;
    }
  };

  const resetProfile = () => {
    // Apenas visual para esta função, idealmente o admin atualizaria para o padrão manualmente
    setProfile(defaultProfileData);
    StorageService.setItem(LOCAL_STORAGE_KEY, defaultProfileData);
    addToast('info', 'Textos Padrão Restaurados', 'Os textos foram restaurados localmente. Clique em Salvar para persistir no banco.');
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, resetProfile, isLoading, error }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
</file>

<file path="src/types/profile.ts">
export interface ProfileData {
  name: string;
  role: string;
  statusBadge: string;
  heroTitlePrefix: string;
  heroTitleHighlight: string;
  heroDescription: string;
  aboutBio: string;
  academicTitle: string;
  academicInstitution: string;
  academicPeriod: string;
  techPillar1Title: string;
  techPillar1Desc: string;
  techPillar2Title: string;
  techPillar2Desc: string;
  
  // Novos campos adicionados (Fase 2 - CMS Supabase)
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  projectsTitle: string;
  projectsSubtitle: string;
  skillsTitle: string;
  skillsSubtitle: string;
  contactTitle: string;
  contactSubtitle: string;
  footerText: string;
}

export const INSTITUTION_OPTIONS = [
  'CESMAC - Centro Universitário CESMAC',
  'UFAL - Universidade Federal de Alagoas',
  'IFAL - Instituto Federal de Alagoas',
  'UNIT - Centro Universitário Tiradentes',
  'UNIMA / Afya - Centro Universitário Unima',
  'Outra Instituição'
];

export const defaultProfileData: ProfileData = {
  name: 'Leonardo Nascimento',
  role: 'Desenvolvedor Backend Python',
  statusBadge: 'Python & FastAPI',
  heroTitlePrefix: 'Desenvolvedor de Software',
  heroTitleHighlight: 'Backend Python & Frontend Web',
  heroDescription: 'Olá! Sou Leonardo Nascimento, estudante de Análise e Desenvolvimento de Sistemas no CESMAC. Crio APIs RESTful de alta performance e microsserviços com Python (FastAPI), além de desenvolver interfaces e aplicações web modernas e responsivas com TypeScript, JavaScript e React. Trabalho com modelagem de dados, Docker e integrações assíncronas, sempre com foco em arquitetura eficiente, código limpo e sistemas altamente escaláveis.',
  aboutBio: 'Estudante de Análise e Desenvolvimento de Sistemas no CESMAC com foco prático no ecossistema Python com FastAPI. Desenvolvo APIs RESTful de alta performance, aplicando arquitetura limpa, validação estrita de dados com Pydantic v2 e integração eficiente com soluções web.',
  academicTitle: 'Análise e Desenvolvimento de Sistemas',
  academicInstitution: 'CESMAC - Centro Universitário CESMAC',
  academicPeriod: '4º Período de 6 (2024 - 2026)',
  techPillar1Title: 'Python & FastAPI',
  techPillar1Desc: 'Construção de APIs assíncronas de alta concorrência com Pydantic v2 e SQLAlchemy.',
  techPillar2Title: 'Interfaces & Usabilidade',
  techPillar2Desc: 'Integração com frontends React/TypeScript mantendo excelente experiência de usuário.',
  
  email: 'seu.email@exemplo.com',
  githubUrl: 'https://github.com/leonardonasls',
  linkedinUrl: 'https://linkedin.com/in/leonardonasls',
  projectsTitle: 'Projetos em Destaque',
  projectsSubtitle: 'Uma seleção dos meus melhores trabalhos.',
  skillsTitle: 'Tecnologias & Princípios de Usabilidade',
  skillsSubtitle: 'Stack tecnológica completa combinada com boas práticas de UX.',
  contactTitle: 'Entre em Contato',
  contactSubtitle: 'Vamos conversar sobre projetos, vagas ou apenas trocar ideias sobre tecnologia.',
  footerText: '© 2026 Leonardo Nascimento. Todos os direitos reservados.'
};
</file>

<file path="package.json">
{
  "name": "projeto-integrador-iv-a",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "oxlint",
    "test": "vitest run",
    "preview": "vite preview",
    "seed": "tsx supabase/seed.ts"
  },
  "dependencies": {
    "@fontsource/inter": "^5.3.0",
    "@supabase/supabase-js": "^2.117.2",
    "@tailwindcss/vite": "^4.3.3",
    "framer-motion": "^13.2.0",
    "lucide-react": "^1.41.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "tailwindcss": "^4.3.3"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^7.0.1",
    "@testing-library/react": "^16.3.3",
    "@types/node": "^24.13.3",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.4",
    "@vitejs/plugin-react": "^6.1.0",
    "dotenv": "^18.0.4",
    "happy-dom": "^20.14.5",
    "jsdom": "^30.0.1",
    "oxlint": "^1.79.0",
    "tsx": "^4.23.15",
    "typescript": "~6.0.2",
    "vite": "^8.2.2",
    "vitest": "^5.0.0"
  }
}
</file>

<file path="src/components/portfolio/Hero.tsx">
import React from 'react';
import { ArrowRight, Mail, Download, Sparkles, CheckCircle2, Layout, ShieldCheck } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../ui/SocialIcons';
import { motion } from 'framer-motion';
import { useProfile } from '../../context/ProfileContext';

export const Hero: React.FC = () => {
  const { profile } = useProfile();
  const scrollToProjetos = () => {
    const el = document.getElementById('projetos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContato = () => {
    const el = document.getElementById('contato');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#090d16]">
      {/* Background Decorative Gradients */}
      <div aria-hidden="true" className="absolute top-1/4 right-0 w-[400px] h-[300px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div aria-hidden="true" className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Main Text Content (7 columns) */}
          <div className="lg:col-span-7 space-y-6 text-left">

            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-50 text-xs font-semibold backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Disponível para Novas Oportunidades & Projetos</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]"
            >
              {profile.heroTitlePrefix || 'Desenvolvedor de Software'}{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
                {profile.heroTitleHighlight || 'Backend Python & Frontend Web'}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-100 max-w-2xl leading-relaxed font-normal"
            >
              {profile.heroDescription}
            </motion.p>

            {/* Highlights / Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-3 pt-2 text-sm text-white font-medium"
            >
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" aria-hidden="true" />
                <span className="text-white">APIs RESTful (Async/Await)</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800">
                <Layout className="w-4 h-4 text-teal-300" aria-hidden="true" />
                <span className="text-white">Validação com Pydantic v2</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-indigo-300" aria-hidden="true" />
                <span className="text-white">Arquitetura Limpa & Swagger</span>
              </div>
            </motion.div>

            {/* Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <button
                onClick={scrollToProjetos}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-emerald-600/20 flex items-center gap-2 group transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <span>Explorar Projetos Python</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>

              <button
                onClick={scrollToContato}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 hover:from-slate-800 hover:to-slate-900 text-white font-semibold text-sm border border-slate-700 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <Mail className="w-4 h-4 text-emerald-300" aria-hidden="true" />
                <span>Entrar em Contato</span>
              </button>

              <button
                onClick={() => alert('Em breve! O currículo completo estará disponível para download.')}
                className="p-3.5 rounded-xl bg-slate-950 text-slate-100 hover:text-white border border-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400"
                title="Baixar Currículo (PDF)"
                aria-label="Baixar Currículo em formato PDF"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="inline-flex items-center gap-4 pt-4 text-xs"
            >
              <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800">
                <span className="text-white font-semibold">Conecte-se:</span>
                <a
                  href={profile.githubUrl || "https://github.com/leonardonasls-stack"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white transition-colors"
                  aria-label="Perfil no GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={profile.linkedinUrl || "https://linkedin.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white transition-colors"
                  aria-label="Perfil no LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

          </div>

          {/* Hero Visual Display (5 columns) */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mx-auto max-w-sm lg:max-w-none"
            >
              <div style={{ backgroundColor: '#020617' }} className="p-6 rounded-2xl border border-slate-800 shadow-2xl space-y-4 text-left relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs font-mono text-emerald-300 font-semibold">main_api.py</span>
                </div>

                <div className="font-mono text-xs text-slate-200 space-y-1.5 leading-relaxed p-4 rounded-xl border border-slate-800/80">
                  <p>
                    <span className="text-purple-200">from</span> <span className="text-white">fastapi</span> <span className="text-purple-200">import</span> <span className="text-indigo-200">FastAPI</span>, <span className="text-indigo-200">Depends</span>
                  </p>
                  <p>
                    <span className="text-purple-200">from</span> <span className="text-white">pydantic</span> <span className="text-purple-200">import</span> <span className="text-indigo-200">BaseModel</span>
                  </p>
                  <p className="text-slate-300 pt-1"># API FastAPI em Python</p>
                  <p>
                    <span className="text-white">app</span> = <span className="text-amber-200">FastAPI</span>(title=<span className="text-emerald-300">"Portfolio API"</span>)
                  </p>
                  <p className="pt-1">
                    <span className="text-purple-200">@app.get</span>(<span className="text-emerald-300">"/api/v1/developer"</span>)
                  </p>
                  <p>
                    <span className="text-purple-200">async def</span> <span className="text-blue-200">get_profile</span>():
                  </p>
                  <p className="pl-4">
                    <span className="text-purple-200">return</span> &#123;
                  </p>
                  <p className="pl-8">
                    <span className="text-emerald-300">"name"</span>: <span className="text-emerald-300">"Leonardo Nascimento"</span>,
                  </p>
                  <p className="pl-8">
                    <span className="text-emerald-300">"role"</span>: <span className="text-emerald-300">"Python & FastAPI Dev"</span>,
                  </p>
                  <p className="pl-8">
                    <span className="text-emerald-300">"stack"</span>: [<span className="text-amber-200">"Python 3.12"</span>, <span className="text-amber-200">"FastAPI"</span>, <span className="text-amber-200">"PostgreSQL"</span>],
                  </p>
                  <p className="pl-8">
                    <span className="text-emerald-300">"status"</span>: <span className="text-emerald-300">"200 OK - Active"</span>
                  </p>
                  <p className="pl-4">&#125;</p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-300" aria-hidden="true" />
                    <span>Focus: <strong className="text-white">FastAPI / Python</strong></span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-semibold border border-emerald-800">
                    Open to Work
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
</file>

<file path="src/context/ProjectContext.tsx">
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Project } from '../types';
import { useToast } from './ToastContext';
import { ProjectService } from '../services/projectService';

interface ProjectContextType {
  projects: Project[];
  filteredProjects: Project[];
  isLoading: boolean;
  error: string | null;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => Promise<boolean>;
  updateProject: (project: Project) => Promise<boolean>;
  deleteProject: (id: string) => Promise<boolean>;
  updateProjectPositions: (projects: Project[]) => Promise<boolean>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { addToast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  // Carrega os projetos do banco
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await ProjectService.getProjects();
        setProjects(data);
      } catch (err: any) {
        const msg = err.message || 'Erro ao carregar projetos';
        setError(msg);
        addToast('error', 'Falha no Carregamento', msg);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, [addToast]);

  const addProject = async (newProject: Omit<Project, 'id' | 'createdAt'>): Promise<boolean> => {
    // Definimos uma nova posição para o projeto se ele não tiver uma (último lugar)
    const position = newProject.position ?? (projects.length > 0 ? Math.max(...projects.map(p => p.position || 0)) + 1 : 0);
    
    const created = await ProjectService.createProject({ ...newProject, position });
    if (created) {
      setProjects(prev => [...prev, created].sort((a, b) => (a.position || 0) - (b.position || 0)));
      addToast('success', 'Projeto Cadastrado', `${created.title} foi adicionado à vitrine.`);
      return true;
    }
    
    addToast('error', 'Falha ao Cadastrar', 'Ocorreu um erro ao tentar salvar o projeto no banco.');
    return false;
  };

  const updateProject = async (updatedProject: Project): Promise<boolean> => {
    const success = await ProjectService.updateProject(updatedProject);
    if (success) {
      setProjects(prev => prev.map((p) => (p.id === updatedProject.id ? updatedProject : p)).sort((a, b) => (a.position || 0) - (b.position || 0)));
      addToast('success', 'Projeto Atualizado', `${updatedProject.title} foi salvo com sucesso.`);
      return true;
    }

    addToast('error', 'Falha ao Atualizar', 'Não foi possível salvar as alterações.');
    return false;
  };

  const deleteProject = async (id: string): Promise<boolean> => {
    const projectToDelete = projects.find((p) => p.id === id);
    if (!projectToDelete) return false;

    const success = await ProjectService.deleteProject(id);
    if (success) {
      setProjects(prev => prev.filter((p) => p.id !== id));
      addToast('info', 'Projeto Excluído', `${projectToDelete.title} foi removido.`);
      return true;
    }

    addToast('error', 'Falha ao Excluir', 'Não foi possível remover o projeto.');
    return false;
  };

  const updateProjectPositions = async (reorderedProjects: Project[]): Promise<boolean> => {
    // Atualiza estado local imediatamente (otimista)
    setProjects(reorderedProjects);

    // Salva no banco as posições
    const updates = reorderedProjects.map((p, index) => ({ id: p.id, position: index }));
    const success = await ProjectService.updatePositions(updates);
    
    if (success) {
      addToast('success', 'Ordenação Salva', 'A ordem dos projetos foi atualizada.');
      return true;
    }

    // Se falhar, poderia reverter, mas por enquanto mantemos simples
    addToast('error', 'Falha na Ordenação', 'A nova ordem não foi salva no banco.');
    return false;
  };

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => (a.position || 0) - (b.position || 0));
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return sortedProjects.filter(p => {
      if (p.visible === false) return false;
      const matchCat = selectedCategory === 'Todas' || p.category === selectedCategory;
      const search = searchQuery.toLowerCase();
      const matchSearch = p.title.toLowerCase().includes(search) || 
                          p.description.toLowerCase().includes(search) || 
                          p.techs.some(t => t.toLowerCase().includes(search));
      return matchCat && matchSearch;
    });
  }, [sortedProjects, selectedCategory, searchQuery]);

  return (
    <ProjectContext.Provider
      value={{
        projects: sortedProjects,
        filteredProjects,
        isLoading,
        error,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        addProject,
        updateProject,
        deleteProject,
        updateProjectPositions
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
</file>

<file path="src/components/admin/AdminDashboardModal.tsx">
import React, { useState, useEffect } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../context/ProfileContext';
import type { Project, ProjectCategory } from '../../types';
import { defaultProfileData } from '../../types/profile';
import { X, Plus, ShieldCheck, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { AdminTabsNav } from './AdminTabsNav';
import { ProjectTable } from './ProjectTable';
import { ProjectFormModal, type ProjectFormData } from './ProjectFormModal';
import { ProfileFormTab } from './ProfileFormTab';
import { SkillsTab } from './SkillsTab';
import { MessagesTab } from './MessagesTab';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  const { projects, addProject, updateProject, deleteProject, updateProjectPositions } = useProjects();
  const { user } = useAuth();
  const { profile, updateProfile, resetProfile } = useProfile();

  const [activeTab, setActiveTab] = useState<'projects' | 'profile' | 'skills' | 'messages'>('projects');
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
    featured: false,
    visible: true
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
      featured: false,
      visible: true
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
      featured: proj.featured,
      visible: proj.visible !== false
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
      updateProject({
        id: editingProjectId,
        title: formData.title,
        description: formData.description,
        fullDescription: formData.fullDescription,
        category: formData.category,
        techs: techsArray,
        githubUrl: formData.githubUrl,
        demoUrl: formData.demoUrl || undefined,
        imageUrl: formData.imageUrl,
        featured: formData.featured,
        visible: formData.visible
      } as Project);
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
        featured: formData.featured,
        visible: formData.visible
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

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newProjects = [...projects];
    const temp = newProjects[index - 1];
    newProjects[index - 1] = newProjects[index];
    newProjects[index] = temp;
    // Call updateProjectPositions from ProjectContext
    updateProjectPositions(newProjects);
  };

  const handleMoveDown = (index: number) => {
    if (index === projects.length - 1) return;
    const newProjects = [...projects];
    const temp = newProjects[index + 1];
    newProjects[index + 1] = newProjects[index];
    newProjects[index] = temp;
    updateProjectPositions(newProjects);
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
                onMoveUp={handleMoveUp}
                onMoveDown={handleMoveDown}
              />

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2 border-t border-slate-800 pt-4">
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

          {/* TAB 3: SKILLS MANAGEMENT */}
          {activeTab === 'skills' && (
            <SkillsTab />
          )}

          {/* TAB 4: MESSAGES */}
          {activeTab === 'messages' && (
            <MessagesTab />
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
</file>

<file path="src/components/portfolio/ContactSection.tsx">
import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { useProfile } from '../../context/ProfileContext';
import { Mail, Send, CheckCircle2, MessageSquare, User, AtSign, FileText } from 'lucide-react';
import { EmailService } from '../../services/emailService';
import { safeHostPath } from '../../utils/urlHelper';

export const ContactSection: React.FC = () => {
  const { profile } = useProfile();
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    _gotcha: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check for bots
    if (formData._gotcha) {
      addToast('success', 'Mensagem Enviada!', 'Obrigado pelo contato.');
      setFormData({ name: '', email: '', subject: '', message: '', _gotcha: '' });
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      addToast('error', 'Campos Obrigatórios', 'Por favor, preencha nome, e-mail e a mensagem.');
      return;
    }

    // Cooldown check (30 seconds)
    const now = Date.now();
    if (now - lastSubmitTime < 30000) {
      addToast('error', 'Aguarde', 'Por favor, aguarde 30 segundos antes de enviar outra mensagem.');
      return;
    }

    setLoading(true);
    const result = await EmailService.sendContactMessage(formData);
    setLoading(false);

    if (result.mailtoFallback) {
      // Fallback for when Formspree is not configured
      const subject = encodeURIComponent(formData.subject || `Contato do Portfólio de ${formData.name}`);
      const body = encodeURIComponent(`Nome: ${formData.name}\nE-mail: ${formData.email}\n\nMensagem:\n${formData.message}`);
      window.location.href = `mailto:${profile.email || 'leonardonasls@gmail.com'}?subject=${subject}&body=${body}`;
      
      setSubmitted(true);
      setLastSubmitTime(now);
      addToast('info', 'Redirecionando...', 'O formulário será enviado através do seu cliente de e-mail.');
      setFormData({ name: '', email: '', subject: '', message: '', _gotcha: '' });
      return;
    }

    if (result.success) {
      setSubmitted(true);
      setLastSubmitTime(now);
      addToast(
        'success',
        'Mensagem Enviada!',
        `Obrigado ${formData.name}, sua mensagem foi recebida com sucesso.`
      );
      setFormData({ name: '', email: '', subject: '', message: '', _gotcha: '' });
    } else {
      addToast('error', 'Erro no Formulário', result.error || 'Não foi possível enviar sua mensagem.');
    }
  };

  return (
    <section id="contato" className="py-20 bg-slate-950/60 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Mail className="w-3.5 h-3.5" />
            <span>Fale Conosco</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {profile.contactTitle || 'Entre em Contato'}
          </h2>
          <p className="text-slate-400 text-base">
            {profile.contactSubtitle || 'Tem alguma proposta, dúvida ou quer apenas trocar uma ideia? Envie uma mensagem e responderei em breve.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Info (5 cols) */}
          <div className="lg:col-span-5 glass-panel p-8 rounded-2xl border border-slate-800 space-y-6 text-left">
            <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-3">
              Informações de Contato
            </h3>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="p-2 rounded-lg bg-indigo-950 text-indigo-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">E-mail</h4>
                  <p className="text-slate-400">{profile.email || 'leonardonasls@gmail.com'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="p-2 rounded-lg bg-purple-950 text-purple-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Redes Sociais &amp; Portfólio</h4>
                  <p className="text-slate-400">
                    GitHub:{' '}
                    <a
                      href={profile.githubUrl || "https://github.com/leonardonasls-stack"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:underline"
                    >
                      {profile.githubUrl ? safeHostPath(profile.githubUrl) : 'github.com/leonardonasls-stack'}
                    </a>
                  </p>
                  <p className="text-slate-400">
                    LinkedIn:{' '}
                    <a 
                      href={profile.linkedinUrl || "https://linkedin.com/in/leodev"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:underline"
                    >
                      {profile.linkedinUrl ? safeHostPath(profile.linkedinUrl) : 'linkedin.com/in/leodev'}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 space-y-2">
              <h4 className="font-bold text-indigo-300">💡 UX &amp; Acessibilidade</h4>
              <p>
                Este formulário conta com feedback visual de validação em tempo real, prevenção de campos nulos e confirmação de envio ao usuário.
              </p>
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 glass-panel p-8 rounded-2xl border border-slate-800 text-left">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
                <h3 className="text-2xl font-bold text-white">Mensagem Enviada!</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Obrigado pelo contato! Sua mensagem foi recebida e responderei o mais breve possível.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition-colors"
                >
                  Enviar outra mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Seu Nome *</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ex: Maria Santos"
                      required
                      maxLength={80}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 placeholder:text-slate-500"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <AtSign className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Seu E-mail *</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu.email@exemplo.com"
                      required
                      maxLength={200}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 placeholder:text-slate-500"
                    />
                  </div>

                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Assunto</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Ex: Proposta de Colaboração"
                    maxLength={120}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 placeholder:text-slate-500"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Sua Mensagem *</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Escreva sua mensagem ou comentários sobre a aplicação..."
                    required
                    maxLength={2000}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 placeholder:text-slate-500 resize-none"
                  />
                </div>

                {/* Honeypot field */}
                <input
                  type="text"
                  name="_gotcha"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData._gotcha}
                  onChange={handleChange}
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  {loading ? (
                    <span>Enviando mensagem...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Enviar Mensagem</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
</file>

<file path="README.md">
# 🚀 Portfólio Pessoal — Leonardo Nascimento

> **Desenvolvedor de Software | Backend Python & Frontend (TypeScript/JavaScript/React)**
> 📍 Estudante de Análise e Desenvolvimento de Sistemas no CESMAC (4º Período)
> 🔗 [github.com/leonardonasls-stack/projeto-integrador-iv-a](https://github.com/leonardonasls-stack/projeto-integrador-iv-a)
> 📧 leonardonasls@gmail.com

![CI — Integration & Build Check](https://github.com/leonardonasls-stack/projeto-integrador-iv-a/actions/workflows/ci.yml/badge.svg)

---

## 📌 Visão Geral

Portfólio pessoal desenvolvido em **React 19 + TypeScript + Vite**, com design dark premium (glassmorphism), animações fluidas com **Framer Motion** e arquitetura modular baseada em **Context API**. A aplicação permite gerenciar e exibir projetos dinamicamente, com painel administrativo CMS integrado ao **Supabase** (PostgreSQL + Auth + Storage).

Especializado em criar **APIs RESTful de alta performance** e microsserviços com **Python (FastAPI)**, além de desenvolver interfaces modernas e responsivas com **TypeScript**, **JavaScript** e **React**. Trabalho com modelagem de dados, Docker e integrações assíncronas, sempre com foco em arquitetura eficiente, código limpo e sistemas altamente escaláveis.

---

## 🛠️ Stack Tecnológica

### Frontend
| Tecnologia | Versão | Papel |
|---|---|---|
| React | 19.x | SPA com componentização modular |
| TypeScript | 6.x | Tipagem estática em todo o projeto |
| Vite | 8.x | Build ultra-rápido e HMR |
| Tailwind CSS | 4.x | Estilização utilitária e responsiva |
| Framer Motion | 13.x | Animações e micro-interações |
| Lucide React | 1.x | Biblioteca de ícones SVG |

### Ferramentas de Qualidade
| Ferramenta | Papel |
|---|---|
| OxLint | Linting de alta performance (substituto do ESLint) |
| TypeScript strict | Tipagem segura em todo o codebase |
| Vitest + jsdom | Testes unitários com ambiente DOM simulado |
| @testing-library/react | Utilitários de teste para componentes React |
| axe-core | Auditoria automatizada de acessibilidade (WCAG) |
| GitHub Actions (CI) | Pipeline de lint, type-check e build contínuos |
| Supabase | Banco de Dados PostgreSQL (BaaS) e gerador de seed |

---

## 🗂️ Arquitetura do Projeto

```
src/
├── App.tsx                    # Raiz da aplicação com providers aninhados
├── main.tsx                   # Entry point do React
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx         # Navegação fixa com scroll spy e menu mobile
│   │   └── Footer.tsx         # Rodapé com links sociais e badge de acessibilidade
│   │
│   ├── portfolio/
│   │   ├── Hero.tsx           # Seção inicial com apresentação e card de código decorativo
│   │   ├── AboutSection.tsx   # Bio, pilares técnicos e formação acadêmica (CESMAC)
│   │   ├── TechStack.tsx      # Stack completo e boas práticas de UX
│   │   ├── ProjectGrid.tsx    # Grid com busca e filtros por categoria
│   │   ├── ProjectCard.tsx    # Card individual de projeto com animação
│   │   ├── ProjectModal.tsx   # Modal de detalhe com ESC e click-outside
│   │   └── ContactSection.tsx # Formulário de contato via Formspree + toast
│   │
│   ├── admin/
│   │   ├── LoginModal.tsx          # Modal de autenticação por senha (hash SHA-256)
│   │   ├── AdminDashboardModal.tsx # Orquestrador do painel admin (abas + modais)
│   │   ├── AdminTabsNav.tsx        # Navegação por abas do painel
│   │   ├── ProfileFormTab.tsx      # Edição completa do perfil público em tempo real
│   │   ├── ProjectFormModal.tsx    # Formulário de criação/edição de projeto
│   │   └── ProjectTable.tsx        # Tabela de projetos com ações de editar/excluir
│   │
│   └── ui/
│       ├── ToastContainer.tsx  # Sistema de notificações (success/error/info)
│       └── SocialIcons.tsx     # Ícones SVG de GitHub e LinkedIn
│
├── context/
│   ├── AuthContext.tsx         # Autenticação integrada ao Supabase Auth
│   ├── ProjectContext.tsx      # CRUD + filtro/busca de projetos em localStorage
│   ├── ProfileContext.tsx      # Dados de perfil editáveis pelo painel admin
│   └── ToastContext.tsx        # Sistema global de notificações por toast
│
├── services/
│   ├── supabaseClient.ts       # Configuração e inicialização do Supabase
│   ├── projectService.ts       # CRUD de Projetos no Supabase
│   ├── skillService.ts         # CRUD de Skills e Categorias no Supabase
│   ├── settingsService.ts      # Leitura e gravação das configurações do site (Hero/Footer)
│   ├── emailService.ts         # Integração Formspree + log na tabela Messages
│   └── storageService.test.ts  # Testes Vitest
│
└── types/
    ├── index.ts               # Tipos: Project, ProjectCategory, User, ToastMessage
    └── profile.ts             # Interface ProfileData, INSTITUTION_OPTIONS e defaultProfileData
```

---

## ✨ Funcionalidades

### 🖥️ Portfólio Público
- **Hero Animado**: Apresentação com badge de status, headline dinâmico, descrição, CTAs e card de código decorativo
- **Sobre Mim**: Bio completa, pilares técnicos, formação acadêmica (CESMAC) e objetivos profissionais
- **Stack & Boas Práticas**: Cards de habilidades com níveis de proficiência e princípios de UX aplicados
- **Vitrine de Projetos**: Grid responsivo com filtros por categoria (Frontend, Fullstack, Backend, Mobile, IHC/UX) e busca em tempo real
- **Modal de Projeto**: Detalhe expandido com stack completo, links (GitHub/Demo) e fechamento via ESC ou overlay
- **Formulário de Contato**: Integrado ao **Formspree** via `VITE_FORMSPREE_ID`, com validação, loading e feedback via toast

### 🔐 Painel Administrativo (Área Restrita)
- **Autenticação segura**: Supabase Auth (E-mail/Senha). Autorização centralizada no banco de dados com RLS.
- **Aba Projetos**: Tabela com todos os projetos. Criação, edição e exclusão com confirmação destrutiva. Reset para dataset inicial.
- **Aba Perfil**: Edição em tempo real do Hero, bio e formação acadêmica. Dropdown com opções de instituição (CESMAC, UFAL, IFAL, UNIT, UNIMA/Afya). Reset para padrão.

### 💾 Backend as a Service (Supabase)
- **Supabase PostgreSQL:** Persistência em tempo real para projetos, habilidades, textos do perfil e registro de mensagens de contato.
- **Segurança:** RLS (Row Level Security) aplicado para proteger as tabelas (apenas leitura pública, escrita exige autenticação).
- **Seed Inteligente:** Dados base são gerados através de um script TypeScript direto para o Supabase.

---

## ♿ Acessibilidade (WCAG / Nielsen)

Boas práticas de acessibilidade validadas com **axe-core**:

- **0 violações** detectadas na auditoria automatizada (`npx axe localhost:5173`)
- Navegação completa por teclado (`Tab`, `Shift+Tab`, `ESC`, `Enter`)
- `aria-label` em todos os elementos interativos (botões, links, modais, inputs)
- `role="dialog"` e `aria-modal="true"` nos modais
- `aria-live` para anúncios dinâmicos de erros em formulários
- Contraste de cores adaptado ao WCAG AA
- Badge de conformidade exibido no rodapé

---

## 📁 Projetos no Portfólio (Dataset Inicial)

| Projeto | Categoria | Stack Principal | Repositório & Links |
|---|---|---|---|
| Console Telegram Bot — Gestão Docker | Backend | Python 3.12, Docker API, Asyncio | [GitHub](https://github.com/leonardonasls-stack/Console-Telegram-Bot) |
| Gerador de OS — Sistema de Ordens de Serviço | Fullstack | React 19, Supabase, Tailwind CSS 4, PWA | [GitHub](https://github.com/leonardonasls-stack/Gerador-de-OS-e-recibo) \| [Demo Online](https://gerador-de-os-e-recibo.vercel.app/) |
| Billy — Assistente Financeiro | Mobile | React Native, Expo, Firebase, Biometria | [GitHub](https://github.com/leonardonasls-stack/billy-assistente-financeiro) |
| LLSystem v3 — Gestão Multi-Tenant & OS | Backend | FastAPI, Python 3.12, MySQL, MinIO S3, Docker | *Repositório Privado* |

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- **Node.js** ≥ 20
- **npm** ≥ 10

```bash
# 1. Clonar o repositório
git clone https://github.com/leonardonasls-stack/projeto-integrador-iv-a.git

# 2. Entrar na pasta do projeto
cd projeto-integrador-iv-a

# 3. Instalar as dependências
npm install

# 4. Criar o arquivo .env com as variáveis de ambiente (ver seção abaixo)

# 5. Iniciar o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173/` no navegador.

### Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento com HMR
npm run build    # Build de produção (tsc + vite build)
npm run preview  # Preview do build de produção
npm run lint     # Linting com OxLint
npm run test     # Testes unitários com Vitest
```

---

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# URL e Key Pública do Supabase (Obrigatório)
VITE_SUPABASE_URL=sua_url_aqui
VITE_SUPABASE_ANON_KEY=sua_anon_key_aqui

# ID do endpoint Formspree para o formulário de contato (Opcional)
VITE_FORMSPREE_ID=seu_id_aqui
```

> **Nota**: O sistema CMS depende do `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`. Sem `VITE_FORMSPREE_ID`, o formulário usa um fallback inteligente (mailto: + salva no banco).

---

## 🔑 Acesso ao Painel Admin

1. Clique em **"Área Restrita"** na barra de navegação.
2. Faça login com o seu e-mail e senha cadastrados no Supabase Auth.
3. Para dar permissão de administrador ao seu usuário, certifique-se de configurar o UUID do seu usuário (encontrado no painel do Supabase) no arquivo `supabase/schema.sql` (ou equivalente na sua migration) para ter as permissões adequadas de edição via RLS.

---

## 🔄 Pipeline de CI (GitHub Actions)

O workflow `.github/workflows/ci.yml` executa automaticamente em todo push ou pull request para `main`:

| Etapa | Comando |
|---|---|
| Checkout do repositório | `actions/checkout@v4` |
| Setup Node.js 20 | `actions/setup-node@v4` |
| Instalar dependências | `npm ci` |
| Linting (OxLint) | `npm run lint` |
| Type Check (TypeScript) | `npx tsc --noEmit` |
| Build de produção | `npm run build` |

---

## 🧪 Testes

Testes unitários com **Vitest** + **jsdom**:

```bash
npm run test
```

| Serviço | Casos de Teste |
|---|---|
| `StorageService` | Fallback para chave inexistente, escrita/leitura e remoção de item |

---

## 📬 Contato

- **GitHub**: [github.com/leonardonasls-stack](https://github.com/leonardonasls-stack)
- **LinkedIn**: [linkedin.com/in/leodev](https://linkedin.com/in/leodev)
- **E-mail**: leonardonasls@gmail.com

---

<div align="center">
  <sub>Desenvolvido com React 19, TypeScript, Vite, Tailwind CSS v4 e Framer Motion</sub>
</div>
</file>

</files>
