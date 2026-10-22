# Desenvolvimento e manutenção

## Ambiente e instalação

[`package.json`](../../package.json) declara ESM e Node.js `>=20.6.0`; dependências ficam em `dependencies` e `devDependencies`. `package-lock.json` está versionado. Instale com `npm ci` para reproduzir as dependências do lockfile ou `npm install` em desenvolvimento.

## Estrutura

- `index.ts`: factory e exports públicos.
- `src/`: componentes, helpers, tipos, renderers e gerenciamento de tasks.
- `tests/`: testes de comportamento/output usando `@t8ngs/runner`.
- `examples/`: exemplos independentes de uso dos componentes.
- `.github/workflows/`: checks de commit, release, deploy e manutenção do repositório.

## Scripts disponíveis

| Comando | Efeito |
| --- | --- |
| `npm run quick:test` | Executa `bin/test.ts` com `@jeftelabs/exec`. |
| `npm test` | Executa `pretest` (lint) e os testes. |
| `npm run lint` | Executa ESLint. |
| `npm run typecheck` | Executa `tsc --noEmit`. |
| `npm run compile` | Executa `tsdown` e `tsc --emitDeclarationOnly --declaration`. |
| `npm run build` | Encaminha para `compile`; `precompile` roda lint e limpeza de `build`. |
| `npm run format` | Executa Prettier escrevendo nos arquivos. |

Confirme sempre scripts atuais em `package.json` antes de executá-los/recomendá-los.

## Como alterar componentes

1. Localize componente em `src/` e o conjunto de testes correspondente.
2. Preserve uso direto e uso via factory quando ambos forem públicos.
3. Confira output em `normal`, `silent` e `raw`, além de `stdout`/`stderr` e injeção de renderer quando relevante.
4. Atualize ou crie testes de output usando renderer de memória para evitar dependência de terminal real.
5. Atualize guias/referências e README na mesma alteração.
6. Atualize exemplos se a mudança alterar a forma recomendada de uso.

## Build e publicação

`tsdown` usa `index.ts`, `src/helpers.ts` e `src/types.ts` como entradas, e `tsc` gera declarations. `package.json` publica `build`, excluindo `build/bin`, `build/examples` e `build/tests`; os subpaths de helpers e types apontam a builds correspondentes. `prepublishOnly` roda build.

## CI e release

- `.husky/pre-commit` executa `npm test`.
- `checks.yml` é acionado por push em `main` e valida a última mensagem Conventional Commit; contém também uma etapa condicional para PR, mas o workflow não declara atualmente evento `pull_request`. Não executa build ou testes.
- `release.yml` roda release-please na branch `main` e pode criar/anexar artefato.
- `deploy.yml` publica após release publicada.
- `labels.yml` e `stale.yml` cuidam de administração de labels/issues/PRs.

Revise workflows ao alterar automação; não afirme que CI cobre verificações não declaradas.
