# 📁 Projeto IV-A — Plataforma de Portfólio para Desenvolvedores
> Disciplinas: Ferramentas Web + Interface Humano-Computador | 2026.2

---

## 📌 Visão Geral

Desenvolvimento de uma **plataforma web responsiva de gerenciamento de portfólio** voltada para desenvolvedores que desejam exibir, monitorar e compartilhar seus projetos profissionalmente.

---

## 🎯 Objetivos

- Criar uma aplicação web responsiva e acessível
- Implementar boas práticas de IHC (usabilidade, acessibilidade, feedback visual)
- Desenvolver um portfólio profissional funcional com interface intuitiva
- (Opcional) Módulo de gerenciamento de projetos

---

## ✅ Requisitos

### Obrigatórios
- [ ] **Responsividade** — adaptação para mobile, tablet e desktop
- [ ] Interface clara e navegável (princípios de IHC)
- [ ] Exibição de projetos do desenvolvedor

### Opcionais (aumentam a nota)
- [ ] **Gerenciamento de Projetos** — CRUD de projetos
- [ ] **Autenticação** — login/cadastro de usuário
- [ ] **Cadastro de Projetos** — formulário para adicionar/editar projetos
- [ ] **Contato** — formulário de contato funcional
- [ ] Backend parcial ou completo

---

## 🧱 Estrutura de Páginas

### 1. Landing / Home
- Hero com nome e tagline do desenvolvedor
- Breve apresentação (bio)
- Links para seções e redes sociais (GitHub, LinkedIn)

### 2. Sobre (About)
- Foto e apresentação pessoal
- Habilidades/tecnologias (ex: badges ou lista visual)
- Experiência ou formação

### 3. Projetos (Portfolio)
- Grid de cards com projetos
- Filtro por categoria/tecnologia
- Cada card: nome, descrição curta, tecnologias usadas, links (GitHub / Demo)

### 4. Contato (Contact)
- Formulário (nome, e-mail, mensagem)
- Links sociais
- (Opcional) integração com EmailJS ou backend próprio

### 5. [Opcional] Dashboard de Gerenciamento
- Listagem de projetos cadastrados
- Formulário de criação/edição de projeto
- Exclusão com confirmação
- Acesso restrito por autenticação

---

## 🛠️ Stack Tecnológica Sugerida

> Escolha **uma** das opções abaixo e descreva na apresentação no Conecte-se.

| Camada | Opção A (Simples) | Opção B (Intermediária) | Opção C (Completa) |
|--------|-------------------|-------------------------|--------------------|
| **Frontend** | HTML + CSS + JS puro | React ou Vue.js | React + TypeScript |
| **Estilo** | CSS próprio / Bootstrap | Tailwind CSS | Tailwind + shadcn/ui |
| **Backend** | — | — | Node.js / Python / PHP |
| **Banco de dados** | LocalStorage | — | PostgreSQL / MySQL / SQLite |
| **Autenticação** | — | — | JWT / Sessions |
| **Deploy** | GitHub Pages / Netlify | Vercel | Railway / Render |

---

## 📐 Princípios de IHC a Aplicar

| Princípio | Aplicação no Projeto |
|-----------|----------------------|
| **Feedback visual** | Hover nos cards, loading states, mensagens de sucesso/erro |
| **Consistência** | Mesma paleta, tipografia e espaçamento em todas as páginas |
| **Affordance** | Botões claramente clicáveis, links identificáveis |
| **Visibilidade** | Navegação clara, usuário sabe onde está (breadcrumb / active nav) |
| **Prevenção de erros** | Validação de formulários em tempo real |
| **Responsividade** | Layout adaptável com mobile-first |
| **Acessibilidade** | Alt em imagens, contraste adequado, navegação por teclado |

---

## 📁 Estrutura de Arquivos (Exemplo Frontend Puro)

```
portfolio/
├── index.html
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   ├── main.js
│   └── projects.js
├── assets/
│   ├── img/
│   └── icons/
└── pages/
    ├── about.html
    ├── projects.html
    └── contact.html
```

### Exemplo com React

```
portfolio/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── ProjectCard.jsx
│   │   └── ContactForm.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   └── Contact.jsx
│   ├── data/
│   │   └── projects.js    ← dados dos projetos (JSON local)
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js
```

---

## 🧪 Dados de Exemplo para Projetos

```json
[
  {
    "id": 1,
    "title": "Sistema de Gerenciamento de Tarefas",
    "description": "Aplicação web para organização de tarefas com drag-and-drop.",
    "techs": ["React", "TypeScript", "Tailwind"],
    "github": "https://github.com/usuario/repo",
    "demo": "https://demo.vercel.app",
    "category": "Frontend",
    "image": "assets/img/projeto1.png"
  }
]
```

---

## 📊 Critérios de Avaliação

| Critério | Peso |
|----------|------|
| Projeto (funcionalidade + qualidade) | 0–8 pontos |
| Apresentação (ao vivo ou gravada) | 0–2 pontos |
| **Total** | **10 pontos** |

### O que valorizar na entrega:
- Interface bem projetada e responsiva
- Código organizado e legível
- Funcionalidades extras implementadas (autenticação, backend, CRUD)
- Clareza na apresentação (tecnologias usadas, decisões tomadas, desafios)

---

## 🗓️ Cronograma Sugerido

| Semana | Atividade |
|--------|-----------|
| 1 | Planejamento: wireframes, escolha de stack, paleta e tipografia |
| 2 | Estrutura HTML/componentes base + Navbar + Hero |
| 3 | Seção de projetos + cards + responsividade |
| 4 | Seção Sobre + Contato + ajustes de IHC |
| 5 | Extras opcionais (auth, CRUD, backend) |
| 6 | Revisão, testes, deploy e gravação da apresentação |

---

## 🚀 Deploy (Sugestões Gratuitas)

| Plataforma | Tipo | Link |
|------------|------|------|
| **GitHub Pages** | Frontend estático | pages.github.com |
| **Vercel** | Frontend / Next.js | vercel.com |
| **Netlify** | Frontend estático | netlify.com |
| **Railway** | Backend + banco | railway.app |
| **Render** | Backend + banco | render.com |

---

## 📋 Checklist Final antes da Entrega

- [ ] Projeto funciona sem erros no browser
- [ ] Layout responsivo testado no mobile (Chrome DevTools)
- [ ] Imagens com atributo `alt`
- [ ] Formulários com validação
- [ ] README no repositório GitHub descrevendo o projeto e tecnologias
- [ ] Apresentação gravada ou preparada
- [ ] Link de entrega no Conecte-se

---

## 💡 Dicas Extras

- Use o **Figma** (gratuito) para fazer wireframes antes de codar
- Inspecione portfólios de referência no [Awwwards](https://www.awwwards.com/) e [Dribbble](https://dribbble.com/)
- Mantenha o **GitHub atualizado** com commits frequentes — demonstra processo
- Descreva na apresentação **por que** escolheu a stack, não apenas **o que** usou
- Backend simples com JSON Server ou Supabase pode ser suficiente para o módulo opcional
