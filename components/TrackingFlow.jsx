'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Pause, Play, Monitor, Server } from 'lucide-react';

const destinations=[{id:'meta',name:'Meta Ads',caption:'Pixel + API de Conversões',y:65},{id:'googleads',name:'Google Ads',caption:'Conversões de campanha',y:185},{id:'googleanalytics',name:'GA4',caption:'Eventos da jornada',y:305}];

export default function TrackingFlow({reduced=false}) {
  const root=useRef(null);const timeline=useRef(null);const[playing,setPlaying]=useState(!reduced);
  useEffect(()=>{
    const host=root.current;const select=gsap.utils.selector(host);
    // Hyperframes-animation: path draw + smooth entrance + SVG dash flow.
    // One deterministic, finite timeline; React owns web playback and lifecycle.
    const tl=gsap.timeline({paused:true,repeat:2,repeatDelay:1.5,onComplete:()=>setPlaying(false)});
    timeline.current=tl;
    tl.fromTo(select('.flow-node'),{opacity:.5,scale:.97},{opacity:1,scale:1,duration:.55,stagger:.08,ease:'power3.out',transformOrigin:'50% 50%'},0);
    const paths=select('.flow-trace');
    paths.forEach((path,i)=>{
      const length=path.getTotalLength();
      tl.fromTo(path,{strokeDasharray:length,strokeDashoffset:length,opacity:0},{strokeDashoffset:0,opacity:1,duration:1.4,ease:'power2.inOut'},i===0?.45:1.65+(i-1)*.3);
      tl.to(path,{opacity:.2,duration:1.1},5.8);
    });
    tl.fromTo(select('.source-pulse'),{opacity:.8,scale:1},{opacity:0,scale:1.65,transformOrigin:'50% 50%',duration:1.2,ease:'power2.out'},.3);
    tl.fromTo(select('.gtm-pulse'),{opacity:.75,scale:1},{opacity:0,scale:1.45,transformOrigin:'50% 50%',duration:1.1,ease:'power2.out'},1.8);
    tl.fromTo(select('.destination-check'),{opacity:0,scale:.4},{opacity:1,scale:1,duration:.4,stagger:.3,ease:'power3.out',transformOrigin:'50% 50%'},3);
    tl.fromTo(select('.event-token'),{opacity:0,y:7},{opacity:1,y:0,duration:.4,stagger:.2},3.7);
    tl.to({}, {duration:1.5},6.8);
    if(reduced){tl.totalProgress(1);setPlaying(false);}
    const observer=new IntersectionObserver(([e])=>{
      if(reduced)return;
      if(e.isIntersecting && tl.totalProgress()<1){tl.play();setPlaying(true);}else{tl.pause();setPlaying(false);}
    },{threshold:.25});observer.observe(host);
    return()=>{observer.disconnect();tl.kill();timeline.current=null;};
  },[reduced]);
  function toggle(){const tl=timeline.current;if(!tl)return;if(playing){tl.pause();setPlaying(false);}else{if(tl.totalProgress()>=1)tl.restart();else tl.play();setPlaying(true);}}
  return <div className="tracking-flow" ref={root}>
    <div className="flow-topline"><span><i/> RASTREAMENTO CONECTADO</span><button onClick={toggle} aria-label={playing?'Pausar animação de rastreamento':'Reproduzir animação de rastreamento'}>{playing?<Pause size={13}/>:<Play size={13}/>}</button></div>
    <svg className="flow-diagram" viewBox="0 0 610 400" role="img" aria-label="Fluxo ilustrativo: eventos do site passam por um servidor próprio com GTM e APIs e são enviados para Meta Ads, Google Ads e GA4.">
      <defs><linearGradient id="data-stream"><stop stopColor="#39c7f0"/><stop offset="1" stopColor="#9bdaff"/></linearGradient></defs>
      <g fill="none" stroke="#537592" strokeWidth="1.3" opacity=".4"><path d="M139 201H245"/><path d="M357 201H382Q396 201 396 186V84Q396 68 413 68H451"/><path d="M357 201H451"/><path d="M357 201H382Q396 201 396 217V318Q396 334 413 334H451"/></g>
      <g fill="none" stroke="url(#data-stream)" strokeWidth="2.4" strokeLinecap="round"><path className="flow-trace" d="M139 201H245"/><path className="flow-trace" d="M357 201H382Q396 201 396 186V84Q396 68 413 68H451"/><path className="flow-trace" d="M357 201H451"/><path className="flow-trace" d="M357 201H382Q396 201 396 217V318Q396 334 413 334H451"/></g>
      <g className="flow-node"><rect x="20" y="152" width="118" height="98" rx="12" fill="#0c1726" stroke="#536e87"/><rect className="source-pulse" x="20" y="152" width="118" height="98" rx="12" fill="none" stroke="#55cfff"/><rect x="56" y="172" width="43" height="29" rx="3" fill="none" stroke="#c8daeb" strokeWidth="2"/><path d="M56 180H99M72 205H84" stroke="#c8daeb" strokeWidth="2"/><text x="79" y="225" textAnchor="middle" fill="#d5e6f6" fontSize="13">Seu site</text><text x="79" y="283" textAnchor="middle" fill="#96b3c9" fontSize="10">cliques · leads · vendas</text></g>
      <g className="flow-node"><rect x="245" y="144" width="112" height="114" rx="14" fill="#102038" stroke="#5283ae"/><rect className="gtm-pulse" x="245" y="144" width="112" height="114" rx="14" fill="none" stroke="#59b6ff"/><image href="/assets/brands/googletagmanager.svg" x="282" y="160" width="38" height="38"/><text x="301" y="219" textAnchor="middle" fill="#edf6ff" fontSize="14" fontWeight="600">Seu servidor</text><text x="301" y="240" textAnchor="middle" fill="#a6bbd0" fontSize="10">GTM + APIs próprias</text><text x="301" y="283" textAnchor="middle" fill="#96b3c9" fontSize="10">infraestrutura própria</text></g>
      {destinations.map((d,i)=><g className="flow-node" key={d.id}><rect x="450" y={d.y-34} width="143" height="79" rx="11" fill="#0d1929" stroke="#354f68"/><image href={`/assets/brands/${d.id}.svg`} x="464" y={d.y-19} width="24" height="24"/><text x="497" y={d.y-3} fill="#e3edf6" fontSize="12" fontWeight="600">{d.name}</text><text x="464" y={d.y+24} fill="#8ba6be" fontSize="8.5">{d.caption}</text><g className="destination-check"><circle cx="580" cy={d.y-27} r="8" fill="#3bd6b0"/><path d={`M576 ${d.y-27}l2.5 2.5 4-5`} fill="none" stroke="#061b17" strokeWidth="1.5"/></g></g>)}
    </svg>
    <div className="flow-mobile" aria-label="Eventos do site passam pelo servidor próprio e chegam às plataformas de anúncios.">
      <div className="flow-mobile-origin">
        <div className="flow-node mobile-flow-node"><Monitor size={24}/><strong>Seu site</strong><span>Cliques, leads e vendas</span></div>
        <div className="flow-node mobile-flow-node"><Server size={24}/><strong>Seu servidor</strong><span>GTM + APIs próprias</span></div>
      </div>
      <div className="flow-mobile-connector" aria-hidden="true"/>
      <div className="flow-mobile-destinations">
        {destinations.map(d=><div className="flow-node mobile-flow-node" key={d.id}><img src={'/assets/brands/'+d.id+'.svg'} alt="" width="28" height="28"/><div><strong>{d.name}</strong><span>{d.caption}</span></div></div>)}
      </div>
    </div>
    <div className="flow-events"><span className="event-token">page_view</span><span className="event-token">generate_lead</span><span className="event-token">purchase</span></div>
    <div className="flow-bottom"><span>Uma jornada. Eventos conectados.</span><small>Fluxo ilustrativo</small></div>
  </div>;
}
