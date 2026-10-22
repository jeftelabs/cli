# Guia de tarefas assíncronas

## Registrar e executar

`ui.tasks(options?)` cria um `TaskManager`. Cada callback recebe um objeto `{ update, error }`:

```ts
const tasks = ui.tasks()

tasks
  .add('Baixar arquivos', async ({ update }) => {
    update('Conectando ao servidor')
    await download()
    return 'Download concluído'
  })
  .addIf(process.platform === 'win32', 'Configurar Windows', async () => 'Pronto')
  .addUnless(process.env.SKIP_CHECKS === '1', 'Validar arquivos', async () => 'Validados')

await tasks.run()
```

Os métodos de registro são encadeáveis. `addIf(condition, ...)` registra apenas se true; `addUnless(condition, ...)` registra apenas se false. `tasks()` retorna as instâncias `Task` já registradas.

## Resultado e falha

Callback deve retornar string para sucesso. Para falhar, pode retornar `error('motivo')`, que produz `{ isError: true, message }`, retornar `Error`, ou lançar/rejeitar erro. Exemplo:

```ts
tasks.add('Conectar', async ({ error }) => {
  const connected = await connect()
  if (!connected) return error('Conexão recusada')
  return 'Conectado'
})
```

O primeiro callback é aguardado antes do seguinte. Ao receber retorno que não seja string, a execução marca a task e o manager como failed e não inicia tasks posteriores. Exceções também são capturadas, expostas em `tasks.error` e encerram a sequência.

## Estados e progresso

`TaskManager.getState()` retorna `idle | running | succeeded | failed`. `Task` expõe `title`, `getState`, `getDuration`, `getError`, `getSuccessMessage`, `getLastLoggedLine`, `onUpdate`, `start`, `update`, `markAsSucceeded` e `markAsFailed`.

Dentro do callback, `update(message)` atualiza o último texto de progresso. Com renderer minimal, a linha substituível exibe o status da lista; verbose mostra os updates como logs independentes. `onUpdate` permite observar mudanças de estado/progresso.

## Renderers de task

- Padrão minimal: saída compacta e substituível, com `icons` habilitado por padrão.
- `{ verbose: true }`: exibe início, updates e conclusão/falha como linhas separadas.
- `{ raw: true }`: usa `RawRenderer`, sem decoração ANSI/ícones; pensado para testes.

`raw` tem precedência sobre `verbose`. `useRenderer` e `useColors` permitem injetar dependências. A API/contratos completos estão em [referência de componentes](../references/components.md).

## Considerações

- Tasks executam sequencialmente; não há paralelismo ou retry automático.
- `run()` ignora chamadas depois do estado sair de `idle`.
- O formato de erro pode carregar stack no renderer; não confunda mensagem de erro retornada com lançamento da exceção.
- Um manager sem tasks não deve ser usado como substituto de uma sequência válida: o renderer minimal presume uma última task para renderizar.
