# Rastreamento conectado e logo transparente

Referência visual enviada pelo usuário: Rastreamento Conectado — Do Clique à Conversão.

## Implementação

- Fundo próprio extraído da referência por edição nativa de imagem, sem textos nem interface gravados. WebP responsivo de 1672×941 e 900×507.
- Painel HTML/SVG com conexões luminosas, servidor destacado, Meta Ads, Google Ads e GA4. Textos legíveis e layout próprio no mobile.
- GSAP com sequência finita, pausa manual persistente ao sair/voltar à tela, pausa em segundo plano e respeito a movimento reduzido. O painel é explicitamente ilustrativo.
- Logo transparente no cabeçalho e rodapé. PNG mestre e WebP lossless600×201 com alpha real; original preservado. É uma versão derivada por edição generativa, com pequenas diferenças de relevo e peso, e não um recorte pixel a pixel.

## Arquivos

- public/assets/aven-wordmark-transparent.webp
- public/assets/aven-wordmark-transparent.png
- public/assets/tracking/measurement-architecture.webp
- public/assets/tracking/measurement-architecture-mobile.webp

## Prompts e método

Ferramenta nativa image_gen em modo edição, sem API/CLI externo. Otimização posterior apenas por resize e encoding.

### Logo

Use case: background-extraction.
Input image 1 is the EDIT TARGET: the exact existing AVEN SOFTWARE header wordmark.
Remove ONLY the dark navy-black rectangular background and return the existing wordmark on a genuinely transparent alpha background.
Preserve exactly the original lettering "AVEN" and "SOFTWARE", their letterforms, spacing, alignment, relative scale, the brushed silver/white metallic shading, the blue inner facet of the A, and both fine horizontal lines flanking SOFTWARE. Preserve the original object silhouette and proportions. This is a faithful cutout of the supplied logo, not a new logo or a redesign.
Keep every original logo detail and color intact, including its subtle dark metallic edge shading; remove the navy background from the outer area and the negative spaces inside/between letters, without erasing the dark material shading belonging to the logo.
No recoloring, no embellishment, no new orbital ring, no symbols, no drop shadow outside the original mark, no gradient backdrop, no opaque rectangle, no visible checkerboard painted into the pixels. Clean precise anti-aliased transparent edges. Preserve the horizontal layout with compact transparent margins. Text must remain exactly AVEN on the top line and SOFTWARE on the bottom line.

### Fundo

Use case: precise-object-edit.
Asset type: landscape background for a website tracking section.
Input image 1 is the EDIT TARGET. Edit this exact supplied reference into a clean background plate. Preserve its wide 16:9 canvas, nighttime black-navy atmosphere, restrained blue/cyan edge lighting, subtle fine technical grid, fine orbital arcs and occasional tiny blue points around the OUTER EDGES.
Remove ABSOLUTELY ALL text, headings, paragraphs, slogans, buttons, logos, people, icons, badges, status dots, cards, screens, panels, rounded rectangular frames, diagrams, nodes, arrows, connecting event routes and every interface element. Also remove all residual silhouettes and concentrated glow from the former right-hand UI panel. Reconstruct a seamless natural continuation of the background behind them.
The final image must contain ONLY the dark atmospheric background, extremely subtle grid lines and a few thin blue/cyan orbital arcs along the top-right, bottom-left and outer edges. The CENTER and the LEFT 45 percent must be very dark, calm and unobstructed for readable live HTML text and UI overlay. The quiet grid may extend across the scene, but keep it low contrast. Preserve subtle depth, refined gradients, controlled luminous accents and professional visual quality from the target.
No text of any kind. No symbols, brand marks, numbers, objects, cards, panels, interface, border frame, screenshot remnants, astronaut, purple neon, stock photography or dramatic bright blue fills. Do not add anything new beyond the reconstructed background. Opaque image, no alpha.

## Verificação

Build Next.js de produção aprovado. Em 321, 375, 600, 768, 1011, 1440 e 1920px: sem overflow ou cortes de texto. Pausa manual permanece ao sair/voltar ao viewport; reprodução pode ser retomada; movimento reduzido exibe estado final estático. Sem erros de página. Filtros, 34 projetos, modal, menu móvel, FAQ e preparação do WhatsApp preservados. Cabeçalho transparente inspecionado em tamanho de uso. CTA escurecido para preservar contraste do texto branco.
