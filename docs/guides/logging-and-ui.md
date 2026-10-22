# Guia de logging e componentes de UI

## Criar a UI

```ts
import { cliui } from '@jeftelabs/cli'

const ui = cliui()
```

`ui` oferece `logger`, `colors`, `icons` e factories `table()`, `tasks()`, `steps()`, `instructions()` e `sticker()`. A factory injeta cores e renderer nos componentes.

## Logger

```ts
ui.logger.info('Compilando', { prefix: 'build', suffix: 'tsdown' })
ui.logger.success('Build concluído')
ui.logger.warning('Configuração padrão em uso')
ui.logger.error('Não foi possível ler o arquivo')
ui.logger.fatal(new Error('Falha irreversível'))
ui.logger.debug('Detalhes internos')
```

Todos os métodos `prepareSuccess`, `prepareError`, `prepareFatal`, `prepareWarning`, `prepareInfo` e `prepareDebug` preparam string sem escrever. Métodos `error` e `fatal` escrevem no canal de erro; `warning`, `info`, `debug` e `success` escrevem no de saída. `LoggerOptions.dim` aplica dim no conteúdo e, por padrão, também nos labels; `dimLabels` pode configurar somente labels.

`LoggerMessageOptions` aceita `prefix`, `suffix`, `startTime` (tupla `process.hrtime`) e `silent`. `%time%` no prefix é substituído por timestamp ISO. Embora exista opção `silent`, o renderer de log ainda é invocado pelos métodos do logger; a opção é usada pelo spinner para suprimir animação.

O logger também expõe `log`, `logError`, `logUpdate`, `logUpdatePersist`, `getLogs`, `flushLogs`, `getRenderer`, `useRenderer`, `getColors`, `useColors`, `child` e `dummy`. `dummy()` usa um renderer em memória para descartar saída do console.

## Ações

`ui.logger.action('Criando arquivo')` retorna `Action`:

```ts
ui.logger.action('Criando arquivo').displayDuration().succeeded()
ui.logger.action('Arquivo existente').skipped('sem alterações')
ui.logger.action('Atualizando config').failed(new Error('permissão negada'))
```

Estados são `succeeded`, `skipped` e `failed`. Há versões `prepareSucceeded`, `prepareSkipped` e `prepareFailed` que retornam a mensagem; `failed` escreve no canal de erro. `displayDuration()` inclui duração desde a criação da ação.

## Spinner

```ts
const spinner = ui.logger.await('Instalando dependências', { suffix: 'npm install' })
spinner.start()
spinner.update('Resolvendo pacotes')
spinner.stop()
```

Spinner atualiza enquanto seu estado está running; `tap(callback)` envia cada linha para callback em vez de chamar `logUpdate` do renderer. Isso permite alimentar o progresso de uma task. Após `stop`, a saída final é persistida quando o spinner escreve direto no renderer.

## Tabelas

```ts
ui.table()
  .head(['Arquivo', { content: 'Status', hAlign: 'right' }])
  .row(['config.ts', { content: 'OK', hAlign: 'right' }])
  .fullWidth()
  .fluidColumnIndex(0)
  .render()
```

Métodos: `head`, `row`, `columnWidths`, `fullWidth`, `fluidColumnIndex`, `getRenderer`, `useRenderer`, `getColors`, `useColors`, `render`. Cabeçalhos/células aceitam string ou conteúdo com alinhamento horizontal/vertical e spans segundo os tipos. A tabela mede colunas com `string-width`; raw output é simplificado com `|` e não representa alinhamentos/box drawing.

## Instructions, sticker e steps

`instructions()` produz uma caixa arredondada, com ponteiro por padrão. Pode configurar `heading`, `add`, `fullScreen`, `drawBorder`, injeção de colors/renderer e `prepare`/`render`. `sticker()` usa a mesma classe sem ponteiro.

`steps()` cria uma lista numerada com `add(title, content?)`; conteúdo multilinha é aceito. `prepare()` retorna o texto e `render()` escreve. Em raw mode de steps, recuo e espaços de conexão são omitidos.

Para as assinaturas completas, consulte [referência de componentes](../references/components.md).
