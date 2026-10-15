# Portfólio pessoal — Abner Santos

## Direção

Referência de estrutura: https://www.rubenmarcus.dev/ (início e página de portfólio consultados em 7 de outubro de 2026).

A referência orienta a apresentação pessoal, a navegação entre páginas, a organização das especialidades e o catálogo de trabalhos. Textos, experiência, imagens e identidade pertencem ao projeto de Abner. Não são reproduzidos os resultados, clientes, certificados, ofertas ou recursos de agentes da referência.

A composição mantém preto, prata, detalhes azuis e imagens existentes da AVEN. A pessoa aparece primeiro: retrato, nome, desenvolvimento sênior e atuação em marketing e dados. O conteúdo não depende de grandes efeitos visuais para ser lido.

## Páginas

- `/`: apresentação pessoal, três frentes de trabalho, seis projetos em destaque, ferramentas, resumo da trajetória e contato.
- `/projetos/`: abertura com os seis destaques escolhidos pelo usuário. A visão Todos mantém os 34 projetos, com TelaHub primeiro, filtros por categoria, carregamento progressivo e detalhes com as capturas existentes.
- `/especialidades/`: full stack, tráfego e rastreamento, IA, infraestrutura própria, mensuração e ferramentas.
- `/sobre/`: trajetória profissional, formação contínua, LinkedIn e processo de trabalho.
- `/contato/`: formulário que prepara a mensagem no WhatsApp e perguntas frequentes. Não envia automaticamente nem armazena informações.

## Implementação

- Next.js App Router, exportação estática e metadados próprios por página.
- Componentes em `components/PortfolioSite.jsx`; estilos em `app/portfolio.css`. Dados de projetos e imagens permanecem nas fontes existentes.
- Navegação móvel com estado expandido, fechamento por Escape e indicação da página atual.
- Filtros com estado acessível e contagem anunciada. Carregar mais transfere o foco para o primeiro novo card.
- Modal nativo com Escape, título acessível e retorno de foco ao fechar.
- Grades adaptadas a 600, 800 e 1050 px; imagens responsivas e redução de movimento preservadas.
- O componente e os estilos anteriores foram mantidos em disco, sem carregamento no layout atual.

## Conferência

- As cinco rotas responderam HTTP 200, com título correto e conteúdo principal no HTML.
- Catálogo: 34 projetos, IDs únicos, TelaHub primeiro e protótipos identificados.
- Revisão independente de rotas, estados, formulário, modal, regras responsivas e caminhos dos assets.
- Sem teste visual automatizado da página local: o acesso havia sido bloqueado pela ferramenta de navegador. A inspeção do site de referência foi possível.
- Compilação de produção faz parte do fluxo de publicação desta revisão.

## Projetos em destaque

Seleção em `data/featured-projects.json`, nesta ordem: Dubra Frame, MorfoLab, CAPI Console, Zyra Vault, Inglês em Ação e Diagnóstico da API Meta Ads. Os seis aparecem na página inicial e no filtro inicial Em destaque do portfólio. As capas recebem uma identificação de destaque, preservando os rótulos de origem no modal. A grade usa três colunas no desktop, duas no tablet e uma no celular.
