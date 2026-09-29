# Plano de Implementação — Portfólio com Painel Administrativo (mini-CMS)

**Projeto:** Projeto Integrador IV-A — Portfólio Pessoal
**Stack atual:** React 19 + TypeScript + Vite + Tailwind CSS 4 + Framer Motion
**Desafios adicionais:** Autenticação · Cadastro de Projetos · Contato

---

## 1. Objetivo

Permitir que o administrador, após fazer login, consiga **editar textos, adicionar repositórios/projetos e adicionar skills sem mexer no código**, com as alterações visíveis imediatamente para qualquer visitante do site.

Para isso, o site deixa de ler o conteúdo de arquivos fixos e do `localStorage` e passa a ler de um banco de dados. O painel admin edita esse banco.

---

## 2. Diagnóstico do estado atual

| Área | O que existe | Lacunas |
|---|---|---|
| **Autenticação** | `AuthContext` com senha comparada via hash SHA-256 e sessão de 2h no `localStorage` | Tudo roda no navegador. O `VITE_ADMIN_HASH` fica embutido no bundle público e o `localStorage` pode ser forjado. Não há limite de tentativas nem proteção real dos dados. |
| **Cadastro de Projetos** | CRUD completo (`ProjectContext`, `ProjectFormModal`, `ProjectTable`) | Os dados ficam só no `localStorage` do admin. Visitantes nunca veem o que foi cadastrado. |
| **Contato** | `ContactSection` + `EmailService` (Formspree) | Só valida campos vazios. Sem anti-spam, sem limite de tamanho, sem histórico. Sem `VITE_FORMSPREE_ID`, o envio sempre falha. |
| **Textos** | `ProfileContext` edita Hero, Sobre e formação | Persistência só local. Não cobre e-mail, redes sociais, títulos de seção nem rodapé. |
| **Skills** | Array fixo dentro de `TechStack.tsx` | Só editável alterando o código. |
| **Links pessoais** | E-mail, GitHub e LinkedIn escritos direto em `Footer`, `Hero` e `ContactSection` | Precisam vir de configuração editável. O `Hero` aponta o LinkedIn para `linkedin.com` genérico. |
| **Qualidade** | Testes apenas para `StorageService`. CI roda lint, type-check e build | O CI não executa `npm test`. |

> Observação: `Navbar.tsx` e `AboutSection.tsx` não puderam ser lidos na exportação (erro de encoding). Conferir se também contêm texto fixo.

---

## 3. Decisão de arquitetura

Para que o conteúdo editado apareça para todos os visitantes, ele precisa estar em um banco compartilhado.

| | **A) Supabase (recomendado)** | **B) Backend FastAPI próprio** |
|---|---|---|
| Esforço | Baixo (~1 semana) | Alto (~2 a 3 semanas) |
| Autenticação | Supabase Auth (e-mail e senha) | JWT com bcrypt/argon2 |
| Dados | Tabelas com RLS | PostgreSQL/MySQL com SQLAlchemy + Alembic |
| Deploy | Front na Vercel + Supabase gerenciado | Front na Vercel + API em Docker |
| Vantagem | Segurança real com pouco código | Alinhado à stack Python, maior valor de portfólio |

**Escolha deste plano: A (Supabase).** O caminho B pode ser uma evolução futura. As fases abaixo valem para ambos, mudando apenas a camada de serviços.

---

## 4. Modelo de dados

| Tabela | Campos principais | Alimenta |
|---|---|---|
| `site_settings` (1 linha) | Todos os campos do `ProfileData` atual + `email`, `github_url`, `linkedin_url`, títulos/subtítulos das seções, texto do rodapé | Hero, Sobre, Contato, Footer |
| `projects` | Campos do tipo `Project` + `position` e `visible` | Vitrine de projetos |
| `skill_categories` | `title`, `icon`, `color`, `position` | Cards da seção de skills |
| `skills` | `category_id`, `name`, `level`, `description`, `position` | Itens dentro de cada card |
| `messages` (opcional) | `name`, `email`, `subject`, `message`, `created_at` | Aba "Mensagens" |

**Decisões de modelagem**

