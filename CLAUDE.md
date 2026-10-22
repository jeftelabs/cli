# Orientações para Claude e agentes de IA

As instruções canônicas estão em [`AGENTS.md`](./AGENTS.md). Leia também as páginas relevantes de [`docs/README.md`](./docs/README.md). Este projeto é `@jeftelabs/cli`, um kit de interface para aplicações de linha de comando.

## Fluxo de investigação

1. Leia `AGENTS.md` e a documentação dos componentes afetados.
2. Confira `index.ts`, `src/`, os testes e exemplos correspondentes; verifique output, opções e estado no código.
3. Consulte `package.json` e `tsconfig.json` para subpaths públicos, scripts, dependências e build. Inspecione workflows se tocar automação/publicação.
4. Use [`README.md`](./README.md) como guia para usuários. `README copy.md` é somente referência e pode listar API/screenshots que não existem neste checkout.

## Documentação obrigatória em todas as alterações

É **extremamente obrigatório criar ou atualizar documentação detalhada sempre que algo for criado ou modificado no projeto**. Isso abrange implementação, output visual, API/tipos, testes, exemplos, configuração, dependências, scripts, CI/CD e documentos. Faça a atualização na mesma tarefa.

- Explique para humanos e IAs o motivo, funcionamento, opções, efeitos, limites e manutenção.
- Guarde a documentação durável em `docs/`, organizada em `guides`, `references`, `planning` e áreas necessárias.
- Adicione páginas novas a `docs/README.md` e mantenha descoberta a partir do README raiz.
- Atualize o README para mudanças que afetem usuários, instalação, subpaths, exemplos ou requisitos.
- Verifique os exemplos localmente contra a implementação e os testes, sem presumir que a referência upstream corresponde à API local.
- Não encerre o trabalho deixando documentação pendente.

## Mapa rápido

- Fábrica e integração de modos/renderer: [`index.ts`](./index.ts).
- Logger, spinner e actions: `src/logger/`.
- Table, instructions/sticker e steps: `src/table.ts`, `src/instructions.ts`, `src/steps.ts`.
- Tasks, estados e renderers minimal/verbose/raw: `src/tasks/`.
- Contrato de renderer e tipos de opções: `src/types.ts`.
- Helpers de layout e palavras: `src/helpers.ts` e `src/utils.ts`.
- Testes: `tests/`; exemplos: `examples/`.

## Comandos e práticas

Confirme os scripts no `package.json`: `npm run quick:test`, `npm test`, `npm run lint`, `npm run typecheck`, `npm run build` e `npm run format` (escreve nos arquivos). Preserve ESM, subpaths `/helpers` e `/types`, injeção de renderer/cores e contratos de output.

Use Conventional Commits. Faça commit, push ou PR somente quando solicitado; não descarte mudanças existentes nem exponha segredos.
