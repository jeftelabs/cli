# Estado atual e critérios de evolução

## Escopo observado

O pacote fornece componentes de UI para CLIs: logging, ações, spinner, tabela, instructions/sticker, steps e task manager, além de cores, renderers e helpers textuais. Essa visão vem dos exports de `index.ts`, implementação em `src/`, testes e exemplos locais.

Esta página registra escopo e critérios de análise, não funcionalidades futuras aprovadas, datas ou compromissos.

## Critérios para propostas

Uma proposta deve considerar:

1. Qual componente/caso de uso atual não atende e por quê.
2. Contrato de output em normal, silent e raw, incluindo ANSI e stdout/stderr.
3. Interação com renderer e cores injetáveis, largura do terminal, timers e sistema operacional.
4. Compatibilidade de API e tipos publicados e efeitos sobre entry points.
5. Testes determinísticos, exemplo revisado e documentação atualizada.
6. Efeito em dependências, bundle, workflows e release, se houver.

## Páginas por área

- Factory/modos: `references/api-entrypoint.md`, `guides/overview.md`.
- Logger/widgets/tasks: `references/components.md` e guias correspondentes.
- Output/testes: `guides/testing-output.md`, `references/renderers-and-helpers.md`, `references/tests-and-examples.md`.
- Distribuição/automação: `references/package-and-build.md` e `guides/development.md`.
- Descoberta: `docs/README.md` e README raiz.

## Manutenção

Só registre compromissos de roadmap após decisão explícita do mantenedor. Ao alterar escopo atual, confirme a mudança no código/testes e atualize este arquivo e as páginas relacionadas na mesma tarefa.
