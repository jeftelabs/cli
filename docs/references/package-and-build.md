# Referência de pacote e build

## Identidade e exports

[`package.json`](../../package.json) identifica `@jeftelabs/cli`, versão `1.0.0`, pacote ESM. Os exports públicos são raiz (`build/index.js`), `./helpers` (`build/src/helpers.js`) e `./types` (`build/src/types.js`). `files` publica `build`, excluindo `build/bin`, `build/examples` e `build/tests`.

## Build

Configuração `tsdown` usa três entradas: `index.ts`, `src/helpers.ts`, `src/types.ts`, e destino `build/`; build limpo, ESM, tree shaking desativado, target `esnext`. `tsc --emitDeclarationOnly --declaration` emite declarações. `precompile` executa lint e `clean`; `build` delega a `compile`.

## Dependências

Runtime: `@jeftelabs/colors`, `cli-boxes`, `cli-table3`, `cli-truncate`, `log-update`, `pretty-hrtime`, `string-width`, `supports-color`, `terminal-size`. As dependências cobrem cor, caixas, tabela, truncamento, atualização de linha, duração e largura do terminal.

Dev dependencies incluem `@jeftelabs/exec`, `@t8ngs/*`, TypeScript/tsdown, ESLint/Prettier e Husky.

## Workflows e hooks

- `.husky/pre-commit`: `npm test`.
- `.github/workflows/checks.yml`: é acionado por push para `main` e valida o último Conventional Commit; há uma etapa condicional para PR, mas o workflow não declara evento `pull_request` atualmente.
- `release.yml`: release-please após push para `main` e upload de artefato se uma release for criada.
- `deploy.yml`: publica após release publicada.
- `labels.yml`/`stale.yml`: tarefas administrativas de issues/PRs.

Consulte `package.json` e workflows para estado atualizado. Não presuma que CI atual execute lint/test/build se não estiver declarado.
