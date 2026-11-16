<div align="center">
  <img src="./public/icons.svg" alt="Leonardo Nascimento — Desenvolvimento de Sistemas" width="320" />

  <h1>Portfólio Pessoal — Leonardo Nascimento</h1>

  <p>
    <strong>Desenvolvedor de Software | Backend Python &amp; FastAPI · Frontend TypeScript &amp; React</strong><br />
    Graduando em Análise e Desenvolvimento de Sistemas — CESMAC (4º Período)
  </p>

  <p>
    <a href="https://github.com/leonardonasls-stack/projeto-integrador-iv-a/actions/workflows/ci.yml">
      <img src="https://github.com/leonardonasls-stack/projeto-integrador-iv-a/actions/workflows/ci.yml/badge.svg" alt="CI — Integration & Build Check" />
    </a>
    <a href="https://leonascimentodev-sooty.vercel.app/">
      <img src="https://img.shields.io/badge/demo-online-10b981" alt="Demo Online" />
    </a>
  </p>
</div>

---

## Visão Geral

Aplicação web de portfólio pessoal desenvolvida em **React 19**, **TypeScript** e **Vite**, com sistema de design editorial **Terminal Emerald** construído sobre **Tailwind CSS v4** e **Framer Motion**.

> [!NOTE]
> **Arquitetura Static-First & Design System Terminal Emerald (v4.0):** Todos os dados de perfil, competências e projetos são mantidos de forma centralizada e tipada em [`src/data/portfolioData.ts`](./src/data/portfolioData.ts), combinando carregamento instantâneo sem dependências externas de banco de dados a uma interface editorial de alto contraste (`#090b0e`, `#11151c`, `#10b981`, `#06b6d4`).

---

## Stack Tecnológica

### Aplicação Principal
| Tecnologia | Versão | Papel |
|---|---|---|
| React | `^19.2.8` | Construção da interface modular (SPA) e gerenciamento de estado via Context API |
| TypeScript | `~6.0.2` | Tipagem estática estrita em componentes, contextos e serviços |
| Vite | `^8.2.2` | Bundler de produção e servidor de desenvolvimento com HMR |
| Tailwind CSS | `^4.3.3` | Tokens semânticos via `@theme` (paleta *Terminal Emerald*) e layout responsivo |
| Framer Motion | `^13.2.0` | Animações declarativas, transições de layout (`layoutId`) e suporte a `reducedMotion` |
| Lucide React | `^1.41.0` | Biblioteca de ícones vetoriais |
| Inter (`@fontsource/inter`) | `^5.3.0` | Tipografia auto-hospedada sem requisições externas para fontes |

### Qualidade e Testes
| Ferramenta | Papel |
|---|---|
| OxLint (`^1.79.0`) | Linter estático de alta velocidade |
| Vitest (`^5.0.0`) + `happy-dom` | Execução de testes unitários com simulação leve de DOM |
| `@testing-library/react` | Utilitários de teste voltados ao comportamento de componentes |
| GitHub Actions | Pipeline de integração contínua (lint, build e testes) |

---

## Estrutura do Projeto

```text
├── .lgpd/                         # Documentação de privacidade, mapeamento de dados e política de cookies
│   ├── STATUS.md                  # Estado consolidado da auditoria
│   ├── discovery.md               # Levantamento técnico de fluxos e armazenamento local
│   ├── gaps.md                    # Análise de lacunas e plano de remediação
│   ├── data-map.md                # Inventário das atividades de tratamento
│   ├── legal-basis.md             # Fundamentação das bases legais
│   └── policies/
│       └── privacy-policy-v1.0-draft.md
│
├── public/                        # Ativos estáticos, logos de projetos e imagem Open Graph (og-image.jpg)
└── src/
    ├── App.tsx                    # Composição de providers, MotionConfig e layout principal
    ├── index.css                  # Definição de tokens @theme (Terminal Emerald) e utilitários globais
    ├── main.tsx                   # Ponto de entrada com ErrorBoundary global
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.tsx         # Floating pill dock com indicador animado (layoutId) e atalho WhatsApp
    │   │   └── Footer.tsx         # Rodapé minimalista com links sociais, retorno ao topo e Preferências de Cookies
    │   ├── portfolio/
    │   │   ├── Hero.tsx           # Layout editorial assimétrico com card de código FastAPI (api_server.py)
    │   │   ├── AboutSection.tsx   # Biografia técnica, pilares de engenharia e timeline acadêmica vertical
    │   │   ├── TechStack.tsx      # Grade arquitetural em 2 colunas de competências Frontend e Backend Python
    │   │   ├── ProjectGrid.tsx    # Catálogo de projetos com busca textual e filtro por categoria
    │   │   ├── ProjectCard.tsx    # Card editorial de projeto com suporte a capas e logotipos
    │   │   ├── ProjectModal.tsx   # Modal detalhado com descrição completa, stack e links externos
    │   │   └── ContactSection.tsx # Seção editorial em 2 colunas com cópia rápida de e-mail e canais diretos
    │   └── ui/
    │       ├── CookieConsent.tsx  # Banner e modal de Política e Preferências de Cookies (opt-in por padrão)
    │       ├── ErrorBoundary.tsx  # Captura e tratamento de erros de renderização
    │       ├── SocialIcons.tsx    # Ícones SVG otimizados (GitHub, LinkedIn, WhatsApp)
    │       └── ToastContainer.tsx # Exibição de notificações temporárias (toasts)
    ├── context/                   # Contextos React (Profile, Project, Skill, Toast)
    ├── data/
    │   └── portfolioData.ts       # Fonte única de dados do portfólio (perfil, stack e projetos)
    ├── services/
    │   ├── emailService.ts        # Serviço de envio e fallback para mailto:
    │   ├── emailService.test.ts   # Testes unitários do serviço de e-mail
    │   ├── storageService.ts      # Abstração segura para leitura e escrita no localStorage
    │   └── storageService.test.ts # Testes unitários do serviço de armazenamento
    ├── types/                     # Contratos e interfaces TypeScript
    └── utils/
        └── urlHelper.ts           # Sanitização e formatação segura de URLs
```

