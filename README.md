# 🚀 Portfólio Pessoal — Leonardo Nascimento

> **Desenvolvedor de Software | Backend Python & FastAPI · Frontend TypeScript/React**
> 📍 Estudante de Análise e Desenvolvimento de Sistemas — CESMAC (4º Período)
> 🔗 [github.com/leonardonasls-stack/projeto-integrador-iv-a](https://github.com/leonardonasls-stack/projeto-integrador-iv-a)
> 📧 leonardonasls@gmail.com

![CI — Integration & Build Check](https://github.com/leonardonasls-stack/projeto-integrador-iv-a/actions/workflows/ci.yml/badge.svg)

---

## 📌 Visão Geral

Portfólio pessoal desenvolvido em **React 19 + TypeScript + Vite**, com design dark premium (glassmorphism), animações fluidas com **Framer Motion** e arquitetura modular baseada em **Context API**.

A versão **2.0** migrou completamente o CMS de `localStorage` para o **Supabase** (PostgreSQL + Auth + RLS), tornando todos os dados — projetos, habilidades, textos do perfil e mensagens de contato — 100% dinâmicos e gerenciáveis via painel administrativo integrado.

---

## 🛠️ Stack Tecnológica

### Frontend & Core
| Tecnologia | Versão | Papel |
|---|---|---|
| React | ^19.2.8 | SPA com componentização modular |
| TypeScript | ~6.0.2 | Tipagem estática em todo o projeto (modo strict) |
| Vite | ^8.2.2 | Build ultra-rápido e HMR |
| Tailwind CSS | ^4.3.3 | Estilização utilitária e responsiva (via plugin Vite) |
| Framer Motion | ^13.2.0 | Animações e micro-interações |
| Lucide React | ^1.41.0 | Biblioteca de ícones SVG |
| Inter (Fontsource) | ^5.3.0 | Tipografia premium auto-hospedada |

### Backend as a Service (Supabase)
| Serviço | Papel |
|---|---|
| Supabase PostgreSQL | Banco de dados — projetos, skills, perfil, mensagens |
| Supabase Auth | Autenticação E-mail/Senha com sessão persistente |
| Supabase RLS | Row Level Security — leitura pública, escrita somente autenticada |

### Ferramentas de Qualidade
| Ferramenta | Papel |
|---|---|
| OxLint ^1.79.0 | Linting de alta performance (substituto do ESLint) |
| TypeScript strict | Tipagem segura em todo o codebase |
| Vitest ^5.0.0 + happy-dom | Testes unitários com ambiente DOM simulado |
| @testing-library/react | Utilitários de teste para componentes React |
| axe-core | Auditoria automatizada de acessibilidade (WCAG) |
| GitHub Actions (CI) | Pipeline de lint, type-check e build contínuos |
| tsx ^4.23.15 | Executor TypeScript para o script de seed do Supabase |

---

## 🗂️ Arquitetura do Projeto

```
src/
├── App.tsx                    # Raiz com providers aninhados + orquestração de modais admin
├── main.tsx                   # Entry point do React
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx         # Navegação fixa com scroll-spy, menu mobile e acesso admin
│   │   └── Footer.tsx         # Rodapé com links sociais, scroll-to-top e badge WCAG
│   │
│   ├── portfolio/
│   │   ├── Hero.tsx           # Seção inicial: headline dinâmico, card de código FastAPI, CTAs
│   │   ├── AboutSection.tsx   # Bio, pilares técnicos e formação acadêmica (CESMAC)
│   │   ├── TechStack.tsx      # Skills dinâmicas do banco + princípios de IHC/UX estáticos
│   │   ├── ProjectGrid.tsx    # Grid responsivo com busca em tempo real e filtros por categoria
│   │   ├── ProjectCard.tsx    # Card de projeto com animação Framer Motion
│   │   ├── ProjectModal.tsx   # Modal: stack, links GitHub/Demo, ESC e click-outside
│   │   └── ContactSection.tsx # Formspree + honeypot + cooldown + fallback mailto:
│   │
│   ├── admin/
│   │   ├── LoginModal.tsx          # Modal de autenticação via Supabase Auth
│   │   ├── AdminDashboardModal.tsx # Orquestrador do painel admin (abas + sub-modais)
│   │   ├── AdminTabsNav.tsx        # Navegação por abas: Projetos / Perfil / Skills / Mensagens
│   │   ├── ProfileFormTab.tsx      # Edição completa do perfil em tempo real
│   │   ├── ProjectFormModal.tsx    # Formulário de criação/edição de projeto com validação
│   │   ├── ProjectTable.tsx        # Tabela de projetos com reordenação, edição e exclusão
│   │   ├── SkillsTab.tsx           # Gerenciamento CRUD de categorias e habilidades
│   │   └── MessagesTab.tsx         # Leitura e exclusão de mensagens do formulário de contato
│   │
│   └── ui/
│       ├── ToastContainer.tsx  # Sistema de notificações (success/error/info)
│       ├── SocialIcons.tsx     # Ícones SVG inline: GitHub, LinkedIn
│       ├── CookieConsent.tsx   # Banner LGPD de consentimento de cookies com modal de política
│       └── ErrorBoundary.tsx   # Boundary de erros React para recuperação graceful
│
├── context/
│   ├── AuthContext.tsx         # Autenticação integrada ao Supabase Auth
│   ├── ProjectContext.tsx      # CRUD + filtro/busca de projetos via Supabase
│   ├── ProfileContext.tsx      # Dados de perfil via tabela site_settings no Supabase
│   ├── SkillContext.tsx        # CRUD de habilidades e categorias via Supabase
│   └── ToastContext.tsx        # Sistema global de notificações por toast
│
├── services/
│   ├── supabaseClient.ts       # Inicialização do cliente Supabase (com fallback de URL)
│   ├── projectService.ts       # CRUD de Projetos (mapeamento snake_case → camelCase)
│   ├── skillService.ts         # CRUD de Skills e Categorias no Supabase
│   ├── settingsService.ts      # Leitura e gravação de configurações (tabela site_settings)
│   ├── emailService.ts         # Formspree + registro na tabela messages + fallback mailto:
│   ├── storageService.ts       # Wrapper seguro para localStorage (erros + quota)
│   ├── projectService.test.ts  # Testes Vitest — mapeamento snake_case→camelCase
│   ├── emailService.test.ts    # Testes Vitest — serviço de e-mail
│   └── storageService.test.ts  # Testes Vitest — getItem / setItem / removeItem
│
├── types/
│   ├── index.ts               # Project, ProjectCategory, User, ToastMessage
│   ├── profile.ts             # ProfileData, INSTITUTION_OPTIONS, defaultProfileData
│   └── skill.ts               # Skill, SkillCategory, SkillLevel
│
└── utils/
    └── urlHelper.ts           # safeHostPath() e validateHttpUrl()

supabase/
├── schema.sql                 # DDL completo: tabelas, RLS, policies e seed inicial
└── seed.ts                    # Script tsx para popular o banco com dados iniciais
```

---

## ✨ Funcionalidades

### 🖥️ Portfólio Público
- **Hero Animado**: Headline dinâmico via ProfileContext, card de código FastAPI decorativo, badges de destaque (APIs RESTful, Pydantic v2, Arquitetura Limpa) e CTAs de scroll suave
- **Sobre Mim**: Bio completa editável, pilares técnicos (Python/FastAPI + Interfaces/Usabilidade) e formação acadêmica (CESMAC — 4º Período ADS)
- **Stack & Habilidades**: Categorias e skills carregadas dinamicamente do Supabase com níveis de proficiência (Iniciante → Avançado) e princípios de Nielsen aplicados
- **Vitrine de Projetos**: Grid responsivo com filtros por categoria (Frontend, Fullstack, Backend, Mobile, IHC/UX) e busca em tempo real por nome, descrição ou tecnologia
- **Modal de Projeto**: Stack completa, links GitHub/Demo, selo visual "Repositório Privado" para projetos sem URL pública, fechamento via ESC ou clique no overlay
- **Formulário de Contato**: Integrado ao **Formspree** (`VITE_FORMSPREE_ID`), com honeypot anti-spam, cooldown entre envios, validação e fallback via `mailto:`. Mensagens salvas na tabela `messages`
- **Cookie Consent**: Banner LGPD com opções "Aceitar Todos" / "Apenas Essenciais" e modal de Política de Cookies detalhada

### 🔐 Painel Administrativo (Área Restrita)
- **Autenticação segura**: Supabase Auth (E-mail/Senha) com sessão persistente. Autorização via RLS no banco de dados
- **Aba Projetos**: Tabela completa com criação, edição, exclusão (confirmação destrutiva) e reordenação (↑↓). Reset para dataset inicial via seed
- **Aba Perfil**: Edição em tempo real de Hero, bio, formação acadêmica, links e textos de seção. Dropdown de instituição (CESMAC, UFAL, IFAL, UNIT, UNIMA/Afya). Reset para padrão
- **Aba Skills**: Gerenciamento CRUD completo de categorias (ícone Lucide + cor) e habilidades (nome, nível, descrição). Ordenação por posição
- **Aba Mensagens**: Leitura e exclusão permanente das mensagens recebidas pelo formulário de contato

### 💾 Supabase — Tabelas Utilizadas
| Tabela | Dados |
|---|---|
| `projects` | Projetos do portfólio (title, description, techs, category, urls, visible, position) |
| `skill_categories` | Categorias de habilidades (title, icon, color, position) |
| `skills` | Habilidades individuais (name, level, description, category_id, position) |
| `site_settings` | Configurações e textos do perfil público (chave/valor) |
| `messages` | Mensagens recebidas via formulário de contato |

---

## ♿ Acessibilidade (WCAG / Nielsen)

Boas práticas de acessibilidade validadas com **axe-core**:

- **0 violações** detectadas na auditoria automatizada (`npx axe localhost:5173`)
- Navegação completa por teclado (`Tab`, `Shift+Tab`, `ESC`, `Enter`)
- `aria-label` em todos os elementos interativos (botões, links, modais, inputs)
- `role="dialog"` e `aria-modal="true"` em todos os modais
- `aria-live` para anúncios dinâmicos de erros em formulários
- `aria-current="page"` no link ativo da Navbar (scroll-spy)
- Contraste de cores adaptado ao WCAG AA
- Badge de conformidade exibido no rodapé

---

## 📁 Projetos no Portfólio (Dataset Inicial)

| Projeto | Categoria | Stack Principal | Links |
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
- Conta no [Supabase](https://supabase.com) com projeto criado

```bash
# 1. Clonar o repositório
git clone https://github.com/leonardonasls-stack/projeto-integrador-iv-a.git

# 2. Entrar na pasta do projeto
cd projeto-integrador-iv-a

# 3. Instalar as dependências
npm install

# 4. Criar o arquivo .env.local com as variáveis de ambiente (ver seção abaixo)

# 5. Aplicar o schema no Supabase (execute supabase/schema.sql no SQL Editor do Supabase)

# 6. Popular o banco com dados iniciais (opcional)
npm run seed

# 7. Iniciar o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173/` no navegador.

### Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento com HMR
npm run build    # Build de produção (tsc -b && vite build)
npm run preview  # Preview do build de produção
npm run lint     # Linting com OxLint
npm run test     # Testes unitários com Vitest (modo run)
npm run seed     # Popula o Supabase com dados iniciais (via tsx)
```

---

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto (consulte `.env.example`):

```env
# URL e Chave Pública do Supabase (Obrigatório para CMS e Auth)
VITE_SUPABASE_URL=sua_url_aqui
VITE_SUPABASE_ANON_KEY=sua_anon_key_aqui

# ID do endpoint Formspree para o formulário de contato (Opcional)
# Se omitido, o formulário usa fallback via mailto: e salva somente no banco
VITE_FORMSPREE_ID=seu_id_aqui
```

> **Nota**: Sem `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` o CMS não funciona. Um aviso é exibido no console, mas a aplicação não quebra (cliente Supabase inicializado com placeholder).

---

## 🔑 Acesso ao Painel Admin

1. Clique em **"Área Restrita"** na barra de navegação (ícone de escudo)
2. Faça login com o e-mail e senha cadastrados no **Supabase Auth**
3. As permissões de escrita são controladas pelas **RLS Policies** definidas no `supabase/schema.sql` — apenas usuários autenticados podem modificar dados

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

Testes unitários com **Vitest** + **happy-dom**:

```bash
npm run test
```

| Arquivo de Teste | Casos Cobertos |
|---|---|
| `storageService.test.ts` | Fallback para chave inexistente, escrita/leitura e remoção segura do localStorage |
| `projectService.test.ts` | Mapeamento snake_case → camelCase dos dados do Supabase; erro ao falhar na consulta |
| `emailService.test.ts` | Cobertura do serviço de envio de mensagens via Formspree |

---

## 📬 Contato

- **GitHub**: [github.com/leonardonasls-stack](https://github.com/leonardonasls-stack)
- **LinkedIn**: [linkedin.com/in/leodev](https://linkedin.com/in/leodev)
- **E-mail**: leonardonasls@gmail.com

---

<div align="center">
  <sub>v2.0 — Desenvolvido com React 19, TypeScript 6, Vite 8, Tailwind CSS v4, Framer Motion e Supabase</sub>
</div>