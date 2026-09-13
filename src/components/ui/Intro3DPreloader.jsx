"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

const TELEMETRY_STAGES = [
  { at: 0, text: "INITIALIZING KNOWVY ECOSYSTEM CORE..." },
  { at: 22, text: "CALIBRATING 7 BUILDER NODES [BHOPAL NEXUS]..." },
  { at: 50, text: "SYNCHRONIZING AZURE & MLSA CLOUD PIPELINES..." },
  { at: 75, text: "ENGAGING SPATIAL CONTINUUM & WEBGL ENGINE..." },
  { at: 92, text: "QUANTUM HORIZON READY // LAUNCHING KNOWVY" },
];

export default function Intro3DPreloader() {
  const mountRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState(TELEMETRY_STAGES[0].text);
  const [isExiting, setIsExiting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const animationFrameRef = useRef(null);
  const isFinishedRef = useRef(false);

  const handleFinish = useCallback(() => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;
    setIsExiting(true);
    try {
      sessionStorage.setItem("knowvy_intro_seen", "true");
    } catch {
      // ignore
    }
    setTimeout(() => {
      setIsCompleted(true);
    }, 700);
  }, []);

  // Keyboard shortcut (ESC or Space) to skip
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.code === "Space") {
        e.preventDefault();
        handleFinish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleFinish]);

  // Session check - play on initial mount, skip if already seen in current tab session
  useEffect(() => {
    try {
      if (sessionStorage.getItem("knowvy_intro_seen")) {
        setIsCompleted(true);
      }
    } catch {
      // ignore
    }
  }, []);

  // Three.js 3D WebGL Scene Setup
  useEffect(() => {
    if (isCompleted) return;

    const container = mountRef.current;
    if (!container) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070a, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x05070a, 1);
    container.appendChild(renderer.domElement);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Central Crystalline Knowvy Core (Icosahedron + Octahedron)
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 0);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x4d8dff,
      emissive: 0x1d3f8a,
      emissiveIntensity: 0.8,
      metalness: 0.9,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      wireframe: false,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);

    // Inner glowing core
    const innerGeo = new THREE.OctahedronGeometry(0.65, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    rootGroup.add(innerMesh);

    // 2. Gyroscopic Outer Gimbal Rings
    const ringGeo1 = new THREE.TorusGeometry(2.0, 0.022, 16, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x4c1d95,
      metalness: 0.8,
      roughness: 0.2,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    rootGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.4, 0.018, 16, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x075985,
      metalness: 0.8,
      roughness: 0.2,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = Math.PI / 3;
    rootGroup.add(ring2);

    const ringGeo3 = new THREE.TorusGeometry(2.7, 0.012, 16, 100);
    const ringMat3 = new THREE.MeshBasicMaterial({
      color: 0x4d8dff,
      wireframe: true,
    });
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.y = Math.PI / 4;
    rootGroup.add(ring3);

    // 3. Converging Particle Vortex (800 particles streaming inward)
    const particleCount = 800;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 3.5 + Math.random() * 8.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // inward velocity vector
      velocities[i * 3] = -x / radius;
      velocities[i * 3 + 1] = -y / radius;
      velocities[i * 3 + 2] = -z / radius;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.2);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x4d8dff, 50, 20);
    blueLight.position.set(4, 4, 4);
    scene.add(blueLight);

    const violetLight = new THREE.PointLight(0x8b5cf6, 40, 20);
    violetLight.position.set(-4, -4, 3);
    scene.add(violetLight);

    // Mouse Interaction
    let targetRotX = 0;
    let targetRotY = 0;
    const handleMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotY = nx * 0.35;
      targetRotX = -ny * 0.35;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Resize
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let currentProgress = 0;

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      // Simulated realistic loading acceleration (0 to 100 in ~2.2s)
      if (currentProgress < 100) {
        const step = Math.min(2.2, (100 - currentProgress) * 0.07 + 0.6);
        currentProgress = Math.min(100, currentProgress + step);
        setProgress(Math.floor(currentProgress));

        // Update telemetry status string
        for (let i = TELEMETRY_STAGES.length - 1; i >= 0; i--) {
          if (currentProgress >= TELEMETRY_STAGES[i].at) {
            setStatusText(TELEMETRY_STAGES[i].text);
            break;
          }
        }
      } else if (!isFinishedRef.current) {
        // Trigger exit once 100 is reached
        handleFinish();
      }

      // Smooth mouse follow
      rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.06;
      rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.06;

      // Rotate Crystalline Core
      coreMesh.rotation.y += 0.015;
      coreMesh.rotation.x += 0.008;

      innerMesh.rotation.y -= 0.025;
      innerMesh.rotation.z += 0.015;

      // Rotate Gimbal Rings
      ring1.rotation.z += 0.012;
      ring1.rotation.y += 0.008;

      ring2.rotation.x += 0.014;
      ring2.rotation.z -= 0.01;

      ring3.rotation.y -= 0.018;

      // Pulse Core scale based on progress
      const pRatio = currentProgress / 100;
      const breathe = Math.sin(elapsed * 4) * 0.06;
      const baseScale = 0.8 + pRatio * 0.4 + breathe;
      coreMesh.scale.set(baseScale, baseScale, baseScale);

      // Particle Vortex inward flight
      const posAttr = particleGeo.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        const speed = 0.08 + pRatio * 0.12;
        posAttr.array[i * 3] += velocities[i * 3] * speed;
        posAttr.array[i * 3 + 1] += velocities[i * 3 + 1] * speed;
        posAttr.array[i * 3 + 2] += velocities[i * 3 + 2] * speed;

        // Reset if reached inner threshold
        const distSq =
          posAttr.array[i * 3] ** 2 +
          posAttr.array[i * 3 + 1] ** 2 +
          posAttr.array[i * 3 + 2] ** 2;

        if (distSq < 0.6) {
          const r = 4.0 + Math.random() * 5.0;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);
          posAttr.array[i * 3] = r * Math.sin(phi) * Math.cos(theta);
          posAttr.array[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
          posAttr.array[i * 3 + 2] = r * Math.cos(phi);
        }
      }
      posAttr.needsUpdate = true;

      // Outro Shockwave: Zoom camera forward into core when finishing
      if (isFinishedRef.current) {
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 1.8, 0.12);
        coreMesh.scale.lerp(new THREE.Vector3(4, 4, 4), 0.1);
        particleMat.opacity = THREE.MathUtils.lerp(particleMat.opacity, 0, 0.15);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      ringGeo3.dispose();
      ringMat3.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [isCompleted, handleFinish]);

  if (isCompleted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-10 select-none transition-all duration-700 pointer-events-auto ${
        isExiting
          ? "opacity-0 scale-105 pointer-events-none backdrop-blur-xl"
          : "opacity-100 scale-100 bg-[#05070a]"
      }`}
      style={{ willChange: "opacity, transform" }}
    >
      {/* 3D WebGL Canvas Mount */}
      <div ref={mountRef} className="absolute inset-0 z-0 overflow-hidden" />

      {/* Top Telemetry Header */}
      <div className="relative z-10 w-full max-w-6xl flex items-center justify-between text-xs font-mono text-[#8B95A5]">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#4D8DFF] animate-ping" />
          <span className="tracking-widest uppercase text-white font-bold">
            KNOWVY // 3D INTRO
          </span>
          <span className="hidden sm:inline text-[#5A6475]">
            [CENTRAL INDIA TECH ECOSYSTEM]
          </span>
        </div>

        <button
          onClick={handleFinish}
          className="px-3 py-1.5 rounded-lg border border-[#1C2430] bg-[#0D1118]/80 hover:bg-[#4D8DFF]/20 hover:border-[#4D8DFF]/50 text-[#8B95A5] hover:text-white transition-all text-[11px] font-mono flex items-center gap-2 group cursor-pointer"
        >
          <span>SKIP INTRO</span>
          <kbd className="px-1.5 py-0.5 rounded bg-black/40 border border-[#2C3A4E] text-[10px] text-[#4D8DFF] group-hover:border-[#4D8DFF]">
            ESC
          </kbd>
        </button>
      </div>

      {/* Center Cinematic Brand Watermark & Dynamic Crosshairs */}
      <div className="relative z-10 pointer-events-none flex flex-col items-center text-center my-auto">
        <div className="inline-block mb-3 px-3 py-1 rounded-full border border-[#4D8DFF]/30 bg-[#4D8DFF]/10 text-[#4D8DFF] font-mono text-[10px] tracking-widest uppercase animate-pulse">
          Quantum Gyroscope Initialized
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-[#4D8DFF]/70 drop-shadow-2xl">
          KNOWVY
        </h1>
        <p className="text-xs sm:text-sm font-mono text-[#8B95A5] tracking-widest mt-2">
          WHERE STUDENTS BUILD WHAT&apos;S NEXT
        </p>
      </div>

      {/* Bottom Telemetry HUD & Progress Bar */}
      <div className="relative z-10 w-full max-w-3xl flex flex-col gap-3">
        {/* Progress Counter & Live Status */}
        <div className="flex items-end justify-between font-mono">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] tracking-wider text-[#5A6475] uppercase">
              System Telemetry
            </span>
            <span className="text-xs sm:text-sm text-[#4D8DFF] font-semibold flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4D8DFF] animate-pulse" />
              {statusText}
            </span>
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl font-display font-black text-white">
              {String(progress).padStart(2, "0")}
            </span>
            <span className="text-sm font-mono text-[#4D8DFF] font-bold">%</span>
          </div>
        </div>

        {/* High-Tech Glowing Laser Progress Bar */}
        <div className="relative w-full h-1.5 rounded-full bg-[#111722] overflow-hidden border border-[#1C2430]">
          <div
            className="h-full bg-gradient-to-r from-[#4D8DFF] via-[#38BDF8] to-[#8B5CF6] transition-all duration-100 ease-out shadow-[0_0_12px_#4D8DFF]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Sub-telemetry footnotes */}
        <div className="flex items-center justify-between text-[10px] font-mono text-[#5A6475] pt-1">
          <span>LAT: 23.2599° N • LON: 77.4126° E [BHOPAL]</span>
          <span className="hidden sm:inline">NODES: 7 CORE MODULES ACTIVE</span>
          <span>FPS: 60/120 SYNC</span>
        </div>
      </div>
    </div>
  );
}
