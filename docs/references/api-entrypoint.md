# Referência do entry point e da factory

O entry point fonte é [`index.ts`](../../index.ts). O pacote publicado declara exports em [`package.json`](../../package.json): raiz, `./helpers` e `./types`.

## `cliui(options?)`

```ts
cliui(options?: Partial<{ mode: 'raw' | 'silent' | 'normal' }>)
```

A factory resolve mode: se não informado e `supportsColor.stdout` for falsy, escolhe `silent`; caso contrário, `normal`. Renderer inicial: `MemoryRenderer` em raw, `ConsoleRenderer` nos demais. Colors inicial: `colors.raw()`, `.silent()` ou `.ansi()` através de `useColors`.

Retorna objeto com:

- `colors`, `logger`, `icons`;
- `table(options?)`, `tasks(options?)`, `steps()`, `instructions()`, `sticker()`;
- `switchMode(mode)`, `useRenderer(renderer)`, `useColors(colors)`.

Factories criam instâncias e injetam renderer e colors selecionados. `instructions()` habilita ponteiro; `sticker()` desabilita. `switchMode` troca renderer e cores atuais e atualiza logger; configure componente existente manualmente se precisar alterar renderer/cores depois de sua criação.

## Exports da raiz

Valores exportados: `icons`, classe `Table`, `Steps`, `Logger`, `TaskManager`, `Instructions`, `MemoryRenderer`, `ConsoleRenderer`, alias `colors` e função `cliui`.

`Spinner` e `Action` são retornados pelos métodos do logger, mas não são reexportados diretamente pelo entry point raiz.

## Subpaths de pacote

- `@jeftelabs/cli/helpers`: helpers de layout exportados por `src/helpers.ts` (`TERMINAL_SIZE`, `justify`, `wrap`, `truncate`).
- `@jeftelabs/cli/types`: tipos exportados por `src/types.ts`, incluindo `RendererContract`, options, callbacks, tabela e steps.

Confirme `exports` e `tsdown.entry` caso a lista de subpaths seja alterada.
