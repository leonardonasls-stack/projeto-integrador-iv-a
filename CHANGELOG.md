# 📜 CHANGELOG — Registo de Alterações

Todas as mudanças notáveis neste projeto são documentadas neste arquivo.

> **Regra de Projeto**: Toda nova funcionalidade, correção ou alteração relevante deve obrigatoriamente ser registrada neste changelog acompanhada do **código hash do commit Git** correspondente (`7 caracteres ou hash completo`).

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
