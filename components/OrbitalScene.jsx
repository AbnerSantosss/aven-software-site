'use client';

import { Component, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

function Emblem({ reduced }) {
  const emblem = useRef();
  const satellite = useRef();
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    [[-1.28,-1.05],[-.18,1.5],[.18,1.5],[1.28,-1.05],[.54,-1.05],[0,.42],[-.58,-1.05]].forEach(([x,y],i) => i ? shape.lineTo(x,y) : shape.moveTo(x,y));
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, { depth:.24, bevelEnabled:true, bevelThickness:.065, bevelSize:.055, bevelSegments:3, steps:1 });
  }, []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  useFrame(({clock,pointer},delta) => {
    if (!emblem.current || reduced) return;
    const t = clock.getElapsedTime();
    emblem.current.rotation.y = THREE.MathUtils.damp(emblem.current.rotation.y, pointer.x * .28 - .16, 2.5, delta);
    emblem.current.rotation.x = THREE.MathUtils.damp(emblem.current.rotation.x, -pointer.y * .13, 2.5, delta);
    emblem.current.position.y = Math.sin(t * .55) * .06;
    if (satellite.current) { satellite.current.position.x = Math.cos(t * .23) * 1.86; satellite.current.position.y = Math.sin(t * .23) * .7; }
  });
  return <group ref={emblem} rotation={[0,-.16,0]}>
    <mesh geometry={geometry} position={[0,0,-.12]}><meshPhysicalMaterial color="#d6e6f6" metalness={.72} roughness={.25} clearcoat={1} envMapIntensity={1.5}/></mesh>
    <mesh position={[0,-.75,.18]}><coneGeometry args={[.4,.65,3]} /><meshPhysicalMaterial color="#008ee5" metalness={.6} roughness={.18}/></mesh>
    <group rotation={[.75,.3,-.48]}>
      <mesh scale={[1.35,.55,1]}><torusGeometry args={[1.55,.033,16,160]}/><meshStandardMaterial color="#2fcfff" emissive="#008bff" emissiveIntensity={2} metalness={.45} roughness={.18}/></mesh>
      <mesh ref={satellite} position={[-1.6,-.35,.2]}><sphereGeometry args={[.19,32,32]}/><meshPhysicalMaterial color="#007ac9" metalness={.8} roughness={.19}/></mesh>
    </group>
  </group>;
}

export default function OrbitalScene({ reduced = false }) {
  const host = useRef();
  const [visible,setVisible] = useState(false);
  const [supported,setSupported] = useState(false);
  useEffect(() => {
    const c=document.createElement('canvas');
    const context=c.getContext('webgl2');
    setSupported(Boolean(context));
    context?.getExtension('WEBGL_lose_context')?.loseContext();
    const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{rootMargin:'100px'});
    if(host.current)observer.observe(host.current);
    return()=>observer.disconnect();
  },[]);
  const fallback=<img className="orbital-fallback" src="/assets/aven-hero.webp" alt="Símbolo orbital da AVEN Software" width="1122" height="1402"/>;
  return <div className="orbital-scene" ref={host} aria-label="Símbolo da AVEN em três dimensões, com uma órbita em movimento" role="img">
    <div className="orbital-cross cross-one"/><div className="orbital-cross cross-two"/>
    {supported ? <SceneBoundary fallback={fallback}><Canvas camera={{position:[0,0,6],fov:40}} dpr={[1,1.5]} frameloop={visible && !reduced ? 'always':'demand'} gl={{alpha:true,antialias:true,powerPreference:'low-power'}}>
      <ambientLight intensity={1.1}/><directionalLight position={[3,4,4]} intensity={5} color="#eaf4ff"/><directionalLight position={[0,1,6]} intensity={2}/><pointLight position={[-3,-1,2]} intensity={25} color="#00bfff"/>
      <Suspense fallback={null}><Environment resolution={128}><Lightformer intensity={5} position={[0,4,3]} scale={[7,2,1]}/><Lightformer intensity={3} position={[-4,0,2]} rotation={[0,Math.PI/2,0]} scale={[2,8,1]}/><Lightformer intensity={2} color="#247fff" position={[4,0,1]} rotation={[0,-Math.PI/2,0]} scale={[2,6,1]}/></Environment><Emblem reduced={reduced}/></Suspense>
    </Canvas></SceneBoundary> : fallback}
    <span className="scene-caption">AVEN / CONEXÕES EM MOVIMENTO</span>
  </div>;
}
