# Referência de componentes e opções

Assinaturas resumidas com base em `src/`. Use as declarações emitidas para tipos completos. A maioria das classes aceita `getRenderer`/`useRenderer` e/ou `getColors`/`useColors`; factory `cliui()` injeta esses recursos.

## `Logger`

Construtor `Logger(options?: Partial<LoggerOptions>)`; opções `dim` e `dimLabels` (dim false por padrão; `dimLabels` herda `dim`). Métodos:

- `success`, `error`, `fatal`, `warning`, `info`, `debug`: log formatado; error/fatal usam canal de erro.
- `prepareSuccess/Error/Fatal/Warning/Info/Debug`: retornam string formatada sem escrever.
- `await(text, options?)`: retorna `Spinner`.
- `action(title)`: retorna `Action`.
- `log`, `logError`, `logUpdate`, `logUpdatePersist`, `getLogs`, `flushLogs`, `child`, `dummy`.

Opções por mensagem: `prefix`, `suffix`, `startTime`, `silent`. `%time%` é substituído por timestamp ISO. `fatal` aceita `{ message, stack? }`; `error` aceita string ou `{ message }`.

## `Action`

Retornada por `Logger.action(title)`. `displayDuration(enabled = true)`, `succeeded()`, `skipped(reason?)`, `failed(string | Error)` escrevem resultado; `prepareSucceeded`, `prepareSkipped` e `prepareFailed` somente formatam texto. A ação conta duração desde sua construção. Falha escreve no canal stderr.

## `Spinner`

Retornado por `Logger.await`. `start`, `update(text, options?)`, `stop`, `tap(callback)`. Atualização só altera texto enquanto running; animação usa intervalo de 200ms. `tap` direciona frames ao callback.

## `Table`

Factory `ui.table(options?)` ou construção direta. Opções `raw` e `chars`. `head`, `row`, `columnWidths`, `fullWidth(enabled = true)`, `fluidColumnIndex`, `render`. Células podem ser strings ou objetos com `content` e opções de span/alinhamento; tipos concretos estão em `src/types.ts`. Full width usa tamanho de terminal e `string-width`. Raw output é texto separado por pipes.

## `Instructions` e sticker

`ui.instructions()`/`ui.sticker()` retornam `Instructions`. Opções `icons` (true por padrão) e `raw`. Métodos `fullScreen`, `drawBorder`, `heading`, `add`, `prepare`, `render`. FullScreen define largura máxima usando `TERMINAL_SIZE`; `prepare()` retorna uma string.

## `Steps`

`ui.steps()` retorna `Steps`; `add(title, content?)`, `prepare()`, `render()`. Conteúdo pode ser multilinha; `raw` omite recuo/linhas de conexão.

## `TaskManager` e `Task`

`ui.tasks({ icons?, raw?, verbose? })`. `add`, `addIf`, `addUnless`, `tasks`, `getState`, `run`. Callback recebe `{ update(message), error(error) }` e retorna string para sucesso, `Error`/objeto de erro para falha, síncrona ou assincronamente. `Task` expõe getters de estado, duração, erro, mensagem de sucesso e última linha, listeners `onUpdate`, além de transições `start`, `update`, `markAsSucceeded`, `markAsFailed`.

## Opções de modo globais

Veja [`api-entrypoint.md`](./api-entrypoint.md) para `cliui` mode e as interações com as opções locais.
