"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const PLATFORM_COLORS = {
  knowvy: { primary: "#4D8DFF", secondary: "#8B5CF6", emissive: 0x4d8dff },
  unstop: { primary: "#00B4D8", secondary: "#48CAE4", emissive: 0x00b4d8 },
  mlh: { primary: "#FF4757", secondary: "#FF6B81", emissive: 0xff4757 },
  devfolio: { primary: "#3B82F6", secondary: "#60A5FA", emissive: 0x3b82f6 },
  devpost: { primary: "#00E5A3", secondary: "#2DD4BF", emissive: 0x00e5a3 },
};

export default function WebGLCardCanvas({
  platform = "knowvy",
  isHovered = false,
  pointerOffset = { x: 0, y: 0 },
}) {
  const mountRef = useRef(null);
  const stateRef = useRef({
    isHovered,
    pointerOffset,
    targetRotation: { x: 0, y: 0 },
    currentRotation: { x: 0, y: 0 },
    animId: null,
  });

  // Keep stateRef synced with props without restarting Three.js scene
  useEffect(() => {
    stateRef.current.isHovered = isHovered;
    stateRef.current.pointerOffset = pointerOffset;
  }, [isHovered, pointerOffset]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 340;
    const height = container.clientHeight || 200;

    const colors = PLATFORM_COLORS[platform?.toLowerCase()] || PLATFORM_COLORS.knowvy;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Root 3D Object Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Central Floating 3D Geometric Polyhedron
    const coreGeo = new THREE.IcosahedronGeometry(1.15, 1);
    const coreWireMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(colors.primary),
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreWireMat);
    rootGroup.add(coreMesh);

    // 2. Inner Crystal Facet
    const innerGeo = new THREE.OctahedronGeometry(0.7, 0);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(colors.secondary),
      metalness: 0.8,
      roughness: 0.1,
      transmission: 0.9,
      transparent: true,
      opacity: 0.45,
      wireframe: true,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    rootGroup.add(innerMesh);

    // 3. Orbital Energy Ring
    const ringGeo = new THREE.TorusGeometry(1.65, 0.015, 16, 60);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(colors.primary),
      transparent: true,
      opacity: 0.5,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    rootGroup.add(ringMesh);

    // 4. Floating Holographic Cyber Particles
    const particleCount = 65;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const scaleArray = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.4 + Math.random() * 0.9;

      posArray[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      posArray[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      posArray[i * 3 + 2] = r * Math.cos(phi);
      scaleArray[i] = Math.random() * 2 + 1;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    particleGeo.setAttribute("scale", new THREE.BufferAttribute(scaleArray, 1));

    // Particle Material
    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color(colors.primary),
      size: 0.055,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    rootGroup.add(particleSystem);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(new THREE.Color(colors.primary), 2.5, 10);
    pointLight.position.set(2, 2, 3);
    scene.add(pointLight);

    // Dynamic Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      stateRef.current.animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const { isHovered: hovered, pointerOffset: pOffset } = stateRef.current;

      // Base idle rotation
      const speedMult = hovered ? 1.8 : 0.6;
      coreMesh.rotation.y += 0.008 * speedMult;
      coreMesh.rotation.x += 0.004 * speedMult;
      innerMesh.rotation.y -= 0.012 * speedMult;
      innerMesh.rotation.z += 0.006 * speedMult;
      ringMesh.rotation.z += 0.005 * speedMult;
      particleSystem.rotation.y += 0.003 * speedMult;

      // Target rotation responds to cursor position over card
      if (hovered) {
        stateRef.current.targetRotation.x = -pOffset.y * 0.8;
        stateRef.current.targetRotation.y = pOffset.x * 0.8;
        coreWireMat.opacity = THREE.MathUtils.lerp(coreWireMat.opacity, 0.75, 0.08);
        ringMat.opacity = THREE.MathUtils.lerp(ringMat.opacity, 0.9, 0.08);
        rootGroup.scale.lerp(new THREE.Vector3(1.12, 1.12, 1.12), 0.08);
      } else {
        stateRef.current.targetRotation.x = Math.sin(elapsedTime * 0.8) * 0.15;
        stateRef.current.targetRotation.y = Math.cos(elapsedTime * 0.6) * 0.15;
        coreWireMat.opacity = THREE.MathUtils.lerp(coreWireMat.opacity, 0.25, 0.08);
        ringMat.opacity = THREE.MathUtils.lerp(ringMat.opacity, 0.35, 0.08);
        rootGroup.scale.lerp(new THREE.Vector3(0.95, 0.95, 0.95), 0.08);
      }

      // Smooth Spring Lerp for Root Orientation
      stateRef.current.currentRotation.x = THREE.MathUtils.lerp(
        stateRef.current.currentRotation.x,
        stateRef.current.targetRotation.x,
        0.08
      );
      stateRef.current.currentRotation.y = THREE.MathUtils.lerp(
        stateRef.current.currentRotation.y,
        stateRef.current.targetRotation.y,
        0.08
      );

      rootGroup.rotation.x = stateRef.current.currentRotation.x;
      rootGroup.rotation.y = stateRef.current.currentRotation.y;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      if (stateRef.current.animId) {
        cancelAnimationFrame(stateRef.current.animId);
      }
      window.removeEventListener("resize", handleResize);

      coreGeo.dispose();
      coreWireMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [platform]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden mix-blend-screen"
      style={{ opacity: isHovered ? 0.95 : 0.45, transition: "opacity 0.4s ease" }}
    />
  );
}
