"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function seededUnit(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function seededRange(seed: number, min: number, max: number) {
  return min + (max - min) * seededUnit(seed);
}

function ParticleField() {
  const meshRef = useRef<THREE.Points>(null);
  const count = 800;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = seededRange(i * 3 + 1, -10, 10);
      pos[i3 + 1] = seededRange(i * 3 + 2, -5, 5);
      pos[i3 + 2] = seededRange(i * 3 + 3, -5, 5);

      // Mix of green (#00ff88) and cyan (#00cccc) particles
      const isGreen = seededUnit(i * 7 + 11) > 0.4;
      col[i3] = isGreen ? 0 : 0;
      col[i3 + 1] = isGreen ? 1 : 0.8;
      col[i3 + 2] = isGreen ? 0.53 : 0.8;
    }

    return [pos, col];
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function FloatingRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    ringRef.current.rotation.z = state.clock.elapsedTime * 0.15;
    ringRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
  });

  return (
    <mesh ref={ringRef} position={[0, 0, -2]}>
      <torusGeometry args={[2.5, 0.015, 16, 100]} />
      <meshBasicMaterial color="#00ff88" transparent opacity={0.2} />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <div className="three-canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <ParticleField />
        <FloatingRing />
      </Canvas>
    </div>
  );
}
