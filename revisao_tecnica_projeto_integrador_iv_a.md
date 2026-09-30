# Revisão Técnica — `projeto-integrador-iv-a`

Portfólio pessoal em **React 19 + TypeScript + Vite + Tailwind 4 + Supabase (BaaS)**, com painel administrativo embutido na SPA.

## Escopo e limitações da análise

- **Base:** digest de ~5.000 linhas com toda a árvore de `src/`, `supabase/`, CI e configs.
- **Lidos por completo:** README, configs, `App.tsx`, `AuthContext`, `LoginModal`, `ProfileContext`, `ProjectContext`, todos os `services/`, `schema.sql`, `ci.yml`, testes.
- **Só verificados por busca (grep) ou leitura parcial:** componentes de UI (`Hero`, `Navbar`, `ProfileFormTab`, `ProjectFormModal`, `AdminDashboardModal`, `MessagesTab`, etc.), `SkillContext`, trecho final do `seed.ts`.
- **Não disponível:** `CHANGELOG.md` (o digest falhou ao lê-lo, erro de codificação `cp1252`), configuração do painel Supabase (Auth, sign-ups, backups), hospedagem/deploy, histórico do git.
- **Não avaliado:** o que depende do runtime (bundle real, Lighthouse, axe). Onde faltou contexto, a incerteza está indicada.
- Os textos com acentos corrompidos (`PortfÃ³lio`) aparecem no digest inteiro. Provavelmente é problema de leitura do digest, não do projeto, mas vale confirmar que os arquivos estão em UTF-8.

---

## 1. Resumo executivo

Para um portfólio pessoal, o projeto está **bem estruturado e com uma decisão de segurança central correta**: a autorização real está no banco (RLS por `auth.uid()`), não no front. Os problemas encontrados são de **consistência, robustez e cobertura de testes**, não falhas estruturais.

| Área | Nota | Comentário curto |
|---|---|---|
| Arquitetura | 7,5 | Camadas claras (components → context → services), BaaS adequado ao porte |
| Código | 7,0 | Legível e consistente; alguns `any` e tratamento de erro que engole falhas |
| Segurança | 7,5 | RLS forte e sem sinks de XSS; lacunas menores (anti-spam, URLs, `visible`) |
| Performance | 6,5 | Sem code splitting; código admin vai para todo visitante |
| Documentação | 5,5 | README extenso, mas **desatualizado** em pontos críticos (auth) |
| Testes | 3,5 | 2 arquivos de teste; um deles frágil; nenhum de componente |
| DevOps | 5,5 | CI presente e útil; sem deploy, audit ou observabilidade documentados |
| Escalabilidade | 6,0 | Adequada à carga esperada; não é preocupação real neste porte |
| Manutenção | 6,5 | Boa organização; dívida em docs, testes e CSS global |

### Classificação de arquitetura

| Item | Classificação |
|---|---|
| Organização do projeto | Bom |
| Separação de responsabilidades | Bom |
| Acoplamento / coesão | Bom |
| Modularização | Bom |
| Uso de abstrações (services, mappers) | Bom |
| Gestão de estado (5 Contexts aninhados) | Aceitável |
| Escalabilidade | Aceitável (suficiente para o porte) |
| Monólito vs microsserviços / event-driven / DDD | Não se aplica (SPA + BaaS é a escolha certa) |

---

## 2. Pontos fortes (e o que NÃO alterar)

1. **Autorização no banco via RLS** (`schema.sql`). Escrita restrita a `auth.uid() = <admin>`, leitura pública nas tabelas de conteúdo, `messages` com `insert` público e `select/delete` só do admin. Mesmo que alguém manipule o front, a API recusa. **Não alterar a filosofia.**
2. **Supabase Auth em vez de segredo no bundle.** O código atual usa `signInWithPassword`. Manter assim. (O README ainda descreve o modelo antigo, veja P1-1.)
3. **`CHECK` constraints e limites de tamanho** em `projects.category`, `skills.level` e `messages.*`. Integridade garantida no banco, não só na UI.
4. **Camada de services com mapeamento snake_case ↔ camelCase** explícito. Isola o schema do resto da UI.
5. **`ProfileContext` com stale-while-revalidate**: usa cache local para não piscar, busca do Supabase, e faz **rollback se o salvamento falhar**. Bom padrão.
6. **`StorageService` seguro** (try/catch em leitura, escrita e remoção, com fallback).
7. **Ausência de sinks de XSS**: busca por `dangerouslySetInnerHTML`, `innerHTML` e `eval` não retornou nada.
8. **Links externos**: os 10 `target="_blank"` têm `noopener`.
9. **Contato**: honeypot, limites de tamanho e degradação elegante (`mailto` quando não há Formspree).
10. **Acessibilidade**: `role="dialog"`, `aria-modal`, `aria-labelledby`, fechamento por ESC.
11. **CI enxuto e correto no essencial**: `npm ci`, lint, build (que já roda `tsc -b`) e testes.
12. **Tooling moderno e coerente** (Vite, OxLint, Vitest, `erasableSyntaxOnly`, `noUnusedLocals`).

