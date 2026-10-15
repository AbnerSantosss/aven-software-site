# AVEN Software

Portfólio pessoal de Abner Santos, com identidade AVEN Software, em React 19 e Next.js 16 (App Router, exportação estática).

## Estrutura atual

Início (`/`), Portfólio (`/projetos/`), Especialidades (`/especialidades/`), Sobre (`/sobre/`) e Contato (`/contato/`). A estrutura foi reorganizada a partir da referência https://www.rubenmarcus.dev/, usando o conteúdo e a identidade próprios de Abner.

Implementação em `components/PortfolioSite.jsx` e `app/portfolio.css`. A versão anterior permanece em disco. Direção, decisões e limites da verificação em `design-system/aven-software/portfolio-structure-2026-10-07.md`.

## Desenvolvimento

`npm install` e `npm run dev` — http://127.0.0.1:4175

`npm run build` exporta para `out/`; `npm start` serve essa versão localmente. Deploy em VPS: `docker compose up -d --build` (nginx na porta 4175 do host, exposto por um Cloudflare Tunnel já existente).

## Interface e conteúdo

- Three.js, React Three Fiber e Drei: dependências e emblema da versão anterior preservados; o layout atual prioriza retrato, conteúdo e imagens dos projetos.
- Motion: componentes de apresentação. GSAP: entrada curta dos nomes das plataformas no bloco de rastreamento, respeitando movimento reduzido.
- Efeitos (outubro de 2026) em `components/effects.jsx` e `app/effects.css`. GSAP: entrada do hero com linhas mascaradas, parallax do fundo e do retrato, brilho ambiente, inclinação e spotlight dos cartões de projeto (só ponteiro fino), pop-in dos emblemas da stack, contagem dos filtros e letreiro da topline em telas até 800 px. Motion: reveal por viewport (cartões, títulos de seção, stack, processo, serviços), troca com fade dos filtros, menu móvel com entrada e saída e linha de progresso de leitura no header. Tudo desligado com `prefers-reduced-motion: reduce`; sem JS o HTML continua visível (pré-ocultação do hero cai após 2,4 s).
- Responsividade: header compacta ao rolar, menu móvel fecha com toque fora e Escape, filtros viram trilho rolável em até 600 px, diálogo de projeto vira folha inferior em até 600 px, áreas seguras (notch) no header, menu e rodapé, ajuste do hero em paisagem baixa e foco mais visível no formulário.
- Lucide: ícones de interface. Logotipo e retrato fornecidos pelo usuário.
- 34 projetos verificados no código local, agrupados por produto. Protótipos identificados. Nenhuma métrica comercial, cliente ou depoimento inventado.
- 34 capas personalizadas baseadas na identidade visual das imagens existentes, com TelaHub em primeiro. Capturas reais preservadas nos detalhes. Ferramentas de terminal e protótipos identificados.
- Cada seção possui um fundo próprio. Rastreamento usa composições de publicidade, eventos e conversões; as quatro etapas do processo usam ilustrações derivadas da marca AVEN. Arquivos e prompts em `design-system/aven-software/custom-covers.md`.
- Apresentação de Abner revisada com os dados públicos do LinkedIn: mais de cinco anos em tecnologia e marketing, desenvolvimento full stack e certificações Blip. Senioridade e especialidades informadas diretamente pelo usuário.
- Posicionamento (15/10/2026) reescrito com foco em engenharia de IA e programação com IA sustentada por fundamentos, seguindo a Regra do Um do Copywriter Geral (um leitor: quem contrata um engenheiro de IA; uma ideia: IA como alavanca, fundamentos como base). Provas usadas só as públicas do LinkedIn (Engenheiro de IA na OfficeCom Brasil, Logame, ItGoal, CST em TI, quatro certificações Blip, Rocketseat e Campinho Digital; Coca-Cola, Colcci e Pague Menos excluídas a pedido) e os projetos do portfólio (Dubra Frame, vídeos gerados por código). Nenhuma métrica, cliente ou depoimento inventado.
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

## Validação histórica da página anterior

Os testes de navegador abaixo se referem à versão de página única anterior. A revisão em cinco páginas tem suas verificações documentadas no arquivo de estrutura de 7 de outubro de 2026.

### Mobile

- 50 variantes WebP responsivas: 4,47 MB nos originais correspondentes para 1,94 MB nas variantes (56,5% menor). O navegador escolhe a imagem conforme largura e densidade da tela; isso não é uma medição de velocidade geral do site.
- 3D do rodapé carregado ao se aproximar da área, com imagem estática quando movimento reduzido está ativo.
- Fluxo de rastreamento com composição própria e texto legível no celular; alvos de toque maiores e fechamento do modal sempre acessível durante a rolagem.
- Verificado com Playwright em 320, 360, 375, 390, 430, 768, 844 (horizontal) e 1440 px: sem overflow, erros de página ou quebra de navegação.

Build de produção; filtros e 34 projetos; modal com Escape; FAQ; menu móvel; formulário de WhatsApp sem envio automático; ausência de overflow em 375, 768 e 1440 px. Preferência de movimento reduzido considerada, sem erro de hidratação.
