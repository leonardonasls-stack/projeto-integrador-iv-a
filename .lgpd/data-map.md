# Mapa de Dados (Data Mapping) — Portfólio Leonardo Nascimento

**Versão**: v1.0
**Data**: 30/10/2026
**Controlador / Responsável**: Leonardo Nascimento (`leonardonasls@gmail.com`)

## Atividades de Tratamento

### A001 — Atendimento de Mensagens via Formulário de Contato

| Campo | Valor |
|---|---|
| Slug | `a001-contato-portfolio` |
| Descrição | Recebimento e resposta a mensagens profissionais, propostas e oportunidades enviadas pelo visitante. |
| Finalidade específica | Viabilizar a comunicação direta solicitada pelo titular para oportunidades profissionais, parcerias ou dúvidas técnicas (Art. 6º, I LGPD). |
| Base legal | Art. 7º, V (Procedimentos preliminares relacionados a contrato, a pedido do titular) e Art. 7º, IX (Legítimo interesse para contatos gerais) — ver [`legal-basis.md`](./legal-basis.md#a001-atendimento-de-mensagens-via-formulário-de-contato) |
| Categorias de titulares | Visitantes do site, recrutadores, clientes potenciais e parceiros (adultos). |
| Dados sensíveis? | Não |
| Dados tratados | Nome (`name`), endereço de e-mail (`email`), assunto (`subject`), conteúdo da mensagem (`message`). |
| Fonte / origem | Coletado diretamente do titular via preenchimento voluntário em `ContactSection.tsx`. |
| Sistemas que armazenam | Transmissão via API Formspree (quando configurada) e caixa de entrada de e-mail do Controlador (`gmail.com`). |
| Operadores externos | Formspree, Inc. (roteamento de formulário) e Google Workspace / Gmail (armazenamento de e-mail). |
| Transferência internacional | Sim — Estados Unidos (servidores Formspree e Google), com salvaguardas contratuais padrão (Art. 33 e Res. CD/ANPD nº 19/2024). |
| Retenção | Pelo tempo necessário para concluir o atendimento/negociação ou até pedido de eliminação pelo titular (máximo de 2 anos para histórico de contato comercial inativo). |
| Medidas de segurança | Transmissão cifrada via HTTPS/TLS, validação de tamanho máximo de campos, proteção anti-bot via Honeypot (`_gotcha`) e rate-limit client-side (cooldown de 30s). |
| Alto risco? (Res. 2/2022 Art. 4º) | Não (baixo volume, sem dados sensíveis, sem decisões automatizadas ou perfilamento). |
| RIPD necessário? | Não |

---

### A002 — Gestão de Preferências de Cookies e Privacidade (`localStorage`)

| Campo | Valor |
|---|---|
| Slug | `a002-gestao-consentimento-cookies` |
| Descrição | Registro local da escolha do usuário quanto às categorias de cookies e armazenamento local. |
| Finalidade específica | Memorizar no próprio navegador do titular suas escolhas de privacidade (aceite, rejeição ou personalização) e a versão da política aceita, evitando exibir o banner repetidamente. |
| Base legal | Art. 7º, II (Cumprimento de obrigação legal/regulatória de demonstrar e respeitar a escolha do titular — Art. 8º) e Legítimo Interesse estritamente necessário (Art. 7º, IX) para o cookie técnico essencial. |
| Categorias de titulares | Visitantes do site. |
| Dados sensíveis? | Não |
| Dados tratados | Objeto JSON em `localStorage` (`cookieConsent`) contendo: flags booleanas (`essential`, `analytics`, `functional`, `marketing`), `version` da política e `timestamp` ISO-8601. |
| Fonte / origem | Gerado pela ação explícita do titular no banner ou modal de cookies (`CookieConsent.tsx`). |
| Sistemas que armazenam | Exclusivamente o `localStorage` do navegador do próprio titular (armazenamento client-side). |
| Operadores externos | Nenhum (não é transmitido a servidores externos). |
| Transferência internacional | Não |
| Retenção | 12 meses (365 dias) no navegador do usuário ou até limpeza de dados do navegador / revogação manual no rodapé do site, ou atualização material da versão da política. |
| Medidas de segurança | Isolamento de origem (Same-Origin Policy do navegador), ausência de identificadores pessoais diretos. |
| Alto risco? | Não |
| RIPD necessário? | Não |

---

### A003 — Entrega da Aplicação Web e Logs Técnicos de Infraestrutura

| Campo | Valor |
|---|---|
| Slug | `a003-entrega-web-infraestrutura` |
| Descrição | Requisições HTTP padrão para carregamento do site estático e ativos visuais. |
| Finalidade específica | Garantir a entrega técnica das páginas, segurança contra ataques (DDoS/abuso) e renderização de imagens de portfólio. |
| Base legal | Art. 7º, IX (Legítimo interesse do controlador e de terceiros na segurança e disponibilidade da rede — Art. 10). |
| Categorias de titulares | Visitantes do site. |
| Dados sensíveis? | Não |
| Dados tratados | Endereço IP, User-Agent, data/hora da requisição HTTP, URL requisitada. |
| Fonte / origem | Observado automaticamente pelos servidores de hospedagem/CDN durante a navegação. |
| Sistemas que armazenam | Logs efêmeros de borda (CDN) do provedor de hospedagem (GitHub Pages / Vercel) e provedores de imagens (`githubusercontent.com`, `unsplash.com`). |
| Operadores externos | GitHub, Inc. / Vercel Inc. / Unsplash Inc. |
| Transferência internacional | Sim — CDNs globais / EUA. |
| Retenção | Conforme ciclo padrão de logs de segurança da CDN (tipicamente 7 a 30 dias). |
| Medidas de segurança | TLS 1.3 em trânsito, cabeçalhos de segurança e ausência de correlação com identidade nominal. |
| Alto risco? | Não |
| RIPD necessário? | Não |

