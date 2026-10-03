# Densidade dos cards

Revisão de 2 de outubro de 2026, a pedido do usuário.

## Referência de UX

Base consultada: `Especialistas/1 - Ux - Habilidade/UX Wiki`.

- `wiki/topics/padroes-responsivos-de-componentes.md`, linha 23: adaptar a grade para 1 coluna no celular, 2 no tablet e 3–4 no desktop.
- `wiki/topics/escala-de-espacamento.md`, linhas 23–24: padding de 16px e intervalos de 16–24px.
- `wiki/references/tabela-de-medidas-ui.md`, linha 48: preservar texto principal com pelo menos 16px.
- `wiki/topics/organizacao-telas-mobile-desktop.md`, linha 54: reorganizar os componentes conforme o espaço disponível.

As alturas de imagem escolhidas são decisões de composição para as artes deste site; não são prescrições da wiki.

### Refinamento da largura no celular

A pedido do usuário, os cards de serviços da seção Engenharia sênior passam a ter largura máxima de 280px, centralizados, com margem interna adicional na grade. Em telas de 320px, a largura resultante é 260px. A imagem tem 128px de altura e o corpo permanece em 16px. A grade de tablet e desktop continua igual. As medições de altura na tabela abaixo correspondem à primeira compactação, anterior a esse refinamento.

## Aplicação

- Portfólio em 3/2/1 colunas, com capa personalizada, legenda de fundo sólido, padding de 16px e ação de título com pelo menos 44px de altura. TelaHub continua primeiro.
- Serviços em 4/2/1 colunas, com imagem em fluxo normal. Removidas as alturas mínimas de 480–525px e o padding superior artificial. Textos mais curtos mantêm as especialidades.
- Processo em 4/2 colunas e linhas horizontais no celular, com a arte da marca ao lado da descrição.
- Conteúdo determina a altura. Sem truncamento de descrições; palavras longas podem quebrar em telas estreitas ou com texto ampliado.
- `app/cards.css` é o único responsável por esses componentes. Removidas as regras antigas conflitantes dos outros quatro arquivos CSS.
- `sizes` acompanha a largura real de cada grade e preserva as variantes WebP responsivas.

## Verificação

Alturas medidas com Playwright, em pixels CSS:

| Componente | Desktop 1440px, antes → depois | Celular 375px, antes → depois |
|---|---|---|
| Projetos iniciais | 573 → 417 | 389–416 → 343–367 |
| Serviços | 525 → 383 | 480–484 → 300–324 |
| Processo | 340 → 251 | 292 → 122–140 |

Inspeção visual em desktop e celular. Navegação, filtros, 34 projetos, modal, FAQ e preparação do WhatsApp verificados. Mobile em 320, 360, 375, 390, 430, 768, 844 horizontal e 1440px sem overflow ou erros de página; imagens responsivas, fluxo de rastreamento e carregamento adiado do 3D preservados.

Todos os 42 cards foram conferidos em 320, 375, 768, 1024, 1366 e 1920px, inclusive com o texto principal ampliado de 16 para 32px e espaçamento de letras/palavras aumentado. Sem cortes de texto ou transbordamento horizontal. Verificação em navegador emulado, sem teste em aparelho físico.