---

## 3. Achados

### P1 — Corrigir logo

#### P1-1. Documentação descreve um modelo de autenticação que não existe mais

- **Problema:** o README diz que o admin usa "hash SHA-256 comparado com `VITE_ADMIN_HASH`", sessão com TTL de 2 h e `authService.ts`. O código real usa Supabase Auth; não há `authService.ts` nem `VITE_ADMIN_HASH` no `.env.example`. O README também afirma que `ProjectContext` usa localStorage e cita `data/initialProjects.ts`, que não existe na árvore.
- **Impacto:** quem ler o README pode replicar o modelo antigo (senha por hash em variável `VITE_*`, que fica **pública no bundle** e seria insegura). Também confunde novos desenvolvedores.
- **Gravidade:** Média
- **Evidências:** `README.md` (seções Funcionalidades, Variáveis de Ambiente, Acesso ao Painel, Arquitetura) vs `src/context/AuthContext.tsx`, `.env.example`.
- **Solução:** reescrever essas seções: login por e-mail/senha via Supabase Auth, como criar o usuário admin e trocar o UUID no `schema.sql`, remover `VITE_ADMIN_HASH`, atualizar a árvore de arquivos.
- **Justificativa:** documentação errada sobre segurança é pior do que documentação ausente.
- **Complexidade:** Baixa · **Prioridade:** P1

#### P1-2. `new URL(...)` na renderização pode derrubar a aplicação inteira

- **Problema:** `Contact`/`Hero` (linhas ~2262 e ~2273 do digest) fazem `new URL(profile.githubUrl)` direto no JSX. Se o campo do perfil contiver texto que não seja URL válida, o construtor lança exceção durante o render. Não há Error Boundary em `App.tsx`/`main.tsx`.
- **Impacto:** tela branca para **todos os visitantes** por causa de um erro de digitação no painel admin.
- **Gravidade:** Média (baixa probabilidade, alto impacto)
- **Evidências:** `src/components/portfolio/ContactSection.tsx`, `App.tsx`, `main.tsx`.
- **Solução:** (a) helper `safeHostPath(url)` com try/catch; (b) validar `http(s)` ao salvar no `ProfileFormTab`/`ProjectFormModal`; (c) um `ErrorBoundary` na raiz.
- **Justificativa:** as três medidas são baratas e se complementam (prevenir, tolerar, conter).
- **Complexidade:** Baixa · **Prioridade:** P1

#### P1-3. Teste de e-mail é frágil e pode passar por acaso

- **Problema:** `emailService.test.ts` depende de `VITE_FORMSPREE_ID` **não estar definida** no ambiente ("Assuming it's missing", diz o próprio comentário). Quem tiver `.env` local com o ID verá o teste falhar. Além disso, `vi.resetAllMocks()` no `beforeEach` pode zerar as implementações do mock do Supabase; o `try/catch` do serviço engoliria o erro e o teste passaria sem exercitar o caminho real (depende da semântica de reset da versão do Vitest; vale verificar).
- **Impacto:** teste que falha por ambiente ou que passa sem validar nada.
- **Gravidade:** Média
- **Evidências:** `src/services/emailService.test.ts`.
- **Solução:** usar `vi.stubEnv('VITE_FORMSPREE_ID', '')` e `vi.unstubAllEnvs()`; recriar o mock no `beforeEach`; adicionar casos: Formspree OK, Formspree com erro HTTP, falha do Supabase com envio mantido, ID em formato de URL completa.
- **Justificativa:** `sendContactMessage` é o único fluxo com dinheiro/relacionamento em jogo (contato profissional).
- **Complexidade:** Baixa · **Prioridade:** P1

