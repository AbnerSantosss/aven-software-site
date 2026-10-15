'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, X, Plus, Code2, Braces, ChartNoAxesCombined, Server, MessageCircle, Layers3 } from 'lucide-react';
import projects from '../data/projects.json';
import featuredProjectIds from '../data/featured-projects.json';
import artwork from '../data/artwork.json';
import TrackingFlow from './TrackingFlow';
import { Reveal, ScrollProgress, MobileNav, Swap, useScrolledFlag, useHeroIntro, useScrollScenes, useCardMotion, usePopIn, CountUp, Marquee } from './effects';

const linkedin = 'https://www.linkedin.com/in/abnersantoss/';
function Linkedin({size=18}) { return <span aria-hidden="true" className="pf-linkedin-mark" style={{width:size,height:size,fontSize:size*.8}}>in</span>; }
const whatsapp = 'https://wa.me/5581993070558';
const categories = ['Em destaque', 'Todos', 'Sistemas', 'Sites e lojas', 'Integrações', 'Criação e mídia'];
const featuredIds = new Set(featuredProjectIds);
const featuredProjects = featuredProjectIds.map(id=>projects.find(project=>project.id===id)).filter(Boolean);
function projectsForCategory(category) {
  if(category==='Em destaque')return featuredProjects;
  return projects.filter(project=>category==='Todos'||project.category===category);
}
const navigation = [{label:'Portfólio',href:'/projetos/',view:'projects'}, {label:'Especialidades',href:'/especialidades/',view:'skills'}, {label:'Sobre',href:'/sobre/',view:'about'}, {label:'Contato',href:'/contato/',view:'contact'}];
const expertise = [
  {image:'prompt-engineering',label:'ENGENHARIA DE IA',title:'Sistemas com LLMs que chegam à produção',text:'Agentes com Hermes Agent, RAG, MCP, fine-tuning e automações no n8n aplicados a problemas reais. Modelos na sua GPU ou via API, com segurança, custo e avaliação definidos antes do primeiro prompt.',tags:['Hermes Agent','RAG','MCP','n8n','Fine-tuning'],icon:Braces},
  {image:'full-stack',label:'PROGRAMAÇÃO COM IA',title:'Código acelerado por IA, sustentado por fundamentos',text:'Uso Claude Code, Codex e Gemini como alavanca, não como muleta. Arquitetura, segurança, banco e APIs continuam decididos por quem entende o sistema inteiro.',tags:['Arquitetura','Segurança','APIs','PostgreSQL'],icon:Code2},
  {image:'marketing-strategy',label:'DADOS & PERFORMANCE',title:'Especialista avançado em Meta Ads e rastreamento de dados',text:'GTM Server-Side, API de conversões, GA4 e servidores próprios de rastreamento. Do anúncio à conversão, com dados confiáveis para decidir onde investir.',tags:['Meta Ads','GTM Server-Side','GA4','CAPI'],icon:ChartNoAxesCombined},
];
const services = [
  {image:'service-server',title:'Agentes e orquestração com MCP',text:'Agentes que executam tarefas de verdade: ferramentas, servidores MCP, memória e limites claros do que a IA pode ou não fazer no seu sistema.',tags:['Agentes','MCP','Tool use'],icon:Braces},
  {image:'service-analytics',title:'RAG e bases de conhecimento',text:'Busca semântica sobre os documentos da empresa para que o modelo responda com o contexto certo, citando a fonte e sem inventar.',tags:['Embeddings','Busca vetorial','Avaliação'],icon:Layers3},
  {image:'service-meta',title:'Fine-tuning e modelos locais',text:'Modelos ajustados ao seu domínio e rodando na sua GPU quando privacidade e custo pedem. Whisper, Qwen e Kokoro em pipelines próprios.',tags:['Fine-tuning','GPU local','Open source'],icon:Server},
  {image:'service-dashboards',title:'Automação de mídia com IA',text:'Pipelines que transcrevem, traduzem, dublam e editam vídeo com IA, do roteiro ao MP4 final. É o que move o Dubra Frame e os vídeos gerados por código.',tags:['Pipelines','Vídeo','TTS'],icon:ChartNoAxesCombined},
];
const steps = [
  {image:'understand',title:'Entender',text:'Conheço a operação, o problema e onde a IA faz diferença de verdade.'},
  {image:'plan',title:'Especificar',text:'Escrevo a spec antes do código: arquitetura, dados, segurança e critério de pronto.'},
  {image:'build',title:'Construir com IA',text:'Desenvolvo com agentes de código sob supervisão, revisando cada decisão que importa.'},
  {image:'evolve',title:'Validar e evoluir',text:'Testo, meço, coloco em produção e acompanho o que precisa melhorar.'},
];
const toolGroups = [
  {title:'IA e agentes',image:'/assets/about-v2/prompt-engineering.webp',symbols:[Braces,Layers3],items:['Claude Code','Codex','Gemini','OpenRouter','Hermes Agent','MCP','n8n','RAG','Fine-tuning']},
  {title:'Interfaces e sistemas',image:'/assets/about-v2/full-stack.webp',brands:['react','nextdotjs','javascript'],items:['React','Next.js','Node.js','Python','PostgreSQL','APIs e webhooks']},
  {title:'Infraestrutura',image:'/assets/services/service-server.webp',brands:['docker','nginx'],items:['Docker e Portainer','Proxmox','Nginx','Self-hosted','GPU local']},
  {title:'Mídia e mensuração',image:'/assets/services/service-analytics.webp',brands:['meta','googleads','googleanalytics'],items:['Meta Ads','GTM Server-Side','GA4','Pixel + CAPI','Stape']},
];
const experience = [
  { role: 'Engenheiro de IA', company: 'OfficeCom Brasil', period: 'dez. 2025 - atual', place: 'Campina Grande, PB', summary: 'Soluções de IA aplicadas a processos de negócio: agentes, RAG, MCP e automações com n8n, unindo engenharia de software e modelos de linguagem que vão para produção.', tags: ['Agentes', 'RAG', 'MCP', 'n8n', 'Fine-tuning'] },
  { role: 'Especialista em Tráfego Pago e Performance', company: 'Logame do Brasil', period: 'fev. 2025 - atual', place: 'Presencial', summary: 'Marketing de performance de uma operação de iGaming no Brasil: campanhas em Meta Ads, mensuração server-side, GTM, GA4 e CRM com gamificação.', tags: ['Meta Ads', 'Tracking server-side', 'GTM', 'GA4', 'CRM'] },
  { role: 'Desenvolvedor Zoho e Chatbots', company: 'ItGoal · Especialistas Zoho', period: 'nov. 2022 - 2024', place: 'Consultoria parceira Zoho', summary: 'Implementação do ecossistema Zoho em empresas brasileiras, desenvolvimento de software e chatbots na plataforma Blip, com quatro certificações Blip.', tags: ['Zoho', 'Blip', 'CRM', 'Chatbots'] },
  { role: 'Monitor de turma', company: 'Campinho Digital', period: 'fev. 2023 - jul. 2025', place: 'Remoto', summary: 'Monitoria em programa de formação em programação e desenvolvimento web: acompanhamento de alunos, revisão de código e apoio nos projetos.', tags: ['Mentoria', 'JavaScript', 'Express.js'] },
  { role: 'Formação full-stack', company: 'Rocketseat', period: 'abr. 2022 - jul. 2025', place: 'Recife, PE', summary: 'Trilhas práticas de desenvolvimento full-stack no ecossistema JavaScript: Node, React, styled-components e Express.', tags: ['Node', 'React', 'Express.js'] },
  { role: 'Tecnólogo em Tecnologia da Informação', company: 'UNIASSELVI', period: 'out. 2022 - out. 2024', place: 'Curso superior', summary: 'Curso Superior de Tecnologia (CST) em Tecnologia da Informação, base acadêmica para arquitetura, redes, banco de dados e segurança.', tags: ['Graduação'] },
];

