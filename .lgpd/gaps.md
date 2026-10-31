# Gap Analysis e Plano de Remediação — 30/10/2026

## Resumo Executivo
- **3 gaps críticos** (Consentimento pré-marcado em cookies não essenciais, impossibilidade de revogação pós-fechamento do banner, ausência de informações obrigatórias do Art. 9º e direitos do Art. 18 na política).
- **3 gaps altos** (Ausência de botão de rejeição direta no modal, falta de versionamento/timestamp no registro de consentimento, ausência de aviso de privacidade no formulário de contato).
- **2 gaps médios** (Documentação formal de base legal e inventário ROPA/Data Map do projeto).

## Matriz de Conformidade (Legacy Retrofit)

| Item | Status | Evidência | Base Normativa | Severidade |
|---|---|---|---|---|
| Toggles de cookies não essenciais desmarcados por padrão | RED | `analytics: true, functional: true` em `CookieConsent.tsx` | Art. 7º, I; Art. 8º, § 4º LGPD; Guia de Cookies ANPD | Crítica |
| Revogação de consentimento a qualquer momento (link permanente) | RED | Sem gatilho no `Footer.tsx` após ocultar o banner | Art. 8º, § 5º e Art. 18, IX LGPD | Crítica |
| Elementos obrigatórios de transparência na Política (Controlador, Contato, Art. 18) | RED | Texto genérico ("carrinho de compras") sem dados do controlador e Art. 18 | Art. 6º, VI; Art. 9º, I–VII; Art. 18 LGPD | Crítica |
| Botão "Apenas Essenciais / Rejeitar Não Essenciais" em 1º e 2º nível | YELLOW | Presente no banner, mas ausente no rodapé do modal | Guia Orientativo de Cookies ANPD | Alta |
| Registro de consentimento versionado e com timestamp | YELLOW | `localStorage` salva apenas booleans sem `version` e `updatedAt` | Art. 6º, X (Responsabilização) e Art. 8º LGPD | Alta |
| Transparência na coleta do Formulário de Contato | YELLOW | `ContactSection.tsx` não informa finalidade/operador junto ao envio | Art. 6º, I e VI; Art. 9º LGPD | Alta |
| Base legal e Mapa de Dados documentados | RED | Inexistente antes da auditoria | Art. 7º e Art. 37 LGPD | Média |
| Criptografia em trânsito | GREEN | HTTPS em produção (GitHub Pages / Vercel e API Formspree) | Art. 46 LGPD | - |
| Minimização de dados no formulário | GREEN | Coleta apenas Nome, E-mail, Assunto e Mensagem + Honeypot sem rastreio invasivo | Art. 6º, III (Necessidade) LGPD | - |

## Ações Imediatas (Executadas nesta Auditoria)
1. **Corrigir `CookieConsent.tsx` (Privacy by Default & ANPD Cookie Guide)**:
   - Alterar estado padrão para `analytics: false`, `functional: false`, `marketing: false` (Opt-in estrito).
   - Incluir versionamento da política (`version: '2.0'`) e `timestamp` ISO-8601 no armazenamento local, invalidando consentimentos legados sem versão.
   - Adicionar botão explícito **"Apenas Essenciais"** também no rodapé do modal de configuração.
   - Atualizar integralmente o texto da **Política de Cookies e Privacidade** no modal com as categorias reais, detalhes de armazenamento (`localStorage`), operadores de terceiros (Formspree, GitHub Pages/Vercel), bases legais (Art. 7º), direitos do titular (Art. 18) e identificação/contato do controlador (Art. 9º e Art. 41).
2. **Garantir Direito de Revogação Facilitada (`Footer.tsx` + `CookieConsent.tsx`)**:
   - Adicionar botão/link **"Preferências de Cookies & Privacidade"** no rodapé (`Footer.tsx`) que dispara a abertura imediata do modal de configuração para consulta ou revogação a qualquer momento (Art. 8º, § 5º).
3. **Documentar Inventário e Bases Legais em `.lgpd/`**:
   - Gerar `.lgpd/data-map.md`, `.lgpd/legal-basis.md`, `.lgpd/policies/privacy-policy-v1.0-draft.md` e `.lgpd/STATUS.md`.