---

### P2 — Próximas iterações

#### P2-1. Projetos "ocultos" (`visible = false`) são públicos pela API

- **Problema:** a política de leitura é `using (true)`. O filtro `visible` é aplicado só no front (`ProjectContext.filteredProjects`). Qualquer pessoa pode consultar `/rest/v1/projects` e ver os ocultos.
- **Impacto:** vazamento de rascunhos ou projetos privados que o admin ocultou achando que estavam protegidos.
- **Gravidade:** Média (Baixa se nunca se usa "ocultar" para dado sensível)
- **Evidências:** `schema.sql` (loop de policies), `ProjectContext.tsx`.
- **Solução:** política específica para `projects`: `using (visible or auth.uid() = <admin>)`.
- **Justificativa:** o banco passa a impor a regra que a UI só sugere. O admin continua vendo tudo.
- **Complexidade:** Baixa · **Prioridade:** P2

#### P2-2. Contato: anti-spam apenas no cliente; risco de duplicidade

- **Problema:** o honeypot roda no navegador; qualquer script pode fazer `insert` direto na tabela `messages` (política pública). Há limite de tamanho, mas não de volume. Além disso, o serviço grava no banco **antes** do Formspree: se o Formspree falhar e o usuário reenviar, a mensagem fica duplicada no banco.
- **Impacto:** tabela poluída por spam; o painel de mensagens vira ruído; possível consumo do plano gratuito.
- **Gravidade:** Média/Baixa
- **Evidências:** `schema.sql` ("insert publico"), `emailService.ts`, `ContactSection.tsx`.
- **Solução:** (a) CAPTCHA (Turnstile/hCaptcha) validado numa Edge Function que faz o insert; (b) opcionalmente um `check` de formato de e-mail no banco; (c) decidir uma fonte da verdade (banco **ou** Formspree) ou gerar um `client_request_id` para deduplicar.
- **Justificativa:** rate limiting real só é possível no servidor.
- **Complexidade:** Média · **Prioridade:** P2

#### P2-3. Falhas viram estado "vazio" silenciosamente

- **Problema:** `getProjects()` retorna `[]` e `getSettings()` retorna o padrão em caso de erro, só com `console.error`. O visitante não distingue "sem projetos" de "falha ao carregar". Em `ProfileContext`, a falha de fetch mantém o cache antigo sem aviso.
- **Impacto:** portfólio aparentemente vazio (ruim para quem avalia) sem ninguém saber que é um erro.
- **Gravidade:** Média/Baixa
- **Evidências:** `projectService.ts`, `settingsService.ts`, `ProjectContext.tsx`.
- **Solução:** services lançam erro (como `EmailService.getMessages` já faz); contextos expõem `error` e a UI mostra estado de erro com "tentar novamente".
- **Justificativa:** o padrão já existe no projeto; é uniformizar.
- **Complexidade:** Baixa · **Prioridade:** P2

#### P2-4. Cobertura de testes muito baixa

- **Problema:** só há testes para `StorageService` e `EmailService`. `@testing-library/react` e `@testing-library/jest-dom` estão instalados, mas nenhum teste de componente aparece. O README afirma auditoria `axe-core` "0 violações", mas `axe-core` não está em `package.json` nem no CI.
- **Impacto:** regressões em login, CRUD e formulário de contato passam despercebidas; afirmação de acessibilidade não é reproduzível.
- **Gravidade:** Média
- **Solução:** priorizar (1) `ProjectService`/`SettingsService` mappers (puros e fáceis), (2) `ContactSection` (validação, honeypot, toasts), (3) `LoginModal`; adicionar `vitest-axe`/`jest-axe` em 1–2 componentes-chave. Ou remover as dependências e a alegação do README.
- **Justificativa:** manter dependência e documentação sem uso passa uma falsa sensação de garantia.
- **Complexidade:** Média · **Prioridade:** P2

#### P2-5. `seed.ts` provavelmente não funciona com o RLS atual

