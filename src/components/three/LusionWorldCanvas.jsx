"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { useTheme } from "@/components/providers/ThemeProvider";

// The 7 Core Developer Tracks of the Knowvy Ecosystem
export const LUSION_TRACKS = [
  {
    id: "hackathons",
    title: "Hackathons",
    tag: "Competitive Sprints",
    color: "#4D8DFF",
    pos: [2.6, 1.2, 0.4],
    metric: "3 National Editions • 1,200+ Projects",
    desc: "36h flagship hackathons where student teams build real-world software.",
  },
  {
    id: "opensource",
    title: "Open Source",
    tag: "Global Contributions",
    color: "#38BDF8",
    pos: [-2.4, 1.4, -0.6],
    metric: "150+ PRs Merged • Production Repos",
    desc: "Structured pipelines for students to make first production open-source PRs.",
  },
  {
    id: "workshops",
    title: "Workshops",
    tag: "Cloud & AI Labs",
    color: "#8B5CF6",
    pos: [2.2, -1.5, 0.8],
    metric: "30+ Hands-on Bootcamps Hosted",
    desc: "Hands-on masterclasses with Azure Tech Group Bhopal and MLSA network.",
  },
  {
    id: "community",
    title: "Community",
    tag: "Central India Nexus",
    color: "#10B981",
    pos: [-2.3, -1.2, -0.7],
    metric: "1,500+ Active Builders in Bhopal",
    desc: "The 24/7 collaborative peer developer community across campuses.",
  },
  {
    id: "career",
    title: "Career",
    tag: "Industry Pathways",
    color: "#6366F1",
    pos: [0.4, 2.5, 0.5],
    metric: "85+ Internship Placements",
    desc: "Mock interviews, resume teardowns, and referrals to fast-growing startups.",
  },
  {
    id: "startups",
    title: "Startups",
    tag: "Founder Incubation",
    color: "#F59E0B",
    pos: [-2.5, 0.2, 1.4],
    metric: "6 Student Startups Incubated",
    desc: "Taking weekend hackathon prototypes into revenue-generating ventures.",
  },
  {
    id: "mentorship",
    title: "Mentorship",
    tag: "1-on-1 Guidance",
    color: "#A855F7",
    pos: [0.2, -2.4, -0.5],
    metric: "500+ Sessions Completed",
    desc: "Direct access to senior software engineers and Microsoft Student Ambassadors.",
  },
];

// Camera Keyframes for the 6 Scroll Acts
const CAMERA_KEYFRAMES = [
  // Act 1: Hero Orbit
  { scroll: 0.0, camPos: [0, 0, 7.5], target: [0, 0, 0], fov: 45, dispersion: 0.85, cageOpen: 0 },
  // Act 2: Core Dissection / Pillars
  { scroll: 0.2, camPos: [0, 0.4, 4.2], target: [0, 0, 0], fov: 42, dispersion: 1.05, cageOpen: 0.8 },
  // Act 3: Ecosystem Constellation
  { scroll: 0.42, camPos: [3.2, 1.0, 5.8], target: [0.4, 0, 0], fov: 46, dispersion: 1.5, cageOpen: 1.0 },
  // Act 4: Events Focus
  { scroll: 0.65, camPos: [-2.6, -0.6, 4.8], target: [-0.8, 0, 0], fov: 44, dispersion: 1.3, cageOpen: 0.5 },
  // Act 5: Impact Galaxy
  { scroll: 0.84, camPos: [0, 1.8, 9.2], target: [0, 0, 0], fov: 50, dispersion: 2.2, cageOpen: 1.0 },
  // Act 6: Final Horizon
  { scroll: 1.0, camPos: [0, -2.2, 5.6], target: [0, 0.8, 0], fov: 46, dispersion: 1.4, cageOpen: 0.2 },
];

