# Competências e contato — revisão visual

## Resultado

- Cenário próprio de desenvolvimento e análise de dados no fundo de `#competencias`, com iluminação discreta e área central livre para leitura.
- Quatro cards independentes, com imagens temáticas já existentes no projeto, logos maiores de React, Next.js, JavaScript, Meta, Google, Docker e Nginx, além de símbolos de prompts e integrações.
- Desktop com quatro colunas; até 1100 px, duas; até 600 px, cards horizontais compactos em uma coluna.
- Botão verde **Conversar no WhatsApp**, com logo reconhecível e mensagem inicial. O botão de contato pelo formulário permanece disponível. Nenhuma mensagem é enviada automaticamente.
- Os projetos em destaque e a ordem do catálogo permanecem preservados.

## Imagem original

Gerada com a ferramenta nativa `image_gen`, inspecionada visualmente e exportada para WebP. Sem dependências novas.

- Arquivo utilizado: `public/assets/competencies/workspace.webp` — 1672 × 941, 72.366 bytes.
- Versão móvel: `public/assets/competencies/workspace-mobile.webp` — 800 px de largura, 28.182 bytes.
- Ícones de marcas: SVGs do pacote `simple-icons` já instalado; arquivos em `public/assets/brands/`.

### Prompt da imagem

```text
Use case: photorealistic-natural
Asset type: wide 16:9 raster background for the competencies section of a premium personal software, data and marketing portfolio.
Primary request: create an editorial architectural photograph / premium photorealistic studio visualization of an actual software engineering and marketing analytics workspace.
Scene/backdrop: a refined dark architectural studio, graphite-black walls, a broad dark desk and believable physical computing infrastructure.
Subject and composition: at the far left, a beautifully detailed dark workstation monitor angled away, showing subtle abstract code and interface blocks without legible words. At the far right, a physical server tower and a secondary display showing restrained data graphs without legible words. The central upper half must be calm dark architectural negative space for a later white heading overlay; keep recognizable equipment at the outer edges. Across the bottom, a subtle dark desk surface and a few realistic technical components. Believable scale, coherent perspective and sophisticated spatial depth.
Style/medium: premium editorial architectural photography, tactile detail and true-to-life materials, crisp enough to remain visibly discernible under a dark website overlay.
Lighting/mood: restrained cool-white and muted-cyan task lighting, soft controlled highlights, natural reflections and shadow detail. Balanced dark exposure with clear equipment silhouettes and visible detail.
Color palette/materials: graphite black, brushed aluminum, matte metal, dark glass, very restrained muted cyan.
Constraints: one single wide landscape image with a 16:9 aspect ratio. Rich actual workspace image, not a generic gradient. No people, no logos, no readable text, no watermark, no robot, brain or infinity symbols, no glowing fantasy cables, no intense blue or purple neon, no webpage or website UI mockup. Do not place a title or heading in the image.
```

## Verificação

Home, especialidades, portfólio e sobre responderam HTTP 200; os quatro cards e o destino do WhatsApp foram conferidos no HTML. Os oito novos assets responderam HTTP 200. Regras responsivas revisadas no código. A ferramenta de navegador havia bloqueado o acesso local nesta conversa, portanto não há confirmação visual automatizada do layout em navegador nesta revisão. A compilação de produção é executada pelo fluxo de publicação.
