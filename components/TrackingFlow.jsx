'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const destinations = [
  { id: 'meta', name: 'Meta Ads' },
  { id: 'googleads', name: 'Google Ads' },
  { id: 'googleanalytics', name: 'GA4' },
];

export default function TrackingFlow({ reduced = false }) {
  const root = useRef(null);
  useEffect(() => {
    if (reduced) return;
    const host = root.current;
    let timeline;
    const context = gsap.context(() => {
      timeline = gsap.timeline({ paused: true });
      timeline.fromTo('.measurement-platform', { y: 5 }, { y: 0, duration: .45, stagger: .12, ease: 'power2.out' });
    }, host);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { timeline.play(); observer.disconnect(); }
    }, { threshold: .25 });
    observer.observe(host);
    return () => { observer.disconnect(); context.revert(); };
  }, [reduced]);

  return <figure className="tracking-flow measurement-story" ref={root}>
    <img className="measurement-photo" src="/assets/tracking-v3/campaign-measurement.webp" srcSet="/assets/tracking-v3/campaign-measurement-mobile.webp 700w, /assets/tracking-v3/campaign-measurement.webp 1400w" sizes="(max-width: 800px) 100vw, (max-width: 1199px) 52vw, 720px" alt="Cena ilustrativa: anúncio de um produto no celular e o mesmo produto em um pedido no notebook, junto à análise da campanha." width="1400" height="876" loading="lazy" decoding="async"/>
    <figcaption className="measurement-caption">
      <p>Do anúncio à venda registrada.</p>
      <div className="measurement-platforms">{destinations.map(destination => <span className="measurement-platform" key={destination.id}><img src={`/assets/brands/${destination.id}.svg`} alt="" width="24" height="24"/>{destination.name}</span>)}</div>
      <small>Imagem ilustrativa da jornada de compra.</small>
    </figcaption>
  </figure>;
}