- **Problema:** o script usa `VITE_SUPABASE_ANON_KEY`. Com o RLS de escrita restrito ao admin, inserts anônimos serão negados; o próprio comentário reconhece ("melhor a Service Role Key"). Também não há script `seed` em `package.json`, e os dados de exemplo divergem do README (`github.com/leonardonasls` vs `leonardonasls-stack`; e-mail `seu.email@exemplo.com`).
- **Impacto:** onboarding e recriação do ambiente quebram sem explicação.
- **Gravidade:** Baixa/Média
- **Solução:** usar `SUPABASE_SERVICE_ROLE_KEY` **sem prefixo `VITE_`** (nunca no bundle), adicionar `"seed": "tsx supabase/seed.ts"` e documentar; alinhar os dados.
- **Complexidade:** Baixa · **Prioridade:** P2

---

### P3 — Melhorias de qualidade

| # | Problema | Evidência | Solução | Gravidade | Complexidade |
|---|---|---|---|---|---|
| P3-1 | **Bug:** `repo.replace('.git','')` remove o **primeiro** `.git` em qualquer posição (ex.: `foo.github.io` vira `foohub.io`); a regex também aceita `?query`/`#hash` no nome | `githubService.ts` | `repo.replace(/\.git$/, '')` e capturar só `[\w.-]+` | Baixa | Baixa |
| P3-2 | Nenhuma validação de esquema em URLs renderizadas em `href` (`githubUrl`, `demoUrl`, `profile.*Url`); um `javascript:` salvo executaria no clique. Escrita é só do admin, então o risco é baixo | `ProjectCard`, `ProjectModal`, `Footer`, `Hero` | Validar `http(s)` no salvamento e/ou helper `safeHref` | Baixa | Baixa |
| P3-3 | `AuthContext` marca **qualquer** sessão Supabase como `role: 'admin'`. É só UI (o RLS protege), mas com sign-up aberto qualquer cadastro veria o painel (sem conseguir gravar) | `AuthContext.tsx` | Desabilitar sign-ups no Supabase (**precisa confirmar a config**) e/ou checar o UID/`app_metadata` | Baixa | Baixa |
| P3-4 | UUID do admin fixo no `schema.sql`, com comentário obsoleto "Substitua `<SEU-UUID>`" | `schema.sql` | Tabela `admins` ou claim em `app_metadata`; ao menos corrigir o comentário. O UUID não é segredo | Baixa | Baixa |
| P3-5 | `vite.config.ts` usa `@ts-expect-error` para a chave `test` | `vite.config.ts` | `import { defineConfig } from 'vitest/config'` | Baixa | Baixa |
| P3-6 | `tsc --noEmit` no CI roda no `tsconfig.json` raiz (`"files": []`), portanto **não verifica nada**; a checagem real ocorre em `npm run build` (`tsc -b`) | `ci.yml`, `tsconfig.json` | Remover o passo ou usar `tsc -b --noEmit` | Baixa | Baixa |
| P3-7 | `"strict"` não aparece em `tsconfig.app.json`, mas o README afirma "TypeScript strict". Pode estar ativo por padrão do TS 6 (**verificar**); explicitar evita dúvida | `tsconfig.app.json` | `"strict": true` | Baixa | Baixa |
| P3-8 | ~19 usos de `any` (`setSelectedCategory: (cat:any)`, `mapDbToProfile(dbData:any)`, `catch (error:any)`, `(dbData as any)`) | `ProjectContext`, `settingsService`, `githubService` | Tipar com `ProjectCategory \| 'Todas'`, `unknown` no catch, tipos gerados do Supabase (`supabase gen types`) | Baixa | Baixa |
| P3-9 | `index.css` reatribui cores utilitárias do Tailwind com `!important` (`.text-slate-500 { color:#94a3b8 !important }`). É um atalho de contraste que faz a classe **mentir** (`slate-500` renderiza como outra cor) | `src/index.css` | Definir tokens com `@theme` e trocar as classes usadas | Baixa | Média |
| P3-10 | Código do painel admin (dashboard, formulários, import GitHub) entra no bundle de todo visitante | `App.tsx` | `React.lazy` + `Suspense` para `AdminDashboardModal` e `LoginModal` | Baixa | Baixa |
| P3-11 | Atualização de ordem dispara N requisições em paralelo, não atômicas; atualização otimista sem rollback | `projectService.updatePositions`, `ProjectContext` | RPC/`upsert` em lote; reverter estado em caso de falha. Irrelevante com poucos projetos | Baixa | Média |
| P3-12 | Código morto/legado: `resetProjects` (no-op), `App.css` vazio, `README` cita `authService`/`initialProjects` | vários | Remover | Baixa | Baixa |
| P3-13 | SPA sem pré-renderização; `<title>` fala só em "Python & FastAPI" e não há Open Graph. Rastreadores que não executam JS veem página vazia | `index.html` | Meta tags OG; opcional prerender/SSG se SEO importar | Baixa | Média |
| P3-14 | Fontes carregadas do Google Fonts: envia o IP do visitante a terceiro (ponto de atenção LGPD/GDPR) | `index.html` | Auto-hospedar Inter (`@fontsource`) | Baixa | Baixa |