---

## Funcionalidades Principais

- **Design Editorial Terminal Emerald**: Interface construída com tokens semânticos (`canvas`, `surface`, `emerald`, `cyan`), navegação flutuante (*floating pill dock*) e seção Hero com simulação de servidor FastAPI (`api_server.py`).
- **Sobre Mim & Competências Arquiteturais**: Apresentação com timeline vertical da graduação em Análise e Desenvolvimento de Sistemas (CESMAC) e grade técnica dividida entre ecossistema Python/FastAPI e Frontend React/TypeScript.
- **Vitrine de Projetos em Produção**: Listagem com busca em tempo real e filtro por categoria (`Frontend`, `Fullstack`, `Backend`, `Mobile`), destacando sistemas SaaS multi-tenant (**LLSystem OS**, **LLSystem PDV**) e plataformas web em produção (**Milagres Transparente**, **Quadriciclo Milagres Adventure**).
- **Canais Diretos de Contato**: Layout em duas colunas com disparo direto de e-mail, cópia instantânea de endereço para a área de transferência (com feedback via *toast*) e redirecionamento para WhatsApp com mensagem contextualizada.
- **Gestão Transparente de Cookies**: Categorias opcionais (**Desempenho e Analíticos**, **Funcionalidade**, **Publicidade e Marketing**) desmarcadas por padrão (*opt-in*), persistência versionada em `localStorage` (`cookieConsent`) e reabertura a qualquer momento pelo rodapé.
- **Acessibilidade & SEO**: Respeito automático à preferência de movimento reduzido do sistema operacional (`<MotionConfig reducedMotion="user">`), navegação por teclado (`Tab`, `ESC`, `Enter`), atributos ARIA e meta tags Open Graph / Twitter Cards configuradas com `og-image.jpg`.

---

## Como Executar Localmente

### Pré-requisitos
- **Node.js** >= 20
- **npm** >= 10

```bash
# 1. Clonar o repositório
git clone https://github.com/leonardonasls-stack/projeto-integrador-iv-a.git

# 2. Acessar o diretório do projeto
cd projeto-integrador-iv-a

# 3. Instalar as dependências
npm install

# 4. Iniciar o servidor de desenvolvimento
npm run dev
```

A aplicação ficará disponível em `http://localhost:5173/`.

### Scripts Disponíveis

| Script | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento Vite com HMR |
| `npm run build` | Compila TypeScript (`tsc -b`) e gera o bundle de produção em `dist/` |
| `npm run preview` | Serve localmente o build de produção gerado em `dist/` |
| `npm run lint` | Executa análise estática de código com OxLint |
| `npm run test` | Executa a suíte de testes unitários com Vitest |

---

## Integração Contínua e Testes

O pipeline `.github/workflows/ci.yml` valida automaticamente cada `push` ou `pull_request` na branch `main` executando em sequência:

1. Instalação limpa de dependências (`npm ci`)
2. Verificação de lint (`npm run lint`)
3. Verificação de tipos e build de produção (`npm run build`)
4. Execução dos testes unitários (`npm run test`)

| Suíte de Teste | Cobertura |
|---|---|
| [`storageService.test.ts`](./src/services/storageService.test.ts) | Leitura com fallback seguro, escrita serializada em JSON e remoção de chaves no `localStorage` |
| [`emailService.test.ts`](./src/services/emailService.test.ts) | Submissão HTTP, acionamento de fallback `mailto:` e tratamento de erros de rede |

---

## Contato

- **Portfólio Online**: [leonascimentodev-sooty.vercel.app](https://leonascimentodev-sooty.vercel.app/)
- **GitHub**: [github.com/leonardonasls-stack](https://github.com/leonardonasls-stack)
- **LinkedIn**: [linkedin.com/in/leonardolnascimento](https://www.linkedin.com/in/leonardolnascimento)
- **E-mail**: [leonardonasls@gmail.com](mailto:leonardonasls@gmail.com)
