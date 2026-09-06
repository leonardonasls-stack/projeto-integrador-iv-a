# 💻 Plataforma de Portfólio para Desenvolvedores — Projeto IV-A

> **Disciplinas**: Ferramentas Web + Interface Humano-Computador (IHC) | **Período**: 2026.2  
> **Autor**: Leonardo Silveira  
> **Link do Repositório**: [github.com/leonardonasls-stack/projeto-integrador-iv-a](https://github.com/leonardonasls-stack/projeto-integrador-iv-a)

---

## 📌 Visão Geral

Aplicação web responsiva e acessível desenvolvida para a gestão e exibição de portfólios de desenvolvedores de software. O projeto foi arquitetado com base nos princípios fundamentais de **Interface Humano-Computador (IHC)**, incorporando **Feedback Visual**, **Prevenção de Erros**, **Affordance**, **Acessibilidade (a11y)** e **Visibilidade do Estado do Sistema**.

---

## 🛠️ Stack Tecnológica (Opção C — Completa)

- **Frontend**: React 18, TypeScript, Vite
- **Estilização**: Tailwind CSS v4, Glassmorphism, CSS Custom Properties
- **Animações & Micro-interações**: Framer Motion, Lucide Icons
- **Gerenciamento de Estado**: Context API (Auth, Projects, Toast) + LocalStorage API
- **Arquitetura**: SPA (Single Page Application) modularizada por componentes

---

## ✨ Funcionalidades Principais

- 📱 **Responsividade Total**: Layout Mobile-First adaptável para smartphone, tablet e desktop.
- 🎨 **Hero & Bio Interativa**: Apresentação profissional com links diretos para redes sociais e currículo.
- 🔍 **Vitrine de Projetos**: Grid dinâmico com filtros por categoria (Frontend, Fullstack, Backend, Mobile, IHC) e busca por termo/tecnologia em tempo real.
- 🪟 **Modal de Detalhes**: Exibição expandida de cada projeto com informações completas e atalhos por teclado (ESC).
- 💬 **Formulário de Contato**: Validação de campos em tempo real e notificações visuais (Toasts).
- 🔐 **Dashboard Admin (CRUD Opcional)**: Módulo de gestão de projetos (Criação, Edição e Exclusão com alerta de confirmação) acessível por login de teste (`admin123`).

---

## 📐 Heurísticas de Usabilidade (IHC) Aplicadas

1. **Visibilidade do Estado do Sistema**: Indicador visual da seção ativa na Navbar e status de autenticação.
2. **Feedback Visual Imediato**: Mensagens Toast em ações de CRUD e estados de envio em formulários.
3. **Prevenção de Erros**: Diálogos de confirmação antes de remover qualquer item.
4. **Controle e Liberdade do Usuário**: Botão para restaurar dados padrão e fechamento fácil de modais.
5. **Consistência e Padronização**: Sistema unificado de cores, tipografia Inter e espaçamentos.

---

## 🚀 Como Executar o Projeto Localmente

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
