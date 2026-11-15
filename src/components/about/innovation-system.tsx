"use client";

import { useEffect, useRef } from "react";
import {
  AdditiveBlending, AmbientLight, BufferGeometry, CanvasTexture, Float32BufferAttribute,
  Group, Line, LineBasicMaterial, Mesh, MeshBasicMaterial, MeshPhysicalMaterial,
  PerspectiveCamera, PlaneGeometry, PointLight, Points, PointsMaterial, QuadraticBezierCurve3, Scene, SphereGeometry,
  SRGBColorSpace, TorusGeometry, Vector3, WebGLRenderer,
} from "three";

const technologies = [
  { title: "ARTIFICIAL INTELLIGENCE", short: "AI", symbol: "✳", position: [-1.27, 0.72, 0.1] },
  { title: "WEB DEVELOPMENT", short: "WEB", symbol: "⌘", position: [1.28, 0.69, -0.04] },
  { title: "SOFTWARE SYSTEMS", short: "SYSTEMS", symbol: "▣", position: [-1.28, -0.67, -0.1] },
  { title: "DIGITAL MARKETING", short: "GROWTH", symbol: "↗", position: [1.27, -0.67, 0.08] },
] as const;

function labelTexture(symbol: string, label: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 168;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.clearRect(0, 0, 512, 168);
  const gradient = ctx.createLinearGradient(10, 10, 490, 155);
  gradient.addColorStop(0, "rgba(20, 55, 110, .96)");
  gradient.addColorStop(1, "rgba(6, 19, 44, .96)");
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.roundRect(5, 5, 502, 158, 25);
  ctx.fill();
  ctx.strokeStyle = "rgba(110, 183, 255, .72)";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = "rgba(51, 139, 255, .22)";
  ctx.beginPath();
  ctx.roundRect(24, 28, 108, 108, 20);
  ctx.fill();
  ctx.fillStyle = "#a7e2ff";
  ctx.shadowColor = "#2b9cff";
  ctx.shadowBlur = 20;
  ctx.font = "bold 57px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(symbol, 78, 82);
  ctx.shadowBlur = 0;
  ctx.textAlign = "left";
  ctx.fillStyle = "#f0f7ff";
  ctx.font = "600 26px Arial";
  ctx.fillText(label, 153, 92);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

function coreTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.clearRect(0, 0, 512, 256);
  ctx.fillStyle = "#eaf7ff";
  ctx.shadowColor = "#168bff";
  ctx.shadowBlur = 34;
  ctx.font = "bold 148px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("NX", 256, 134);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

export function InnovationSystem() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power", stencil: false });
    } catch {
      return;
    }

    const scene = new Scene();
    const camera = new PerspectiveCamera(40, 1, 0.1, 30);
    camera.position.set(0, 0, 4.9);
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.35));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.className = "innovation-system-canvas";
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    const system = new Group();
    scene.add(system);
    const core = new Mesh(new SphereGeometry(0.64, 48, 40), new MeshPhysicalMaterial({
      color: 0x123c79, emissive: 0x06275c, emissiveIntensity: 0.85,
      metalness: 0.52, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.13,
    }));
    system.add(core);
    const coreMap = coreTexture();
    if (coreMap) {
      const mark = new Mesh(new SphereGeometry(0.647, 48, 40), new MeshBasicMaterial({ map: coreMap, transparent: true, blending: AdditiveBlending, depthWrite: false }));
      system.add(mark);
    }

    const rings: Mesh[] = [];
    [[1.02, 0.9, -0.42], [0.9, 1.18, 0.54]].forEach(([rx, rz, tilt], index) => {
      const ring = new Mesh(new TorusGeometry(1.07, 0.006, 6, 120), new MeshBasicMaterial({
        color: index ? 0x55cfff : 0x318aff, transparent: true, opacity: index ? 0.5 : 0.38,
        blending: AdditiveBlending, toneMapped: false,
      }));
      ring.rotation.set(rx, rz, tilt);
      system.add(ring);
      rings.push(ring);
    });

    const cardGroups: Group[] = [];
    const textures: CanvasTexture[] = [];
    technologies.forEach((technology, index) => {
      const group = new Group();
      group.position.set(technology.position[0], technology.position[1], technology.position[2]);
      group.rotation.set((index % 2 ? -0.08 : 0.08), index % 2 ? -0.12 : 0.12, index % 2 ? 0.025 : -0.025);
      const texture = labelTexture(technology.symbol, technology.title);
      if (texture) textures.push(texture);
      const card = new Mesh(new PlaneGeometry(1.15, 0.38), new MeshBasicMaterial({ map: texture ?? undefined, transparent: true, side: 2, depthWrite: false, toneMapped: false }));
      group.add(card);
      system.add(group);
      cardGroups.push(group);
    });

    const connectionMaterial = new LineBasicMaterial({ color: 0x2d9dff, transparent: true, opacity: 0.35, blending: AdditiveBlending });
    const connections = technologies.map((technology) => {
      const end = new Vector3(...technology.position);
      const start = new Vector3(0, 0, 0);
      const mid = start.clone().lerp(end, 0.52);
      mid.z += 0.19;
      return new Line(new BufferGeometry().setFromPoints(new QuadraticBezierCurve3(start, mid, end).getPoints(28)), connectionMaterial);
    });
    connections.forEach((line) => system.add(line));

    const particlePositions: number[] = [];
    for (let index = 0; index < 120; index += 1) {
      const angle = index * 2.4;
      const radius = 1.45 + ((index * 19) % 47) / 100;
      const y = (((index * 29) % 100) / 100 - 0.5) * 2.5;
      particlePositions.push(Math.cos(angle) * radius, y, Math.sin(angle) * radius * 0.42);
    }
    const particlesGeometry = new BufferGeometry();
    particlesGeometry.setAttribute("position", new Float32BufferAttribute(particlePositions, 3));
    const particlesMaterial = new PointsMaterial({ color: 0x68cfff, size: 0.018, transparent: true, opacity: 0.65, depthWrite: false, blending: AdditiveBlending });
    const particles = new Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    scene.add(new AmbientLight(0x9cbfff, 1.4));
    const blueLight = new PointLight(0x247dff, 5.2, 8);
    blueLight.position.set(-1.2, 1.7, 3);
    scene.add(blueLight);
    const cyanLight = new PointLight(0x26c8ff, 3.8, 7);
    cyanLight.position.set(2, -1.4, -2);
    scene.add(cyanLight);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let live = true;
    let visible = true;
    let frame = 0;
    let lastFrame = 0;
    const resize = () => {
      if (!live) return;
      const width = Math.max(1, host.clientWidth);
      const height = Math.max(1, host.clientHeight);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.render(scene, camera);
    };
    const animate = (now: number) => {
      frame = 0;
      if (!live || !visible || document.hidden) return;
      if (now - lastFrame >= 1000 / 40) {
        const delta = Math.min((now - (lastFrame || now)) / 1000, 0.05);
        lastFrame = now;
        system.rotation.y += delta * 0.075;
        system.rotation.x = Math.sin(now * 0.0002) * 0.025;
        cardGroups.forEach((group, index) => {
          group.position.y = technologies[index].position[1] + Math.sin(now * 0.0008 + index * 1.7) * 0.045;
          group.rotation.y += delta * (index % 2 ? -0.06 : 0.06);
          group.rotation.z = Math.sin(now * 0.00055 + index) * 0.035;
        });
        rings.forEach((ring, index) => { ring.rotation.y += delta * (index ? -0.09 : 0.065); });
        particles.rotation.y -= delta * 0.018;
        particlesMaterial.opacity = 0.48 + (Math.sin(now * 0.001) + 1) * 0.1;
        connectionMaterial.opacity = 0.27 + (Math.sin(now * 0.0011) + 1) * 0.09;
        renderer.render(scene, camera);
      }
      frame = window.requestAnimationFrame(animate);
    };
    const start = () => {
      if (!reducedMotion && live && visible && !document.hidden && !frame) frame = window.requestAnimationFrame(animate);
    };
    const stop = () => { if (frame) window.cancelAnimationFrame(frame); frame = 0; };
    const onVisibility = () => document.hidden ? stop() : start();
    const onContextLost = (event: Event) => {
      event.preventDefault();
      live = false;
      host.classList.remove("innovation-system-ready");
      renderer.domElement.remove();
      stop();
    };

    resize();
    host.classList.add("innovation-system-ready");
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start(); else stop();
    }, { threshold: 0.05 });
    intersectionObserver.observe(host);
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      live = false;
      host.classList.remove("innovation-system-ready");
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      scene.traverse((object) => {
        if (object instanceof Mesh || object instanceof Line || object instanceof Points) {
          object.geometry.dispose();
          const material = object.material;
          (Array.isArray(material) ? material : [material]).forEach((item) => item.dispose());
        }
      });
      textures.forEach((texture) => texture.dispose());
      coreMap?.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="innovation-scene" ref={hostRef} aria-hidden="true">
      <div className="innovation-scene-fallback">
        <span className="innovation-core-fallback">NX</span>
        <span className="innovation-orbit-fallback" />
        <i className="innovation-tag innovation-tag-ai">✳ &nbsp; AI</i>
        <i className="innovation-tag innovation-tag-web">⌘ &nbsp; WEB</i>
        <i className="innovation-tag innovation-tag-software">▣ &nbsp; SOFTWARE</i>
        <i className="innovation-tag innovation-tag-marketing">↗ &nbsp; GROWTH</i>
      </div>
    </div>
  );
}
