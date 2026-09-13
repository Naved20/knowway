"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function EventsAmbientCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Dynamic Particle Galaxy (300 floating cyber dust particles)
    const count = 280;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const baseColor1 = new THREE.Color("#4D8DFF");
    const baseColor2 = new THREE.Color("#8B5CF6");
    const baseColor3 = new THREE.Color("#00E5A3");

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const mixed =
        i % 3 === 0 ? baseColor1 : i % 3 === 1 ? baseColor2 : baseColor3;
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Subtle 3D Wireframe Depth Spheres floating in space
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    const sGeo = new THREE.IcosahedronGeometry(3.5, 1);
    const sMat = new THREE.MeshBasicMaterial({
      color: 0x4d8dff,
      wireframe: true,
      transparent: true,
      opacity: 0.04,
    });
    const sMesh = new THREE.Mesh(sGeo, sMat);
    sMesh.position.set(-10, 4, -5);
    sphereGroup.add(sMesh);

    const sMesh2 = new THREE.Mesh(sGeo, sMat);
    sMesh2.position.set(12, -6, -8);
    sMesh2.scale.set(1.4, 1.4, 1.4);
    sphereGroup.add(sMesh2);

    // Mouse Tracking for Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Slow orbital drift
      particles.rotation.y = elapsed * 0.02;
      particles.rotation.x = elapsed * 0.01;

      sphereGroup.rotation.y = elapsed * 0.015;
      sphereGroup.rotation.z = elapsed * 0.008;

      // Parallax camera lerp
      targetX = mouseX * 1.5;
      targetY = mouseY * 1.5;

      camera.position.x += (targetX - camera.position.x) * 0.03;
      camera.position.y += (targetY - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      geometry.dispose();
      material.dispose();
      sGeo.dispose();
      sMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60"
      aria-hidden="true"
    />
  );
}