function interpolateKeyframes(scrollProgress) {
  const p = Math.max(0, Math.min(1, scrollProgress));
  let idx = 0;
  for (let i = 0; i < CAMERA_KEYFRAMES.length - 1; i++) {
    if (p >= CAMERA_KEYFRAMES[i].scroll && p <= CAMERA_KEYFRAMES[i + 1].scroll) {
      idx = i;
      break;
    }
  }

  const k1 = CAMERA_KEYFRAMES[idx];
  const k2 = CAMERA_KEYFRAMES[idx + 1] || k1;
  const range = (k2.scroll - k1.scroll) || 1;
  const tRaw = (p - k1.scroll) / range;
  // Smooth Hermite interpolation (smoothstep)
  const t = tRaw * tRaw * (3 - 2 * tRaw);

  const camPos = [
    k1.camPos[0] + (k2.camPos[0] - k1.camPos[0]) * t,
    k1.camPos[1] + (k2.camPos[1] - k1.camPos[1]) * t,
    k1.camPos[2] + (k2.camPos[2] - k1.camPos[2]) * t,
  ];

  const target = [
    k1.target[0] + (k2.target[0] - k1.target[0]) * t,
    k1.target[1] + (k2.target[1] - k1.target[1]) * t,
    k1.target[2] + (k2.target[2] - k1.target[2]) * t,
  ];

  const fov = k1.fov + (k2.fov - k1.fov) * t;
  const dispersion = k1.dispersion + (k2.dispersion - k1.dispersion) * t;
  const cageOpen = k1.cageOpen + (k2.cageOpen - k1.cageOpen) * t;

  return { camPos, target, fov, dispersion, cageOpen };
}

