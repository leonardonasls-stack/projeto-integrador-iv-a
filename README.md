# 🚀 Portfólio Pessoal — Leonardo Nascimento

> **Desenvolvedor de Software | Backend Python & Frontend (TypeScript/JavaScript/React)**
> 📍 Estudante de Análise e Desenvolvimento de Sistemas no CESMAC (4º Período)
> 🔗 [github.com/leonardonasls-stack/projeto-integrador-iv-a](https://github.com/leonardonasls-stack/projeto-integrador-iv-a)
> 📧 leonardonasls@gmail.com

![CI — Integration & Build Check](https://github.com/leonardonasls-stack/projeto-integrador-iv-a/actions/workflows/ci.yml/badge.svg)

---

## 📌 Visão Geral

Portfólio pessoal desenvolvido em **React 19 + TypeScript + Vite**, com design dark premium (glassmorphism), animações fluidas com **Framer Motion** e arquitetura modular baseada em **Context API**. A aplicação permite gerenciar e exibir projetos dinamicamente, com painel administrativo completo (CRUD) e persistência local via `localStorage`.

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
│   ├── AuthContext.tsx         # Autenticação admin com hash SHA-256 e TTL de 2h
│   ├── ProjectContext.tsx      # CRUD + filtro/busca de projetos em localStorage
│   ├── ProfileContext.tsx      # Dados de perfil editáveis pelo painel admin
│   └── ToastContext.tsx        # Sistema global de notificações por toast
│
├── services/
│   ├── storageService.ts       # Abstração segura do localStorage (com tratamento de erros)
│   ├── storageService.test.ts  # Testes unitários Vitest para StorageService
│   └── emailService.ts         # Integração com Formspree para envio de e-mails
│
├── data/
│   └── initialProjects.ts     # Dataset inicial de projetos reais
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
- **Autenticação segura**: Hash SHA-256 da senha comparado à variável `VITE_ADMIN_HASH`. Sessão expira em **2 horas** (TTL).
- **Aba Projetos**: Tabela com todos os projetos. Criação, edição e exclusão com confirmação destrutiva. Reset para dataset inicial.
- **Aba Perfil**: Edição em tempo real do Hero, bio e formação acadêmica. Dropdown com opções de instituição (CESMAC, UFAL, IFAL, UNIT, UNIMA/Afya). Reset para padrão.

### 💾 Persistência Local
- Projetos e perfil salvos automaticamente no `localStorage` entre sessões
- **Merge inteligente**: novos projetos do dataset inicial são incorporados sem sobrescrever dados existentes
- `StorageService` isola o acesso ao `localStorage` com tratamento de erros de parsing e quota

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
# ID do endpoint Formspree para o formulário de contato
# Crie uma conta em https://formspree.io e copie o ID do seu formulário
VITE_FORMSPREE_ID=seu_id_aqui

# Hash SHA-256 da senha do painel administrativo
# Gere com: echo -n "sua_senha" | sha256sum
VITE_ADMIN_HASH=hash_sha256_da_senha_aqui
```

> **Nota**: Sem `VITE_ADMIN_HASH`, o painel admin exibirá erro. Sem `VITE_FORMSPREE_ID`, o formulário opera em modo de demonstração e orienta o usuário a contatar diretamente por e-mail.

---

## 🔑 Acesso ao Painel Admin

1. Clique em **"Área Restrita"** na barra de navegação.
2. Insira a senha administrativa configurada em `VITE_ADMIN_HASH`.
3. A sessão expira automaticamente em **2 horas**.

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
