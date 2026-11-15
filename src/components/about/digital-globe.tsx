"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  AdditiveBlending,
  AmbientLight,
  BufferGeometry,
  CanvasTexture,
  Color,
  Float32BufferAttribute,
  Group,
  Line,
  LineBasicMaterial,
  LineLoop,
  Material,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  PointLight,
  QuadraticBezierCurve3,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  TorusGeometry,
  Vector3,
  WebGLRenderer,
} from "three";

type GlobeNode = { name: string; latitude: number; longitude: number };

const networkNodes: GlobeNode[] = [
  { name: "San Francisco", latitude: 37.8, longitude: -122.4 },
  { name: "New York", latitude: 40.7, longitude: -74 },
  { name: "Toronto", latitude: 43.7, longitude: -79.4 },
  { name: "London", latitude: 51.5, longitude: -0.1 },
  { name: "Berlin", latitude: 52.5, longitude: 13.4 },
  { name: "Dubai", latitude: 25.2, longitude: 55.3 },
  { name: "Karachi", latitude: 24.9, longitude: 67.1 },
  { name: "Mumbai", latitude: 19.1, longitude: 72.9 },
  { name: "Singapore", latitude: 1.35, longitude: 103.8 },
  { name: "Tokyo", latitude: 35.7, longitude: 139.7 },
  { name: "Nairobi", latitude: -1.3, longitude: 36.8 },
  { name: "Sydney", latitude: -33.9, longitude: 151.2 },
  { name: "São Paulo", latitude: -23.6, longitude: -46.6 },
];

const continentShapes = [
  [[-168, 70], [-148, 72], [-133, 61], [-125, 51], [-124, 42], [-116, 32], [-106, 24], [-96, 18], [-86, 22], [-81, 30], [-78, 39], [-68, 45], [-58, 53], [-64, 61], [-82, 67], [-102, 73], [-126, 74], [-148, 71]],
  [[-80, 12], [-69, 10], [-61, 4], [-51, -2], [-45, -13], [-49, -25], [-57, -36], [-67, -54], [-73, -45], [-78, -27], [-81, -7]],
  [[-53, 82], [-39, 77], [-34, 68], [-42, 60], [-51, 62], [-58, 72]],
  [[-11, 36], [-8, 50], [2, 57], [14, 55], [23, 63], [38, 69], [53, 70], [70, 77], [92, 75], [110, 69], [127, 57], [143, 51], [154, 59], [166, 59], [178, 52], [164, 43], [145, 39], [131, 33], [122, 23], [114, 12], [104, 5], [98, 16], [89, 22], [78, 8], [73, 22], [61, 25], [54, 17], [44, 12], [39, 30], [29, 34], [22, 42], [11, 44], [5, 36], [-1, 37]],
  [[-17, 35], [-4, 37], [11, 33], [25, 31], [34, 19], [43, 11], [50, 1], [42, -12], [35, -25], [25, -34], [17, -35], [10, -27], [4, -17], [-1, -5], [-9, 5], [-15, 18]],
  [[113, -11], [130, -11], [145, -17], [153, -26], [146, -39], [132, -43], [118, -35], [114, -23]],
  [[47, -13], [50, -17], [49, -25], [45, -23]],
  [[130, 31], [133, 34], [137, 36], [141, 42], [145, 44], [143, 36], [138, 33]],
];

function createLandTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1536;
  canvas.height = 768;
  const context = canvas.getContext("2d");
  if (!context) return null;

  const paths = continentShapes.map((points) => {
    const path = new Path2D();
    points.forEach(([longitude, latitude], index) => {
      const x = ((longitude + 180) / 360) * canvas.width;
      const y = ((90 - latitude) / 180) * canvas.height;
      if (index === 0) path.moveTo(x, y);
      else path.lineTo(x, y);
    });
    path.closePath();
    context.fillStyle = "rgba(30, 159, 255, 0.16)";
    context.fill(path);
    context.strokeStyle = "rgba(74, 190, 255, 0.48)";
    context.lineWidth = 1.2;
    context.stroke(path);
    return path;
  });

  for (let y = 3; y < canvas.height; y += 10) {
    for (let x = 3; x < canvas.width; x += 10) {
      if (!paths.some((path) => context.isPointInPath(path, x, y))) continue;
      const variation = ((x * 17 + y * 31) % 13) / 13;
      context.fillStyle = `rgba(82, ${178 + Math.floor(variation * 50)}, 255, ${0.42 + variation * 0.46})`;
      const radius = variation > 0.83 ? 1.8 : 1.05;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    }
  }

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function geoPosition(latitude: number, longitude: number, radius = 1) {
  const phi = ((longitude + 180) * Math.PI) / 180;
  const theta = ((90 - latitude) * Math.PI) / 180;
  return new Vector3(
    -radius * Math.cos(phi) * Math.sin(theta),
    radius * Math.cos(theta),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function createGlobeScene(scene: Scene) {
  const root = new Group();
  scene.add(root);

  const globe = new Mesh(
    new SphereGeometry(1, 96, 72),
    new MeshPhysicalMaterial({
      color: new Color("#07152e"),
      emissive: new Color("#082b66"),
      emissiveIntensity: 0.46,
      metalness: 0.3,
      roughness: 0.38,
      clearcoat: 0.6,
      clearcoatRoughness: 0.24,
      specularIntensity: 0.55,
      specularColor: new Color("#4b9dff"),
    }),
  );
  root.add(globe);

  const landTexture = createLandTexture();
  if (landTexture) {
    const land = new Mesh(
      new SphereGeometry(1.008, 96, 72),
      new MeshBasicMaterial({
        map: landTexture,
        color: new Color("#59bdff"),
        transparent: true,
        opacity: 0.9,
        blending: AdditiveBlending,
        depthWrite: false,
      }),
    );
    root.add(land);
  }

  const latitudeMaterial = new LineBasicMaterial({ color: 0x267bdf, transparent: true, opacity: 0.19 });
  const longitudeMaterial = new LineBasicMaterial({ color: 0x2d8bff, transparent: true, opacity: 0.15 });
  for (const latitude of [-60, -30, 0, 30, 60]) {
    const points: Vector3[] = [];
    for (let longitude = -180; longitude < 180; longitude += 3) points.push(geoPosition(latitude, longitude, 1.012));
    const geometry = new BufferGeometry().setFromPoints(points);
    root.add(new LineLoop(geometry, latitudeMaterial));
  }
  for (const longitude of [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150]) {
    const points: Vector3[] = [];
    for (let latitude = -88; latitude <= 88; latitude += 3) points.push(geoPosition(latitude, longitude, 1.012));
    root.add(new Line(new BufferGeometry().setFromPoints(points), longitudeMaterial));
  }

  const nodeMaterial = new MeshBasicMaterial({ color: 0x8be1ff, toneMapped: false });
  const nodeGeometry = new SphereGeometry(0.012, 10, 8);
  const nodeMeshes = networkNodes.map((node) => {
    const mesh = new Mesh(nodeGeometry, nodeMaterial);
    mesh.position.copy(geoPosition(node.latitude, node.longitude, 1.025));
    root.add(mesh);
    return mesh;
  });

  const connectionPairs = [
    [0, 1], [1, 3], [1, 4], [3, 4], [3, 5], [4, 9], [5, 6], [6, 7],
    [7, 8], [8, 9], [8, 11], [3, 10], [10, 5], [1, 12], [12, 11], [4, 6],
  ];
  const arcMaterials: LineBasicMaterial[] = [];
  for (const [fromIndex, toIndex] of connectionPairs) {
    const from = geoPosition(networkNodes[fromIndex].latitude, networkNodes[fromIndex].longitude, 1.026);
    const to = geoPosition(networkNodes[toIndex].latitude, networkNodes[toIndex].longitude, 1.026);
    const midpoint = from.clone().add(to).normalize().multiplyScalar(1.12);
    const curve = new QuadraticBezierCurve3(from, midpoint, to);
    const material = new LineBasicMaterial({ color: 0x39aaff, transparent: true, opacity: 0.48, blending: AdditiveBlending });
    arcMaterials.push(material);
    root.add(new Line(new BufferGeometry().setFromPoints(curve.getPoints(32)), material));
  }

  const particles: number[] = [];
  for (let index = 0; index < 260; index += 1) {
    const y = 1 - (index / 259) * 2;
    const radius = 1.23 + ((index * 37) % 43) / 100;
    const angle = index * 2.399963229728653;
    const ring = Math.sqrt(1 - y * y);
    particles.push(Math.cos(angle) * ring * radius, y * radius, Math.sin(angle) * ring * radius);
  }
  const particleGeometry = new BufferGeometry();
  particleGeometry.setAttribute("position", new Float32BufferAttribute(particles, 3));
  const particleMaterial = new PointsMaterial({ color: 0x54baff, size: 0.012, transparent: true, opacity: 0.68, sizeAttenuation: true, depthWrite: false, blending: AdditiveBlending });
  const particleField = new Points(particleGeometry, particleMaterial);
  scene.add(particleField);

  const orbitGroups: Mesh[] = [];
  const orbitSpeeds = [0.045, -0.032, 0.022];
  const orbitTilts: Array<[number, number, number]> = [[0.76, 0.12, 0.15], [1.2, -0.55, 0.8], [0.34, 0.92, -0.48]];
  const orbitColors = [0x168cff, 0x39c2ff, 0x2469e9];
  orbitTilts.forEach((tilt, index) => {
    const group = new Mesh();
    group.rotation.set(...tilt);
    const orbitMaterial = new MeshBasicMaterial({ color: orbitColors[index], transparent: true, opacity: index === 1 ? 0.42 : 0.31, blending: AdditiveBlending, toneMapped: false });
    const orbit = new Mesh(new TorusGeometry(1.35 + index * 0.12, 0.0035, 5, 180), orbitMaterial);
    group.add(orbit);
    const beacon = new Mesh(new SphereGeometry(0.018, 10, 8), new MeshBasicMaterial({ color: 0xb4eeff, toneMapped: false }));
    beacon.position.set(1.35 + index * 0.12, 0, 0);
    group.add(beacon);
    scene.add(group);
    orbitGroups.push(group);
  });

  scene.add(new AmbientLight(0x79aaff, 1.15));
  const keyLight = new PointLight(0x1e73ff, 5.5, 8);
  keyLight.position.set(-2.4, 1.8, 3.1);
  scene.add(keyLight);
  const rimLight = new PointLight(0x2bd6ff, 4.2, 7);
  rimLight.position.set(2.2, -1.3, -2.5);
  scene.add(rimLight);

  return { root, particleField, particleMaterial, orbitGroups, orbitSpeeds, arcMaterials, nodeMeshes, landTexture };
}

export function DigitalGlobe() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [webglReady, setWebglReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power", stencil: false, depth: true });
    } catch {
      return;
    }

    const scene = new Scene();
    const camera = new PerspectiveCamera(42, 1, 0.1, 50);
    camera.position.set(0, 0, 4.45);
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.35));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.className = "digital-globe-canvas";
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);

    const globe = createGlobeScene(scene);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = true;
    let animationFrame = 0;
    let lastFrame = 0;
    let live = true;

    const renderAtSize = () => {
      if (!live) return;
      const width = Math.max(1, host.clientWidth);
      const height = Math.max(1, host.clientHeight);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.render(scene, camera);
    };

    const animate = (now: number) => {
      animationFrame = 0;
      if (!live || !visible || document.hidden) return;
      if (now - lastFrame >= 1000 / 45) {
        const delta = Math.min((now - (lastFrame || now)) / 1000, 0.05);
        lastFrame = now;
        globe.root.rotation.y += delta * 0.12;
        globe.root.rotation.x = Math.sin(now * 0.00013) * 0.025;
        globe.particleField.rotation.y -= delta * 0.018;
        globe.particleMaterial.opacity = 0.57 + Math.sin(now * 0.0012) * 0.11;
        globe.orbitGroups.forEach((group, index) => {
          group.rotation.y += delta * globe.orbitSpeeds[index];
          group.rotation.x += delta * (index === 1 ? 0.012 : -0.008);
        });
        globe.arcMaterials.forEach((material, index) => {
          material.opacity = 0.32 + (Math.sin(now * 0.001 + index * 0.72) + 1) * 0.16;
        });
        globe.nodeMeshes.forEach((node, index) => {
          const scale = 0.85 + (Math.sin(now * 0.0017 + index * 1.13) + 1) * 0.15;
          node.scale.setScalar(scale);
        });
        renderer.render(scene, camera);
      }
      animationFrame = window.requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (reducedMotion || !live || !visible || document.hidden || animationFrame) return;
      animationFrame = window.requestAnimationFrame(animate);
    };
    const stopAnimation = () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
    };
    const onVisibilityChange = () => {
      if (document.hidden) stopAnimation();
      else startAnimation();
    };
    const onContextLost = (event: Event) => {
      event.preventDefault();
      live = false;
      setWebglReady(false);
      renderer.domElement.remove();
      stopAnimation();
    };

    renderAtSize();
    const readyFrame = window.requestAnimationFrame(() => {
      if (live) setWebglReady(true);
    });
    renderer.domElement.addEventListener("webglcontextlost", onContextLost, false);
    const resizeObserver = new ResizeObserver(renderAtSize);
    resizeObserver.observe(host);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) startAnimation();
      else stopAnimation();
    }, { threshold: 0.05 });
    intersectionObserver.observe(host);
    document.addEventListener("visibilitychange", onVisibilityChange);
    startAnimation();

    return () => {
      live = false;
      window.cancelAnimationFrame(readyFrame);
      stopAnimation();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      const geometries = new Set<BufferGeometry>();
      const materials = new Set<Material>();
      scene.traverse((object) => {
        if (object instanceof Mesh || object instanceof Line || object instanceof Points) {
          geometries.add(object.geometry);
          if (Array.isArray(object.material)) object.material.forEach((material) => materials.add(material));
          else materials.add(object.material);
        }
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      globe.landTexture?.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className={`digital-globe${webglReady ? " digital-globe-ready" : ""}`} ref={hostRef} aria-hidden="true">
      <Image className="digital-globe-fallback" src="/digital-globe-fallback.webp" alt="" fill sizes="(max-width: 700px) 90vw, 480px" priority />
      <div className="digital-globe-aura" />
      <div className="digital-globe-vignette" />
    </div>
  );
}
