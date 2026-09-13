"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ecosystemNodes } from "@/data/knowvy-data";

export default function EcosystemScene() {
  const mountRef = useRef(null);
  const [activeNode, setActiveNode] = useState(ecosystemNodes[0]);
  const [isHovered, setIsHovered] = useState(false);

  // References to communicate with Three.js loop
  const targetCamPos = useRef(new THREE.Vector3(0, 0, 7.5));
  const activeIndexRef = useRef(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ecosystemGroup = new THREE.Group();
    scene.add(ecosystemGroup);

    // Center KNOWVY Node
    const centerGeo = new THREE.SphereGeometry(0.85, 32, 32);
    const centerMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#2563EB"),
      emissive: new THREE.Color("#1D4ED8"),
      roughness: 0.3,
      metalness: 0.5,
    });
    const centerMesh = new THREE.Mesh(centerGeo, centerMat);
    ecosystemGroup.add(centerMesh);

    // Center Core Glow Ring
    const centerRingGeo = new THREE.TorusGeometry(1.15, 0.02, 16, 100);
    const centerRingMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#3B82F6"),
      transparent: true,
      opacity: 0.6,
    });
    const centerRing = new THREE.Mesh(centerRingGeo, centerRingMat);
    ecosystemGroup.add(centerRing);

    // Surrounding Nodes & Lines
    const nodeMeshes = [];
    const lineMeshes = [];

    ecosystemNodes.forEach((node, idx) => {
      const [x, y, z] = node.position;

      // Node mesh
      const nodeGeo = new THREE.SphereGeometry(0.32, 24, 24);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(node.color),
        emissive: new THREE.Color(node.color).multiplyScalar(0.4),
        roughness: 0.2,
        metalness: 0.7,
        transparent: true,
        opacity: 0.9,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(x, y, z);
      nodeMesh.userData = { index: idx, data: node };
      ecosystemGroup.add(nodeMesh);
      nodeMeshes.push(nodeMesh);

      // Connecting line to center
      const points = [new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, z)];
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(node.color),
        transparent: true,
        opacity: 0.35,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      ecosystemGroup.add(line);
      lineMeshes.push(line);
    });

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x2563eb, 3, 15);
    blueLight.position.set(3, 4, 4);
    scene.add(blueLight);

    const violetLight = new THREE.PointLight(0x7c3aed, 2.5, 15);
    violetLight.position.set(-3, -4, 4);
    scene.add(violetLight);

    // Raycasting for Mouse Hover
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-100, -100);

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    container.addEventListener("pointermove", handlePointerMove);

    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Slow orbital drift
      ecosystemGroup.rotation.y = elapsed * 0.05;
      ecosystemGroup.rotation.x = Math.sin(elapsed * 0.03) * 0.1;

      // Pulse ring
      centerRing.scale.setScalar(1 + Math.sin(elapsed * 2) * 0.04);

      // Camera lerp
      camera.position.lerp(targetCamPos.current, 0.05);

      // Raycast test
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const hitIdx = hit.userData.index;
        if (hitIdx !== undefined && hitIdx !== activeIndexRef.current) {
          activeIndexRef.current = hitIdx;
          setActiveNode(ecosystemNodes[hitIdx]);
          setIsHovered(true);
        }
      }

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
      container.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update target camera position when node changes
  useEffect(() => {
    const [x, y, z] = activeNode.position;
    const focusVec = new THREE.Vector3(x * 0.35, y * 0.35, 7.5);
    targetCamPos.current = focusVec;
  }, [activeNode]);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* Interactive 3D Canvas */}
      <div className="lg:col-span-7 relative h-[420px] sm:h-[500px] lg:h-[560px] rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden flex items-center justify-center">
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Center Label Overlay */}
        <div className="absolute pointer-events-none text-center">
          <span className="text-xs tracking-widest font-mono text-blue-600 uppercase font-bold block mb-0.5">
            Core Node
          </span>
          <span className="text-sm font-display font-extrabold text-slate-900 bg-white/90 px-3 py-1 rounded-full border border-slate-200 shadow-sm">
            KNOWVY
          </span>
        </div>

        {/* Bottom Helper Hint */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs text-slate-500 pointer-events-none">
          <span>Hover nodes to inspect ecosystem tracks</span>
          <span className="text-blue-600 font-medium font-mono">Interactive WebGL</span>
        </div>
      </div>

      {/* Node Inspector Panel */}
      <div className="lg:col-span-5 flex flex-col justify-center space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-600 w-fit">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          {activeNode.category}
        </div>

        <div>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
            {activeNode.title}
          </h3>
          <p className="text-sm font-mono text-violet-600 mt-1 font-medium">
            {activeNode.metrics}
          </p>
        </div>

        <p className="text-slate-600 text-base leading-relaxed">
          {activeNode.description}
        </p>

        {/* Quick Node Selector Pills */}
        <div className="pt-2">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-wider block mb-2 font-semibold">
            Explore All 10 Tracks:
          </span>
          <div className="flex flex-wrap gap-2">
            {ecosystemNodes.map((node) => {
              const isSelected = activeNode.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => {
                    setActiveNode(node);
                    setIsHovered(true);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-500/20"
                      : "bg-white text-slate-700 hover:text-slate-900 border border-slate-200 shadow-sm hover:border-slate-300"
                  }`}
                >
                  {node.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
