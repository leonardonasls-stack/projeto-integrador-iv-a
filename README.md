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
  </p>
</div>

---

## Visão Geral

Aplicação web de portfólio pessoal desenvolvida em **React 19**, **TypeScript** e **Vite**, estilizada com **Tailwind CSS v4** e animações em **Framer Motion**.

> [!NOTE]
> **Arquitetura Static-First (v3.1):** Todos os dados de perfil, habilidades e projetos são gerenciados de forma centralizada e tipada em [`src/data/portfolioData.ts`](./src/data/portfolioData.ts), garantindo carregamento instantâneo e zero dependência de bancos de dados externos em tempo de execução.

---

## Stack Tecnológica

### Aplicação Principal
| Tecnologia | Versão | Papel |
|---|---|---|
| React | `^19.2.8` | Construção da interface modular (SPA) e gerenciamento de estado via Context API |
| TypeScript | `~6.0.2` | Tipagem estática estrita em componentes, contextos e serviços |
| Vite | `^8.2.2` | Bundler de produção e servidor de desenvolvimento com HMR |
| Tailwind CSS | `^4.3.3` | Sistema de estilização utilitária, responsiva e tema dark |
| Framer Motion | `^13.2.0` | Transições e animações declarativas |
| Lucide React | `^1.41.0` | Biblioteca de ícones vetoriais |
| Inter (`@fontsource/inter`) | `^5.3.0` | Tipografia auto-hospedada sem requisições externas para fontes |

### Qualidade, Testes e Integrações
| Ferramenta / Serviço | Papel |
|---|---|
| OxLint (`^1.79.0`) | Linter estático de alta velocidade |
| Vitest (`^5.0.0`) + `happy-dom` | Execução de testes unitários com simulação leve de DOM |
| `@testing-library/react` | Utilitários de teste voltados ao comportamento de componentes |
| GitHub Actions | Pipeline de integração contínua (lint, build e testes) |
| Formspree | Processamento do formulário de contato com fallback automático para `mailto:` |

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
├── public/                        # Ativos públicos estáticos (favicon.svg, icons.svg)
└── src/
    ├── App.tsx                    # Composição de providers e layout principal
    ├── main.tsx                   # Ponto de entrada com ErrorBoundary global
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.tsx         # Navegação fixa com scroll-spy e menu mobile responsivo
    │   │   └── Footer.tsx         # Rodapé com links sociais, retorno ao topo e Preferências de Cookies
    │   ├── portfolio/
    │   │   ├── Hero.tsx           # Seção principal com card de código FastAPI animado e CTAs
    │   │   ├── AboutSection.tsx   # Biografia, pilares técnicos e formação acadêmica
    │   │   ├── TechStack.tsx      # Habilidades agrupadas por categoria e diretrizes de IHC/UX
    │   │   ├── ProjectGrid.tsx    # Listagem de projetos com busca textual e filtro por categoria
    │   │   ├── ProjectCard.tsx    # Card individual de projeto
    │   │   ├── ProjectModal.tsx   # Modal detalhado com descrição completa e links externos
    │   │   └── ContactSection.tsx # Formulário de contato com honeypot, cooldown e fallback mailto:
    │   └── ui/
    │       ├── CookieConsent.tsx  # Banner e modal de Política e Preferências de Cookies
    │       ├── ErrorBoundary.tsx  # Captura e tratamento de erros de renderização
    │       ├── SocialIcons.tsx    # Ícones SVG otimizados (GitHub, LinkedIn)
    │       └── ToastContainer.tsx # Exibição de notificações temporárias (toasts)
    ├── context/                   # Contextos React (Profile, Project, Skill, Toast)
    ├── data/
    │   └── portfolioData.ts       # Fonte única de dados do portfólio
    ├── services/
    │   ├── emailService.ts        # Cliente HTTP Formspree e fallback mailto:
    │   ├── emailService.test.ts   # Testes unitários do serviço de e-mail
    │   ├── storageService.ts      # Abstração segura para leitura e escrita no localStorage
    │   └── storageService.test.ts # Testes unitários do serviço de armazenamento
    ├── types/                     # Contratos e interfaces TypeScript
    └── utils/
        └── urlHelper.ts           # Sanitização e formatação segura de URLs
```

---

## Funcionalidades Principais

- **Apresentação e Stack Técnica**: Seção Hero com simulação interativa de endpoint FastAPI, seção Sobre Mim com histórico acadêmico no CESMAC e visualização de competências técnicas divididas entre Frontend e Backend Python.
- **Catálogo de Projetos com Busca e Filtro**: Filtragem instantânea por categoria (`Frontend`, `Fullstack`, `Backend`, `Mobile`) combinada à busca por título, descrição ou tecnologia, além de modal de detalhes acessível via teclado (`ESC`).
- **Formulário de Contato Resiliente**: Proteção anti-spam via campo *honeypot* (`_gotcha`), intervalo mínimo entre envios (*cooldown* de 30 segundos) e envio direto via Formspree ou cliente de e-mail padrão.
- **Gestão Transparente de Cookies**: Categorias opcionais (**Desempenho e Analíticos**, **Funcionalidade**, **Publicidade e Marketing**) desmarcadas por padrão (*opt-in*), persistência versionada em `localStorage` (`cookieConsent`) e reabertura a qualquer momento pelo rodapé.
- **Acessibilidade**: Navegação completa por teclado (`Tab`, `Shift+Tab`, `ESC`, `Enter`), semântica ARIA (`role="dialog"`, `role="switch"`, `aria-modal`) e alto contraste visual.

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

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto caso deseje configurar o envio direto via Formspree:

```env
VITE_FORMSPREE_ID="seu_id_formspree"
```

> [!TIP]
> A variável `VITE_FORMSPREE_ID` é opcional. Se não for definida, o formulário de contato utiliza automaticamente o fallback nativo `mailto:`, abrindo o cliente de e-mail padrão do usuário com os dados preenchidos.

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
| [`emailService.test.ts`](./src/services/emailService.test.ts) | Submissão HTTP ao Formspree, acionamento de fallback `mailto:` e tratamento de erros de rede |

---

## Contato

- **GitHub**: [github.com/leonardonasls-stack](https://github.com/leonardonasls-stack)
- **LinkedIn**: [linkedin.com/in/leonardolnascimento](https://www.linkedin.com/in/leonardolnascimento)
- **E-mail**: [leonardonasls@gmail.com](mailto:leonardonasls@gmail.com)
