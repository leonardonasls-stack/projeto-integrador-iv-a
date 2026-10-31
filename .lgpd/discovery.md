# Discovery LGPD — Portfólio Leonardo Nascimento (`projeto-integrador-iv-a`)

**Data da auditoria**: 30/10/2026
**Escopo**: Aplicação Web SPA (React 19 + TypeScript + Vite + Tailwind CSS)

## 1. Arquitetura e Armazenamento de Dados
- **Banco de dados próprio**: Não possui backend/banco de dados próprio anexado a este repositório (dados de projetos e perfil são estáticos em `src/data/portfolioData.ts`).
- **Armazenamento local (Browser)**:
  - `localStorage` (`cookieConsent`) gerenciado diretamente em `src/components/ui/CookieConsent.tsx` e utilitário `src/services/storageService.ts`.

## 2. Coleta de Dados Pessoais (Pontos de Entrada)
1. **Formulário de Contato (`src/components/portfolio/ContactSection.tsx` + `src/services/emailService.ts`)**:
   - **Dados coletados**: Nome (`name`), E-mail (`email`), Assunto (`subject` - opcional), Mensagem (`message`).
   - **Campo técnico anti-spam**: Honeypot (`_gotcha`) e cooldown em memória (`lastSubmitTime` — 30s).
   - **Fluxo de envio**:
     - Se `VITE_FORMSPREE_ID` estiver configurado: requisição `POST` HTTPS para `https://formspree.io/f/{id}` (Operador externo / Transferência internacional — EUA).
     - Caso contrário (fallback): abertura do cliente de e-mail local via protocolo `mailto:leonardonasls@gmail.com`.
2. **Banner e Gestão de Cookies (`src/components/ui/CookieConsent.tsx`)**:
   - Armazena preferências de cookies no `localStorage` sob a chave `cookieConsent`.
   - Categorias exibidas: Necessários/Essenciais, Desempenho/Analíticos, Funcionalidade, Publicidade/Marketing.

## 3. SDKs, Terceiros e Requisições Externas
- **Formspree (`formspree.io`)**: Processamento de submissões do formulário de contato (quando variável de ambiente `VITE_FORMSPREE_ID` está ativa).
- **GitHub Pages / Vercel**: Hospedagem estática e entrega de conteúdo (CDN coleta logs técnicos de conexão como endereço IP e User-Agent por segurança e entrega de rede).
- **Imagens externas (`raw.githubusercontent.com`, `images.unsplash.com`)**: Carregamento de thumbnails de projetos no navegador do visitante (expõe IP/User-Agent aos servidores de origem das imagens).
- **SDKs de Analytics/Marketing**: Nenhum script de rastreamento de terceiros (Google Analytics, Meta Pixel, Hotjar) está injetado em `index.html` no momento, embora a UI de cookies mencione exemplos genéricos.

## 4. Achados na Política e Banner de Cookies (`src/components/ui/CookieConsent.tsx`)
1. **Opt-out por padrão (Violação ao Art. 8º, § 4º da LGPD e Guia de Cookies da ANPD)**:
   - Os estados iniciais `analytics: true` e `functional: true` vêm **pré-marcados** antes de qualquer ação do titular.
2. **Impossibilidade de revogação facilitada (Violação ao Art. 8º, § 5º e Art. 18, IX da LGPD)**:
   - Após fechar o banner inicial, não há link ou botão no rodapé (`src/components/layout/Footer.tsx`) para reabrir o painel de preferências e revogar ou alterar o consentimento.
3. **Ausência de botão "Rejeitar Não Essenciais" no Modal de Opções**:
   - No rodapé do modal há apenas "Cancelar", "Aceitar Todos" e "Salvar Preferências", dificultando a recusa direta em segundo nível (Guia de Cookies da ANPD).
4. **Texto genérico desconectado da realidade do sistema (Violação ao princípio da Transparência — Art. 6º, VI e Art. 9º da LGPD)**:
   - Menciona "login, carrinho de compras" e "Facebook, Google" sem detalhar o que o portfólio realmente utiliza (`localStorage` para preferências de consentimento, Formspree para formulário de contato, mídias externas).
5. **Ausência dos elementos obrigatórios do Art. 9º e direitos do Art. 18 da LGPD**:
   - Não identifica claramente o Controlador, o canal de contato para exercício de direitos (DSAR), prazos de retenção/duração nem a lista de direitos do Art. 18.
6. **Ausência de versionamento e timestamp no registro de consentimento**:
   - O objeto salvo no `localStorage` não registra a versão da política (`version`) nem a data/hora da manifestação (`timestamp`).

