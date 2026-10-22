# Visão geral e arquitetura

## Objetivo

`@jeftelabs/cli` fornece componentes consistentes de interface em terminal para CLIs Node.js. Abrange mensagens, ações com resultado, animações simples, tabelas, caixas de instrução, passos e execução visual de tarefas assíncronas.

As escolhas visuais são deliberadamente centralizadas: classes/componentes fornecem métodos para conteúdo e estado, e delegam a escrita a um renderer. As cores vêm do pacote relacionado `@jeftelabs/colors`.

## Mapa de módulos

- [`index.ts`](../../index.ts): exports públicos e fábrica `cliui()`.
- `src/logger/`: `Logger`, `Action` e `Spinner`.
- `src/table.ts`: construção de tabela apoiada por `cli-table3`.
- `src/instructions.ts`: caixa de instruções e variante sticker via flag de icons.
- `src/steps.ts`: lista visual de passos numerados.
- `src/tasks/`: `TaskManager`, estado `Task` e renderers minimal, verbose e raw.
- `src/renderers/`: saída de console e coleta em memória.
- `src/helpers.ts` e `src/utils.ts`: alinhamento, wrapping e truncamento baseados em largura terminal.
- `src/types.ts`: contratos de renderer e opções públicas.
- `tests/`: assertions de comportamento e output; `examples/`: demonstrações locais.

## Fluxo de inicialização

`cliui(options)` escolhe um modo, constrói um renderer e uma implementação de cores e os conecta ao logger. Cada factory (`table()`, `tasks()`, `steps()`, `instructions()` e `sticker()`) cria um componente configurado com o renderer/cores atuais. Classes exportadas também podem ser instanciadas e receber renderer/cores manualmente.

Modos:

- `normal`: saída ANSI colorida com `ConsoleRenderer`.
- `silent`: sem transformação ANSI de cores, mantendo renderer de console.
- `raw`: cores formatadas como texto raw da lib colors e `MemoryRenderer`; componentes preparados com modo raw simplificam output para assertions.

Sem modo, `supports-color.stdout` decide entre `normal` e `silent`. `switchMode` atualiza os recursos da instância; teste componentes construídos antes/depois da troca com atenção ao renderer previamente conectado.

## Renderers e teste

`ConsoleRenderer` escreve via console e usa `log-update` para linhas substituíveis. `MemoryRenderer` armazena `{ message, stream }`; é útil para assertions sem capturar process streams. Interfaces próprias implementam `RendererContract`.

`raw` tem usos diferentes: é um modo global de `cliui` que seleciona `MemoryRenderer` e cores raw; opções raw específicas também reduzem estrutura ANSI/boxes/tables para texto plano. Consulte o [guia de teste de output](./testing-output.md).

## Limites

O pacote não é parser de argumentos, framework de comandos, gerenciador de processos nem gerador de prompts interativos. A animação usa timers e pode depender de capacidades do terminal. Dimensões dependem do tamanho reportado para o terminal no momento de importação de `helpers.ts`.
