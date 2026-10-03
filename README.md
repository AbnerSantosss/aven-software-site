# AVEN Software

Site institucional em React 19 e Next.js 16 (App Router, exportação estática).

## Desenvolvimento

`npm install` e `npm run dev` — http://127.0.0.1:4175

`npm run build` exporta para `out/`; `npm start` serve essa versão localmente. Deploy em VPS: `docker compose up -d --build` (nginx + Cloudflare Tunnel via `TUNNEL_TOKEN` no `.env`, veja `.env.example`).

## Interface e conteúdo

- Three.js, React Three Fiber e Drei: emblema orbital 3D, carregamento separado, pausa fora da tela, limite de resolução e alternativa para WebGL indisponível.
- Motion: transições do portfólio. GSAP: fluxo ilustrativo de GTM, Meta Ads, Google Ads e GA4, com timeline finita, controle de reprodução e pausa fora da tela. Padrões da skill hyperframes-animation adaptados ao site React. Respeita movimento reduzido.
- Lucide: ícones de interface. Logotipo e retrato fornecidos pelo usuário.
- 34 projetos verificados no código local, agrupados por produto. Protótipos identificados. Nenhuma métrica comercial, cliente ou depoimento inventado.
- 34 capas personalizadas baseadas na identidade visual das imagens existentes, com TelaHub em primeiro. Capturas reais preservadas nos detalhes. Ferramentas de terminal e protótipos identificados.
- Cada seção possui um fundo próprio. Rastreamento usa composições de publicidade, eventos e conversões; as quatro etapas do processo usam ilustrações derivadas da marca AVEN. Arquivos e prompts em `design-system/aven-software/custom-covers.md`.
- Apresentação de Abner revisada com os dados públicos do LinkedIn: mais de cinco anos em tecnologia e marketing, desenvolvimento full stack e certificações Blip. Senioridade e especialidades informadas diretamente pelo usuário.
- Dados públicos em `data/projects.json`; sem caminhos locais, segredos ou documentos privados.
- Formulário prepara uma mensagem para +55 81 99307-0558; não armazena dados nem envia automaticamente.
- Abner Santos: https://www.linkedin.com/in/abnersantoss/

## Referências consultadas

- https://www.pinterest.com/pin/802907439835077947/
- https://in.pinterest.com/pin/wavenet-night-blue-minimalist-futuristic-it-solutions-technology-website-design--173529391885617561/
- https://lusion.co/
- https://tympanus.net/codrops/
- https://nextjs.org/docs/app/guides/static-exports
- https://r3f.docs.pmnd.rs/getting-started/introduction
- https://motion.dev/docs/react

UI UX Pro Max instalada e aplicada para hierarquia, semântica, responsividade, foco e redução de movimento. A referência AVEN prevalece sobre paletas automáticas.

## Validação

### Mobile

- 50 variantes WebP responsivas: 4,47 MB nos originais correspondentes para 1,94 MB nas variantes (56,5% menor). O navegador escolhe a imagem conforme largura e densidade da tela; isso não é uma medição de velocidade geral do site.
- 3D do rodapé carregado ao se aproximar da área, com imagem estática quando movimento reduzido está ativo.
- Fluxo de rastreamento com composição própria e texto legível no celular; alvos de toque maiores e fechamento do modal sempre acessível durante a rolagem.
- Verificado com Playwright em 320, 360, 375, 390, 430, 768, 844 (horizontal) e 1440 px: sem overflow, erros de página ou quebra de navegação.

Build de produção; filtros e 34 projetos; modal com Escape; FAQ; menu móvel; formulário de WhatsApp sem envio automático; ausência de overflow em 375, 768 e 1440 px. Preferência de movimento reduzido considerada, sem erro de hidratação.