- **Ícones:** o banco não guarda JSX. Salvar o **nome** do ícone Lucide (ex.: `"Cpu"`) e mapear no front por uma lista fixa, escolhida em um dropdown no admin.
- **Ordenação:** coluna `position` com botões subir/descer no painel.
- **Ocultar sem excluir:** coluna `visible` em `projects`.
- **Fallback:** manter `defaultProfileData`, `initialProjects` e o array atual de skills como valores de reserva e como fonte do seed inicial.

### Schema SQL (rascunho)

```sql
-- Configurações do site (linha única)
create table site_settings (
  id int primary key default 1 check (id = 1),
  name text, role text, status_badge text,
  hero_title_prefix text, hero_title_highlight text, hero_description text,
  about_bio text,
  academic_title text, academic_institution text, academic_period text,
  tech_pillar1_title text, tech_pillar1_desc text,
  tech_pillar2_title text, tech_pillar2_desc text,
  email text, github_url text, linkedin_url text,
  projects_title text, projects_subtitle text,
  skills_title text, skills_subtitle text,
  contact_title text, contact_subtitle text,
  footer_text text,
  updated_at timestamptz default now()
);

-- Projetos / repositórios
create table projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  full_description text,
  category text not null
    check (category in ('Frontend','Fullstack','Backend','Mobile','IHC / UX')),
  techs text[] not null default '{}',
  github_url text, demo_url text, image_url text,
  featured boolean not null default false,
  visible boolean not null default true,
  position int not null default 0,
  created_at timestamptz not null default now()
);

-- Categorias e skills
create table skill_categories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  icon text not null default 'Layers',
  color text not null default 'indigo',
  position int not null default 0
);

create table skills (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references skill_categories(id) on delete cascade,
  name text not null,
  level text not null
    check (level in ('Iniciante','Intermediário','Intermediário+','Avançado')),
  description text,
  position int not null default 0
);

-- Mensagens de contato (opcional)
create table messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) <= 80),
  email text not null check (char_length(email) <= 200),
  subject text check (char_length(subject) <= 120),
  message text not null check (char_length(message) <= 2000),
  created_at timestamptz not null default now()
);
```

### Políticas de segurança (RLS)

Leitura pública nas tabelas de conteúdo. Escrita somente para o usuário admin. Substituir `<SEU-UUID>` pelo `id` do usuário criado no Supabase Auth.

```sql
do $$
declare t text;
begin
  foreach t in array array['site_settings','projects','skill_categories','skills']
  loop
    execute format('alter table %I enable row level security', t);
    execute format('create policy "leitura publica" on %I for select using (true)', t);
    execute format(
      'create policy "escrita admin" on %I for all
         using (auth.uid() = ''<SEU-UUID>'')
         with check (auth.uid() = ''<SEU-UUID>'')', t);
  end loop;
end $$;

-- Mensagens: qualquer visitante insere, só o admin lê e apaga
alter table messages enable row level security;
create policy "insert publico" on messages for insert with check (true);
create policy "leitura admin"  on messages for select using (auth.uid() = '<SEU-UUID>');
create policy "delete admin"   on messages for delete using (auth.uid() = '<SEU-UUID>');
```

> A chave `anon` do Supabase é pública por design. A segurança vem das políticas RLS, então **teste-as antes de publicar**.

---

## 5. Fases de implementação

### Fase 0 — Base e migração do conteúdo atual (1 dia)

- [ ] Criar o projeto no Supabase.
- [ ] Executar o schema SQL e as políticas RLS. Versionar em `supabase/schema.sql`.
- [ ] Criar `.env.example` com `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` e `VITE_FORMSPREE_ID`.
- [ ] Instalar `@supabase/supabase-js` e criar `src/services/supabaseClient.ts`.
- [ ] Escrever script de seed com `defaultProfileData`, `initialProjects` e o array de skills do `TechStack`.
- [ ] Adicionar a etapa `npm test` ao `.github/workflows/ci.yml`.

**Critério de aceite:** o banco contém o conteúdo atual do site e o CI roda os testes.

### Fase 1 — Login do administrador (1 dia)

