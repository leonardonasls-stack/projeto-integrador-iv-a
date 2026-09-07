# 🚀 Portfólio Pessoal — Leonardo Nascimento

> **Desenvolvedor de Software | Backend Python & Frontend (TypeScript/JavaScript/React)**
> 📍 Estudante de Análise e Desenvolvimento de Sistemas no CESMAC
> 🔗 [github.com/leonardonasls-stack/projeto-integrador-iv-a](https://github.com/leonardonasls-stack/projeto-integrador-iv-a)
> 📧 leonardonasls@gmail.com

---

## 📌 Visão Geral

Portfólio pessoal desenvolvido em **React 19 + TypeScript + Vite**, com design dark premium (glassmorphism), animações fluidas com Framer Motion e arquitetura modular baseada em Context API. A aplicação permite gerenciar e exibir projetos dinamicamente, com painel administrativo completo (CRUD) e persistência local via `localStorage`.

Crio APIs RESTful de alta performance e microsserviços com **Python (FastAPI)**, além de desenvolver interfaces modernas e responsivas com **TypeScript**, **JavaScript** e **React**. Trabalho com modelagem de dados, Docker e integrações assíncronas, sempre com foco em arquitetura eficiente, código limpo e sistemas altamente escaláveis.

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
| OxLint | Linting de alta performance |
| TypeScript strict | Tipagem segura em todo o codebase |

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
│   │   └── Footer.tsx         # Rodapé com links sociais
│   │
│   ├── portfolio/
│   │   ├── Hero.tsx           # Seção inicial com apresentação e card de código
│   │   ├── AboutSection.tsx   # Bio, pilares técnicos e objetivos profissionais
│   │   ├── TechStack.tsx      # Stack completo e boas práticas de UX
│   │   ├── ProjectGrid.tsx    # Grid de projetos com busca e filtros por categoria
│   │   ├── ProjectCard.tsx    # Card individual de projeto com animação
│   │   ├── ProjectModal.tsx   # Modal de detalhe com ESC e click-outside
│   │   └── ContactSection.tsx # Formulário de contato com validação e toast
│   │
│   ├── admin/
│   │   ├── LoginModal.tsx          # Modal de autenticação por senha
│   │   └── AdminDashboardModal.tsx # CRUD completo de projetos + editor de perfil
│   │
│   └── ui/
│       ├── ToastContainer.tsx  # Sistema de notificações (success/error/info)
│       └── SocialIcons.tsx     # Ícones de GitHub e LinkedIn
│
├── context/
│   ├── AuthContext.tsx         # Autenticação admin com persistência em localStorage
│   ├── ProjectContext.tsx      # CRUD + filtro/busca de projetos
│   ├── ProfileContext.tsx      # Dados de perfil editáveis via admin
│   └── ToastContext.tsx        # Sistema global de notificações
│
├── data/
│   └── initialProjects.ts     # Dataset inicial com 6 projetos de exemplo
│
└── types/
    ├── index.ts               # Tipos: Project, ProjectCategory
    └── profile.ts             # Interface ProfileData e defaultProfileData
```

---

## ✨ Funcionalidades

### 🖥️ Portfólio Público
- **Hero Animado**: Apresentação com badge de status, headline, descrição, CTAs e card de código decorativo
- **Sobre Mim**: Bio completa, pilares técnicos, objetivos profissionais e timeline de formação
- **Stack & Boas Práticas**: Cards de habilidades com níveis de proficiência e princípios de UX aplicados
- **Vitrine de Projetos**: Grid responsivo com filtros por categoria (Frontend, Fullstack, Backend, Mobile, IHC/UX) e busca em tempo real
- **Modal de Projeto**: Detalhe expandido com stack completo, links (GitHub/Demo) e fechamento via ESC ou overlay
- **Formulário de Contato**: Validação de campos obrigatórios, estado de loading e feedback via toast

### 🔐 Painel Administrativo (Área Restrita)
- Login por senha (`admin123` ou `admin`)
- **Aba Projetos**: Criar, editar e excluir projetos com confirmação de ação destrutiva
- **Aba Perfil**: Editar textos do Hero e bio do About em tempo real
- Resetar projetos ou textos para o estado padrão

### 💾 Persistência
- Projetos e perfil salvos automaticamente no `localStorage` entre sessões
- Merge inteligente: novos projetos iniciais são incorporados sem sobrescrever dados existentes

---

## 📁 Projetos no Portfólio (Dataset Inicial)

| Projeto | Categoria | Stack Principal |
|---|---|---|
| Console Telegram Bot — Gestão Docker | Backend | Python, Docker API, Asyncio |
| API RESTful FastAPI & Microserviços | Backend | Python, FastAPI, PostgreSQL, Docker |
| DevConnect Fullstack Platform | Fullstack | React, FastAPI, TypeScript, PostgreSQL |
| TaskFlow — Kanban Board | Frontend | React, TypeScript, Framer Motion |
| EcoTracker Mobile | Mobile | React Native, Expo, TypeScript |
| Design System & Boas Práticas de UX | IHC / UX | React, Storybook, Radix UI |

---

## 🚀 Como Executar Localmente

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
npm run build    # Build de produção (tsc + vite build)
npm run preview  # Preview do build de produção
npm run lint     # Linting com OxLint
```

---

## 🔑 Acesso ao Painel Admin

Clique em **"Área Restrita"** na navbar e utilize uma das senhas:

```
admin123   ou   admin
```

---

## 📬 Contato

- **GitHub**: [github.com/leonardonasls-stack](https://github.com/leonardonasls-stack)
- **E-mail**: leonardonasls@gmail.com

---

<div align="center">
  <sub>Desenvolvido com React, TypeScript, Vite e Tailwind CSS</sub>
</div>
