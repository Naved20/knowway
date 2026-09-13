"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const STAGES = [
  {
    step: "01",
    title: "Bhopal Genesis",
    label: "Single Hub",
    description: "Founded by student builders in Bhopal to bridge the gap between academic theory and real-world tech.",
    metric: "1 City • 50 Early Builders",
    nodeCount: 8,
    radius: 1.5,
  },
  {
    step: "02",
    title: "College Campus Chapters",
    label: "Collegiate Network",
    description: "Expanding across MANIT, RGPV, LNCT, VIT Bhopal, and collegiate tech clubs with weekly study jams.",
    metric: "15+ Campuses • 400+ Active Students",
    nodeCount: 24,
    radius: 2.8,
  },
  {
    step: "03",
    title: "10+ Central Indian Cities",
    label: "Regional Scale",
    description: "Hosting regional hackathons, hybrid cloud sprints, and mentorship circles across Madhya Pradesh and neighboring states.",
    metric: "10+ Cities • 30+ Tech Sprints",
    nodeCount: 48,
    radius: 3.8,
  },
  {
    step: "04",
    title: "National Student Ecosystem",
    label: "Full Scale",
    description: "A nationwide network of 1,500+ builders, national hackathons, open-source contributors, and industry mentors.",
    metric: "1,500+ Builders • 3 National Hackathons",
    nodeCount: 80,
    radius: 5.0,
  },
];

export default function ImpactScene() {
  const mountRef = useRef(null);
  const [currentStageIndex, setCurrentStageIndex] = useState(3);
  const stage = STAGES[currentStageIndex];

  // References for Three.js
  const activeCountRef = useRef(STAGES[3].nodeCount);
  const activeRadiusRef = useRef(STAGES[3].radius);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    // Max pool of nodes
    const maxNodes = 90;
    const nodeMeshes = [];
    const positions = [];

    const blueMat = new THREE.MeshStandardMaterial({
      color: 0x4d8dff,
      emissive: 0x1d4ed8,
      roughness: 0.2,
      metalness: 0.8,
    });

    const violetMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x6d28d9,
      roughness: 0.2,
      metalness: 0.8,
    });

    for (let i = 0; i < maxNodes; i++) {
      const phi = Math.acos(-1 + (2 * i) / maxNodes);
      const theta = Math.sqrt(maxNodes * Math.PI) * phi;

      // Base unit sphere coordinate
      const ux = Math.cos(theta) * Math.sin(phi);
      const uy = Math.sin(theta) * Math.sin(phi);
      const uz = Math.cos(phi);

      positions.push({ ux, uy, uz });

      const nodeGeo = new THREE.SphereGeometry(i === 0 ? 0.4 : 0.12, 16, 16);
      const mesh = new THREE.Mesh(nodeGeo, i % 2 === 0 ? blueMat : violetMat);
      mesh.position.set(ux * 2, uy * 2, uz * 2);
      mesh.visible = i < activeCountRef.current;
      networkGroup.add(mesh);
      nodeMeshes.push(mesh);
    }

    // Dynamic Connecting Lines
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x4d8dff,
      transparent: true,
      opacity: 0.15,
    });
    let lineSegments;

    const updateLines = (count, radius) => {
      if (lineSegments) networkGroup.remove(lineSegments);

      const linePoints = [];
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const p1 = nodeMeshes[i].position;
          const p2 = nodeMeshes[j].position;
          if (p1.distanceTo(p2) < radius * 0.75) {
            linePoints.push(p1.clone(), p2.clone());
          }
        }
      }

      if (linePoints.length > 0) {
        const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
        lineSegments = new THREE.LineSegments(lineGeo, lineMat);
        networkGroup.add(lineSegments);
      }
    };

    updateLines(activeCountRef.current, activeRadiusRef.current);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    const light1 = new THREE.PointLight(0x4d8dff, 3, 20);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x8b5cf6, 2.5, 20);
    light2.position.set(-5, -5, 5);
    scene.add(light2);

    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      networkGroup.rotation.y = elapsed * 0.08;
      networkGroup.rotation.x = Math.sin(elapsed * 0.05) * 0.15;

      const targetCount = activeCountRef.current;
      const targetRadius = activeRadiusRef.current;

      nodeMeshes.forEach((mesh, idx) => {
        mesh.visible = idx < targetCount;
        if (mesh.visible) {
          const { ux, uy, uz } = positions[idx];
          const targetPos = new THREE.Vector3(
            ux * targetRadius,
            uy * targetRadius,
            uz * targetRadius
          );
          mesh.position.lerp(targetPos, 0.05);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleStageSelect = (idx) => {
    setCurrentStageIndex(idx);
    activeCountRef.current = STAGES[idx].nodeCount;
    activeRadiusRef.current = STAGES[idx].radius;
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* Narrative Progression Column */}
      <div className="lg:col-span-6 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-xs font-mono text-[#8B5CF6]">
          Step {stage.step} — {stage.label}
        </div>

        <div>
          <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            {stage.title}
          </h3>
          <p className="text-base font-mono text-[#4D8DFF] mt-2">
            {stage.metric}
          </p>
        </div>

        <p className="text-[#8B95A5] text-base leading-relaxed">
          {stage.description}
        </p>

        {/* Stage Timeline Selector */}
        <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {STAGES.map((s, idx) => {
            const isSelected = currentStageIndex === idx;
            return (
              <button
                key={s.step}
                onClick={() => handleStageSelect(idx)}
                className={`p-3 rounded-xl text-left border transition-all ${
                  isSelected
                    ? "bg-[#111722] border-[#4D8DFF] text-white shadow-lg shadow-[#4D8DFF]/15"
                    : "bg-[#07090D] border-[#1C2430] text-[#5A6475] hover:text-[#8B95A5]"
                }`}
              >
                <span className="text-xs font-mono block text-[#4D8DFF]">
                  {s.step}
                </span>
                <span className="text-xs font-bold font-display mt-0.5 block truncate">
                  {s.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D Network Sphere Visualizer */}
      <div className="lg:col-span-6 relative h-[420px] sm:h-[480px] rounded-2xl bg-[#0D1118]/60 border border-[#1C2430] overflow-hidden flex items-center justify-center">
        <div ref={mountRef} className="w-full h-full" />
        <div className="absolute top-4 right-4 text-right pointer-events-none">
          <span className="text-[10px] font-mono text-[#5A6475] uppercase block">
            Ecosystem Density
          </span>
          <span className="text-xs font-mono text-[#4D8DFF] font-bold">
            {stage.nodeCount} Active Network Nodes
          </span>
        </div>
      </div>
    </div>
  );
}
