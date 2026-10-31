# 📜 CHANGELOG — Registo de Alterações

Todas as mudanças notáveis neste projeto são documentadas neste arquivo.

> **Regra de Projeto**: Toda nova funcionalidade, correção ou alteração relevante deve obrigatoriamente ser registrada neste changelog acompanhada do **código hash do commit Git** correspondente (`7 caracteres ou hash completo`).

## [3.1.0] — 2026-10-30

### 📌 Commit [`71920cd`](https://github.com/leonardonasls-stack/projeto-integrador-iv-a/commit/71920cd) — `content(profile): ajusta texto de apresentacao na secao Hero`

#### ✏️ Conteúdo
- **Apresentação do Perfil**: Ajuste no texto de `heroDescription` em [`portfolioData.ts`](file:///d:/projetos/projeto-integrador-iv-a/src/data/portfolioData.ts) para tornar a apresentação inicial mais direta e concisa.

### 📌 Commit [`daa3507`](https://github.com/leonardonasls-stack/projeto-integrador-iv-a/commit/daa3507) — `feat(cookies): atualiza modal de politica de cookies, opt-in por padrao e atalho no rodape`

#### 🍪 Privacidade & Experiência do Usuário (UI/UX)
- **Opt-in por Padrão**: Categorias opcionais de cookies (`analytics`, `functional`, `marketing`) em [`CookieConsent.tsx`](file:///d:/projetos/projeto-integrador-iv-a/src/components/ui/CookieConsent.tsx) agora iniciam desmarcadas (`false`) por padrão.
- **Política de Cookies Limpa e Objetiva**: Reescrita das descrições no modal para explicar de forma direta o papel de cada categoria de cookie (**Necessários / Essenciais**, **Desempenho e Analíticos**, **Funcionalidade** e **Publicidade e Marketing**) e o uso da chave `cookieConsent` no `localStorage` via [`StorageService`](file:///d:/projetos/projeto-integrador-iv-a/src/services/storageService.ts), com controle de versão (`v2.0`) e `timestamp`.
- **Botão de Rejeição Rápida no Modal**: Inclusão da opção **"Apenas Essenciais"** diretamente no rodapé do modal de preferências.
- **Reabertura Facilitada no Rodapé**: Adição do botão **"Preferências de Cookies"** em [`Footer.tsx`](file:///d:/projetos/projeto-integrador-iv-a/src/components/layout/Footer.tsx) conectado ao evento global `openCookieSettings()` para permitir revisar ou alterar escolhas a qualquer momento.

### 📌 Commit [`0e4194b`](https://github.com/leonardonasls-stack/projeto-integrador-iv-a/commit/0e4194b) — `docs(lgpd): adiciona auditoria de privacidade, mapeamento de dados e politica de cookies`

#### 🛡️ Governança & Documentação (`.lgpd/`)
- **Auditoria e Inventário de Privacidade**: Inclusão dos artefatos de auditoria em `.lgpd/`, contemplando levantamento técnico ([`discovery.md`](file:///d:/projetos/projeto-integrador-iv-a/.lgpd/discovery.md)), análise de lacunas ([`gaps.md`](file:///d:/projetos/projeto-integrador-iv-a/.lgpd/gaps.md)), mapeamento de dados ([`data-map.md`](file:///d:/projetos/projeto-integrador-iv-a/.lgpd/data-map.md)), bases legais ([`legal-basis.md`](file:///d:/projetos/projeto-integrador-iv-a/.lgpd/legal-basis.md)), status do pipeline ([`STATUS.md`](file:///d:/projetos/projeto-integrador-iv-a/.lgpd/STATUS.md)) e documento da política de cookies ([`privacy-policy-v1.0-draft.md`](file:///d:/projetos/projeto-integrador-iv-a/.lgpd/policies/privacy-policy-v1.0-draft.md)).

---

## [3.0.0] — 2026-10-22

### 📌 Commit [`70fc57d`](https://github.com/leonardonasls-stack/projeto-integrador-iv-a/commit/70fc57d) — `feat(core): consolidação da arquitetura estática v3.0, sincronização de dados e refinamentos de UI/UX`

#### ⚡ Performance & Arquitetura
- **Transição para Arquitetura Estática (Static-First)**: Remoção definitiva de dependências do Supabase/PostgreSQL e modais administrativos em favor de carregamento instantâneo via [`portfolioData.ts`](file:///c:/Users/Leo-dev/Projeto%20Integrador%20IV-A/src/data/portfolioData.ts).
- **Sincronização Fiel de Dados**: Incorporação de 100% dos dados reais de projetos, habilidades e configurações de perfil provenientes dos dumps SQL.
- **Higienização de Repositório**: Remoção dos arquivos transitórios de SQL (`projects_rows.sql`, `site_settings_rows.sql`, `skill_categories_rows.sql`, `skills_rows.sql`) e chaves desnecessárias de banco de dados.
- **Resiliência de Ativos**: Limpeza de tokens efêmeros de URLs de mídias de projetos e garantia de fallbacks visuais.

---

## [2.1.0] — 2026-09-30

### 📌 Commit [`a82e984`](https://github.com/leonardonasls-stack/projeto-integrador-iv-a/commit/a82e984) — `docs: rewrite README v2.1 com análise completa do gitingest`

#### 📝 Docs
- **README.md** reescrito completamente (v2.1) após análise profunda via `gitingest` (58 arquivos, ~57.5k tokens):
  - Nova seção **Integrações Externas** documentando GitHub API e Formspree como serviços separados
  - Nova seção **Padrões de Desempenho** com tabela: Stale-While-Revalidate, Atualizações Otimistas, Code-Splitting (`React.lazy`), Memoização (`useMemo`)
  - [`githubService.ts`](file:///c:/Users/Leo-dev/Projeto%20Integrador%20IV-A/src/services/githubService.ts) adicionado na árvore de arquitetura e na documentação de serviços
  - Documentação de `React.lazy` + `Suspense` para lazy loading dos modais admin (`LoginModal`, `AdminDashboardModal`)
  - `ErrorBoundary` global anotado no `main.tsx` na árvore de arquitetura
  - Variável `SUPABASE_SERVICE_ROLE_KEY` documentada nas variáveis de ambiente (obrigatória para `npm run seed`)
  - Etapa de **Testes Unitários** (`npm run test`) adicionada à tabela do pipeline CI (já existia no workflow)
  - Cookie Consent descrito com toggles granulares (Essenciais, Analíticos, Funcionalidade, Marketing) e `role="switch"`
  - Detalhamento expandido do `emailService.test.ts` (fallback mailto, erros HTTP, exceções de rede)
  - Animação de digitação sequencial do Hero documentada nas funcionalidades
  - Ícones Lucide renderizados dinamicamente no TechStack documentados
  - Rodapé atualizado para **v2.1**

### 📌 Commit [`0264ed3`](https://github.com/leonardonasls-stack/projeto-integrador-iv-a/commit/0264ed3) — `Ajuste de animação no hero`

#### 🎨 UI/UX
- **Hero.tsx**: Ajuste fino das animações de digitação sequencial no card de código FastAPI em [`Hero.tsx`](file:///c:/Users/Leo-dev/Projeto%20Integrador%20IV-A/src/components/portfolio/Hero.tsx):
  - Revisão de timings e delays das `motion.div` para transições mais fluidas
  - 68 inserções, 32 deleções no componente

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