- [ ] Habilitar Auth por e-mail/senha e **desativar o cadastro público**.
- [ ] Criar manualmente o usuário admin e copiar o UUID para as políticas RLS.
- [ ] Reescrever `AuthContext` com `signInWithPassword`, `signOut` e `onAuthStateChange`. O papel de admin vem da sessão, não do `localStorage`.
- [ ] Ajustar `LoginModal` para e-mail + senha, com tratamento de erro (credenciais inválidas, falha de rede).
- [ ] Remover `VITE_ADMIN_HASH` e a lógica de hash SHA-256.

**Critério de aceite:** editar o `localStorage` não concede acesso admin e a sessão persiste ao recarregar a página.

### Fase 2 — Editar textos e links (1 a 2 dias)

- [ ] Criar `settingsService.ts` (`get` e `update` em `site_settings`).
- [ ] Substituir `ProfileContext` por `SiteSettingsContext`, com fallback para `defaultProfileData` e cache local (stale-while-revalidate) para evitar "piscar" ou quebrar se o banco demorar.
- [ ] Ampliar a aba **Perfil** para **Textos & Links**: e-mail, GitHub, LinkedIn, títulos e subtítulos das seções, rodapé.
- [ ] Trocar os links e textos fixos de `Footer`, `Hero` e `ContactSection` por valores das settings.
- [ ] Revisar `Navbar` e `AboutSection` em busca de texto fixo.

**Critério de aceite:** alterar o e-mail no painel atualiza rodapé e contato, sem novo deploy.

### Fase 3 — Projetos e repositórios (2 dias)

- [ ] Criar `projectService.ts` (list, create, update, delete, reorder) e ligar o `ProjectContext` a ele, com estados de `loading` e `error`.
- [ ] **Importar do GitHub:** no `ProjectFormModal`, campo "Colar URL do repositório" + botão "Importar". Consultar `https://api.github.com/repos/{dono}/{repo}` e preencher título, descrição, techs (linguagem + topics), link do repositório e demo (`homepage`). O admin revisa e salva.
  - Sem token, o limite da API pública é de 60 consultas por hora, suficiente para este uso.
  - Tratar repositório inexistente, privado ou limite excedido.
- [ ] Reordenar com botões subir/descer (`position`) e ocultar com toggle `visible`.
- [ ] Validar o formulário: título e descrição obrigatórios, URLs válidas, ao menos uma tech.
- [ ] Remover o merge automático do `initialProjects` (o seed passa a ser feito uma única vez).
- [ ] Opcional: upload de imagem no Supabase Storage, no lugar do campo de URL.

**Critério de aceite:** colar a URL de um repositório novo, salvar e vê-lo na vitrine em outro navegador (aba anônima). Usuário sem login não consegue escrever (testar por chamada direta à API).

### Fase 4 — Skills editáveis (1 a 2 dias)

- [ ] Criar `skillService.ts` e `SkillsContext`.
- [ ] Fazer o `TechStack.tsx` renderizar `skill_categories` e `skills` do banco. Manter o array atual como fallback.
- [ ] Criar o mapa de ícones permitidos (whitelist de nomes Lucide) e de cores.
- [ ] Criar a aba **Skills** no painel:
  - [ ] criar, editar e excluir categorias (com confirmação);
  - [ ] adicionar, editar e excluir skills (nome, nível em dropdown, descrição);
  - [ ] escolher ícone e cor da categoria;
  - [ ] reordenar categorias e skills.
- [ ] Os "princípios de UX" permanecem no código (mudam pouco). Podem migrar depois usando o mesmo padrão.

**Critério de aceite:** adicionar uma skill nova em uma categoria e vê-la no site imediatamente.

### Fase 5 — Contato (1 dia)

- [ ] Validar o e-mail e limitar tamanhos (nome 80, assunto 120, mensagem 2000 caracteres), com erros por campo e `aria-live`.
- [ ] Adicionar honeypot (campo `_gotcha` do Formspree) e cooldown de 30 a 60 s entre envios.
- [ ] Sem `VITE_FORMSPREE_ID`, oferecer link `mailto:` com os dados preenchidos, em vez de erro.
- [ ] Opcional: gravar cada mensagem em `messages` e criar a aba **Mensagens** no painel (listar e excluir).

