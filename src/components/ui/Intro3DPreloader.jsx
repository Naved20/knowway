"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

export default function Intro3DPreloader() {
  const mountRef = useRef(null);
  const [progress, setProgress] = useState(0);
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
    }, 650);
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
    scene.fog = new THREE.FogExp2(0xf8fafc, 0.035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xf8fafc, 1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // -------------------------------------------------------------
    // 1. INNER CORE: Holographic Knowvy Tiger Mascot + Energy Ring
    // -------------------------------------------------------------
    const innerGroup = new THREE.Group();
    rootGroup.add(innerGroup);

    // Load Tiger Logo Texture
    const textureLoader = new THREE.TextureLoader();
    const tigerTexture = textureLoader.load("/images/knowvy-logo.png");

    // Holographic Tiger Disc
    const emblemGeo = new THREE.PlaneGeometry(2.0, 2.0);
    const emblemMat = new THREE.MeshBasicMaterial({
      map: tigerTexture,
      transparent: true,
      opacity: 0.96,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const emblemMesh = new THREE.Mesh(emblemGeo, emblemMat);
    innerGroup.add(emblemMesh);

    // Glowing Inner Energy Ring around Tiger
    const innerRingGeo = new THREE.RingGeometry(1.05, 1.12, 64);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0x4d8dff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerGroup.add(innerRing);

    // Inner Caustic Glow Core (Glowing Sphere behind Tiger)
    const glowSphereGeo = new THREE.SphereGeometry(0.7, 32, 32);
    const glowSphereMat = new THREE.MeshBasicMaterial({
      color: 0x2563eb,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });
    const glowSphere = new THREE.Mesh(glowSphereGeo, glowSphereMat);
    glowSphere.position.z = -0.15;
    innerGroup.add(glowSphere);

    // -------------------------------------------------------------
    // 2. OUTER STRUCTURE: Quantum Geometric Cage + Orbital Stardust Ring
    // (Completely separated with negative space from inner core)
    // -------------------------------------------------------------
    const outerGroup = new THREE.Group();
    rootGroup.add(outerGroup);

    // Outer Geometric Icosahedron Wireframe Cage (Radius 2.6)
    const cageGeo = new THREE.IcosahedronGeometry(2.6, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    outerGroup.add(cageMesh);

    // Glowing Vertex Points on the Cage
    const vertexPositions = cageGeo.attributes.position.array;
    const vertexCount = vertexPositions.length / 3;
    const vertexPointsGeo = new THREE.BufferGeometry();
    vertexPointsGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(vertexPositions.slice(), 3)
    );
    const vertexPointsMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const vertexPoints = new THREE.Points(vertexPointsGeo, vertexPointsMat);
    outerGroup.add(vertexPoints);

    // Outer Orbital Saturn Stardust Ring (Radius 3.2 to 3.8)
    const ringCount = 500;
    const ringGeo = new THREE.BufferGeometry();
    const ringPositions = new Float32Array(ringCount * 3);

    for (let i = 0; i < ringCount; i++) {
      const r = 3.0 + Math.random() * 0.8;
      const angle = Math.random() * Math.PI * 2;
      ringPositions[i * 3] = Math.cos(angle) * r;
      ringPositions[i * 3 + 1] = (Math.random() - 0.5) * 0.22;
      ringPositions[i * 3 + 2] = Math.sin(angle) * r;
    }
    ringGeo.setAttribute("position", new THREE.BufferAttribute(ringPositions, 3));
    const ringMat = new THREE.PointsMaterial({
      size: 0.038,
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const orbitalRing = new THREE.Points(ringGeo, ringMat);
    orbitalRing.rotation.x = Math.PI / 4.5;
    orbitalRing.rotation.z = Math.PI / 8;
    rootGroup.add(orbitalRing);

    // -------------------------------------------------------------
    // 3. Hyperspace Warp Stars (600 particles streaming forward)
    // -------------------------------------------------------------
    const warpCount = 600;
    const warpGeo = new THREE.BufferGeometry();
    const warpPositions = new Float32Array(warpCount * 3);
    const warpSpeeds = new Float32Array(warpCount);

    for (let i = 0; i < warpCount; i++) {
      warpPositions[i * 3] = (Math.random() - 0.5) * 20;
      warpPositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      warpPositions[i * 3 + 2] = (Math.random() - 0.5) * 25;
      warpSpeeds[i] = 0.08 + Math.random() * 0.12;
    }
    warpGeo.setAttribute("position", new THREE.BufferAttribute(warpPositions, 3));
    const warpMat = new THREE.PointsMaterial({
      size: 0.042,
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const warpParticles = new THREE.Points(warpGeo, warpMat);
    scene.add(warpParticles);

    // -------------------------------------------------------------
    // 4. Dynamic Lighting
    // -------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.2);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x4d8dff, 55, 25);
    blueLight.position.set(3.5, 3.5, 4);
    scene.add(blueLight);

    const violetLight = new THREE.PointLight(0x8b5cf6, 45, 25);
    violetLight.position.set(-3.5, -3.5, 3);
    scene.add(violetLight);

    // Mouse Interaction
    let targetRotX = 0;
    let targetRotY = 0;
    const handleMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotY = nx * 0.3;
      targetRotX = -ny * 0.25;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

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

      // Smooth progress acceleration from 0 to 100 in ~2 seconds
      if (currentProgress < 100) {
        const step = Math.min(2.4, (100 - currentProgress) * 0.08 + 0.7);
        currentProgress = Math.min(100, currentProgress + step);
        setProgress(Math.floor(currentProgress));
      } else if (!isFinishedRef.current) {
        handleFinish();
      }

      const pRatio = currentProgress / 100;

      // Mouse Look Parallax
      rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.06;
      rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.06;

      // 1. INNER TIGER: Gentle floating breathing & slight oscillation
      const breathe = Math.sin(elapsed * 3) * 0.04;
      const innerScale = 1.0 + breathe + pRatio * 0.15;
      innerGroup.scale.set(innerScale, innerScale, innerScale);
      emblemMesh.rotation.z = Math.sin(elapsed * 1.5) * 0.03;
      innerRing.rotation.z = -elapsed * 0.6;

      // 2. OUTER QUANTUM CAGE: Independent counter-rotation
      outerGroup.rotation.y += 0.009;
      outerGroup.rotation.x = Math.sin(elapsed * 0.5) * 0.1;
      outerGroup.rotation.z -= 0.005;

      // 3. OUTER SATURN RING: Orbiting
      orbitalRing.rotation.y += 0.012;

      // 4. HYPERSPACE WARP: Stars streaming toward camera
      const posArray = warpGeo.attributes.position.array;
      for (let i = 0; i < warpCount; i++) {
        const speed = warpSpeeds[i] * (1.0 + pRatio * 1.5);
        posArray[i * 3 + 2] += speed;
        if (posArray[i * 3 + 2] > 7.5) {
          posArray[i * 3 + 2] = -18;
          posArray[i * 3] = (Math.random() - 0.5) * 20;
          posArray[i * 3 + 1] = (Math.random() - 0.5) * 20;
        }
      }
      warpGeo.attributes.position.needsUpdate = true;

      // Outro Zoom Effect: Push camera through tiger emblem at 100%
      if (isFinishedRef.current) {
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, 2.0, 0.12);
        outerGroup.scale.lerp(new THREE.Vector3(3.2, 3.2, 3.2), 0.08);
        orbitalRing.scale.lerp(new THREE.Vector3(3.5, 3.5, 3.5), 0.08);
        innerGroup.scale.lerp(new THREE.Vector3(2.5, 2.5, 2.5), 0.1);
        emblemMat.opacity = THREE.MathUtils.lerp(emblemMat.opacity, 0, 0.1);
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
      emblemGeo.dispose();
      emblemMat.dispose();
      innerRingGeo.dispose();
      innerRingMat.dispose();
      glowSphereGeo.dispose();
      glowSphereMat.dispose();
      cageGeo.dispose();
      cageMat.dispose();
      vertexPointsGeo.dispose();
      vertexPointsMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      warpGeo.dispose();
      warpMat.dispose();
      tigerTexture.dispose();
    };
  }, [isCompleted, handleFinish]);

  if (isCompleted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-10 select-none transition-all duration-700 pointer-events-auto ${
        isExiting
          ? "opacity-0 scale-105 pointer-events-none backdrop-blur-2xl"
          : "opacity-100 scale-100 bg-[#F8FAFC]"
      }`}
      style={{ willChange: "opacity, transform" }}
    >
      {/* 3D WebGL Canvas Mount */}
      <div ref={mountRef} className="absolute inset-0 z-0 overflow-hidden" />

      {/* Subtle Background Radial Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.06)_0%,transparent_70%)]" />

      {/* Top Bar: Minimal Discreet Skip Button */}
      <div className="relative z-10 w-full max-w-6xl flex items-center justify-end">
        <button
          onClick={handleFinish}
          className="px-3.5 py-1.5 rounded-full border border-slate-200 bg-white/80 hover:bg-white text-slate-600 hover:text-slate-900 transition-all text-xs font-mono flex items-center gap-2 cursor-pointer backdrop-blur-md shadow-xs"
        >
          <span>SKIP</span>
          <kbd className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] text-blue-600 font-semibold">
            ESC
          </kbd>
        </button>
      </div>

      {/* Center: Clean & Unobstructed 3D Canvas View (Tiger Mascot is in 3D WebGL) */}
      <div className="relative z-10 pointer-events-none my-auto" />

      {/* Bottom Bar: Ultra-Clean Minimal Brand & Progress Counter (NO TEXT CLUTTER) */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center gap-3 pb-4">
        {/* Brand & Counter Row */}
        <div className="w-full flex items-baseline justify-between px-1">
          <span className="text-xl sm:text-2xl font-display font-black tracking-widest text-slate-900">
            KNOWVY
          </span>
          <div className="flex items-baseline gap-0.5 font-mono text-blue-600">
            <span className="text-2xl sm:text-3xl font-display font-black text-slate-900">
              {String(progress).padStart(2, "0")}
            </span>
            <span className="text-xs font-bold">%</span>
          </div>
        </div>

        {/* Minimal High-Precision Glowing Laser Line */}
        <div className="relative w-full h-[3px] rounded-full bg-slate-200 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 transition-all duration-75 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