const faqs = [
  ['Você programa com IA? Isso não vira "vibe coding"?','Programo com IA todos os dias. A diferença está nos fundamentos: arquitetura, segurança, banco e integrações são decididos por mim, com a spec escrita antes do código. A IA acelera a execução; a responsabilidade pelo sistema continua minha.'],
  ['Que tipo de projeto com IA você entrega?','Agentes que executam tarefas (trabalho com Hermes Agent e MCP), assistentes com RAG sobre os documentos da empresa, modelos ajustados por fine-tuning, automações com vasta experiência em n8n, pipelines de voz e vídeo e integração de LLMs em sistemas que já existem, via API ou rodando localmente.'],
  ['Também cuida do tráfego e do rastreamento?','Sim. Sou especialista avançado em Meta Ads e rastreamento de dados: GTM Server-Side, API de conversões, GA4, pixels e servidores próprios de rastreamento, além de Google Ads e painéis personalizados.'],
  ['Como funcionam prazo, investimento e suporte?','Prazo e investimento dependem do escopo e ficam definidos na proposta. Manutenção, suporte e orientação da equipe podem fazer parte do projeto.'],
];

function imageProps(src,sizes='100vw') {
  const item=artwork[src];
  return item?{srcSet:`${item.mobile} ${item.mobileWidth}w, ${src} ${item.width}w`,sizes,decoding:'async'}:{decoding:'async'};
}
function Backdrop({name}) { return <img className="pf-backdrop" src={`/assets/backgrounds/bg-${name}.webp`} {...imageProps(`/assets/backgrounds/bg-${name}.webp`)} alt="" loading="lazy" aria-hidden="true"/>; }
function Eyebrow({children}) { return <p className="pf-eyebrow">{children}</p>; }
function Heading({label,title,description}) { return <Reveal className="pf-section-heading" y={10}><Eyebrow>{label}</Eyebrow><h2>{title}</h2>{description&&<p>{description}</p>}</Reveal>; }
const toplineItems=['ENGENHARIA DE IA','AGENTES · RAG · MCP · FINE-TUNING','SOFTWARE QUE CHEGA À PRODUÇÃO','ABNER SANTOS / AVEN SOFTWARE'];
function Header({view}) {
  const [open,setOpen]=useState(false);
  const toggle=useRef(null);
  const header=useRef(null);
  useScrolledFlag(header);
  useEffect(()=>{setOpen(false);},[view]);
  useEffect(()=>{
    if(!open)return;
    function escape(e){if(e.key==='Escape'){setOpen(false);toggle.current?.focus();}}
    function outside(e){if(!header.current?.contains(e.target))setOpen(false);}
    window.addEventListener('keydown',escape);
    document.addEventListener('pointerdown',outside);
    return()=>{window.removeEventListener('keydown',escape);document.removeEventListener('pointerdown',outside);};
  },[open]);
  return <><a className="pf-skip" href="#conteudo">Pular para o conteúdo</a><div className="pf-topline"><Marquee items={toplineItems}/></div><header className="pf-header" ref={header}><ScrollProgress/><div className="pf-container pf-header-inner"><Link href="/" className="pf-brand" aria-label="Abner Santos — início">abner<span>.santos</span><small>AVEN SOFTWARE</small></Link><nav className="pf-desktop-nav" aria-label="Navegação principal">{navigation.map(item=><Link key={item.view} href={item.href} aria-current={view===item.view?'page':undefined}>{item.label}</Link>)}</nav><a className="pf-social" href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn de Abner Santos"><Linkedin size={19}/></a><button ref={toggle} className="pf-menu-toggle" type="button" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="portfolio-menu" aria-label={open?'Fechar menu':'Abrir menu'}>{open?<X/>:<Menu/>}</button></div><MobileNav open={open} id="portfolio-menu">{navigation.map(item=><Link key={item.view} href={item.href} onClick={()=>setOpen(false)} aria-current={view===item.view?'page':undefined}>{item.label}</Link>)}</MobileNav></header></>;
}
function Footer() { return <footer className="pf-footer"><div className="pf-container"><div className="pf-footer-top"><div><Link className="pf-footer-name" href="/">Abner Santos<span>.</span></Link><p>Engenharia de IA, software e dados.<br/>Sistemas que saem da demo e chegam à produção.</p></div><nav aria-label="Navegação do rodapé">{navigation.map(item=><Link key={item.view} href={item.href}>{item.label}</Link>)}</nav><a className="pf-button pf-button-outline" href={linkedin} target="_blank" rel="noreferrer"><Linkedin size={18}/>Meu LinkedIn</a></div><div className="pf-footer-bottom"><span>© {new Date().getFullYear()} Abner Santos</span><img src="/assets/aven-wordmark-transparent.webp" alt="AVEN Software" width="132" height="44"/><span>Feito com React e Next.js</span></div></div></footer>; }
function Hero() {
  const root=useRef(null);
  useHeroIntro(root);
  return <section className="pf-hero" id="inicio" ref={root}><img className="pf-hero-space" src="/assets/aven-space-background.webp" {...imageProps('/assets/aven-space-background.webp')} alt="" width="1672" height="941"/><div className="pf-hero-glow" aria-hidden="true"/><div className="pf-container pf-hero-grid"><div className="pf-hero-copy"><Eyebrow>ENGENHEIRO DE IA / AGENTES, RAG E AUTOMAÇÃO</Eyebrow><p className="pf-hello">Olá, eu sou <strong>Abner.</strong></p><h1><span className="pf-line"><span className="pf-line-inner">Coloco IA para trabalhar<br className="pf-desktop-break"/> na sua empresa.</span></span><span className="pf-line pf-line-muted"><span className="pf-line-inner">Em produção, com usuários,<br className="pf-desktop-break"/> sem surpresa.</span></span></h1><p className="pf-hero-description">Agentes, RAG, MCP e automações com n8n, construídos com arquitetura, segurança e dados definidos antes do primeiro prompt. Você fala direto com quem desenvolve, do escopo ao deploy, e recebe um sistema que a sua equipe usa todo dia.</p><div className="pf-actions"><Link className="pf-button pf-button-primary" href="/contato/">Quero conversar sobre meu projeto</Link><Link className="pf-button pf-button-outline" href="/projetos/">Ver os {projects.length} projetos</Link></div><p className="pf-hero-specialty">+5 ANOS EM TECNOLOGIA E MARKETING <span>/</span> {projects.length} PROJETOS PUBLICADOS <span>/</span> OFFICECOM BRASIL · LOGAME · ITGOAL</p></div><div className="pf-portrait-wrap"><figure className="pf-portrait"><img src="/assets/abner-santos.webp" {...imageProps('/assets/abner-santos.webp','(max-width: 800px) 80vw, 440px')} alt="Abner Santos, engenheiro de IA e desenvolvedor sênior" width="1000" height="1050" fetchPriority="high"/><figcaption><span>ABNER SANTOS</span><span>ENGENHARIA DE IA & SOFTWARE</span></figcaption></figure><div className="pf-portrait-note"><Code2 size={24}/><p>Da spec ao deploy.<br/><strong>Com IA e com fundamentos.</strong></p></div></div></div></section>; }
