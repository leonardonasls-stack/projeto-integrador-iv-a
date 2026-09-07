# Regra de Projeto: Manutenção Obrigatória do CHANGELOG

Toda e qualquer alteração realizada no codebase (novas funcionalidades, correções de bugs, refatorações ou atualizações de documentação) **DEVE** seguir as seguintes diretrizes:

1. **Registro no CHANGELOG.md**:
   - Atualizar o arquivo [`CHANGELOG.md`](file:///c:/Users/Leo-dev/Projeto%20Integrador%20IV-A/CHANGELOG.md) na raiz do projeto a cada conjunto de alterações entregue.

2. **Inclusão Obrigatória do Código do Commit**:
   - Cada entrada no changelog deve conter o hash do commit Git (versão curta de 7 caracteres ou hash completo).
   - Exemplo: `### 📌 Commit 6a53f44 — feat(profile): ...`

3. **Estrutura dos Registros**:
   - Classificar as alterações em seções claras (*Formação Acadêmica*, *Fixes*, *Docs*, *Refatoração*, etc.).
   - Listar os arquivos principais modificados usando links markdown clicáveis com esquema `file://`.
