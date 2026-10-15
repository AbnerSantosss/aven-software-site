'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// Pipeline de rastreamento desenhado em SVG e animado com GSAP: os nós acendem na ordem
// em que o dado percorre o caminho (anúncio → clique → GTM server-side → CAPI/GA4 → CRM → venda),
// pulsos viajam pela linha e um log de eventos ilustra o que o servidor recebe.
// Tudo só roda com prefers-reduced-motion: no-preference e quando o painel entra na tela.
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const W = 720, H = 440;
const nodes = [
  { id: 'ad', x: 90, y: 110, label: 'ANÚNCIO', sub: 'Meta Ads', brand: 'meta' },
  { id: 'click', x: 360, y: 70, label: 'CLIQUE', sub: 'site · landing', brand: null },
  { id: 'gtm', x: 630, y: 110, label: 'GTM SERVER-SIDE', sub: 'servidor próprio', brand: 'googletagmanager' },
  { id: 'capi', x: 630, y: 330, label: 'CAPI · GA4', sub: 'API de conversões', brand: 'googleanalytics' },
  { id: 'crm', x: 360, y: 370, label: 'CRM · WHATSAPP', sub: 'lead qualificado', brand: 'whatsapp' },
  { id: 'sale', x: 90, y: 330, label: 'VENDA', sub: 'atribuída ao anúncio', brand: null },
];
const path = 'M 90 110 C 200 110, 250 70, 360 70 C 470 70, 520 110, 630 110 C 695 110, 695 330, 630 330 C 520 330, 470 370, 360 370 C 250 370, 200 330, 90 330';

const logLines = [
  ['PageView', 'fbp ✓  fbc ✓', '200'],
  ['Lead', 'email · phone (hash)', '200'],
  ['InitiateCheckout', 'event_id dedup ✓', '200'],
  ['Purchase', 'value · currency · order_id', '200'],
  ['Purchase → GA4', 'purchase · transaction_id', '200'],
];

export default function TrackingFlow() {
  const root = useRef(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(el);
      const line = q('.tf-path')[0];
      const nodeEls = q('.tf-node');
      const pulses = q('.tf-pulse');
      const logs = q('.tf-log li');
      const length = line.getTotalLength();
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
      gsap.set(nodeEls, { autoAlpha: 0, scale: 0.8, transformOrigin: '50% 50%' });
      gsap.set(pulses, { autoAlpha: 0 });
      gsap.set(logs, { autoAlpha: 0, x: -8 });

      const intro = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });
      intro.to(line, { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut' }, 0)
        .to(nodeEls, { autoAlpha: 1, scale: 1, duration: 0.5, stagger: 0.32 }, 0.1)
        .to(logs, { autoAlpha: 1, x: 0, duration: 0.4, stagger: 0.35 }, 0.6);

      const loop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.6 });
      pulses.forEach((pulse, i) => {
        loop.fromTo(pulse, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, i * 0.9)
          .to(pulse, { motionPath: { path: line, align: line, alignOrigin: [0.5, 0.5] }, duration: 4.2, ease: 'none' }, i * 0.9)
          .to(pulse, { autoAlpha: 0, duration: 0.25 }, i * 0.9 + 4);
      });
      nodeEls.forEach((node, i) => {
        loop.fromTo(node.querySelector('.tf-ring'), { opacity: 0.9, scale: 1 }, { opacity: 0, scale: 1.9, duration: 0.9, ease: 'power2.out', transformOrigin: '50% 50%' }, 0.15 + i * 0.78);
      });
      const cursor = q('.tf-cursor')[0];
      const blink = cursor ? gsap.to(cursor, { opacity: 0, duration: 0.5, repeat: -1, yoyo: true, ease: 'steps(1)' }) : null;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 78%',
        onEnter: () => { intro.play(); loop.play(); },
        onEnterBack: () => loop.play(),
        onLeave: () => loop.pause(),
        onLeaveBack: () => loop.pause(),
      });
      function visibility() { if (document.hidden) loop.pause(); else if (trigger.isActive) loop.play(); }
      document.addEventListener('visibilitychange', visibility);
      return () => {
        document.removeEventListener('visibilitychange', visibility);
        trigger.kill(); intro.kill(); loop.kill(); blink?.kill();
        gsap.set([line, ...nodeEls, ...pulses, ...logs, cursor].filter(Boolean), { clearProps: 'all' });
      };
    });
    return () => mm.revert();
  }, []);

  return <figure className="tracking-flow tf" ref={root} aria-label="Pipeline de rastreamento: anúncio, clique, GTM server-side, API de conversões e GA4, CRM e venda atribuída.">
    <div className="tf-head"><span className="tf-dot"/><span>rastreamento · servidor próprio · tempo real</span><span className="tf-live">LIVE</span></div>
    <svg className="tf-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-hidden="true">
      <defs>
        <linearGradient id="tf-grad" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stopColor="#64d5f9"/><stop offset="1" stopColor="#99bee7"/></linearGradient>
        <filter id="tf-glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <path className="tf-path-base" d={path}/>
      <path className="tf-path" d={path}/>
      {[0, 1, 2].map(i => <circle key={i} className="tf-pulse" r="5" cx={nodes[0].x} cy={nodes[0].y} filter="url(#tf-glow)"/>)}
      {nodes.map((n, i) => <g key={n.id} className="tf-slot" style={{ transform: `translate(${n.x}px, ${n.y}px)` }}><g className="tf-node">
        <circle className="tf-ring" r="26"/>
        <circle className="tf-core" r="22"/>
        {n.brand ? <image href={`/assets/brands/${n.brand}.svg`} x="-11" y="-11" width="22" height="22"/> : <text className="tf-core-text" textAnchor="middle" dominantBaseline="central">{i === 1 ? '⤴' : '✓'}</text>}
        <text className="tf-label" textAnchor="middle" y={i === 1 ? -42 : i === 4 ? 56 : 46}>{n.label}</text>
        <text className="tf-sub" textAnchor="middle" y={i === 1 ? -58 : i === 4 ? 72 : 62}>{n.sub}</text>
      </g></g>)}
    </svg>
    <ul className="tf-log">
      {logLines.map(([event, meta, status]) => <li key={event}><code className="tf-ev">{event}</code><span className="tf-meta">{meta}</span><span className="tf-status">{status}</span></li>)}
      <li className="tf-wait" aria-hidden="true"><span className="tf-cursor">▮</span></li>
    </ul>
    <figcaption className="tf-caption">Do anúncio à venda registrada, cada evento passa pelo servidor com deduplicação e correspondência de dados. <small>Fluxo ilustrativo; sem dados de clientes.</small></figcaption>
  </figure>;
}