function ExpertiseCards() { return <div className="pf-expertise-grid">{expertise.map((item,i)=><Reveal className="pf-expertise-card" key={item.title} index={i}><img src={`/assets/about-v2/${item.image}.webp`} srcSet={`/assets/about-v2/${item.image}-mobile.webp 480w, /assets/about-v2/${item.image}.webp 900w`} sizes="(max-width: 700px) 90vw, 400px" alt="" width="900" height="600" loading="lazy"/><div className="pf-expertise-body"><div className="pf-card-kicker"><span>0{i+1} / {item.label}</span><item.icon size={22}/></div><h3>{item.title}</h3><p>{item.text}</p><div className="pf-tags">{item.tags.map(tag=><span key={tag}>{tag}</span>)}</div></div></Reveal>)}</div>; }
function StackSection() {
  const root=useRef(null);
  usePopIn(root,'.pf-stack-emblem',{stagger:.05});
  return <section className="pf-section pf-stack" id="competencias" ref={root}>
    <picture className="pf-stack-backdrop" aria-hidden="true">
      <source media="(max-width: 600px)" srcSet="/assets/competencies/workspace-mobile.webp"/>
      <img src="/assets/competencies/workspace.webp" alt="" width="1672" height="941" loading="lazy" decoding="async"/>
    </picture>
    <div className="pf-container">
      <Heading label="FERRAMENTAS & COMPETÊNCIAS" title="O que sustenta meus projetos." description="IA, código, infraestrutura e dados na mesma conversa: o modelo, o sistema e a operação precisam funcionar juntos."/>
      <div className="pf-stack-grid">{toolGroups.map((group,index)=><Reveal as="article" className="pf-stack-group" key={group.title} index={index}>
        <div className="pf-stack-visual" aria-hidden="true">
          <img className="pf-stack-art" src={group.image} {...imageProps(group.image,'(max-width: 600px) 120px, (max-width: 1100px) 45vw, 300px')} alt="" width="900" height="600" loading="lazy"/>
          <span className="pf-stack-number">0{index+1}</span>
          <div className="pf-stack-emblems">
            {group.brands?.map(brand=><span className={`pf-stack-emblem pf-emblem-${brand}`} key={brand}><img src={`/assets/brands/${brand}.svg`} alt="" width="32" height="32"/></span>)}
            {group.symbols?.map((Symbol,i)=><span className="pf-stack-emblem pf-emblem-automation" key={i}><Symbol size={32} strokeWidth={2.25}/></span>)}
          </div>
        </div>
        <div className="pf-stack-content"><h3>{group.title}</h3><ul className="pf-stack-tools">{group.items.map(item=><li key={item}>{item}</li>)}</ul></div>
      </Reveal>)}</div>
    </div>
  </section>;
}
function ProjectDialog({project,onClose,animateOpen=false}) {
  const dialogRef=useRef(null);
  const animation=useRef(null);
  const closing=useRef(false);
  const mounted=useRef(false);
  useEffect(()=>{
    const dialog=dialogRef.current;
    const previous=document.activeElement;
    const overflow=document.body.style.overflow;
    const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
    mounted.current=true;
    dialog.showModal();
    document.body.style.overflow='hidden';
    if(animateOpen&&!preference.matches&&dialog.animate){
      const sheet=window.matchMedia('(max-width: 600px)').matches;
      animation.current=dialog.animate([{opacity:0,transform:sheet?'translateY(32px)':'scale(.96)'},{opacity:1,transform:'none'}],{duration:sheet?320:250,easing:getComputedStyle(dialog).getPropertyValue('--pf-ease-out').trim()});
    }
    function stopMotion(){animation.current?.finish();}
    preference.addEventListener('change',stopMotion);
    return()=>{
      mounted.current=false;
      animation.current?.cancel();
      preference.removeEventListener('change',stopMotion);
      if(dialog.open)dialog.close();
      document.body.style.overflow=overflow;
      previous?.focus?.({preventScroll:true});
    };
  },[animateOpen]);
  function dismiss(withMotion=false){
    const dialog=dialogRef.current;
    if(!withMotion||window.matchMedia('(prefers-reduced-motion: reduce)').matches||!dialog.animate){onClose();return;}
    if(closing.current)return;
    closing.current=true;
    const current=getComputedStyle(dialog);
    const start={opacity:current.opacity,transform:current.transform};
    const easing=current.getPropertyValue('--pf-ease-out').trim();
    animation.current?.cancel();
    dialog.dataset.closing='true';
    const sheet=window.matchMedia('(max-width: 600px)').matches;
    animation.current=dialog.animate([start,{opacity:0,transform:sheet?'translateY(32px)':'scale(.96)'}],{duration:sheet?220:180,easing,fill:'forwards'});
    animation.current.finished.then(()=>{if(mounted.current)onClose();}).catch(()=>{});
  }
  return <dialog ref={dialogRef} className="pf-dialog" data-motion={animateOpen?'true':'false'} aria-labelledby="project-title" onCancel={event=>{event.preventDefault();dismiss();}} onClick={event=>{
    if(event.target!==event.currentTarget)return;
    const bounds=event.currentTarget.getBoundingClientRect();
    if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)dismiss(event.detail>0);
  }}><button className="pf-dialog-close" onClick={event=>dismiss(event.detail>0)} aria-label="Fechar projeto" type="button"><X size={22}/></button><img src={project.referenceImage||project.image} alt={`${(project.referenceKind||project.imageKind)==='screenshot'?'Interface':'Capa ilustrativa'} de ${project.title}`} width="1200" height="750"/><div className="pf-dialog-copy"><Eyebrow>{project.category}{project.stage?` / ${project.stage}`:''}</Eyebrow><h2 id="project-title">{project.title}</h2><p>{project.description}</p><a className="pf-button pf-button-primary" href={`${whatsapp}?text=${encodeURIComponent(`Olá, Abner! Vi o projeto ${project.title} no seu portfólio e gostaria de conversar sobre uma solução.`)}`} target="_blank" rel="noreferrer">Conversar sobre uma solução</a><small>{project.referenceLabel||project.captureLabel||'Capa ilustrativa do projeto.'}</small></div></dialog>;
}
function ProjectCard({project,onSelect,index}) {
  const highlighted=featuredIds.has(project.id);
  const card=useRef(null);
  useCardMotion(card);
  return <Reveal as="article" ref={card} index={index%3} className={`pf-project-card${highlighted?' pf-project-featured':''}`}><button className="pf-project-image" onClick={event=>onSelect(project,event)} type="button" aria-label={`Ver detalhes de ${project.title}`}><img src={project.image} {...imageProps(project.image,'(max-width: 600px) 92vw, (max-width: 1000px) 46vw, 400px')} alt={`${project.imageKind==='screenshot'?'Interface':'Capa ilustrativa'} de ${project.title}`} width="1200" height="750" loading="lazy"/>{highlighted&&<span className="pf-featured-badge">Em destaque</span>}<span className="pf-open-icon" aria-hidden="true"><Plus size={20}/></span></button><div className="pf-project-copy"><div className="pf-project-meta"><span>{project.category}</span><span>{project.stage||String(index+1).padStart(2,'0')}</span></div><h3><button onClick={event=>onSelect(project,event)} type="button">{project.title}</button></h3><p>{project.description}</p></div></Reveal>;
}
function ProjectGrid({featured=false,onSelect}) {
  const [category,setCategory]=useState('Em destaque');
  const [limit,setLimit]=useState(12);
  const grid=useRef(null);
  const focusIndex=useRef(null);
  useEffect(()=>{
    if(focusIndex.current===null)return;
    grid.current?.querySelectorAll('.pf-project-image')[focusIndex.current]?.focus();
    focusIndex.current=null;
  },[limit]);
  function loadMore(){focusIndex.current=limit;setLimit(limit+12);}
  const filtered=projectsForCategory(category);
  const displayed=featured?featuredProjects:filtered.slice(0,limit);
  return <>{!featured&&<div className="pf-project-toolbar"><div className="pf-filters" role="group" aria-label="Filtrar projetos por categoria">{categories.map(item=><button key={item} type="button" aria-pressed={category===item} onClick={()=>{setCategory(item);setLimit(12);}}>{item}<span><CountUp value={projectsForCategory(item).length}/></span></button>)}</div><p aria-live="polite">{displayed.length} de {filtered.length} projetos</p></div>}<Swap id={featured?'featured':category} className="pf-project-grid" ref={grid}>{displayed.map((project,index)=><ProjectCard key={project.id} project={project} index={index} onSelect={onSelect}/>)}</Swap>{!featured&&filtered.length>limit&&<div className="pf-show-more"><button className="pf-button pf-button-outline" type="button" onClick={loadMore}>Carregar mais projetos <Plus size={18}/></button></div>}</>;
}
function ContactCallout() { return <section className="pf-contact-callout" id="contato"><Backdrop name="contact"/><div className="pf-container"><Eyebrow>VAMOS CONVERSAR</Eyebrow><h2>Seu próximo sistema<br/>começa com uma conversa.</h2><p>Me conte o que você precisa construir, integrar ou automatizar.</p><div className="pf-contact-actions"><a className="pf-button pf-button-whatsapp" href={`${whatsapp}?text=${encodeURIComponent('Olá, Abner! Vi seu portfólio e gostaria de conversar sobre um projeto.')}`} target="_blank" rel="noopener noreferrer"><img src="/assets/brands/whatsapp.svg" alt="" width="24" height="24"/>Conversar no WhatsApp</a><Link className="pf-button pf-button-outline" href="/contato/">Fale comigo <MessageCircle size={18}/></Link></div></div></section>; }
function AboutStory({full=false}) { return <div className={`pf-about-story ${full?'pf-about-full':''}`}><div className="pf-about-photo"><img src="/assets/abner-santos.webp" {...imageProps('/assets/abner-santos.webp','(max-width: 700px) 85vw, 430px')} alt="Retrato de Abner Santos" width="1000" height="1050" loading="lazy"/><span>ABNER SANTOS / AVEN SOFTWARE</span></div><div className="pf-about-copy"><Eyebrow>ENGENHEIRO DE IA · DESENVOLVEDOR SÊNIOR</Eyebrow><h2>IA como alavanca.<br/><span>Fundamentos como base.</span></h2><p>Meu primeiro sistema com IA funcionou na apresentação e foi desmontado por um sênior: chave exposta, falha de segurança, estrutura frágil. Ele estava certo. Ali entendi que o problema não é usar IA, é usar sem entender o que está fazendo.</p><p>Fui estudar o que sustenta um sistema de verdade: arquitetura, segurança, APIs, banco de dados, RAG, MCP, agentes (Hermes Agent), n8n e fine-tuning. Hoje programo com Claude Code, Codex e Gemini todos os dias e entrego software que vai para produção, com usuários, integrações e escala.</p>{full&&<><p>São mais de cinco anos entre tecnologia e marketing: chatbots e desenvolvimento de software na ItGoal, Meta Ads e rastreamento de dados na Logame e, hoje, engenharia de IA na OfficeCom Brasil. Também oriento equipes a desenvolver com LLMs sem abrir mão dos fundamentos.</p><div className="pf-education"><Layers3 size={25}/><div><strong>Formação · Tecnologia da Informação e certificações Blip</strong><p>Curso superior de tecnologia em TI (UNIASSELVI), quatro certificações Blip em desenvolvimento, atendimento e análise de dados, e formação contínua em Rocketseat e Campinho Digital. Tudo no LinkedIn.</p></div></div></>}<a className="pf-button pf-button-primary" href={linkedin} target="_blank" rel="noreferrer"><Linkedin size={18}/>Ver trajetória no LinkedIn</a>{!full&&<Link className="pf-about-more" href="/sobre/">Mais sobre mim</Link>}</div></div>; }
function ExperienceSection() { return <section className="pf-section pf-experience" id="trajetoria"><Backdrop name="process"/><div className="pf-container"><Heading label="TRAJETÓRIA" title="Mais de cinco anos entre código, marketing e IA." description="Da formação full-stack ao CRM, do tráfego pago à engenharia de IA. Cada etapa somou uma camada ao que entrego hoje."/><ol className="pf-timeline">{experience.map((item,i)=><Reveal as="li" key={item.company+item.role} index={i} className="pf-timeline-item"><div className="pf-timeline-meta"><span>{item.period}</span><span>{item.place}</span></div><div className="pf-timeline-body"><h3>{item.role}</h3><p className="pf-timeline-company">{item.company}</p><p>{item.summary}</p><div className="pf-tags">{item.tags.map(t=><span key={t}>{t}</span>)}</div></div></Reveal>)}</ol><div className="pf-section-action"><a className="pf-button pf-button-outline" href={linkedin} target="_blank" rel="noreferrer"><Linkedin size={18}/>Perfil completo no LinkedIn</a></div></div></section>; }
function ProcessSection() { return <section className="pf-section pf-process" id="processo"><Backdrop name="process"/><div className="pf-container"><Heading label="COMO TRABALHO" title="Clareza em cada etapa." description="Você acompanha o que está sendo construído, por que e qual é o próximo passo."/><div className="pf-process-grid">{steps.map((step,i)=><Reveal as="article" className="pf-process-card" key={step.title} index={i}><div><img src={`/assets/process-v2/${step.image}.webp`} srcSet={`/assets/process-v2/${step.image}-mobile.webp 480w, /assets/process-v2/${step.image}.webp 900w`} sizes="(max-width: 600px) 100px, 300px" width="900" height="563" alt="" loading="lazy"/><span>0{i+1}</span></div><section><h3>{step.title}</h3><p>{step.text}</p></section></Reveal>)}</div></div></section>; }
function Home({onSelect}) { return <><Hero/><section className="pf-section pf-capabilities" id="solucoes"><Backdrop name="tracking"/><div className="pf-container"><Heading label="01 / EM QUE POSSO AJUDAR" title="Da ideia à produção." description="Três frentes de trabalho. A mesma pessoa que entende o modelo, escreve o código e lê os dados."/><ExpertiseCards/><div className="pf-section-action"><Link href="/especialidades/" className="pf-button pf-button-outline">Explorar especialidades</Link></div></div></section><section className="pf-section pf-work" id="projetos"><Backdrop name="portfolio"/><div className="pf-container"><Heading label="02 / PROJETOS EM DESTAQUE" title="Um pouco do que construo." description="Editor de vídeo com IA local, console de rastreamento, cofres, ferramentas e sistemas. Conheça o projeto e veja a interface."/><ProjectGrid featured onSelect={onSelect}/><div className="pf-section-action"><Link href="/projetos/" className="pf-button pf-button-outline">Ver os {projects.length} projetos</Link></div></div></section><StackSection/><section className="pf-section pf-about" id="sobre"><Backdrop name="about"/><div className="pf-container"><AboutStory/></div></section><ContactCallout/></>; }
function ProjectsPage({onSelect}) { return <><section className="pf-section pf-projects-page" id="projetos"><Backdrop name="portfolio"/><div className="pf-container"><PageHeading label={`PORTFÓLIO / ${projects.length} PROJETOS`} title={<>Software para<br/><span>problemas de verdade.</span></>} description="Sistemas com IA, experiências web, integrações e mídia gerada por código. Um recorte do meu trabalho em engenharia e desenvolvimento."/><ProjectGrid onSelect={onSelect}/></div></section><ContactCallout/></>; }
function PageHeading({label,title,description}) { return <div className="pf-page-heading"><Eyebrow>{label}</Eyebrow><h1>{title}</h1>{description&&<p>{description}</p>}</div>; }
function SkillsPage() { return <><section className="pf-section pf-skills-intro"><Backdrop name="tracking"/><div className="pf-container"><PageHeading label="ESPECIALIDADES" title={<>Da engenharia de IA<br/><span>à produção.</span></>} description="Modelos, código e dados para construir produtos que funcionam fora da demo."/><ExpertiseCards/></div></section><section className="pf-section pf-tracking-section" id="solucoes"><Backdrop name="faq"/><div className="pf-container"><Heading label="ENGENHARIA DE IA" title="LLMs aplicadas com critério de engenharia." description="Agentes, RAG, fine-tuning e pipelines de mídia, com segurança, custo e avaliação definidos antes do primeiro prompt."/><div className="pf-service-grid">{services.map((item,i)=><Reveal as="article" className="pf-service-card" key={item.title} index={i%2}><div className="pf-service-image"><img src={`/assets/services/${item.image}.webp`} {...imageProps(`/assets/services/${item.image}.webp`,'(max-width: 700px) 90vw, 570px')} alt="" width="1200" height="750" loading="lazy"/></div><div className="pf-service-copy"><div className="pf-service-brands">{item.brands?item.brands.map(brand=><img key={brand} src={`/assets/brands/${brand}.svg`} alt="" width="25" height="25"/>):<item.icon size={25}/>}</div><h3>{item.title}</h3><p>{item.text}</p><div className="pf-tags">{item.tags.map(tag=><span key={tag}>{tag}</span>)}</div></div></Reveal>)}</div><div className="pf-tracking-story" id="rastreamento"><div><Eyebrow>DADOS & PERFORMANCE / DO ANÚNCIO À CONVERSÃO</Eyebrow><h2>Saiba quais anúncios<br/><span>trazem vendas.</span></h2><p>Especialista avançado em Meta Ads e rastreamento de dados. Conecto as campanhas ao seu site, WhatsApp e CRM com GTM Server-Side, API de conversões e GA4 para acompanhar de onde vêm os contatos e quais avançam até a venda.</p><p>Com servidor próprio e painéis personalizados, você compara campanhas com dados da sua operação.</p><Link className="pf-button pf-button-primary" href="/contato/">Conversar sobre rastreamento</Link></div><TrackingFlow/></div></div></section><StackSection/><ContactCallout/></>; }
function AboutPage() { return <><section className="pf-section pf-about" id="sobre"><Backdrop name="about"/><div className="pf-container"><PageHeading label="SOBRE MIM" title={<>Prazer,<br/><span>Abner Santos.</span></>} description="Engenheiro de IA e desenvolvedor sênior. Agentes, RAG, fine-tuning e software que chega à produção."/><AboutStory full/></div></section><ExperienceSection/><ProcessSection/><ContactCallout/></>; }
function ContactPage() {
  const [message,setMessage]=useState('');
  function startConversation(event){event.preventDefault();const data=new FormData(event.currentTarget);const text=`Olá, Abner! Sou ${data.get('name')}${data.get('company')?`, da ${data.get('company')}`:''}.\n\nPreciso de ajuda com: ${data.get('need')}\n\n${data.get('message')}`;window.open(`${whatsapp}?text=${encodeURIComponent(text)}`,'_blank','noopener,noreferrer');setMessage('Mensagem preparada no WhatsApp. Revise antes de enviar.');}
  return <><section className="pf-section pf-contact-page" id="contato"><Backdrop name="contact"/><div className="pf-container"><PageHeading label="CONTATO" title={<>O que você quer<br/><span>construir agora?</span></>} description="Um agente, uma integração com LLM, um sistema novo ou uma operação que precisa funcionar melhor. Me conte o contexto."/><div className="pf-contact-grid"><div className="pf-contact-intro"><h2>Uma conversa direta.<br/>Com quem vai desenvolver.</h2><p>Conte sobre sua empresa, o desafio e o que espera da solução. A partir daí, podemos discutir escopo, prioridades e próximos passos.</p><a className="pf-button pf-button-outline" href={linkedin} target="_blank" rel="noreferrer"><Linkedin size={18}/>Conectar no LinkedIn</a><div className="pf-contact-note"><MessageCircle size={24}/><p>O formulário prepara uma mensagem no WhatsApp. Você confere o texto antes de enviar.</p></div></div><form className="pf-contact-form" onSubmit={startConversation}><label htmlFor="name">Como posso chamar você?</label><input id="name" name="name" placeholder="Seu nome" autoComplete="name" required maxLength={100}/><label htmlFor="company">Sua empresa <span>(opcional)</span></label><input id="company" name="company" placeholder="Nome da empresa" autoComplete="organization" maxLength={120}/><label htmlFor="need">Do que você precisa?</label><select id="need" name="need" required defaultValue=""><option value="" disabled>Selecione uma opção</option><option>IA: agentes, RAG ou automações</option><option>Software ou site</option><option>Tráfego pago e rastreamento</option><option>Consultoria e orientação de equipe</option><option>Quero entender as possibilidades</option></select><label htmlFor="message">Conte um pouco sobre o projeto</label><textarea id="message" name="message" rows={4} placeholder="O que você gostaria de construir ou melhorar?" required maxLength={2000}/><button className="pf-button pf-button-primary" type="submit">Continuar no WhatsApp <MessageCircle size={19}/></button><p className="pf-form-note">Os dados são usados para montar sua mensagem.</p><p role="status">{message}</p></form></div></div></section><section className="pf-section pf-faq"><Backdrop name="faq"/><div className="pf-container pf-narrow"><Heading label="ANTES DA CONVERSA" title="Algumas respostas."/><div className="pf-faq-list">{faqs.map(([question,answer])=><details key={question}><summary>{question}<Plus size={20}/></summary><p>{answer}</p></details>)}</div></div></section></>;
}
export default function PortfolioSite({view='home'}) {
  const [selected,setSelected]=useState(null);
  const [animateDialog,setAnimateDialog]=useState(false);
  function selectProject(project,event){setAnimateDialog(Boolean(event?.detail));setSelected(project);}
  const mainRef=useRef(null);
  useScrollScenes(mainRef,[view]);
  return <><Header view={view}/><main id="conteudo" tabIndex={-1} ref={mainRef}>{view==='home'?<Home onSelect={selectProject}/>:view==='projects'?<ProjectsPage onSelect={selectProject}/>:view==='skills'?<SkillsPage/>:view==='about'?<AboutPage/>:<ContactPage/>}</main><Footer/>{selected&&<ProjectDialog project={selected} animateOpen={animateDialog} onClose={()=>setSelected(null)}/>}</>;
}
