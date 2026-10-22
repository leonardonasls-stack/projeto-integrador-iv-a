# 🚀 Portfólio Pessoal — Leonardo Nascimento

> **Desenvolvedor de Software | Backend Python & FastAPI · Frontend TypeScript/React**
> 📍 Estudante de Análise e Desenvolvimento de Sistemas — CESMAC (4º Período)
> 🔗 [github.com/leonardonasls-stack/projeto-integrador-iv-a](https://github.com/leonardonasls-stack/projeto-integrador-iv-a)
> 📧 leonardonasls@gmail.com

![CI — Integration & Build Check](https://github.com/leonardonasls-stack/projeto-integrador-iv-a/actions/workflows/ci.yml/badge.svg)

---

## 📌 Visão Geral

Portfólio pessoal moderno desenvolvido em **React 19 + TypeScript + Vite**, com design dark refinado (glassmorphism), animações fluidas com **Framer Motion** e arquitetura estática de alta performance (**Static-First**).

A versão **3.0** consolidou uma arquitetura focada em velocidade máxima, confiabilidade e carregamento instantâneo, com gestão centralizada de dados em [`portfolioData.ts`](file:///c:/Users/Leo-dev/Projeto%20Integrador%20IV-A/src/data/portfolioData.ts), preservando total independência de serviços de banco de dados externos.

---

## 🛠️ Stack Tecnológica

### Frontend & Core
| Tecnologia | Versão | Papel |
|---|---|---|
| React | ^19.2.8 | SPA com componentização modular e renderização ultra-rápida |
| TypeScript | ~6.0.2 | Tipagem estática rigorosa em todo o projeto |
| Vite | ^8.2.2 | Build otimizado e HMR instantâneo |
| Tailwind CSS | ^4.3.3 | Estilização utilitária e responsiva |
| Framer Motion | ^13.2.0 | Microinterações e animações físicas fluidas |
| Lucide React | ^1.41.0 | Biblioteca de ícones SVG de alta nitidez |
| Inter (Fontsource) | ^5.3.0 | Tipografia auto-hospedada |

### Integrações Externas
| Serviço | Papel |
|---|---|
| Formspree | Envio de mensagens do formulário de contato (com fallback nativo `mailto:`) |

### Ferramentas de Qualidade
| Ferramenta | Papel |
|---|---|
| OxLint ^1.79.0 | Linting de alta performance (substituto do ESLint) |
| TypeScript strict | Tipagem segura em todo o codebase |
| Vitest ^5.0.0 + happy-dom | Testes unitários com ambiente DOM simulado |
| @testing-library/react | Utilitários de teste para componentes React |
| axe-core | Auditoria automatizada de acessibilidade (WCAG) |
| GitHub Actions (CI) | Pipeline de lint, build e testes contínuos |
| tsx ^4.23.15 | Executor TypeScript para o script de seed do Supabase |

---

## 🗂️ Arquitetura do Projeto

```
src/
├── App.tsx                    # Orquestrador com providers e estrutura principal
├── main.tsx                   # Entry point do React (com ErrorBoundary global)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx         # Navegação fixa com scroll-spy e menu mobile responsivo
│   │   └── Footer.tsx         # Rodapé com links sociais, scroll-to-top e badge WCAG
│   │
│   ├── portfolio/
│   │   ├── Hero.tsx           # Seção inicial: headline dinâmico, card de código FastAPI animado, CTAs
│   │   ├── AboutSection.tsx   # Bio, pilares técnicos e formação acadêmica (CESMAC)
│   │   ├── TechStack.tsx      # Skills organizadas por categorias + princípios de IHC/UX
│   │   ├── ProjectGrid.tsx    # Grid responsivo com busca em tempo real e filtros por categoria
│   │   ├── ProjectCard.tsx    # Card de projeto com animação Framer Motion e tags de tecnologia
│   │   ├── ProjectModal.tsx   # Modal de detalhes: stack completa, links GitHub/Demo e acessibilidade
│   │   └── ContactSection.tsx # Formulário Formspree + honeypot + cooldown + fallback mailto:
│   │
│   └── ui/
│       ├── ToastContainer.tsx # Sistema de notificações por toasts
│       ├── SocialIcons.tsx    # Ícones SVG inline otimizados
│       ├── CookieConsent.tsx  # Banner LGPD com preferências granulares e modal de política
│       └── ErrorBoundary.tsx  # Boundary de erros React para recuperação suave
│
├── context/
│   ├── ProjectContext.tsx     # Filtro, busca e gestão de projetos
│   ├── ProfileContext.tsx     # Dados de perfil, biografia e textos da home
│   ├── SkillContext.tsx       # Gestão de habilidades e categorias
│   └── ToastContext.tsx       # Sistema global de notificações por toast
│
├── data/
│   └── portfolioData.ts       # Fonte única da verdade: perfil, skills, categorias e projetos
│
├── services/
│   ├── emailService.ts        # Integração Formspree + fallback inteligente para mailto:
│   ├── storageService.ts      # Wrapper seguro para localStorage (erros e quotas)
│   ├── emailService.test.ts   # Testes Vitest — envio e resiliência a falhas de rede
│   └── storageService.test.ts # Testes Vitest — persistência segura
│
├── types/
│   ├── index.ts               # Project, ProjectCategory, ToastMessage
│   ├── profile.ts             # ProfileData e padrões de perfil
│   └── skill.ts               # Skill, SkillCategory, SkillLevel
│
└── utils/
    └── urlHelper.ts           # Validação e sanitização segura de URLs
```

---

## ✨ Funcionalidades

### 🖥️ Experiência do Portfólio
- **Hero Interativo**: Headline em destaque, card de código FastAPI com animação sequencial, badges de arquitetura (APIs RESTful, Pydantic v2, Arquitetura Limpa) e CTAs de rolagem suave.
- **Sobre Mim**: Bio técnica completa, pilares de usabilidade/backend e histórico acadêmico no CESMAC.
- **Stack & Habilidades**: Categorias organizadas (Frontend, Backend & Python) com indicadores visuais de proficiência e princípios de IHC aplicados.
- **Vitrine de Projetos**: Grid responsivo com filtros por categoria (Frontend, Fullstack, Backend, Mobile, IHC/UX) e busca por palavras-chave em tempo real.
- **Modal de Detalhes**: Apresentação da arquitetura do projeto, links para GitHub e demonstração online, ou indicador de repositório privado com navegação via teclado (`ESC`).
- **Formulário de Contato**: Integrado ao Formspree com validação de formato, proteção honeypot contra bots, cooldown de envio e fallback automático para cliente de e-mail local.
- **Privacidade & Cookies (LGPD)**: Banner com consentimento granular e modal explicativo de políticas.

---

## ♿ Acessibilidade (WCAG / Nielsen)

- **0 violações** detectadas na auditoria automatizada com **axe-core**.
- Navegação completa por teclado (`Tab`, `Shift+Tab`, `ESC`, `Enter`).
- Atributos `aria-label`, `aria-modal` e `role="dialog"` para compatibilidade total com leitores de tela.
- Notificações de formulário e status com áreas acessíveis.
- Alto contraste e foco visível garantidos.

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

# 4. Iniciar o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173/` no navegador.

### Scripts Disponíveis

```bash
npm run dev      # Servidor de desenvolvimento com HMR
npm run build    # Build de produção (tsc -b && vite build)
npm run preview  # Preview do build de produção
npm run lint     # Linting de alta velocidade com OxLint
npm run test     # Testes unitários com Vitest
```

---

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto (opcional):

```env
# ID do endpoint Formspree para o formulário de contato (Opcional)
# Se omitido, o formulário direciona automaticamente via cliente de e-mail (mailto:)
VITE_FORMSPREE_ID=""
```

---

## 🔄 Pipeline de CI (GitHub Actions)

O workflow `.github/workflows/ci.yml` executa automaticamente em todo push ou pull request para `main`:

| Etapa | Comando |
|---|---|
| Checkout do repositório | `actions/checkout@v4` |
| Setup Node.js 20 | `actions/setup-node@v4` |
| Instalar dependências | `npm ci` |
| Linting (OxLint) | `npm run lint` |
| Build de produção | `npm run build` |
| Testes Unitários (Vitest) | `npm run test` |

---

## 🧪 Testes

Testes unitários com **Vitest** + **happy-dom**:

```bash
npm run test
```

| Arquivo de Teste | Casos Cobertos |
|---|---|
| `storageService.test.ts` | Fallback para chave inexistente, escrita/leitura e remoção segura do localStorage |
| `emailService.test.ts` | Envio via Formspree, fallback `mailto:` quando ID ausente, tratamento de erros HTTP e exceções de rede |

---

## 📬 Contato

- **GitHub**: [github.com/leonardonasls-stack](https://github.com/leonardonasls-stack)
- **LinkedIn**: [linkedin.com/in/leonardonasls](https://linkedin.com/in/leonardonasls)
- **E-mail**: leonardonasls@gmail.com

---

<div align="center">
  <sub>v3.0 — Desenvolvido com React 19, TypeScript 6, Vite 8, Tailwind CSS v4 e Framer Motion</sub>
</div>