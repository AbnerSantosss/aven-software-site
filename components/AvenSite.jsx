'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Menu, X, Plus, Server, PanelsTopLeft, MessageCircle, Check } from 'lucide-react';
import projects from '../data/projects.json';
import artwork from '../data/artwork.json';
import TrackingFlow from './TrackingFlow';

const OrbitalScene = dynamic(() => import('./OrbitalScene'), {ssr:false,loading:()=> <div className="scene-loading"/>});
const whatsapp = 'https://wa.me/5581993070558';
const contactLink = `${whatsapp}?text=${encodeURIComponent('Olá, Abner! Gostaria de conversar sobre um projeto com a AVEN.')}`;
const categories = ['Todos','Sites e lojas','Sistemas','Integrações','Criação e mídia'];
const services = [
  {image:'service-meta',brands:['meta'],title:'Meta Ads & tráfego pago',text:'Campanhas, Pixel e API de Conversões conectados para acompanhar leads e vendas.',tags:['Campanhas','Pixel + CAPI','Deduplicação']},
  {image:'service-server',icon:Server,title:'Seu servidor de rastreamento.',text:'Rastreamento em servidor próprio, sob medida e sem depender da Stape.',tags:['Servidor próprio','Server-side','APIs']},
  {image:'service-analytics',brands:['googleads','googleanalytics','googletagmanager'],title:'Google Ads, GTM & GA4',text:'Eventos, conversões e UTMs organizados para orientar suas decisões de mídia.',tags:['Conversões','Eventos','Atribuição']},
  {image:'service-dashboards',icon:PanelsTopLeft,title:'Painéis sob medida.',text:'Campanhas, CRM e vendas reunidos em painéis feitos para a sua operação.',tags:['Dashboards','CRM','Integrações']},
];
const steps = [
  {title:'Entender',image:'process-discovery',text:'Conheço sua operação, o problema e o que você precisa alcançar.'},
  {title:'Planejar',image:'process-planning',text:'Defino a arquitetura, as prioridades e o escopo com você.'},
  {title:'Construir',image:'process-building',text:'Desenvolvo, integro e valido a solução em cada entrega.'},
  {title:'Evoluir',image:'process-evolving',text:'Acompanho o uso, ajusto os detalhes e amplio o que funciona.'},
];
const faqs = [
 ['Por onde começamos?','Por uma conversa sobre o problema, a rotina da empresa e o que precisa mudar. A partir disso, definimos o escopo, as prioridades e a proposta.'],
 ['Vocês podem trabalhar em um sistema que já existe?','Sim. Avaliamos o projeto atual para propor melhorias, corrigir problemas ou integrar novas ferramentas.'],
 ['Também trabalham com marketing e rastreamento?','Sim. Atuamos com tráfego pago, Meta Ads, Google Ads, GA4, pixels e APIs de conversão. Também desenvolvemos servidores próprios de rastreamento e painéis personalizados.'],
 ['Como funcionam prazo, valor e suporte?','Prazo e investimento dependem do escopo e são definidos na proposta. Manutenção, suporte e orientação da equipe também podem fazer parte do projeto.'],
];

function useMotionPreference() {
  const preference=useReducedMotion();
  const [reduced,setReduced]=useState(false);
  useEffect(()=>setReduced(Boolean(preference)),[preference]);
  return reduced;
}

function Reveal({children,className=''}) {
  const reduced=useMotionPreference();
  return <motion.div className={className} initial={false} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:reduced?0:.65,ease:[.22,1,.36,1]}}>{children}</motion.div>;
}

function responsiveImage(src, sizes = '100vw') {
  const image = artwork[src];
  return image ? {srcSet: image.mobile + ' ' + image.mobileWidth + 'w, ' + src + ' ' + image.width + 'w', sizes, decoding: 'async'} : {decoding: 'async'};
}

function DeferredOrbital({reduced}) {
  const host = useRef(null);
  const [ready,setReady] = useState(false);
  useEffect(()=>{
    const observer = new IntersectionObserver(([entry])=>{
      if(entry.isIntersecting){setReady(true);observer.disconnect();}
    },{rootMargin:'240px'});
    if(host.current)observer.observe(host.current);
    return()=>observer.disconnect();
  },[]);
  return <div className="footer-emblem" ref={host}>
    {ready && !reduced ? <OrbitalScene reduced={reduced}/> : <img className="footer-static-emblem" src="/assets/process/process-evolving-mobile.webp" alt="Símbolo orbital da AVEN Software" width="140" height="94" loading="lazy" decoding="async"/>}
  </div>;
}

