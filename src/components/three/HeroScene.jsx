"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const NODE_LABELS = [
  "Hackathons",
  "Workshops",
  "Open Source",
  "Meetups",
  "Career",
  "Mentorship",
  "Startups",
  "Developers",
];

export default function HeroScene() {
  const mountRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 600;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Central Core Object (Futuristic dark metallic wireframe + inner glass sphere)
    const coreGroup = new THREE.Group();
    rootGroup.add(coreGroup);

    // Inner glowing sphere
    const innerGeo = new THREE.IcosahedronGeometry(1.6, 3);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#0D1424"),
      roughness: 0.15,
      metalness: 0.9,
      reflectivity: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // Outer wireframe shell
    const outerGeo = new THREE.IcosahedronGeometry(2.0, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#4D8DFF"),
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const outerMesh = new THREE.Mesh(outerGeo, wireMat);
    coreGroup.add(outerMesh);

    // Orbital Rings
    const ringGeo1 = new THREE.TorusGeometry(2.6, 0.015, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#4D8DFF"),
      transparent: true,
      opacity: 0.4,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(3.0, 0.015, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#8B5CF6"),
      transparent: true,
      opacity: 0.35,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    coreGroup.add(ring2);

    // Floating Orbital Nodes
    const nodesGroup = new THREE.Group();
    rootGroup.add(nodesGroup);

    const nodeSpheres = [];
    const nodeCount = NODE_LABELS.length;
    const orbitalRadius = 3.6;

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const yOffset = (i % 2 === 0 ? 0.6 : -0.6) * Math.sin(i);
      const x = Math.cos(angle) * orbitalRadius;
      const z = Math.sin(angle) * orbitalRadius;
      const y = yOffset;

      const nodeGeo = new THREE.SphereGeometry(0.18, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? new THREE.Color("#4D8DFF") : new THREE.Color("#8B5CF6"),
        emissive: i % 2 === 0 ? new THREE.Color("#1B3A7A") : new THREE.Color("#3A1A6E"),
        roughness: 0.2,
        metalness: 0.8,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(x, y, z);
      nodeMesh.userData = { id: i, label: NODE_LABELS[i], baseScale: 1 };
      nodesGroup.add(nodeMesh);
      nodeSpheres.push(nodeMesh);

      // Connecting line to center
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(x, y, z),
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? new THREE.Color("#4D8DFF") : new THREE.Color("#8B5CF6"),
        transparent: true,
        opacity: 0.15,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      nodesGroup.add(line);
    }

    // Starfield / Particle Cloud
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const blueColor = new THREE.Color("#4D8DFF");
    const violetColor = new THREE.Color("#8B5CF6");

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 16;
      positions[i + 1] = (Math.random() - 0.5) * 16;
      positions[i + 2] = (Math.random() - 0.5) * 12;

      const c = Math.random() > 0.5 ? blueColor : violetColor;
      particleColors[i] = c.r;
      particleColors[i + 1] = c.g;
      particleColors[i + 2] = c.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Subtle Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const bluePointLight = new THREE.PointLight(0x4d8dff, 3, 20);
    bluePointLight.position.set(4, 3, 5);
    scene.add(bluePointLight);

    const violetPointLight = new THREE.PointLight(0x8b5cf6, 2.5, 20);
    violetPointLight.position.set(-4, -3, 3);
    scene.add(violetPointLight);

    // Mouse Tracking (Subtle parallax)
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouse.targetX = x * 0.8;
      mouse.targetY = y * 0.8;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Slow autonomous rotation + mouse offset
      coreGroup.rotation.y = elapsedTime * 0.18 + mouse.x * 0.5;
      coreGroup.rotation.x = Math.sin(elapsedTime * 0.1) * 0.15 - mouse.y * 0.5;

      ring1.rotation.z = elapsedTime * 0.2;
      ring2.rotation.z = -elapsedTime * 0.15;

      nodesGroup.rotation.y = elapsedTime * 0.12;

      // Gentle floating motion
      rootGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.12;

      // Slowly rotate particle field
      particles.rotation.y = -elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[480px] lg:min-h-[580px] flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full absolute inset-0 z-0 pointer-events-none" />

      {/* Floating Interactive Tag Indicators */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="relative w-full max-w-lg h-80">
          <div className="absolute top-4 left-6 px-3 py-1 bg-[#111722]/80 border border-[#1C2430] rounded-full text-xs font-medium text-[#4D8DFF] backdrop-blur-md animate-pulse">
            ⚡ 1,500+ Active Builders
          </div>
          <div className="absolute bottom-6 right-8 px-3 py-1 bg-[#111722]/80 border border-[#1C2430] rounded-full text-xs font-medium text-[#8B5CF6] backdrop-blur-md">
            🌐 Bhopal → National Ecosystem
          </div>
        </div>
      </div>
    </div>
  );
}
