# Referência de renderers e helpers

## `RendererContract`

Exportado pelo subpath `@jeftelabs/cli/types`:

```ts
interface RendererContract {
  getLogs(): { message: string; stream: 'stdout' | 'stderr' }[]
  flushLogs(): void
  log(message: string): void
  logError(message: string): void
  logUpdate(message: string): void
  logUpdatePersist(): void
}
```

Todos os métodos são requeridos pela interface, inclusive `getLogs` e `flushLogs`, mesmo que um renderer de console retorne array vazio/no-op. `ConsoleRenderer` escreve com `console.log`/`console.error`; `logUpdate` e persistência usam `log-update`. `MemoryRenderer` mantém array interno e mapeia update a log, sem efeito em persist.

## `justify(columns, options)`

Exportado em `/helpers`. Alinha strings por `string-width` com `maxWidth`, `align: 'left' | 'right'` (default left) e `paddingChar` (default espaço). Strings já tão largas ou maiores não são truncadas.

## `wrap(columns, options)`

Opções `startColumn`, `endColumn`, `trimStart?`. Usa wrapper baseado em palavras: a primeira linha começa normalmente e linhas subsequentes podem receber padding até a coluna inicial; `trimStart` remove esse prefixo. Largura do terminal e texto ANSI podem afetar visualização conforme utilitário usado.

## `truncate(columns, options)`

Opções `maxWidth`, `truncationChar?` (default `…`) e `position?: 'start' | 'middle' | 'end'` (default end). Usa `cli-truncate`.

## `TERMINAL_SIZE`

Constante `terminalSize().columns` calculada quando `src/helpers.ts` é importado. É usada por tabelas full-width e caixa full-screen; alterações posteriores do tamanho do terminal não atualizam automaticamente esse valor neste módulo.

## `icons`, `colors`, `useColors`

`icons` adapta caracteres para Windows sem Windows Terminal. A factory exporta alias `colors` do `@jeftelabs/colors`; `useColors({ raw?, silent? })` escolhe implementações raw, silent ou ANSI.

Veja o [guia de teste](../guides/testing-output.md) para injeção e assertions de renderer.
