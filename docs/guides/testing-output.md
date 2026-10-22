# Testar output de terminal

Output de terminal normalmente mistura cores ANSI, atualização de linha e writes em `stdout`/`stderr`. O pacote permite injetar um renderer de memória para assertions sem monkey-patch do processo.

## Usar `cliui({ mode: 'raw' })`

```ts
import { cliui } from '@jeftelabs/cli'

const ui = cliui({ mode: 'raw' })
ui.logger.info('Olá')

const logs = ui.logger.getLogs()
// [{ stream: 'stdout', message: '[ blue(info) ] Olá' }]
```

O modo raw escolhe `MemoryRenderer` e `colors.raw()`, que representa transformações de cor como texto. A forma exata de labels e cores faz parte do output observado pelos testes; para assertions semânticas, remova ou compare partes relevantes com cuidado.

## Acessar renderer do componente

Componentes têm `getRenderer()`, e os renderers oferecem `getLogs()` e `flushLogs()`:

```ts
const ui = cliui({ mode: 'raw' })
ui.table().head(['A', 'B']).row(['1', '2']).render()
```

Exemplo com instância reutilizável:

```ts
const table = ui.table()
table.head(['A', 'B']).row(['1', '2']).render()
const logs = table.getRenderer().getLogs()
```

`flushLogs()` limpa o buffer retornado pelo renderer. `getLogs()` na classe `Logger` encaminha ao renderer conectado.

## Opções raw locais

Modo global e opções específicas não são idênticos:

- `Table({ raw: true })` simplifica a tabela para cabeçalho/linhas com `|`.
- `Instructions({ raw: true })` retorna texto sem bordas da caixa; o ponteiro ainda é incluído por `add()` quando `icons` está habilitado (no global raw, a transformação `dim` aparece como texto raw).
- `Steps({ raw: true })` omite recuos/conectores, mas continua criando títulos coloridos via instância de colors fornecida; ao usar global raw, as cores são representadas como texto raw.
- `TaskManager({ raw: true })` usa renderer de tasks raw.
- `cliui({ mode: 'raw' })` conecta esses componentes ao MemoryRenderer e usa cores raw.

Para saída simples sem cores, `mode: 'silent'` desliga transformações ANSI, mas continua usando ConsoleRenderer. Combine renderer customizado com colors silenciosas quando quiser controlar ambos explicitamente.

## Renderer customizado

Implemente o contrato [`RendererContract`](../references/renderers-and-helpers.md): `getLogs`, `flushLogs`, `log`, `logError`, `logUpdate` e `logUpdatePersist`. Injete com `ui.useRenderer(renderer)` para logger/factories subsequentes; componentes/classes exportados permitem `useRenderer` diretamente.

## Testes neste repositório

O runner configura os arquivos `tests/**/*.spec.ts`; veja [referência de testes](../references/tests-and-examples.md) e exemplos em `tests/` para os padrões de assertion adotados.