function SectionBackground({name,src}) {
  const source = src || '/assets/backgrounds/bg-' + name + '.webp';
  return <div className={`section-background background-${name}`} aria-hidden="true"><img src={src || `/assets/backgrounds/bg-${name}.webp`} alt="" {...responsiveImage(source)} loading="lazy" width="1672" height="941"/></div>;
}

function SectionHeading({index,eyebrow,children,description}) {
  return <Reveal className="section-heading"><div className="eyebrow">{index&&<span className="section-index">{index} /</span>}{eyebrow}</div><h2>{children}</h2>{description&&<p>{description}</p>}</Reveal>;
}

function ProjectDialog({project,onClose}) {
  const ref=useRef();
  useEffect(()=>{
    const dialog=ref.current;
    const previousFocus=document.activeElement;
    dialog.showModal();
    const previous=document.body.style.overflow;
    document.body.style.overflow='hidden';
    return()=>{dialog.close();document.body.style.overflow=previous;previousFocus?.focus?.({preventScroll:true});};
  },[]);
  return <dialog ref={ref} className="project-dialog" aria-labelledby="dialog-title" onCancel={onClose} onClick={e=>{if(e.target===ref.current)onClose();}}>
    <button className="dialog-close icon-button" onClick={onClose} aria-label="Fechar projeto"><X size={22}/></button>
    <img src={project.referenceImage || project.image} alt={`${(project.referenceKind || project.imageKind) === "screenshot" ? "Tela" : "Capa ilustrativa"} de ${project.title}`} width="1200" height="750"/>
    <div className="dialog-content"><span className="eyebrow">{project.category}{project.stage && ` · ${project.stage}`}</span><h2 id="dialog-title">{project.title}</h2><p>{project.description}</p><a className="button button-light" href={`${whatsapp}?text=${encodeURIComponent(`Olá, Abner! Vi o projeto ${project.title} no site da AVEN e gostaria de conversar sobre uma solução.`)}`} target="_blank" rel="noreferrer">Conversar sobre uma solução</a><small>{project.referenceLabel || project.captureLabel || (project.imageKind === "screenshot" ? "Interface real do projeto." : "Capa ilustrativa do projeto.")}</small></div>
  </dialog>;
}