export default function LusionWorldCanvas({ activeTrackId, onSelectTrack }) {
  const mountRef = useRef(null);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [hoveredTrack, setHoveredTrack] = useState(null);
  const { theme } = useTheme();
  const isLight = theme === "light";

  // Global scroll listener for continuous choreography
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      scrollRef.current = Math.max(0, Math.min(1, progress));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    const fogColor = isLight ? 0xf8fafc : 0x07090d;
    scene.fog = new THREE.FogExp2(fogColor, 0.038);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isLight ? 1.05 : 1.2;
    container.appendChild(renderer.domElement);

    // Root World Group
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // -------------------------------------------------------------
    // 1. Central Monolithic Knowvy Obsidian Glass Core
    // -------------------------------------------------------------
    const coreGroup = new THREE.Group();
    worldGroup.add(coreGroup);

    // Inner Glowing Seed
    const seedGeo = new THREE.IcosahedronGeometry(0.85, 2);
    const seedMat = new THREE.MeshBasicMaterial({
      color: 0x4d8dff,
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.5 : 0.35,
    });
    const seedMesh = new THREE.Mesh(seedGeo, seedMat);
    coreGroup.add(seedMesh);

    // Physical Glass Shell
    const glassGeo = new THREE.IcosahedronGeometry(1.5, 3);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: isLight ? 0xe2e8f0 : 0x0a101d,
      emissive: isLight ? 0x1e293b : 0x050c18,
      roughness: 0.12,
      metalness: isLight ? 0.7 : 0.88,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      transparent: true,
      opacity: isLight ? 0.88 : 0.92,
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    coreGroup.add(glassMesh);

    // Unfolding Outer Lattice Cage
    const cageGeo = new THREE.IcosahedronGeometry(1.95, 1);
    const cageMat = new THREE.MeshStandardMaterial({
      color: isLight ? 0x94a3b8 : 0x1c2430,
      emissive: isLight ? 0x334155 : 0x0d1424,
      wireframe: true,
      roughness: 0.3,
      metalness: 0.9,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    coreGroup.add(cageMesh);

    // Orbital Refraction Rings
    const ring1Geo = new THREE.TorusGeometry(2.35, 0.018, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x4d8dff,
      transparent: true,
      opacity: 0.5,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.7, 0.015, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.4,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    coreGroup.add(ring2);

    // -------------------------------------------------------------
    // 2. The 7 Developer Track Satellites & Energy Filaments
    // -------------------------------------------------------------
    const satellitesGroup = new THREE.Group();
    worldGroup.add(satellitesGroup);

    const satelliteMeshes = [];
    const filamentLines = [];

    LUSION_TRACKS.forEach((track, idx) => {
      const [baseX, baseY, baseZ] = track.pos;

      // Satellite Sphere Mesh
      const satGeo = new THREE.SphereGeometry(0.24, 24, 24);
      const satMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(track.color),
        emissive: new THREE.Color(track.color).multiplyScalar(0.45),
        roughness: 0.18,
        metalness: 0.82,
      });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      satMesh.position.set(baseX, baseY, baseZ);
      satMesh.userData = { id: track.id, trackData: track, basePos: new THREE.Vector3(baseX, baseY, baseZ) };
      satellitesGroup.add(satMesh);
      satelliteMeshes.push(satMesh);

      // Curved Filament connecting Core to Satellite
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(baseX * 0.4, baseY * 0.7 + 0.3, baseZ * 0.4),
        new THREE.Vector3(baseX, baseY, baseZ)
      );
      const curvePoints = curve.getPoints(30);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const lineMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(track.color),
        transparent: true,
        opacity: 0.28,
      });
      const line = new THREE.Line(lineGeo, lineMat);
      satellitesGroup.add(line);
      filamentLines.push({ line, curve });
    });

    // -------------------------------------------------------------
    // 3. Galactic Impact Expansion Network (80+ Nodes for Act 5)
    // -------------------------------------------------------------
    const impactGroup = new THREE.Group();
    worldGroup.add(impactGroup);

    const impactNodes = [];
    const impactCount = 80;
    for (let i = 0; i < impactCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / impactCount);
      const theta = Math.sqrt(impactCount * Math.PI) * phi;
      const radius = 4.2 + (i % 5) * 0.5;

      const x = Math.cos(theta) * Math.sin(phi) * radius;
      const y = Math.sin(theta) * Math.sin(phi) * radius;
      const z = Math.cos(phi) * radius;

      const nodeGeo = new THREE.SphereGeometry(0.06, 12, 12);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x4d8dff : 0x8b5cf6,
        transparent: true,
        opacity: 0.5,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.set(x, y, z);
      impactGroup.add(nodeMesh);
      impactNodes.push(nodeMesh);
    }
    impactGroup.visible = false;

    // -------------------------------------------------------------
    // 4. Procedural Particle Dust (1,200 points)
    // -------------------------------------------------------------
    const particleCount = 1200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorA = new THREE.Color(0x4d8dff);
    const colorB = new THREE.Color(0x8b5cf6);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 22;
      positions[i + 1] = (Math.random() - 0.5) * 22;
      positions[i + 2] = (Math.random() - 0.5) * 18;

      const c = Math.random() > 0.4 ? colorA : colorB;
      particleColors[i] = c.r;
      particleColors[i + 1] = c.g;
      particleColors[i + 2] = c.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // -------------------------------------------------------------
    // 5. Volumetric Dual Point Lighting
    // -------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xffffff, isLight ? 0.9 : 0.45);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(0x4d8dff, 4.5, 25);
    keyLight.position.set(5, 4, 6);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x8b5cf6, 3.5, 25);
    rimLight.position.set(-5, -4, 4);
    scene.add(rimLight);

    // -------------------------------------------------------------
    // 6. Interactive Raycasting on Cursor Movement
    // -------------------------------------------------------------
    const raycaster = new THREE.Raycaster();
    const mouseNDC = new THREE.Vector2(-100, -100);

    const handlePointerMove = (e) => {
      mouseNDC.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseNDC.y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 0.8;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 0.8;
    };

    const handlePointerClick = () => {
      raycaster.setFromCamera(mouseNDC, camera);
      const intersects = raycaster.intersectObjects(satelliteMeshes);
      if (intersects.length > 0) {
        const clicked = intersects[0].object;
        if (onSelectTrack) onSelectTrack(clicked.userData.trackData);
      }
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("click", handlePointerClick);

    // -------------------------------------------------------------
    // 7. Master Render & Choreography Loop
    // -------------------------------------------------------------
    let animationFrameId;
    const clock = new THREE.Clock();
    const currentCamPos = new THREE.Vector3(0, 0, 7.5);
    const currentTarget = new THREE.Vector3(0, 0, 0);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      // Interpolate camera flight and world state based on scroll
      const { camPos, target, fov, dispersion, cageOpen } = interpolateKeyframes(scrollRef.current);

      const targetCamVec = new THREE.Vector3(
        camPos[0] + mouseRef.current.x * 0.6,
        camPos[1] - mouseRef.current.y * 0.6,
        camPos[2]
      );
      const targetLookVec = new THREE.Vector3(...target);

      currentCamPos.lerp(targetCamVec, 0.06);
      currentTarget.lerp(targetLookVec, 0.06);

      camera.position.copy(currentCamPos);
      camera.lookAt(currentTarget);

      if (Math.abs(camera.fov - fov) > 0.1) {
        camera.fov = fov;
        camera.updateProjectionMatrix();
      }

      // Core rotations & breathing
      coreGroup.rotation.y = elapsed * 0.18 + mouseRef.current.x * 0.3;
      coreGroup.rotation.x = Math.sin(elapsed * 0.15) * 0.12 - mouseRef.current.y * 0.3;
      seedMesh.rotation.y = -elapsed * 0.3;
      cageMesh.rotation.y = elapsed * 0.12;

      // Cage scale unfolding
      const cageScale = 1.0 + cageOpen * 0.45;
      cageMesh.scale.set(cageScale, cageScale, cageScale);

      ring1.rotation.z = elapsed * 0.22;
      ring2.rotation.z = -elapsed * 0.18;

      // Satellite Dispersion & Rotation
      satellitesGroup.rotation.y = elapsed * 0.09;

      satelliteMeshes.forEach((sat, idx) => {
        const base = sat.userData.basePos;
        const targetPos = new THREE.Vector3(
          base.x * dispersion,
          base.y * dispersion,
          base.z * dispersion
        );
        sat.position.lerp(targetPos, 0.08);

        // Update filament curve points
        const curve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(sat.position.x * 0.4, sat.position.y * 0.7 + 0.2, sat.position.z * 0.4),
          sat.position
        );
        const pts = curve.getPoints(30);
        filamentLines[idx].line.geometry.setFromPoints(pts);
      });

      // Impact Group Visibility (Fade in during Act 5)
      const isAct5 = scrollRef.current > 0.75 && scrollRef.current < 0.95;
      impactGroup.visible = isAct5;
      if (isAct5) {
        impactGroup.rotation.y = elapsed * 0.05;
      }

      // Particle Drift
      particles.rotation.y = -elapsed * 0.02;
      particles.rotation.x = Math.sin(elapsed * 0.03) * 0.05;

      // Raycasting Check
      raycaster.setFromCamera(mouseNDC, camera);
      const intersects = raycaster.intersectObjects(satelliteMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hoveredTrack?.id !== hit.userData.id) {
          setHoveredTrack(hit.userData.trackData);
        }
        hit.scale.lerp(new THREE.Vector3(1.4, 1.4, 1.4), 0.15);
      } else {
        if (hoveredTrack) setHoveredTrack(null);
        satelliteMeshes.forEach((sat) => {
          sat.scale.lerp(new THREE.Vector3(1.0, 1.0, 1.0), 0.1);
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("click", handlePointerClick);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isLight, hoveredTrack, onSelectTrack]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div ref={mountRef} className="w-full h-full pointer-events-auto" />

      {/* Floating 3D HUD Tooltip when hovering any node */}
      {hoveredTrack && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-none animate-in fade-in zoom-in-95 duration-200">
          <div className="px-5 py-3 rounded-2xl lusion-glass border border-[#4D8DFF]/40 shadow-2xl flex items-center gap-4">
            <div
              className="w-3 h-3 rounded-full animate-ping"
              style={{ backgroundColor: hoveredTrack.color }}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-white">
                  {hoveredTrack.title}
                </span>
                <span className="text-[10px] font-mono text-[#4D8DFF]">
                  [{hoveredTrack.tag}]
                </span>
              </div>
              <p className="text-[11px] font-mono text-[#8B95A5] mt-0.5">
                {hoveredTrack.metric}
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#5A6475] uppercase border-l border-[#1C2430] pl-3">
              Click to Inspect
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
