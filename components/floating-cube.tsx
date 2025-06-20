'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

function AnimatedCube() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[2, 0, 0]}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial 
        color="#ffffff" 
        transparent 
        opacity={0.1}
        wireframe={true}
      />
    </mesh>
  );
}

function AnimatedSphere() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
      meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.8;
      meshRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.4) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[-2, 1, 0]}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial 
        color="#ffffff" 
        transparent 
        opacity={0.08}
        wireframe={true}
      />
    </mesh>
  );
}

export function FloatingCube() {
  return (
    <div className="fixed inset-0 -z-5">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ffffff" />
        <AnimatedCube />
        <AnimatedSphere />
      </Canvas>
    </div>
  );
}