---

## 4. Principais riscos

1. **Documentação enganosa sobre autenticação** (P1-1): risco de replicar um modelo inseguro.
2. **Indisponibilidade total por dado inválido no perfil** (P1-2), sem Error Boundary.
3. **Regressões silenciosas** por falta de testes de fluxo (P2-4).
4. **Poluição da tabela `messages`** por spam direto na API (P2-2).
5. **Configuração do Supabase fora do repositório** (sign-ups, e-mail de confirmação, backups): não pude verificar; ver "Informações adicionais".

## 5. Roadmap recomendado

**Curto prazo (1–2 semanas):** P1-1, P1-2, P1-3, P2-1, P2-3, P3-1, P3-5/6/7.

**Médio prazo (1–2 meses):** P2-2 (CAPTCHA via Edge Function), P2-4 (testes de componentes e mappers), P2-5 (seed com service role), P3-8 (tipos gerados), P3-10 (lazy do admin), Dependabot/`npm audit` no CI, deploy documentado (preview por PR).

**Longo prazo (opcional):** P3-9 (tokens `@theme`), P3-13 (SEO/prerender), tabela `admins`/roles, RPC para reordenação, monitoramento de erros (Sentry ou similar).

## 6. Quick wins (baixo esforço, bom retorno)

1. Corrigir as seções de autenticação do README (P1-1).
2. `ErrorBoundary` na raiz + helper de URL segura (P1-2).
3. `stubEnv` no teste de e-mail (P1-3).
4. Política RLS de `visible` (P2-1), uma linha de SQL.
5. `replace(/\.git$/, '')` (P3-1).
6. `"strict": true` explícito e remoção do passo `tsc --noEmit` redundante.
7. Script `seed` no `package.json`.

## 7. Dívida técnica

| Item | Impacto estimado |
|---|---|
| Documentação desatualizada | Médio (confiança e onboarding) |
| Testes insuficientes | Médio → Alto se o projeto crescer |
| Tratamento de erro que engole falhas | Médio (bugs invisíveis) |
| CSS com `!important` global | Baixo hoje; cresce a cada novo componente |
| `any` e falta de tipos gerados do banco | Baixo/Médio (divergência schema ↔ front) |
| Seed e migrations manuais (`schema.sql` único, sem versionamento de migrations) | Baixo hoje; médio ao evoluir o schema (considerar Supabase CLI migrations) |
| Ausência de observabilidade | Baixo (portfólio) |

## 8. Informações adicionais que melhorariam a avaliação

- Configuração do projeto Supabase: **sign-ups habilitados?** confirmação de e-mail? backups? limites de taxa?
- Onde e como é feito o deploy (Vercel, Netlify, Pages?) e se há variáveis de ambiente configuradas lá.
- Conteúdo completo de `ProfileFormTab`, `ProjectFormModal`, `MessagesTab`, `SkillContext` (para validar formulários e o CRUD do admin).
- `CHANGELOG.md` e histórico de commits.
- Resultado real de `npm run build` (tamanho do bundle), `npm audit` e Lighthouse/axe.

## 9. Conclusão

**Pronto com pequenos ajustes.**

A base técnica é sólida e a decisão mais importante (autorização via RLS + Supabase Auth) está correta, portanto **não há necessidade de refatoração estrutural**. Antes de considerar o projeto "fechado", recomendo resolver os três itens P1 (documentação de auth, robustez de URLs/Error Boundary e o teste frágil) e a política de `visible`. O restante é evolução incremental de qualidade (testes, tipos, anti-spam), sem urgência de produção.
