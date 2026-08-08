"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, useTexture } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import {
  useExperience,
  type SpherePhase,
} from "@/components/providers/ExperienceProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const PHASE_CONFIG: Record<
  SpherePhase,
  { scale: number; x: number; opacity: number }
> = {
  intro: { scale: 0.4, x: 0, opacity: 1 },
  hero: { scale: 1, x: 0, opacity: 1 },
  side: { scale: 0.55, x: 1.25, opacity: 0.65 },
  fullscreen: { scale: 1.7, x: 0, opacity: 1 },
  hidden: { scale: 0.15, x: 0, opacity: 0 },
};

const HOTSPOTS = [
  {
    id: "equipment",
    lat: 6.4,
    lon: 2.4,
    color: "#8C8F94",
    href: "#division-equipment",
    label: "Equipment",
  },
  {
    id: "mining",
    lat: 12,
    lon: 8,
    color: "#D4AF37",
    href: "#division-mining",
    label: "Mining",
  },
  {
    id: "agriculture",
    lat: 9.2,
    lon: 2.1,
    color: "#2F4A3B",
    href: "#division-agriculture",
    label: "Agriculture",
  },
  {
    id: "energy",
    lat: 5.6,
    lon: -0.2,
    color: "#2E5C8A",
    href: "#division-energy",
    label: "Energy",
  },
  {
    id: "real-estate",
    lat: 6.5,
    lon: 3.4,
    color: "#A89F8E",
    href: "#division-real-estate",
    label: "Real Estate",
  },
] as const;

