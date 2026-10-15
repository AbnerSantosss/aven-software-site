'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Camada de movimento do portfólio: GSAP para timelines, scroll e ponteiro;
// Motion para presença declarativa e reveals de viewport. Todo efeito só roda sob
// (prefers-reduced-motion: no-preference) e limpa o que alterou ao desmontar.
const canUseDOM = typeof window !== 'undefined';
if (canUseDOM) {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export const EASE = [0.22, 1, 0.36, 1];
const MOTION_OK = '(prefers-reduced-motion: no-preference)';
const useIsoLayoutEffect = canUseDOM ? useLayoutEffect : useEffect;

/* Reveal de viewport: surge e sobe uma vez quando entra na tela. */
export function Reveal({ children, className = '', index = 0, y = 14, as = 'div', amount = 0.15, ref, ...rest }) {
  const reduced = useReducedMotion();
  const Tag = motion[as] || motion.div;
  const classes = ['pf-reveal', className].filter(Boolean).join(' ');
  return (
    <Tag
      ref={ref}
      {...rest}
      className={classes}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount, margin: '0px 0px -6% 0px' }}
      transition={reduced ? { duration: 0 } : { duration: 0.6, delay: Math.min(index * 0.08, 0.4), ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/* Linha de progresso de leitura abaixo do header. */
export function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  return <motion.div className="pf-progress" aria-hidden="true" style={{ scaleX: reduced ? scrollYProgress : smooth }} />;
}

/* Painel de navegação móvel com entrada e saída. */
export function MobileNav({ open, id, children }) {
  const reduced = useReducedMotion();
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.nav
          key="menu"
          id={id}
          className="pf-mobile-nav"
          aria-label="Navegação móvel"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={reduced ? { duration: 0 } : { duration: 0.28, ease: EASE }}
        >
          {children}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

/* Conteúdo que troca com fade (filtros de projetos, resposta do FAQ). */
export function Swap({ id, children, className, ref }) {
  const reduced = useReducedMotion();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={id}
        ref={ref}
        className={className}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? { opacity: 1 } : { opacity: 0, y: -4 }}
        transition={reduced ? { duration: 0 } : { duration: 0.22, ease: EASE }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/* Marca o header como rolado para o CSS compactar. */
export function useScrolledFlag(ref, offset = 24) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let ticking = false;
    function update() { element.dataset.scrolled = window.scrollY > offset ? 'true' : 'false'; ticking = false; }
    function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref, offset]);
}

/* Entrada do hero: título sobe por linha mascarada, textos escalonados, retrato assenta,
   fundo com parallax no scroll e brilho ambiente respirando. */
export function useHeroIntro(ref) {
  useIsoLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    root.dataset.intro = 'done';
    mm.add(MOTION_OK, () => {
      const q = gsap.utils.selector(root);
      const lines = q('.pf-line-inner');
      const copy = q('.pf-hero-copy > .pf-eyebrow, .pf-hello');
      const tail = q('.pf-hero-description, .pf-actions, .pf-hero-specialty');
      const portrait = q('.pf-portrait');
      const note = q('.pf-portrait-note');
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.75 } });
      tl.fromTo(copy, { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.08 }, 0)
        .fromTo(lines, { yPercent: 110 }, { yPercent: 0, duration: 0.95, stagger: 0.1 }, 0.08)
        .fromTo(tail, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.09 }, 0.32)
        .fromTo(portrait, { y: 28, scale: 0.965, autoAlpha: 0 }, { y: 0, scale: 1, autoAlpha: 1, duration: 1 }, 0.15)
        .fromTo(note, { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1 }, 0.6);
      const scrubs = [];
      const space = q('.pf-hero-space')[0];
      if (space) scrubs.push(gsap.to(space, { yPercent: 18, ease: 'none', scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true } }));
      const wrap = q('.pf-portrait-wrap')[0];
      if (wrap) scrubs.push(gsap.to(wrap, { y: -26, ease: 'none', scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true } }));
      const glow = q('.pf-hero-glow')[0];
      const breathe = glow ? gsap.fromTo(glow, { opacity: 0.3, scale: 0.96 }, { opacity: 0.55, scale: 1.04, duration: 3.4, ease: 'sine.inOut', repeat: -1, yoyo: true }) : null;
      return () => {
        tl.kill();
        scrubs.forEach(t => { t.scrollTrigger?.kill(); t.kill(); });
        breathe?.kill();
        gsap.set([...lines, ...copy, ...tail, ...portrait, ...note, space, wrap, glow].filter(Boolean), { clearProps: 'all' });
      };
    });
    return () => mm.revert();
  }, [ref]);
}

/* Inclinação, elevação e spotlight de cartões. Só com ponteiro fino e hover real. */
export function useCardMotion(ref, { tilt = 4, lift = -4 } = {}) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const mm = gsap.matchMedia();
    mm.add(`${MOTION_OK} and (hover: hover) and (pointer: fine)`, () => {
      gsap.set(element, { transformPerspective: 900 });
      const rx = gsap.quickTo(element, 'rotationX', { duration: 0.5, ease: 'power3.out' });
      const ry = gsap.quickTo(element, 'rotationY', { duration: 0.5, ease: 'power3.out' });
      const ty = gsap.quickTo(element, 'y', { duration: 0.5, ease: 'power3.out' });
      function move(event) {
        const bounds = element.getBoundingClientRect();
        const px = (event.clientX - bounds.left) / bounds.width;
        const py = (event.clientY - bounds.top) / bounds.height;
        element.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
        element.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
        ry((px - 0.5) * 2 * tilt);
        rx(-(py - 0.5) * 2 * tilt);
      }
      function enter() { element.dataset.hover = 'true'; ty(lift); }
      function leave() { delete element.dataset.hover; rx(0); ry(0); ty(0); }
      element.addEventListener('pointerenter', enter);
      element.addEventListener('pointermove', move);
      element.addEventListener('pointerleave', leave);
      return () => {
        element.removeEventListener('pointerenter', enter);
        element.removeEventListener('pointermove', move);
        element.removeEventListener('pointerleave', leave);
        delete element.dataset.hover;
        element.style.removeProperty('--mx');
        element.style.removeProperty('--my');
        gsap.set(element, { clearProps: 'transform' });
      };
    });
    return () => mm.revert();
  }, [ref, tilt, lift]);
}