export default function AvenSite() {
  const reduced=useMotionPreference();
  const [menu,setMenu]=useState(false);
  const [category,setCategory]=useState('Todos');
  const [limit,setLimit]=useState(6);
  const [selected,setSelected]=useState(null);
  const [message,setMessage]=useState('');
  const shown=projects.filter(p=>category==='Todos'||p.category===category);
  useEffect(()=>{const close=e=>{if(e.key==='Escape')setMenu(false);};window.addEventListener('keydown',close);return()=>window.removeEventListener('keydown',close);},[]);
  function startConversation(e) {
    e.preventDefault();
    const data=new FormData(e.currentTarget);
    const text=`Olá, Abner! Sou ${data.get('name')}${data.get('company') ? `, da ${data.get('company')}`:''}.\n\nPreciso de ajuda com: ${data.get('need')}\n\n${data.get('message')}`;
    window.open(`${whatsapp}?text=${encodeURIComponent(text)}`,'_blank','noopener,noreferrer');
    setMessage('Conversa preparada no WhatsApp. Revise a mensagem antes de enviar.');
  }
  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className="header"><a href="#inicio" className="brand" aria-label="AVEN Software — início"><img src="/assets/aven-wordmark.webp" width="288" height="73" alt="AVEN Software"/></a>
      <nav className="desktop-nav" aria-label="Navegação principal"><a href="#projetos">Projetos</a><a href="#solucoes">Soluções</a><a href="#sobre">Sobre</a></nav>
      <a className="header-contact" href="#contato">Vamos conversar <span className="status-dot"/></a>
      <button className="menu-toggle icon-button" aria-label={menu?'Fechar menu':'Abrir menu'} aria-expanded={menu} aria-controls="mobile-nav" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
      {menu&&<nav id="mobile-nav" className="mobile-nav" aria-label="Navegação móvel">{[['Projetos','projetos'],['Soluções','solucoes'],['Sobre','sobre'],['Contato','contato']].map(([label,id])=><a key={id} href={`#${id}`} onClick={()=>setMenu(false)}>{label}</a>)}</nav>}
    </header>
    <main id="conteudo">
      <section className="hero" id="inicio">
        <img className="hero-background" src="/assets/aven-space-background.webp" {...responsiveImage("/assets/aven-space-background.webp")} alt="" width="1672" height="941" fetchPriority="high"/>
        <div className="hero-shade"/>
        <motion.div className="hero-content page-width" initial={reduced?false:{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.9}}>
          <div className="eyebrow hero-eyebrow"><span className="status-dot"/> TECNOLOGIA COM PROPÓSITO</div>
          <h1>Problemas reais.<br/><span>Software sob medida.</span></h1>
          <p>Conectamos tecnologia e negócio para construir o que a sua empresa precisa.</p>
          <div className="hero-actions"><a className="button button-light" href="#contato">Conte seu projeto</a><a className="text-link" href="#projetos">Explore nossos trabalhos <span className="link-line"/></a></div>
        </motion.div>
        <div className="hero-footer page-width"><span>SOFTWARE · MARKETING · AUTOMAÇÃO</span><span className="hero-coordinate">BRASIL / CONEXÕES SEM FRONTEIRAS</span><a href="#projetos" className="scroll-cue" aria-label="Rolar até os projetos"><span/></a></div>
      </section>

      <section className="portfolio section page-width" id="projetos"><SectionBackground name="portfolio"/>
        <SectionHeading index="01" eyebrow="PROJETOS & EXPERIMENTOS" description="De uma tarefa do dia a dia a um sistema completo. Um pouco do que já construímos.">Ideias que viraram <span>software.</span></SectionHeading>
        <div className="portfolio-toolbar"><div className="filters" role="group" aria-label="Filtrar projetos">{categories.map(c=><button key={c} onClick={()=>{setCategory(c);setLimit(6);}} className={category===c?'active':''} aria-pressed={category===c}>{c}</button>)}</div><span className="project-total">{String(shown.length).padStart(2,'0')} PROJETOS</span></div>
        <motion.div className="projects-grid" layout={!reduced}><AnimatePresence mode="popLayout">{shown.slice(0,limit).map((p,i)=><motion.article layout={!reduced} key={p.id} initial={reduced?false:{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:.28}} className="project-card">
          <button className={`project-image-button ${p.imageKind === "screenshot" ? "real-screen" : ""}`} onClick={()=>setSelected(p)} aria-label={`Conhecer ${p.title}`}>{p.imageKind === "screenshot" && <span className="screen-chrome" aria-hidden="true"><i/><i/><i/></span>}<img src={p.image} {...responsiveImage(p.image, '(max-width: 350px) calc(100vw - 28px), (max-width: 600px) calc(100vw - 36px), (max-width: 800px) calc((100vw - 68px) / 2), (max-width: 1000px) calc((100vw - 88px) / 2), (max-width: 1199px) calc((100vw - 112px) / 3), (max-width: 1416px) calc((100vw - 144px) / 3), 424px')} alt={`${p.imageKind === "screenshot" ? "Tela" : "Capa ilustrativa"} de ${p.title}`} width="1200" height="750" loading="lazy"/><span className="project-number">{p.id.slice(-2)}</span>{(p.stage || p.referenceKind === "conceptual" || p.imageKind === "conceptual")&&<span className="project-stage">{p.stage || "Ferramenta de terminal"}</span>}<span className="project-open"><Plus size={20}/></span></button>
          <div className="project-copy"><div className="project-heading"><span>{p.category}</span><h3><button onClick={()=>setSelected(p)}>{p.title}</button></h3></div><p>{p.description}</p></div>
        </motion.article>)}</AnimatePresence></motion.div>
        <div className="portfolio-bottom"><span>Conheça cada projeto em detalhes. Protótipos sinalizados.</span>{limit<shown.length?<button className="button button-outline" onClick={()=>setLimit(shown.length)}>Ver todos os {shown.length} projetos <Plus size={16}/></button>:<span className="all-shown"><Check size={15}/> Todos os projetos desta seleção</span>}</div>
      </section>

      <section className="solutions section" id="solucoes"><SectionBackground name="tracking" src="/assets/services/tracking-background.webp"/><div className="page-width">
        <SectionHeading index="02" eyebrow="DESENVOLVIMENTO SÊNIOR · TRÁFEGO PAGO · RASTREAMENTO" description="Desenvolvo a estrutura que conecta seus anúncios aos resultados: servidores próprios, integrações com Meta Ads e Google Ads, mensuração no GA4 e painéis sob medida.">Engenharia sênior<br/><span>para o seu tráfego pago.</span></SectionHeading>
        <div className="platform-strip" aria-label="Plataformas integradas">{[['meta','Meta Ads'],['googleads','Google Ads'],['googletagmanager','Google Tag Manager'],['googleanalytics','Google Analytics 4']].map(([brand,name])=><span key={brand}><img src={`/assets/brands/${brand}.svg`} alt="" width="24" height="24"/>{name}</span>)}</div>
        <div className="services-grid">{services.map((s,i)=><Reveal key={s.title} className="service-card-wrap"><article className="service-card"><div className="service-art"><img className="card-background" src={`/assets/services/${s.image}.webp`} {...responsiveImage('/assets/services/' + s.image + '.webp', '(max-width: 342px) calc(100vw - 62px), (max-width: 600px) 278px, (max-width: 800px) calc((100vw - 68px) / 2), (max-width: 1199px) calc((100vw - 88px) / 2), (max-width: 1416px) calc((100vw - 144px) / 4), 318px')} alt="" width="1448" height="1086" loading="lazy"/><div className="card-shade"/><div className="service-card-top"><span className="card-index">0{i+1}</span><div className="service-brand-icons">{s.brands?s.brands.map(brand=><img key={brand} src={`/assets/brands/${brand}.svg`} alt="" width="32" height="32"/>):<s.icon size={32} strokeWidth={1.6}/>}</div></div></div><div className="service-card-copy"><h3>{s.title}</h3><p>{s.text}</p><div className="service-tags">{s.tags.map(tag=><span key={tag}>{tag}</span>)}</div></div></article></Reveal>)}</div>
        <div className="tracking-feature"><div className="tracking-feature-copy"><span className="eyebrow">DO ANÚNCIO À CONVERSÃO</span><h3>O anúncio é só<br/>o começo.</h3><p>O clique precisa chegar ao lugar certo. O evento precisa ser registrado. E a venda precisa aparecer no seu painel.</p><p>Cuido da tecnologia que conecta essas etapas para você decidir com mais clareza.</p><a className="button button-light" href={`${whatsapp}?text=${encodeURIComponent('Olá, Abner! Quero conversar sobre tráfego pago, rastreamento e infraestrutura própria para minhas campanhas.')}`} target="_blank" rel="noreferrer">Vamos estruturar seu rastreamento</a></div><TrackingFlow reduced={Boolean(reduced)}/></div>
      </div></section>

      <section className="about section page-width" id="sobre">
        <SectionBackground name="about"/>
        <SectionHeading index="03" eyebrow="QUEM ESTÁ POR TRÁS">Prazer, sou <span>Abner Santos.</span></SectionHeading>
        <div className="about-layout">
          <div className="about-portrait">
            <div className="about-image"><img src="/assets/abner-santos.webp" {...responsiveImage('/assets/abner-santos.webp', '(max-width: 600px) calc(100vw - 36px), 440px')} alt="Abner Santos, desenvolvedor sênior da AVEN Software" width="2016" height="2114" loading="lazy"/><div className="portrait-caption"><span>ABNER SANTOS</span><span>AVEN SOFTWARE</span></div></div>
            <div className="about-experience"><strong>5+ anos</strong><span>de experiência em<br/>tecnologia e marketing</span></div>
          </div>
          <Reveal className="about-copy">
            <p className="about-lead">Desenvolvedor sênior.<br/>Especialista em tráfego pago e rastreamento.</p>
            <p>Minha experiência une programação e marketing. Entendo a estratégia da campanha e construo a tecnologia para acompanhar o que ela gera: do primeiro clique à venda registrada.</p>
            <p>Desenvolvo servidores próprios de rastreamento, painéis personalizados, APIs e automações. Conecto Meta Ads, Google Ads, GA4 e CRM para que sua operação tenha dados úteis para decidir.</p>
            <div className="about-credentials">
              <div><span>DESENVOLVIMENTO</span><strong>Visão full stack</strong><p>Da interface à arquitetura, com integrações e manutenção contínua.</p></div>
              <div><span>FORMAÇÃO CONTÍNUA</span><strong>Certificações Blip</strong><p>Desenvolvimento, atendimento e análise de dados.</p></div>
            </div>
            <div className="expertise-tags"><span>Software sob medida</span><span>Tráfego pago</span><span>Rastreamento server-side</span></div>
            <a className="text-link linkedin-link" href="https://www.linkedin.com/in/abnersantoss/" target="_blank" rel="noreferrer">Minha trajetória e certificações no LinkedIn <span className="link-line"/></a>
          </Reveal>
        </div>
      </section>

      <section className="process section page-width" id="processo"><SectionBackground name="process"/><SectionHeading index="04" eyebrow="COMO TRABALHAMOS" description="Você acompanha o que está sendo construído, por que e qual é o próximo passo.">Clareza em <span>cada etapa.</span></SectionHeading><div className="process-steps">{steps.map((step,i)=><Reveal key={step.title} className="process-step"><div className="process-art"><img className="card-background" src={`/assets/process/${step.image}.webp`} {...responsiveImage('/assets/process/' + step.image + '.webp', '(max-width: 600px) 96px, (max-width: 800px) calc((100vw - 68px) / 2), (max-width: 900px) calc((100vw - 88px) / 2), (max-width: 1199px) calc((100vw - 112px) / 4), (max-width: 1416px) calc((100vw - 144px) / 4), 318px')} alt="" width="1536" height="1024" loading="lazy"/><div className="card-shade"/><span className="card-index">0{i+1}</span></div><div className="process-step-copy"><h3>{step.title}</h3><p>{step.text}</p></div></Reveal>)}</div></section>

      <section className="faq-section section page-width"><SectionBackground name="faq"/><SectionHeading eyebrow="ANTES DA CONVERSA">Algumas <span>respostas.</span></SectionHeading><div className="faq-list">{faqs.map(([q,a])=><details key={q}><summary>{q}<Plus size={20}/></summary><p>{a}</p></details>)}</div></section>

      <section className="contact section" id="contato"><SectionBackground name="contact"/><div className="page-width"><SectionHeading eyebrow="VAMOS CONVERSAR" description="Conte o que precisa resolver. A gente começa por aí.">O próximo projeto pode ser <span>o seu.</span></SectionHeading></div><div className="page-width contact-layout"><Reveal className="contact-copy"><p>Uma conversa direta.<br/><strong>Uma solução pensada<br/>para a sua empresa.</strong></p><a className="contact-phone" href={contactLink} target="_blank" rel="noreferrer"><MessageCircle size={20}/> (81) 99307-0558</a></Reveal><form className="contact-form" onSubmit={startConversation}><label htmlFor="name">Como podemos chamar você?</label><input id="name" name="name" placeholder="Seu nome" autoComplete="name" required maxLength={100}/><label htmlFor="company">Sua empresa <span>(opcional)</span></label><input id="company" name="company" placeholder="Nome da empresa" autoComplete="organization" maxLength={120}/><label htmlFor="need">Do que você precisa?</label><select id="need" name="need" defaultValue="" required><option value="" disabled>Selecione uma opção</option><option>Software ou site</option><option>Marketing e mensuração</option><option>IA e automações</option><option>Consultoria e suporte</option><option>Quero entender as possibilidades</option></select><label htmlFor="message">Conte um pouco sobre o projeto</label><textarea id="message" name="message" placeholder="O que você gostaria de construir ou melhorar?" rows={3} required maxLength={2000}/><button className="button button-light" type="submit">Continuar no WhatsApp <MessageCircle size={17}/></button><p className="form-note">Os dados vão para uma mensagem no WhatsApp. Você revisa antes de enviar.</p><p className="form-status" role="status">{message}</p></form></div></section>
    </main>
    <footer className="footer page-width"><DeferredOrbital reduced={Boolean(reduced)}/><a className="brand" href="#inicio" aria-label="AVEN Software — início"><img src="/assets/aven-wordmark.webp" width="288" height="73" alt="AVEN Software"/></a><p>Soluções que conectam empresas.</p><div><a href="https://www.linkedin.com/in/abnersantoss/" target="_blank" rel="noreferrer">LinkedIn</a><a href={contactLink} target="_blank" rel="noreferrer">WhatsApp</a></div><span className="copyright">© {new Date().getFullYear()} AVEN Software</span></footer>
    {selected&&<ProjectDialog project={selected} onClose={()=>setSelected(null)}/>}
  </>;
}
