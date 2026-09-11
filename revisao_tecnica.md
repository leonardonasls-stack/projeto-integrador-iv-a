Revisão Técnica — Portfólio Pessoal (Leonardo Nascimento)

Stack: React 19 · TypeScript 6 · Vite 8 · Tailwind CSS 4 · Framer Motion · Context API · localStorage
Escopo: SPA de portfólio com painel administrativo (CRUD) e persistência local

Problemas Encontrados
PROBLEMA 1 — Senha hardcoded e exposta no código-fonte e no README

Descrição: A autenticação compara a senha diretamente em texto puro no bundle JS, e o README documenta as credenciais publicamente.

Impacto: Qualquer pessoa que inspecione o source map, o bundle minificado ou o repositório tem acesso imediato às credenciais de administrador. O painel admin permite deletar todos os projetos e alterar textos do portfólio.

Gravidade: Alta

Evidências:

ts
// src/context/AuthContext.tsx, linha 2830
if (passcode === 'admin123' || passcode === 'admin') {
// README.md, linha 201-204
admin123   ou   admin
ts
// LoginModal.tsx, linha 1514
<code>admin123</code> ou <code>admin</code>

Solução: Para um portfólio estático sem backend, a mitigação mais simples e adequada ao contexto é substituir a senha por um hash SHA-256 armazenado em variável de ambiente do Vite:

ts
// vite.config.ts / .env
VITE_ADMIN_HASH=<sha256 da senha real>

// AuthContext.tsx
const hashInput = async (s: string) => {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
};
const login = async (passcode: string): Promise<boolean> => {
  const h = await hashInput(passcode);
  if (h === import.meta.env.VITE_ADMIN_HASH) { ... }
};

Isso não impede um ataque de força bruta offline, mas elimina a exposição trivial. Remover as credenciais do README é obrigatório.

Justificativa: Não há camada de servidor para proteger o segredo — mas expô-lo em claro no fonte e na documentação pública é o pior cenário evitável. Um hash com salt mínimo já eleva consideravelmente a barra.

Complexidade: Baixa | Prioridade: P0

PROBLEMA 2 — Estado de autenticação persistido em localStorage sem expiração

Descrição: O AuthContext serializa o objeto User (incluindo isLoggedIn: true) no localStorage. A sessão de admin não expira jamais, nem após fechar e reabrir o navegador.

Impacto: Em um computador compartilhado (laboratório, biblioteca), qualquer pessoa que abra o portfólio encontrará o painel admin já autenticado indefinidamente.

Gravidade: Média

Evidências:

ts
// AuthContext.tsx, linha 2837
localStorage.setItem('dev_portfolio_auth', JSON.stringify(adminUser));

Solução: Adicionar um timestamp de expiração à sessão (ex: 2 horas) e validá-lo na inicialização do contexto:

ts
const SESSION_TTL_MS = 2 * 60 * 60 * 1000; // 2 horas

// ao fazer login:
localStorage.setItem('dev_portfolio_auth', JSON.stringify({
  ...adminUser,
  expiresAt: Date.now() + SESSION_TTL_MS
}));

// ao inicializar:
const saved = JSON.parse(localStorage.getItem('dev_portfolio_auth') ?? 'null');
if (saved && saved.expiresAt > Date.now()) return saved;
localStorage.removeItem('dev_portfolio_auth');
return guestUser;

Complexidade: Baixa | Prioridade: P1

PROBLEMA 3 — App.css contém CSS do template Vite não utilizado

Descrição: O arquivo src/App.css contém classes como .counter, .hero, #center, #next-steps, #spacer, .ticks — todos resíduos do template padrão create-vite — que não são referenciadas em nenhum componente do projeto real.

Impacto: CSS morto aumenta o tamanho do bundle sem benefício, gera confusão para quem for manter o projeto, e alguns seletores de ID (ex: #center) poderiam conflitar acidentalmente com IDs futuros na aplicação.

Gravidade: Baixa

Evidências: Todo o conteúdo de src/App.css (linhas 391–576).

Solução: Deletar src/App.css e remover a importação correspondente em App.tsx se existir. As utilities reais do projeto estão corretamente em src/index.css.

Complexidade: Baixa | Prioridade: P2

PROBLEMA 4 — Encoding UTF-8 corrompido nos dados estáticos

Descrição: O arquivo src/data/initialProjects.ts e src/types/profile.ts apresentam caracteres UTF-8 corrompidos em múltiplas strings (ex: GestÃ£o, AssistÃªncia, OlÃ¡, AnÃ¡lise). O CHANGELOG.md sequer pôde ser lido por incompatibilidade de encoding.

Impacto: Em produção, esses strings corrompidos serão renderizados visualmente incorretos no portfólio — exibindo lixo de encoding para visitantes em vez do texto real. É um defeito visual crítico para um portfólio pessoal.

Gravidade: Alta

Evidências:

ts
// initialProjects.ts, linha ~3134
'Console Telegram Bot â€" GestÃ£o de Containers Docker'
// profile.ts, linha ~3255
heroDescription: 'OlÃ¡! Sou Leonardo Nascimento...'

Solução: O problema provavelmente originou-se de edição dos arquivos com um editor configurado para CP1252/Latin-1 em vez de UTF-8. A correção é:

Garantir que o editor e o Git estejam configurados para UTF-8 (git config core.autocrlf false, .editorconfig com charset = utf-8).
Reescrever os strings corrompidos com o texto correto.
Adicionar ao projeto um .editorconfig com charset = utf-8.

Observação: Este problema só aparece no digest.txt gerado. Se o projeto rodando localmente exibe corretamente, pode ser artefato do extrator. Confirme inspecionando o HTML renderizado em produção.

Complexidade: Baixa | Prioridade: P1

PROBLEMA 5 — IDs de projeto gerados com Date.now() não são globalmente únicos

Descrição: Novos projetos recebem ID como proj-${Date.now()}. Se dois projetos forem criados no mesmo milissegundo (improvável em uso humano, mas possível em testes automatizados ou cliques rápidos), haverá colisão de ID.

Impacto: Colisão de IDs pode causar comportamento indefinido nas operações de update/delete que usam o ID como chave primária.

Gravidade: Baixa

Evidências:

ts
// ProjectContext.tsx, linha 3008
id: `proj-${Date.now()}`,

Solução: Usar crypto.randomUUID() (disponível em todos os browsers modernos e no ambiente Vite):

ts
id: `proj-${crypto.randomUUID()}`,

Complexidade: Baixa | Prioridade: P3

PROBLEMA 6 — filteredProjects recalculado a cada render sem memoização

Descrição: A função de filtragem em ProjectContext é recalculada em todo render do provider, mesmo que projects, selectedCategory e searchQuery não tenham mudado.

Impacto: Para o volume atual de 4 projetos é imperceptível. Mas a correção é trivial e prepara o código para crescimento.

Gravidade: Baixa

Evidências:

ts
// ProjectContext.tsx, linhas 3035–3043
const filteredProjects = projects.filter((project) => {
  ...
});

Solução: Envolver com useMemo:

ts
import { useMemo } from 'react';

const filteredProjects = useMemo(() =>
  projects.filter((project) => {
    const matchesCategory = selectedCategory === 'Todas' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techs.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  }),
  [projects, selectedCategory, searchQuery]
);

Complexidade: Baixa | Prioridade: P3

PROBLEMA 7 — Formulário de contato é um mock sem envio real

Descrição: O ContactSection.tsx simula um envio com setTimeout de 1,2s e exibe sucesso, mas não envia dado algum. O visitante que preencher o formulário não terá sua mensagem entregue.

Impacto: Funcionalidade central de um portfólio — o contato — está quebrada silenciosamente. O usuário recebe feedback de "sucesso" sem que nada ocorra.

Gravidade: Média (para o propósito do projeto como portfólio real)

Evidências:

ts
// ContactSection.tsx, aproximadamente linhas 1692–1708
setTimeout(() => {
  setLoading(false);
  setSubmitted(true);
  addToast('success', 'Mensagem Enviada!', ...);
  setFormData({ name: '', email: '', subject: '', message: '' });
}, 1200);

Solução: Integrar com um serviço de formulários estático gratuito, compatível com SPAs sem backend. Opções recomendadas:

Formspree (https://formspree.io): uma linha de fetch, gratuito para portfolios.
EmailJS: dispara e-mail diretamente do front sem backend.
Resend (com Vercel Edge Function): se quiser controle total.

Exemplo com Formspree:

ts
const response = await fetch('https://formspree.io/f/SEU_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
if (!response.ok) throw new Error('Falha no envio');

Complexidade: Baixa | Prioridade: P1

PROBLEMA 8 — AnimatePresence sem mode definido nos modais

Descrição: Os componentes AdminDashboardModal, LoginModal e ProjectModal envolvem elementos com AnimatePresence mas não definem mode="wait". Isso pode causar sobreposição visual breve de animações de entrada e saída quando o estado muda rapidamente.

Gravidade: Baixa

Solução: Adicionar mode="wait" onde o modal tem conteúdo condicional que anima:

tsx
<AnimatePresence mode="wait">

Complexidade: Baixa | Prioridade: P3

PROBLEMA 9 — Ausência de aria-label na busca de projetos ao limpar

Descrição: O botão de limpar busca tem aria-label="Limpar busca", o que está correto. Mas o campo de busca em si não tem id associado ao label, tornando-o inacessível para leitores de tela.

Gravidade: Baixa

Evidências: ProjectGrid.tsx usa aria-label diretamente no input, sem id/htmlFor explícitos. A maioria dos outros formulários (ex: ContactSection) usa corretamente id + htmlFor.

Solução: Adicionar id="project-search" ao input e um <label htmlFor="project-search"> visualmente oculto (ou usar aria-label consistente como já está). O atual aria-label no input é aceitável, mas inconsistente com o restante do projeto.

Complexidade: Baixa | Prioridade: P3

PROBLEMA 10 — Nenhum tratamento de erro para imagens externas (Unsplash)

Descrição: As imagens dos projetos apontam para URLs da Unsplash. Não há fallback para falha de carregamento de imagem.

Impacto: Se a Unsplash estiver indisponível ou uma URL mudar, o card/modal exibirá imagem quebrada.

Solução:

tsx
<img
  src={project.imageUrl}
  alt={project.title}
  onError={(e) => { (e.target as HTMLImageElement).src = '/fallback-project.png'; }}
  className="w-full h-full object-cover"
/>

Complexidade: Baixa | Prioridade: P3

O que está bem implementado — não altere

Estrutura de Context API: A separação em AuthContext, ProjectContext, ProfileContext e ToastContext com hooks customizados (useAuth, useProjects, etc.) é correta, coesa e apropriada para a escala do projeto. Introduzir Redux ou Zustand aqui seria over-engineering injustificado.

Tipagem TypeScript: O uso de strict no tsconfig, noUnusedLocals, noUnusedParameters e verbatimModuleSyntax demonstra maturidade na configuração. Os tipos em src/types/ são bem definidos e separados por domínio.

Pipeline de CI: O workflow .github/workflows/ci.yml executa lint, type-check e build em sequência. Está correto e suficiente para o contexto do projeto.

Acessibilidade nos modais: O uso de role="dialog", aria-modal="true", aria-labelledby, fechamento via ESC e stopPropagation no overlay é uma implementação de acessibilidade acima da média para projetos de portfólio.

Merge inteligente de projetos iniciais: A lógica no ProjectContext que verifica projetos novos faltantes no localStorage e os incorpora sem sobrescrever dados do usuário é uma solução pragmática e elegante para o problema de migração de dados no frontend.

Sistema de Toasts: A implementação com AnimatePresence, auto-dismiss e remoção manual é limpa, desacoplada via context e bem acessível (aria-live="polite").

Organização de componentes: A separação em components/admin, components/layout, components/portfolio e components/ui é clara, coesa e facilita a navegação por novos desenvolvedores.

Resumo Executivo
Dimensão	Nota	Observação
Arquitetura	8.0	Context API bem aplicada, separação clara de responsabilidades
Código	7.5	Legível e consistente; CSS morto e memoização faltante são os pontos fracos
Segurança	4.0	Senha em texto claro no código e na documentação pública é o principal risco
Performance	8.0	Adequada ao escopo; useMemo faltante é a única melhoria relevante
Documentação	7.0	README bem escrito; ausência de JSDoc em funções de contexto
Testes	0.0	Nenhum teste automatizado presente
DevOps	6.5	CI funcional, mas sem deploy automatizado ou verificação de cobertura
Escalabilidade	5.0	localStorage como backend limita qualquer crescimento real
Manutenção	7.5	Estrutura facilita evolução; encoding corrompido é risco de manutenção
Pontos Fortes
Arquitetura de contexts bem modularizada para o escopo do projeto
TypeScript configurado de forma rigorosa (strict, noUnusedLocals, etc.)
Acessibilidade nos modais acima da média (ARIA, ESC, overlay click)
CI pipeline funcional com lint + typecheck + build
UX consistente: toasts, confirmações antes de deletar, filtros com clear button
Merge inteligente de dados no localStorage (não quebra sessões antigas)
Design system coeso com variáveis CSS customizadas e Tailwind
Principais Riscos Técnicos
Credenciais em claro no código e no README (P0 imediato)
Formulário de contato fake — visitantes não conseguem de fato contatar o autor
Encoding corrompido nos dados estáticos (risco visual em produção)
Sessão admin sem TTL — computadores compartilhados permanecem autenticados indefinidamente
Zero cobertura de testes — qualquer refatoração futura é feita às cegas
Roadmap Recomendado
Curto prazo (esta semana)
Substituir senhas hardcoded por hash via variável de ambiente (P0)
Adicionar TTL à sessão de admin (P1)
Integrar formulário de contato com Formspree ou EmailJS (P1)
Corrigir encoding dos dados estáticos se confirmado em produção (P1)
Deletar App.css (resíduo de template) (P2)
Médio prazo (próximas semanas)
Adicionar useMemo ao filtro de projetos (P3)
Corrigir geração de ID com crypto.randomUUID() (P3)
Adicionar onError com fallback nas imagens (P3)
Adicionar .editorconfig para forçar UTF-8 no time
Escrever ao menos testes unitários para as funções de contexto (add/update/delete/filter)
Longo prazo (evolução do projeto)
Se o portfólio precisar de dados reais, migrar de localStorage para um backend simples (Supabase, PocketBase, ou API FastAPI do próprio autor)
Avaliar uso de React Router para URLs diretas por seção (melhora SEO e compartilhamento)
Adicionar OpenGraph e meta tags para compartilhamento em redes sociais
Quick Wins
Melhoria	Impacto	Esforço
Hash de senha com .env	Remove risco de segurança P0	~30 min
TTL na sessão	Elimina sessão permanente	~20 min
Formspree no formulário	Formulário de contato funciona de verdade	~45 min
Deletar App.css	Remove ~180 linhas de CSS morto	2 min
crypto.randomUUID() nos IDs	Elimina colisão possível	1 min
useMemo no filtro	Boa prática; base para crescimento	~10 min
Dívida Técnica
Item	Impacto estimado se não resolvido
Zero testes automatizados	Qualquer evolução significativa terá alto risco de regressão
localStorage como única persistência	Impede multi-dispositivo, multi-usuário ou migração de dados
Formulário de contato fake	Oportunidades de trabalho perdidas silenciosamente
Senha hardcoded	Controle total do painel por qualquer visitante técnico
Conclusão

O projeto está pronto para produção com pequenos ajustes obrigatórios. A base de código é sólida, bem organizada e demonstra boas práticas de React moderno. A arquitetura de contexts é correta para o escopo. O TypeScript está configurado rigorosamente. O CI é funcional.

Os bloqueadores antes de um deploy público profissional são dois: a credencial admin em texto claro (P0 de segurança) e o formulário de contato inoperante (P1 funcional) — ambos corrigíveis em menos de 2 horas de trabalho.

Os demais itens são melhorias de qualidade e boas práticas que elevam a maturidade do código, mas não impedem a publicação.