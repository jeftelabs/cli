# Orientações para Claude e agentes de IA

As instruções canônicas do repositório estão em [`AGENTS.md`](./AGENTS.md). Leia também a documentação de `docs/` relacionada à tarefa. Este projeto é `@jeftelabs/types`, um pacote de helpers de tipos TypeScript em tempo de compilação.

## Fluxo de investigação

1. Leia `AGENTS.md` e [`docs/README.md`](./docs/README.md).
2. Confira o helper em `src/`, seus testes de tipo em `tests/` e, quando relevante, o benchmark em `benchmarks/`.
3. Consulte `index.ts`, `package.json` e `tsconfig.json` para entender exports públicos, versão/configuração TypeScript e build.
4. Trate [`README copy.md`](./README%20copy.md) como referência, nunca como fonte de verdade sobre a API local.

## Documentação obrigatória em toda alteração

É **extremamente obrigatório criar ou atualizar documentação detalhada cada vez que algo for criado ou modificado**. A regra inclui helpers e exports, testes de tipos, benchmarks, configuração, dependências, scripts, CI e exemplos. Complete a documentação na mesma tarefa.

- Explique para humanos e IAs o propósito, como o tipo calcula seu resultado, como usá-lo, limitações, compatibilidade e como manter/verificar.
- Mantenha a documentação em `docs/`, com guias, referências, planning e áreas adicionais necessárias.
- Registre páginas novas no índice `docs/README.md` e mantenha-as descobríveis a partir do README raiz.
- Atualize o README quando a API exportada, instalação, requisitos ou exemplos mudarem.
- Confira afirmações com a implementação, os testes de tipo e os exports atuais; não transfira capacidades do pacote de referência sem confirmação.
- Não encerre a tarefa deixando documentação para trás.

## Resumo do pacote

- `index.ts` reexporta tipos de `src/base.ts` e `src/route.ts`.
- Os grupos atuais cobrem normalização de exibição de tipos, primitivos, cardinalidade, construtores, imports lazy, branded/opaque types, extração de funções/chaves definidas/undefined, opcionalidade, tipos async/sync, deep partial e inferência de parâmetros de rota.
- `tests/` valida relações de tipo; `benchmarks/` contém benchmarks de instância de tipos com Ark Attest.
- Não há API de runtime intencionalmente; `npm run build` usa `tsc` e emite saída e declarações.

## Comandos e práticas

Confirme `package.json` para os scripts atuais: `npm run quick:test`, `npm test`, `npm run lint`, `npm run typecheck`, `npm run build` e `npm run format` (escrita). Preserve exports de tipo, comportamento de inferência, ESM e emissão de declarações. Use Conventional Commits. Commit/push/PR apenas quando solicitados; nunca descarte mudanças existentes ou exponha segredos.
