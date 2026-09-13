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
      color: new THREE.Color("#111722"),
      emissive: new THREE.Color("#1E293B"),
      roughness: 0.2,
      metalness: 0.85,
    });
    const centerMesh = new THREE.Mesh(centerGeo, centerMat);
    ecosystemGroup.add(centerMesh);

    // Center Core Glow Ring
    const centerRingGeo = new THREE.TorusGeometry(1.15, 0.02, 16, 100);
    const centerRingMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#4D8DFF"),
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
        opacity: 0.25,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      ecosystemGroup.add(line);
      lineMeshes.push(line);
    });

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x4d8dff, 4, 15);
    blueLight.position.set(3, 4, 4);
    scene.add(blueLight);

    const violetLight = new THREE.PointLight(0x8b5cf6, 3, 15);
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

    container.addEventListener("mousemove", handlePointerMove);

    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Slow idle group rotation if not hovering
      if (!isHovered) {
        ecosystemGroup.rotation.y = elapsedTime * 0.1;
      }

      centerRing.rotation.z = elapsedTime * 0.25;
      centerRing.rotation.x = Math.PI / 4 + Math.sin(elapsedTime * 0.5) * 0.1;

      // Raycast check
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const hitIdx = hit.userData.index;
        activeIndexRef.current = hitIdx;
        setActiveNode(hit.userData.data);
        setIsHovered(true);

        // Subtly position target camera toward node
        const nodeWorldPos = new THREE.Vector3();
        hit.getWorldPosition(nodeWorldPos);
        targetCamPos.current.set(
          nodeWorldPos.x * 0.3,
          nodeWorldPos.y * 0.3,
          6.5
        );
      } else if (!isHovered) {
        targetCamPos.current.set(0, 0, 7.5);
      }

      // Smooth camera interpolation
      camera.position.lerp(targetCamPos.current, 0.05);

      // Node highlights & scaling
      nodeMeshes.forEach((mesh, idx) => {
        const isCurrent = idx === activeIndexRef.current;
        const targetScale = isCurrent ? 1.35 : 0.9;
        mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

        const targetOpacity = isCurrent ? 1.0 : (isHovered ? 0.35 : 0.85);
        mesh.material.opacity = THREE.MathUtils.lerp(mesh.material.opacity, targetOpacity, 0.1);

        const line = lineMeshes[idx];
        const lineTargetOpacity = isCurrent ? 0.8 : (isHovered ? 0.1 : 0.25);
        line.material.opacity = THREE.MathUtils.lerp(line.material.opacity, lineTargetOpacity, 0.1);
      });

      renderer.render(scene, camera);
    };

    animate();

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
      container.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isHovered]);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* Interactive 3D Canvas */}
      <div className="lg:col-span-7 relative h-[420px] sm:h-[500px] lg:h-[560px] rounded-2xl bg-[#0D1118]/60 border border-[#1C2430] overflow-hidden flex items-center justify-center">
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Center Label Overlay */}
        <div className="absolute pointer-events-none text-center">
          <span className="text-xs tracking-widest font-mono text-[#4D8DFF] uppercase font-bold block mb-0.5">
            Core Node
          </span>
          <span className="text-sm font-display font-extrabold text-white bg-[#07090D]/80 px-3 py-1 rounded-full border border-[#1C2430]">
            KNOWVY
          </span>
        </div>

        {/* Bottom Helper Hint */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs text-[#8B95A5] pointer-events-none">
          <span>Hover nodes to inspect ecosystem tracks</span>
          <span className="text-[#4D8DFF] font-medium font-mono">Interactive WebGL</span>
        </div>
      </div>

      {/* Node Inspector Panel */}
      <div className="lg:col-span-5 flex flex-col justify-center space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4D8DFF]/10 border border-[#4D8DFF]/30 text-xs font-mono text-[#4D8DFF] w-fit">
          <span className="w-2 h-2 rounded-full bg-[#4D8DFF] animate-pulse" />
          {activeNode.category}
        </div>

        <div>
          <h3 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
            {activeNode.title}
          </h3>
          <p className="text-sm font-mono text-[#8B5CF6] mt-1">
            {activeNode.metrics}
          </p>
        </div>

        <p className="text-[#8B95A5] text-base leading-relaxed">
          {activeNode.description}
        </p>

        {/* Quick Node Selector Pills */}
        <div className="pt-2">
          <span className="text-xs font-mono text-[#5A6475] uppercase tracking-wider block mb-2">
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
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    isSelected
                      ? "bg-[#4D8DFF] text-white font-bold shadow-md shadow-[#4D8DFF]/20"
                      : "bg-[#111722] text-[#8B95A5] hover:text-white border border-[#1C2430]"
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
