# Revisão visual de 6 de outubro de 2026

## Alterações

- Processo: quatro artes realistas distintas para Entender, Planejar, Construir e Evoluir. Preservado o formato compacto dos cards, com miniaturas laterais em telas menores.
- Sobre: quatro cards independentes de desenvolvimento full stack, engenharia de prompts, estratégia de marketing e formação contínua. Textos em HTML sobre superfície opaca para leitura consistente.
- LinkedIn: botão com fundo claro, identificação da plataforma e texto “Ver trajetória no LinkedIn”.
- Rastreamento: copy direta “Saiba quais anúncios trazem vendas”, explicando as integrações entre anúncios, site, WhatsApp e CRM. Fotografia editorial ilustrativa mostra o mesmo produto no anúncio do celular e no pedido exibido no notebook. Substitui a escultura de hardware anterior.
- A imagem de rastreamento mantém a proporção original; títulos, legenda e nomes das plataformas permanecem em HTML. Os nomes têm uma entrada curta com GSAP, executada uma vez e desativada por preferência de movimento reduzido. Removido o controle de reprodução que não correspondia a um vídeo.
- TelaHub continua como primeiro projeto, agora com uma capa realista de TVs instaladas em uma recepção e notebook de administração. O print real do sistema permanece disponível no modal.
- Removido o número visível da seção de contato. Formulário e links de WhatsApp preservados.

## Imagens

Modo: geração com a ferramenta nativa `image_gen`; conversão e redimensionamento WebP com Sharp. As cenas são ilustrativas, sem atribuição a clientes ou resultados reais. Fontes, prompts completos e caminhos finais:

- [Etapas do processo](process-v2-assets.md)
- [Competências](about-v2-assets.md)
- [Rastreamento — fotografia editorial](tracking-v3-assets.md)
- [TelaHub — recepção realista](telahub-real-assets.md)

As duas novas artes, incluindo variantes mobile, somam aproximadamente 249 KB. A versão anterior da arte de rastreamento foi mantida nos arquivos, mas não é utilizada pela página.

## Verificação

- Novas imagens WebP inspecionadas visualmente e dimensões conferidas.
- HTML local respondeu HTTP 200 com a nova copy, botão de LinkedIn e novos caminhos de imagens, sem referência ao componente de escultura e sem o telefone visível.
- Revisão independente do CSS responsivo, caminhos de imagens e estrutura JSX concluída.
- A validação visual da página em navegador não foi realizada nesta revisão: a ferramenta de browser bloqueou o acesso ao endereço local. Não foram usados mecanismos alternativos para contornar o bloqueio.
