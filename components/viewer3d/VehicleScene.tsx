"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Lightformer,
  MeshReflectorMaterial,
  OrbitControls,
  useProgress,
} from "@react-three/drei";
import { Component, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { Viewer3DConfig } from "@/lib/vehicles";
import { GltfCar, PlaceholderCar, type CarDims } from "./CarModels";
import ViewerLoader from "./ViewerLoader";

const BG = "#08090b";
const FOV = 35;

type Source = "checking" | "gltf" | "placeholder";

export default function VehicleScene({
  config,
  resetKey,
  onPlaceholderChange,
}: {
  config: Viewer3DConfig;
  resetKey: number;
  onPlaceholderChange?: (placeholder: boolean) => void;
}) {
  const [source, setSource] = useState<Source>("checking");
  const [dims, setDims] = useState<CarDims | null>(null);
  const { progress } = useProgress();

  // Only request the .glb if it actually exists, so a missing file falls back cleanly.
  useEffect(() => {
    let alive = true;
    fetch(config.model, { method: "HEAD" })
      .then((r) => {
        const html = (r.headers.get("content-type") ?? "").includes("text/html");
        if (alive) setSource(r.ok && !html ? "gltf" : "placeholder");
      })
      .catch(() => alive && setSource("placeholder"));
    return () => {
      alive = false;
    };
  }, [config.model]);

  useEffect(() => {
    onPlaceholderChange?.(source === "placeholder");
  }, [source, onPlaceholderChange]);

  const ready = dims !== null;

  return (
    <div className="absolute inset-0">
      <Canvas
        shadows="percentage"
        dpr={[1, 2]}
        camera={{ fov: FOV, near: 0.1, far: 200, position: [10, 4, 10] }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.05 }}
        className={`transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
      >
        <color attach="background" args={[BG]} />
        <StudioLights />
        <StudioEnvironment />
        <Floor />

        {source !== "checking" && (
          <Suspense fallback={null}>
            {source === "gltf" ? (
              <ModelErrorBoundary onError={() => setSource("placeholder")}>
                <GltfCar config={config} onReady={setDims} />
              </ModelErrorBoundary>
            ) : (
              <PlaceholderCar config={config} onReady={setDims} />
            )}
            {dims && <GroundDetails dims={dims} />}
          </Suspense>
        )}

        {dims && <CameraRig dims={dims} resetKey={resetKey} />}
      </Canvas>

      <ViewerLoader
        visible={!ready}
        label={source === "gltf" ? `Loading ${config.title}` : "Preparing showroom"}
        progress={source === "gltf" ? progress : undefined}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */

class ModelErrorBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.warn("[3D viewer] Could not load model, showing placeholder.", error);
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/** Key / rim lights; the key light casts the real-time shadow. */
function StudioLights() {
  return (
    <>
      <ambientLight intensity={0.12} />
      <directionalLight
        position={[5, 9, 4]}
        intensity={1.6}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.02}
        shadow-radius={6}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-camera-near={1}
        shadow-camera-far={25}
      />
      <directionalLight position={[-6, 4, -6]} intensity={0.7} color="#cfd8ff" />
      <spotLight position={[0, 8, 0]} angle={0.55} penumbra={1} intensity={40} decay={2} color="#fff4e0" />
    </>
  );
}

/** Soft-box reflections for the paint and glass (rendered locally, no HDRI download). */
function StudioEnvironment() {
  return (
    <Environment resolution={512} frames={1}>
      <color attach="background" args={["#050506"]} />
      {/* Ceiling soft boxes */}
      {[-3, -1, 1, 3].map((z) => (
        <Lightformer key={z} form="rect" intensity={1.6} position={[0, 6, z]} rotation-x={Math.PI / 2} scale={[10, 0.8, 1]} />
      ))}
      {[-6, 6].map((x) => (
        <Lightformer key={x} form="rect" intensity={1} position={[x, 5, -3]} rotation-x={Math.PI / 2} scale={[1.2, 6, 1]} />
      ))}
      {/* Long side strips — give the body those crisp showroom highlight lines */}
      <Lightformer form="rect" intensity={1.8} position={[-9, 1.5, 0]} rotation-y={Math.PI / 2} scale={[20, 0.6, 1]} />
      <Lightformer form="rect" intensity={1.8} position={[9, 1.5, 0]} rotation-y={-Math.PI / 2} scale={[20, 0.6, 1]} />
      {/* Warm back fill + gold accent from the brand palette */}
      <Lightformer form="rect" intensity={0.8} position={[0, 2, -10]} scale={[16, 3, 1]} color="#fff1d6" />
      <Lightformer form="ring" intensity={1.2} position={[6, 3, 8]} scale={2.5} color="#e9c349" target={[0, 0, 0]} />
    </Environment>
  );
}

/** Glossy dark showroom floor with blurred reflections. */
function Floor() {
  const width = useThree((s) => s.size.width);
  const small = width < 768;
  return (
    <mesh rotation-x={-Math.PI / 2} receiveShadow>
      <planeGeometry args={[200, 200]} />
      <MeshReflectorMaterial
        resolution={small ? 256 : 1024}
        blur={[400, 120]}
        mixBlur={1}
        mixStrength={small ? 6 : 10}
        mixContrast={1}
        depthScale={1}
        minDepthThreshold={0.8}
        maxDepthThreshold={1.2}
        mirror={0}
        color="#0a0b0d"
        metalness={0.5}
        roughness={0.9}
      />
    </mesh>
  );
}

/** Contact shadow, spotlight pool and gold turntable ring, sized to the car. */
function GroundDetails({ dims }: { dims: CarDims }) {
  const pool = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.45, "rgba(255,255,255,0.35)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
  useEffect(() => () => pool.dispose(), [pool]);

  const ring = dims.length / 2 + 0.9;
  return (
    <>
      <ContactShadows
        position={[0, 0.004, 0]}
        scale={Math.max(dims.length, dims.width) * 1.8}
        resolution={1024}
        far={dims.height}
        blur={2.2}
        opacity={0.9}
        frames={1}
        color="#000000"
      />
      <mesh rotation-x={-Math.PI / 2} position-y={0.002}>
        <circleGeometry args={[ring + 1.5, 64]} />
        <meshBasicMaterial map={pool} color="#e9dcc0" transparent opacity={0.07} depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position-y={0.003}>
        <ringGeometry args={[ring, ring + 0.018, 160]} />
        <meshBasicMaterial color="#d4af37" transparent opacity={0.4} toneMapped={false} />
      </mesh>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Camera                                                               */
/* ------------------------------------------------------------------ */

/** Home pose: front three-quarter view that fits the whole car for the current aspect ratio. */
function computeHome(dims: CarDims, aspect: number) {
  const r = 0.5 * Math.hypot(dims.length, dims.width, dims.height);
  const tanV = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
  const tanH = tanV * aspect;
  // Leaves room for the top label and bottom toolbar.
  const dist = Math.max((r * 1.05) / tanH, (r * 0.8) / tanV) + r * 0.6;
  const target = new THREE.Vector3(0, dims.height * 0.42, 0);
  const offset = new THREE.Vector3(0.78, 0.3, 0.62).normalize().multiplyScalar(dist);
  return { target, offset: new THREE.Spherical().setFromVector3(offset), dist, r };
}

function CameraRig({ dims, resetKey }: { dims: CarDims; resetKey: number }) {
  const camera = useThree((s) => s.camera);
  const aspect = useThree((s) => s.size.width / s.size.height);
  const controls = useRef<OrbitControlsImpl>(null);
  const home = useMemo(() => computeHome(dims, aspect), [dims, aspect]);

  const animating = useRef(false);
  const interacted = useRef(false);
  const introDone = useRef(false);
  const cur = useMemo(() => new THREE.Spherical(), []);
  const tmp = useMemo(() => new THREE.Vector3(), []);

  // Intro: swing in from a wider, higher angle. Later home changes (resize/rotate)
  // re-frame automatically unless the user has taken over the camera.
  useEffect(() => {
    const c = controls.current;
    if (!c) return;
    if (!introDone.current) {
      introDone.current = true;
      c.target.copy(home.target);
      const start = home.offset.clone();
      start.radius *= 1.6;
      start.theta -= 0.7;
      start.phi -= 0.25;
      camera.position.setFromSpherical(start).add(home.target);
      c.update();
      animating.current = true;
    } else if (!interacted.current) {
      animating.current = true;
    }
  }, [home, camera]);

  useEffect(() => {
    if (resetKey === 0) return;
    interacted.current = false;
    animating.current = true;
  }, [resetKey]);

  useFrame((_, delta) => {
    const c = controls.current;
    if (!c) return;
    c.autoRotate = !animating.current && !interacted.current;
    if (!animating.current) return;

    // Ease in spherical coordinates so the camera orbits around (not through) the car.
    const k = 1 - Math.exp(-delta * 3.2);
    cur.setFromVector3(tmp.copy(camera.position).sub(c.target));
    const goal = home.offset;
    const dTheta = THREE.MathUtils.euclideanModulo(goal.theta - cur.theta + Math.PI, Math.PI * 2) - Math.PI;
    const dPhi = goal.phi - cur.phi;
    const dR = goal.radius - cur.radius;
    cur.theta += dTheta * k;
    cur.phi += dPhi * k;
    cur.radius += dR * k;
    c.target.lerp(home.target, k);
    camera.position.setFromSpherical(cur).add(c.target);
    c.update();

    if (Math.abs(dTheta) < 1e-3 && Math.abs(dPhi) < 1e-3 && Math.abs(dR) < 5e-3) animating.current = false;
  });

  const fogNear = home.dist * 1.8 + home.r;
  return (
    <>
      <fog attach="fog" args={[BG, fogNear, fogNear * 2.5]} />
      <OrbitControls
        ref={controls}
        makeDefault
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.7}
        zoomSpeed={0.8}
        autoRotateSpeed={0.6}
        minDistance={home.r * 1.25}
        maxDistance={home.dist * 1.8}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2 - 0.04}
        onStart={() => {
          animating.current = false;
          interacted.current = true;
        }}
      />
    </>
  );
}
