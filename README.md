# `@jeftelabs/cli`

Kit de UI com opiniões definidas para aplicações de linha de comando: logs formatados, ações, spinners, tabelas, instruções, etapas e tarefas assíncronas. Os componentes podem usar saída normal, modo silencioso ou saída raw em memória para testes.

## Requisitos e instalação

Requer Node.js `>=20.6.0`.

```sh
npm install @jeftelabs/cli
```

## Início rápido

```ts
import { cliui } from '@jeftelabs/cli'

const ui = cliui()

ui.logger.info('Iniciando instalação')
ui.logger.action('Configurando projeto').succeeded()

ui.steps()
  .add('Instalar dependências', 'Execute npm install')
  .add('Iniciar aplicação', 'Execute npm start')
  .render()
```

## Modos de saída

```ts
const normal = cliui()                 // detecta suporte a cor em stdout
const silent = cliui({ mode: 'silent' }) // sem transformações de cor
const raw = cliui({ mode: 'raw' })       // cores em texto raw e MemoryRenderer
```

Sem modo explícito, o pacote seleciona `silent` quando `supports-color` não detecta cor em stdout; caso contrário, usa `normal`. `switchMode('normal' | 'silent' | 'raw')` troca o modo da instância. No modo raw, leia os resultados por `ui.logger.getLogs()` ou pelo renderer do componente para escrever assertions determinísticas. O contrato de logs tem `{ message, stream: 'stdout' | 'stderr' }`.

## Componentes

### Logger, ações e spinner

```ts
ui.logger.success('Conta criada')
ui.logger.warning('Pouco espaço em disco', { suffix: 'libere espaço' })
ui.logger.error('Não foi possível salvar')

const spinner = ui.logger.await('Instalando', { suffix: 'npm install' })
spinner.start()
spinner.update('Preparando arquivos')
spinner.stop()
```

O logger também oferece `debug`, `info`, `fatal`, `prepare*`, `logUpdate`, `child()` e `dummy()`. `logger.action(title)` retorna uma ação com `succeeded()`, `skipped(reason?)`, `failed(error)` e `displayDuration()`; os métodos `prepareSucceeded/Skipped/Failed` retornam texto sem escrever.

### Tabelas

```ts
ui.table()
  .head(['Pacote', 'Status'])
  .row(['@jeftelabs/cli', 'OK'])
  .fullWidth()
  .fluidColumnIndex(0)
  .render()
```

`Table` aceita cabeçalho/células em string ou objetos com alinhamento/span, largura customizada e caracteres de borda. Em raw mode emite linhas simples delimitadas por `|`.

### Instruções, sticker e steps

```ts
ui.instructions().heading('Próximos passos').add('cd app').render()
ui.sticker().add('Servidor iniciado').add('http://localhost:3000').render()

ui.steps()
  .add('Instalar', 'npm install')
  .add('Executar', 'npm start')
  .render()
```

Instructions desenha uma caixa com ponteiro; sticker usa o mesmo componente sem ponteiro. `fullScreen()` ajusta a caixa à largura do terminal, `drawBorder()` permite estilizar a borda e `prepare()` retorna o texto. Steps lista títulos sequenciais com conteúdo opcional.

### Tarefas assíncronas

```ts
const tasks = ui.tasks()
tasks
  .add('Baixar arquivos', async ({ update }) => {
    update('Baixando pacote')
    return 'Download concluído'
  })
  .addIf(process.platform === 'win32', 'Preparar Windows', async () => 'Pronto')

await tasks.run()
console.log(tasks.getState()) // idle | running | succeeded | failed
```

Tarefas são executadas em sequência. Callback deve retornar string para sucesso; pode retornar `error('mensagem')`, um `Error`, ou lançar erro para falhar. `tasks({ verbose: true })` exibe todos os updates; por padrão o renderer minimal mantém a exibição compacta. Raw mode é adequado a testes. Veja o [guia de tarefas](./docs/guides/tasks.md) para estado e tratamento de falhas.

## Helpers e exports

O pacote também publica `icons`, `colors`, classes `Logger`, `Table`, `Steps`, `Instructions`, `TaskManager`, `MemoryRenderer`, `ConsoleRenderer` e subpaths `@jeftelabs/cli/helpers` e `@jeftelabs/cli/types`. Os helpers `justify`, `wrap` e `truncate` são exportados no subpath `/helpers`.

## Documentação

Consulte [`docs/README.md`](./docs/README.md) para guias, referências de API, renderers, testes e planejamento. As instruções para agentes e a exigência de documentar toda alteração estão em [`AGENTS.md`](./AGENTS.md).

## Desenvolvimento

```sh
npm install
npm run quick:test
npm run lint
npm run typecheck
npm run build
```

`npm test` executa lint e os testes; `npm run format` formata escrevendo nos arquivos. Consulte o [guia de desenvolvimento](./docs/guides/development.md).

## Licença

MIT. Consulte [`LICENSE`](./LICENSE).
