'use client';

import { useEffect, useId, useRef, useState } from 'react';
import gsap from 'gsap';
import { Check, ChartNoAxesCombined, Monitor, Pause, Play, Server } from 'lucide-react';

const destinations = [
  { id: 'meta', name: 'Meta Ads', caption: 'Pixel + API de Conversões' },
  { id: 'googleads', name: 'Google Ads', caption: 'Conversões de campanha' },
  { id: 'googleanalytics', name: 'GA4', caption: 'Eventos da jornada' },
];
const paths = ['M240 200H350', 'M590 200H630Q658 200 658 170V90Q658 61 685 61H700', 'M590 200H700', 'M590 200H630Q658 200 658 230V310Q658 339 685 339H700'];

function Destination({ destination, mobile = false }) {
  return <div className={`flow-node destination-node ${mobile ? 'mobile-flow-node' : ''}`}>
    <img src={`/assets/brands/${destination.id}.svg`} alt="" width="36" height="36"/>
    <div><strong>{destination.name}</strong><span>{destination.caption}</span></div>
    <span className="destination-check" aria-hidden="true"><Check size={13} strokeWidth={3}/></span>
  </div>;
}

export default function TrackingFlow({ reduced = false }) {
  const root = useRef(null), timeline = useRef(null), manuallyPaused = useRef(false), inView = useRef(false);
  const [playing, setPlaying] = useState(false);
  const uid = useId().replace(/:/g, '');
  useEffect(() => {
    const host = root.current;
    let tl;
    // Hyperframes principles: finite deterministic timeline; React owns web playback.
    const context = gsap.context(() => {
      const select = gsap.utils.selector(host);
      tl = gsap.timeline({ paused: true, repeat: 1, repeatDelay: 1.2, onComplete: () => setPlaying(false) });
      timeline.current = tl;
      tl.fromTo(select('.flow-node'), { opacity: .65, y: 6 }, { opacity: 1, y: 0, duration: .55, stagger: .07, ease: 'power3.out' }, 0);
      tl.fromTo(select('.flow-trace'), { strokeDashoffset: 100, opacity: 0 }, { strokeDashoffset: 0, opacity: 1, duration: 1.1, stagger: .26, ease: 'power2.inOut' }, .5);
      tl.fromTo(select('.server-halo'), { opacity: .8, scale: 1 }, { opacity: 0, scale: 1.15, duration: 1.4, ease: 'power2.out' }, 1);
      tl.fromTo(select('.mobile-flow-connector'), { scaleY: 0, opacity: .3 }, { scaleY: 1, opacity: 1, duration: .65, transformOrigin: 'top' }, .6);
      tl.fromTo(select('.destination-check'), { opacity: 0, scale: .65 }, { opacity: 1, scale: 1, duration: .35, stagger: .16, ease: 'power3.out' }, 2);
      tl.fromTo(select('.event-token'), { opacity: .3, y: 4 }, { opacity: 1, y: 0, duration: .4, stagger: .15 }, 2.8);
      tl.to({}, { duration: 1.4 });
      if (reduced) tl.totalProgress(1);
    }, host);
    const syncPlayback = () => {
      const shouldPlay = !reduced && !manuallyPaused.current && inView.current && !document.hidden && tl.totalProgress() < 1;
      if (shouldPlay) tl.play(); else tl.pause();
      setPlaying(shouldPlay);
    };
    const observer = new IntersectionObserver(([entry]) => { inView.current = entry.isIntersecting; syncPlayback(); }, { threshold: .25 });
    observer.observe(host);
    document.addEventListener('visibilitychange', syncPlayback);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', syncPlayback); context.revert(); timeline.current = null; };
  }, [reduced]);
  function toggle() {
    const tl = timeline.current;
    if (!tl || reduced) return;
    if (playing) { manuallyPaused.current = true; tl.pause(); setPlaying(false); }
    else { manuallyPaused.current = false; if (tl.totalProgress() >= 1) tl.restart(); else tl.play(); setPlaying(true); }
  }
  return <div className="tracking-flow" ref={root} aria-label="Demonstração de rastreamento conectado">
    <div className="flow-topline">
      <div className="flow-heading"><span><i/> RASTREAMENTO CONECTADO</span><p>Do clique ao seu painel. Tudo integrado.</p></div>
      <div className="flow-controls"><span className="flow-demo">DEMO</span><button type="button" onClick={toggle} disabled={reduced} aria-label={reduced ? 'Animação desativada por preferência de movimento reduzido' : playing ? 'Pausar animação de rastreamento' : 'Reproduzir animação de rastreamento'} title={reduced ? 'Movimento reduzido ativado' : playing ? 'Pausar demonstração' : 'Reproduzir demonstração'}>{playing ? <Pause size={17}/> : <Play size={17}/>}</button></div>
    </div>
    <div className="flow-diagram">
      <svg className="flow-connections" viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id={`stream-${uid}`}><stop stopColor="#2988ff"/><stop offset="1" stopColor="#3edaff"/></linearGradient>
          <filter id={`glow-${uid}`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <marker id={`arrow-${uid}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M1 1L7 5L1 9" fill="none" stroke="#4ccfff" strokeWidth="1.4"/></marker>
        </defs>
        {paths.map((d, i) => <path key={`base-${i}`} d={d} fill="none" stroke="#22568c" strokeWidth="1.5" vectorEffect="non-scaling-stroke"/>)}
        {paths.map((d, i) => <path key={i} className="flow-trace" d={d} pathLength="100" strokeDasharray="100" fill="none" stroke={`url(#stream-${uid})`} strokeWidth="2" vectorEffect="non-scaling-stroke" markerEnd={`url(#arrow-${uid})`} filter={`url(#glow-${uid})`}/>)}
        <circle cx="240" cy="200" r="5" fill="#78dfff" filter={`url(#glow-${uid})`}/><circle cx="590" cy="200" r="5" fill="#78dfff" filter={`url(#glow-${uid})`}/>
      </svg>
      <div className="flow-node source-node"><span className="node-icon"><Monitor size={32} strokeWidth={1.6}/></span><strong>Seu site</strong><span>Cliques · leads · vendas</span></div>
      <div className="flow-node server-node"><span className="server-halo" aria-hidden="true"/><span className="node-icon"><Server size={34} strokeWidth={1.7}/></span><strong>Seu servidor</strong><span>GTM + APIs próprias</span><small>Infraestrutura própria</small></div>
      <div className="flow-destinations">{destinations.map(destination => <Destination key={destination.id} destination={destination}/>)}</div>
    </div>
    <div className="flow-mobile" aria-label="Eventos do site passam pelo servidor próprio e chegam às plataformas de anúncios.">
      <div className="flow-mobile-origin">
        <div className="flow-node mobile-flow-node"><Monitor size={26}/><strong>Seu site</strong><span>Cliques, leads e vendas</span></div>
        <span className="mobile-origin-arrow" aria-hidden="true">→</span>
        <div className="flow-node mobile-flow-node mobile-server"><Server size={28}/><strong>Seu servidor</strong><span>GTM + APIs próprias</span></div>
      </div>
      <div className="mobile-flow-connector" aria-hidden="true"/>
      <div className="flow-mobile-destinations">{destinations.map(destination => <Destination key={destination.id} destination={destination} mobile/>)}</div>
    </div>
    <div className="flow-event-panel"><div className="flow-event-label"><span className="flow-status-dot"/><div><strong>EVENTOS CONECTADOS</strong><span>Do seu site para as plataformas.</span></div></div><div className="flow-events"><span className="event-token">page_view</span><span className="event-token">generate_lead</span><span className="event-token">purchase</span></div></div>
    <div className="flow-bottom"><span><ChartNoAxesCombined size={15}/> Uma jornada. Eventos conectados.</span><small>Fluxo ilustrativo</small></div>
  </div>;
}
