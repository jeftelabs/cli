# Referência de testes e exemplos

## Runner e comandos

[`bin/test.ts`](../../bin/test.ts) usa `@t8ngs/runner` e os plugins `@t8ngs/assert` e `@t8ngs/fs`, configura `tests/**/*.spec.ts` e executa `run()`. `npm run quick:test` inicia com `@jeftelabs/exec`; `npm test` primeiro executa lint via `pretest` e depois `quick:test` (sem c8 segundo o script atual).

## Cobertura por componente

- `action.spec.ts`: estados de action, cor/dim e motivo de skip.
- `helpers.spec.ts`: `justify`, `wrap`, `truncate`.
- `instructions.spec.ts`: linha, múltiplas linhas, heading e ícones.
- `logger.spec.ts`: labels, canais, spinner, child logger, silêncio e flush.
- `steps.spec.ts`: conteúdo, títulos, multiline, chaining, prepare e raw.
- `table.spec.ts`: saída, linhas/cabeçalhos, cor e raw.
- `task.spec.ts`, `task_manager.spec.ts`: estados, listeners, duração, sucesso, erro, sequência, condições e opções.
- `ui.spec.ts`: factory, modos e injeção de renderer/colors.

## Exemplos

`examples/` tem demos para ações, instructions, layout helpers, logger/spinner, atualização de linha, steps simples/formatados, sticker, table e tasks. São arquivos para leitura/execução local; não são entry points publicados (`files` exclui `build/examples`). Ao mudar uma API usada por exemplo, atualize-o se continuar sendo a forma recomendada de uso.

## Assertions de saída

Prefira `cliui({ mode: 'raw' })` ou renderer de memória para não capturar streams globais nem depender de terminal/ANSI real. Detalhes do modo raw são explicados no [guia de output](../guides/testing-output.md).
