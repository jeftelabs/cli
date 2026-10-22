# Documentação de `@jeftelabs/cli`

Esta documentação explica os componentes e contratos implementados neste repositório. A implementação, os testes e os exemplos locais são a referência final para comportamentos e saída.

## Comece aqui

- [Visão geral e arquitetura](./guides/overview.md): componentes, integração, modos e renderers.
- [Guia de UI e logging](./guides/logging-and-ui.md): logger, actions, spinner, tables, instructions/sticker e steps.
- [Guia de tarefas](./guides/tasks.md): tarefas sequenciais, progressos, estados e falhas.
- [Testar output](./guides/testing-output.md): raw mode, MemoryRenderer e assertions.
- [Desenvolvimento](./guides/development.md): comandos, estrutura, testes, build e publicação.

## Guias

| Documento | Conteúdo |
| --- | --- |
| [Visão geral](./guides/overview.md) | Objetivo, arquitetura, dependências entre UI e renderer. |
| [UI e logging](./guides/logging-and-ui.md) | Receitas de logger, ação, spinner, tabela, instruções e etapas. |
| [Tarefas](./guides/tasks.md) | Execução sequencial, callback, updates, erro e renderers. |
| [Testar output](./guides/testing-output.md) | Logs de memória, saída raw e renderer customizado. |
| [Desenvolvimento](./guides/development.md) | Fluxo, scripts, testes, build e workflows. |

## Referências

| Documento | Conteúdo |
| --- | --- |
| [Entry point e factory](./references/api-entrypoint.md) | `cliui`, modos, exports e wiring. |
| [Componentes e tipos](./references/components.md) | Métodos e opções públicas de logger, actions, widgets e tasks. |
| [Renderer e helpers](./references/renderers-and-helpers.md) | Contrato de saída, renderers e layout helpers. |
| [Testes e exemplos](./references/tests-and-examples.md) | Mapa de cobertura, runner e exemplos executáveis. |
| [Pacote e build](./references/package-and-build.md) | Entry points npm, dependências e publicação. |

## Planning

| Documento | Conteúdo |
| --- | --- |
| [Escopo e critérios de evolução](./planning/roadmap.md) | Escopo atual e forma de registrar propostas sem inventar compromissos. |

## Para agentes de IA

Leia [`../AGENTS.md`](../AGENTS.md) e [`../CLAUDE.md`](../CLAUDE.md). A documentação detalhada é obrigatória em toda mudança; inclua novos documentos neste índice.