function latLonToVec(lat: number, lon: number, r: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

function createVeinTexture(): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 16; i++) {
    ctx.beginPath();
    let x = Math.random() * size;
    let y = Math.random() * size;
    ctx.moveTo(x, y);
    for (let s = 0; s < 12; s++) {
      x += (Math.random() - 0.5) * 80;
      y += (Math.random() - 0.5) * 80;
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = `rgba(212,175,55,${0.35 + Math.random() * 0.5})`;
    ctx.lineWidth = 1 + Math.random() * 2.5;
    ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function Hotspots({ radius, interactive }: { radius: number; interactive: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.children.forEach((child, i) => {
      child.scale.setScalar(1 + Math.sin(t * 2.2 + i) * 0.2);
    });
  });

  return (
    <group ref={group}>
      {HOTSPOTS.map((h) => {
        const pos = latLonToVec(h.lat, h.lon, radius + 0.04);
        return (
          <group key={h.id} position={pos}>
            <mesh>
              <sphereGeometry args={[0.032, 16, 16]} />
              <meshStandardMaterial
                color={h.color}
                emissive={h.color}
                emissiveIntensity={1.1}
                toneMapped={false}
              />
            </mesh>
            {interactive && (
              <Html center distanceFactor={6} zIndexRange={[20, 0]}>
                <a
                  href={h.href}
                  className="earth-hotspot"
                  data-cursor-hover
                  aria-label={h.label}
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector(h.href)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  <span className="earth-hotspot__dot" style={{ background: h.color }} />
                  <span className="earth-hotspot__label">{h.label}</span>
                </a>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

function EarthGlobe({ interactive }: { interactive: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const atmRef = useRef<THREE.Mesh>(null);
  const { phase, mouse } = useExperience();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduced = usePrefersReducedMotion();
  const current = useRef({ scale: 0.4, x: 0, opacity: 1 });
  const [dayMap, specMap] = useTexture([
    "/earth/day.jpg",
    "/earth/specular.jpg",
  ]);

  useEffect(() => {
    dayMap.colorSpace = THREE.SRGBColorSpace;
    dayMap.anisotropy = 8;
  }, [dayMap]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    const mesh = meshRef.current;
    if (!group || !mesh) return;
    const target = PHASE_CONFIG[phase];
    const lerp = 1 - Math.pow(0.001, delta);
    current.current.scale += (target.scale - current.current.scale) * lerp;
    current.current.x += (target.x - current.current.x) * lerp;
    current.current.opacity += (target.opacity - current.current.opacity) * lerp;
    group.position.x = current.current.x;
    group.scale.setScalar(current.current.scale);

    if (!reduced) {
      mesh.rotation.y += delta * 0.06;
      if (atmRef.current) atmRef.current.rotation.y -= delta * 0.02;
    }

    if (isDesktop && !reduced && (phase === "hero" || phase === "intro")) {
      group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, mouse.x * 0.25, 0.045);
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, mouse.y * 0.14, 0.045);
    }

    const mat = mesh.material as THREE.MeshPhysicalMaterial;
    mat.opacity = current.current.opacity;
    mat.transparent = current.current.opacity < 0.99;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.15, 64, 64]} />
        <meshPhysicalMaterial
          map={dayMap}
          roughnessMap={specMap}
          roughness={0.55}
          metalness={0.08}
          clearcoat={0.2}
          clearcoatRoughness={0.5}
          envMapIntensity={0.4}
        />
      </mesh>
      <mesh ref={atmRef} scale={1.065}>
        <sphereGeometry args={[1.15, 32, 32]} />
        <meshBasicMaterial
          color="#6B9AC4"
          transparent
          opacity={0.14}
          side={THREE.BackSide}
        />
      </mesh>
      {/* Soft gold rim from logo palette */}
      <mesh scale={1.09}>
        <sphereGeometry args={[1.15, 32, 32]} />
        <meshBasicMaterial
          color="#D4AF37"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>
      <Hotspots radius={1.15} interactive={interactive} />
    </group>
  );
}

function DarkHeritageSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { phase, mouse } = useExperience();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduced = usePrefersReducedMotion();
  const current = useRef({ scale: 0.4, x: 0, opacity: 1 });
  const veins = useMemo(() => createVeinTexture(), []);

  useEffect(() => () => veins.dispose(), [veins]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    const mesh = meshRef.current;
    if (!group || !mesh) return;
    const target = PHASE_CONFIG[phase];
    const lerp = 1 - Math.pow(0.001, delta);
    current.current.scale += (target.scale - current.current.scale) * lerp;
    current.current.x += (target.x - current.current.x) * lerp;
    current.current.opacity += (target.opacity - current.current.opacity) * lerp;
    group.position.x = current.current.x;
    group.scale.setScalar(current.current.scale);
    if (!reduced) mesh.rotation.y += delta * 0.12;
    if (isDesktop && !reduced && (phase === "hero" || phase === "intro")) {
      group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, mouse.x * 0.18, 0.05);
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, mouse.y * 0.1, 0.05);
    }
    const mat = mesh.material as THREE.MeshPhysicalMaterial;
    mat.opacity = current.current.opacity;
    mat.transparent = current.current.opacity < 0.99;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.15, 64, 64]} />
        <meshPhysicalMaterial
          color="#040404"
          metalness={0.9}
          roughness={0.38}
          emissive="#D4AF37"
          emissiveMap={veins}
          emissiveIntensity={0.55}
          clearcoat={0.3}
          clearcoatRoughness={0.35}
        />
      </mesh>
    </group>
  );
}

function Particles({ density, mode }: { density: number; mode: "dark" | "light" }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { phase } = useExperience();
  const reduced = usePrefersReducedMotion();
  const positions = useMemo(() => {
    const arr = new Float32Array(density * 3);
    for (let i = 0; i < density; i++) {
      const r = 1.5 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [density]);

  useFrame((_, delta) => {
    if (!pointsRef.current || reduced) return;
    pointsRef.current.rotation.y += delta * 0.03;
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    const target = phase === "intro" ? 0.8 : phase === "hero" ? 0.35 : 0.1;
    mat.opacity += (target - mat.opacity) * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={mode === "light" ? "#6B2424" : "#D4AF37"}
        size={0.014}
        transparent
        opacity={0.4}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function CameraRig({ zoomIntro }: { zoomIntro: boolean }) {
  const { camera } = useThree();
  const reduced = usePrefersReducedMotion();
  useFrame((_, delta) => {
    if (reduced) return;
    const targetZ = zoomIntro ? 3.55 : 4.2;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 1 - Math.pow(0.001, delta));
  });
  return null;
}

export function HeritageSphere({ className }: { className?: string }) {
  const isMobile = useMediaQuery("(max-width: 639px)");
  const reduced = usePrefersReducedMotion();
  const { theme } = useTheme();
  const { phase } = useExperience();
  const particleCount = isMobile ? 60 : 180;
  const isLight = theme === "light";

  if (reduced) return null;

  return (
    <div
      className={className}
      aria-hidden={!isLight}
      style={{ pointerEvents: isLight && phase === "hero" ? "auto" : "none" }}
    >
      <Canvas
        dpr={[1, isMobile ? 1.15 : 1.6]}
        camera={{ position: [0, 0, 4.2], fov: 42 }}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <CameraRig zoomIntro={phase === "intro"} />
          <ambientLight intensity={isLight ? 0.55 : 0.12} color="#fff8ee" />
          <directionalLight
            position={[5, 3, 4]}
            intensity={isLight ? 1.7 : 1.35}
            color={isLight ? "#ffe9c8" : "#ffd9a0"}
          />
          <directionalLight position={[-4, -1, -3]} intensity={0.35} color="#5A7A9A" />
          {isLight ? (
            <EarthGlobe interactive={!isMobile && phase === "hero"} />
          ) : (
            <DarkHeritageSphere />
          )}
          <Particles density={particleCount} mode={theme} />
        </Suspense>
      </Canvas>
    </div>
  );
}