**Critério de aceite:** mensagens inválidas são barradas no cliente, mensagens válidas chegam ao e-mail e o formulário se comporta bem sem a variável configurada.

### Fase 6 — Qualidade, documentação e entrega (1 a 2 dias)

- [ ] Testes com Vitest + Testing Library:
  - [ ] `EmailService` (com `fetch` mockado);
  - [ ] serviços de projetos, skills e settings (com o client Supabase mockado);
  - [ ] `ContactSection` (validação, sucesso e erro);
  - [ ] `LoginModal` (login e erro);
  - [ ] importação do GitHub (sucesso e falhas).
- [ ] Rodar o axe-core nos formulários novos do painel.
- [ ] Remover o hack `includes('Java')` do antigo `ProfileContext`.
- [ ] Atualizar o README: arquitetura, variáveis de ambiente, como criar o admin, como rodar o schema e o seed.
- [ ] Deploy na Vercel com as variáveis configuradas.
- [ ] Atualizar o CHANGELOG conforme `.agents/rules/changelog.md` (incluindo hash do commit).
- [ ] Preparar demo e prints: login → editar texto → adicionar repositório → adicionar skill → enviar contato.

---

## 6. Cronograma estimado

| Fase | Duração |
|---|---|
| 0. Base e migração | 1 dia |
| 1. Login | 1 dia |
| 2. Textos e links | 1–2 dias |
| 3. Projetos e GitHub | 2 dias |
| 4. Skills | 1–2 dias |
| 5. Contato | 1 dia |
| 6. Qualidade e entrega | 1–2 dias |
| **Total** | **8–11 dias** |

**Escopo mínimo** (se o prazo apertar): Fases 0 a 4. O contato pode permanecer como está e o upload de imagem e a aba de mensagens são cortáveis.

---

## 7. Estrutura de código prevista

```
src/
├── context/
│   ├── AuthContext.tsx          # Supabase Auth
│   ├── SiteSettingsContext.tsx  # substitui ProfileContext
│   ├── ProjectContext.tsx       # passa a usar projectService
│   └── SkillsContext.tsx        # novo
├── services/
│   ├── supabaseClient.ts        # novo
│   ├── settingsService.ts       # novo
│   ├── projectService.ts        # novo
│   ├── skillService.ts          # novo
│   ├── githubService.ts         # novo (importar repositório)
│   ├── emailService.ts
│   └── storageService.ts        # vira cache de leitura
├── components/admin/
│   ├── SettingsFormTab.tsx      # Textos & Links (evolui ProfileFormTab)
│   ├── ProjectFormModal.tsx     # + importar do GitHub
│   ├── SkillsTab.tsx            # novo
│   └── MessagesTab.tsx          # opcional
└── data/
    └── icons.ts                 # whitelist de ícones e cores
supabase/
├── schema.sql
└── seed.ts
```

---

## 8. Riscos e cuidados

| Risco | Mitigação |
|---|---|
| Políticas RLS mal configuradas expõem escrita | Testar chamadas diretas à API sem login antes de publicar |
| Banco indisponível derruba o site | Fallback para dados locais + cache da última versão |
| Limite da API pública do GitHub (60/h) | Tratar o erro na interface e permitir preenchimento manual |
| Cota do Formspree (plano gratuito) | Gravar também em `messages` como backup |
| Escopo maior que o prazo | Seguir o escopo mínimo (Fases 0–4) |
| Texto fixo escondido em componentes não revisados | Revisar `Navbar` e `AboutSection` na Fase 2 |

---

## 9. Checklist final de entrega

- [ ] Login funcional com usuário único e cadastro público desativado
- [ ] Textos, e-mail e redes sociais editáveis pelo painel
- [ ] Projetos/repositórios adicionados, editados, reordenados e excluídos pelo painel
- [ ] Importação de dados a partir da URL do GitHub
- [ ] Skills e categorias gerenciadas pelo painel
- [ ] Formulário de contato validado e com anti-spam
- [ ] Alterações visíveis para visitantes sem deploy
- [ ] RLS testada (visitante sem login não escreve)
- [ ] Testes passando no CI
- [ ] README e CHANGELOG atualizados
- [ ] Deploy publicado e demo preparada