/* Pop-in escalonado de grupos pequenos (emblemas, selos) quando o contêiner entra na tela. */
export function usePopIn(ref, selector, { y = 10, scale = 0.7, stagger = 0.06 } = {}) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const targets = root.querySelectorAll(selector);
    if (!targets.length) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const tween = gsap.fromTo(
        targets,
        { autoAlpha: 0, scale, y },
        { autoAlpha: 1, scale: 1, y: 0, duration: 0.55, ease: 'power3.out', stagger, scrollTrigger: { trigger: root, start: 'top 82%', once: true } },
      );
      return () => { tween.scrollTrigger?.kill(); tween.kill(); gsap.set(targets, { clearProps: 'all' }); };
    });
    return () => mm.revert();
  }, [ref, selector, y, scale, stagger]);
}

/* Número que conta até o valor ao entrar na tela. Sem JS, mostra o valor final. */
export function CountUp({ value, duration = 1.2 }) {
  const ref = useRef(null);
  const previous = useRef(0);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const mm = gsap.matchMedia();
    const from = previous.current;
    previous.current = value;
    mm.add(MOTION_OK, () => {
      const proxy = { v: from };
      const tween = gsap.to(proxy, {
        v: value,
        duration,
        ease: 'power3.out',
        onUpdate: () => { element.textContent = String(Math.round(proxy.v)); },
        scrollTrigger: { trigger: element, start: 'top 92%', once: true },
      });
      return () => { tween.scrollTrigger?.kill(); tween.kill(); element.textContent = String(value); };
    });
    return () => mm.revert();
  }, [value, duration]);
  return <span ref={ref} className="pf-count">{value}</span>;
}

/* Letreiro contínuo em telas pequenas; linha estática em telas largas. */
export function Marquee({ items, className = '' }) {
  const track = useRef(null);
  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const mm = gsap.matchMedia();
    mm.add(`${MOTION_OK} and (max-width: 800px)`, () => {
      const distance = element.scrollWidth / 2;
      const tween = gsap.to(element, { xPercent: -50, duration: Math.max(14, distance / 36), ease: 'none', repeat: -1 });
      function visibility() { if (document.hidden) tween.pause(); else tween.play(); }
      document.addEventListener('visibilitychange', visibility);
      return () => { document.removeEventListener('visibilitychange', visibility); tween.kill(); gsap.set(element, { clearProps: 'transform' }); };
    });
    return () => mm.revert();
  }, []);
  return (
    <div className={`pf-marquee ${className}`.trim()}>
      <div className="pf-marquee-track" ref={track}>
        {items.map((item, i) => <span key={i}>{item}</span>)}
        {items.map((item, i) => <span key={`dup-${i}`} aria-hidden="true">{item}</span>)}
      </div>
    </div>
  );
}

/* Cenas de scroll (GSAP ScrollTrigger) para toda a página: fundos das seções com parallax,
   títulos de seção que sobem com máscara ao entrar, linhas divisórias que se desenham e
   tags que entram em cascata. Reaplica quando a rota muda (view) e limpa tudo ao sair. */
export function useScrollScenes(ref, deps = []) {
  useIsoLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const tweens = [];
      root.querySelectorAll('.pf-section').forEach(section => {
        const backdrop = section.querySelector('.pf-backdrop');
        if (backdrop) tweens.push(gsap.fromTo(backdrop, { yPercent: -8, scale: 1.08 }, { yPercent: 8, scale: 1.08, ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true } }));
        tweens.push(gsap.fromTo(section, { '--pf-rule': 0 }, { '--pf-rule': 1, ease: 'power2.out', duration: 1.1, scrollTrigger: { trigger: section, start: 'top 85%', once: true } }));
      });
      root.querySelectorAll('.pf-section-heading h2, .pf-page-heading h1, .pf-tracking-story h2').forEach(title => {
        tweens.push(gsap.fromTo(title, { yPercent: 40, autoAlpha: 0, clipPath: 'inset(0 0 100% 0)' }, { yPercent: 0, autoAlpha: 1, clipPath: 'inset(0 0 -10% 0)', duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: title, start: 'top 88%', once: true } }));
      });
      root.querySelectorAll('.pf-tags').forEach(group => {
        const chips = group.children;
        if (!chips.length) return;
        tweens.push(gsap.fromTo(chips, { y: 8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out', scrollTrigger: { trigger: group, start: 'top 92%', once: true } }));
      });
      root.querySelectorAll('.pf-stack-group, .pf-service-card, .pf-expertise-card').forEach(card => {
        tweens.push(gsap.to(card, { y: -10, ease: 'none', scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1.2 } }));
      });
      ScrollTrigger.refresh();
      return () => {
        tweens.forEach(t => { t.scrollTrigger?.kill(); t.kill(); });
        root.querySelectorAll('.pf-backdrop, .pf-section-heading h2, .pf-page-heading h1, .pf-tracking-story h2, .pf-tags > *, .pf-stack-group, .pf-service-card, .pf-expertise-card').forEach(n => gsap.set(n, { clearProps: 'all' }));
      };
    });
    return () => mm.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, ...deps]);
}
