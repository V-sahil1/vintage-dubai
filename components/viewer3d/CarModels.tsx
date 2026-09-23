"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { Viewer3DConfig } from "@/lib/vehicles";

export type CarDims = { length: number; width: number; height: number };

type ModelProps = { config: Viewer3DConfig; onReady: (dims: CarDims) => void };

/* ------------------------------------------------------------------ */
/* Materials                                                           */
/* ------------------------------------------------------------------ */

/** Deep clear-coated metallic black (Santorini Black by default). */
function makePaint(hex: string, src?: THREE.MeshStandardMaterial) {
  return new THREE.MeshPhysicalMaterial({
    name: "vantage-paint",
    color: new THREE.Color(hex),
    metalness: 0.65,
    roughness: 0.3,
    clearcoat: 1,
    clearcoatRoughness: 0.03,
    envMapIntensity: 1.6,
    normalMap: src?.normalMap ?? null,
    aoMap: src?.aoMap ?? null,
  });
}

/** Dark privacy glass: transparent enough to show an interior if the model has one. */
function makeGlass(src?: THREE.MeshStandardMaterial) {
  return new THREE.MeshPhysicalMaterial({
    name: "vantage-glass",
    color: new THREE.Color("#0c0f13"),
    metalness: 0.1,
    roughness: 0.03,
    transparent: true,
    opacity: Math.min(src?.opacity ?? 1, 0.42),
    envMapIntensity: 2.2,
    depthWrite: false,
    side: THREE.DoubleSide,
    normalMap: src?.normalMap ?? null,
  });
}

type Part = "glass" | "headlight" | "taillight" | "tire" | "paint" | "other";

function classify(name: string): Part {
  if (/glass|window|windshield|windscreen/i.test(name)) return "glass";
  if (/tail.?(light|lamp)|rear.?light|brake.?light/i.test(name)) return "taillight";
  if (/head.?(light|lamp)|drl|front.?light/i.test(name)) return "headlight";
  if (/tire|tyre|rubber/i.test(name)) return "tire";
  if (/chrome|metal|rim|wheel|trim|grill/i.test(name)) return "other";
  if (/paint|body|carpaint|exterior|shell|coat/i.test(name)) return "paint";
  return "other";
}

/**
 * Upgrades a loaded glTF for the studio: black paint, tinted glass, lit lamps,
 * matte tyres, shadows on every mesh. Classification is by material name first,
 * then mesh name — adjust the regexes in `classify` if your model uses other names.
 */
function prepareScene(scene: THREE.Object3D, paintHex: string) {
  if (scene.userData.vantagePrepared) return;
  scene.userData.vantagePrepared = true;
  const cache = new Map<string, THREE.Material>();

  const upgrade = (mat: THREE.Material, meshName: string): THREE.Material => {
    const hit = cache.get(mat.uuid);
    if (hit) return hit;
    const std = mat as THREE.MeshStandardMaterial;
    let part = classify(mat.name);
    if (part === "other" && !/chrome|metal|rim|wheel|trim|grill/i.test(mat.name)) part = classify(meshName);

    let out: THREE.Material = mat;
    if (part === "paint") out = makePaint(paintHex, std);
    else if (part === "glass") out = makeGlass(std);
    else if (std.isMeshStandardMaterial) {
      const m = std.clone();
      if (part === "headlight") {
        m.emissive.set("#eaf2ff");
        m.emissiveIntensity = 0.8;
      } else if (part === "taillight") {
        m.emissive.set("#ff1a1a");
        m.emissiveIntensity = 0.6;
      } else if (part === "tire") {
        m.metalness = 0;
        m.roughness = Math.max(m.roughness, 0.85);
      }
      m.envMapIntensity = Math.max(m.envMapIntensity ?? 1, 1.2);
      out = m;
    }
    cache.set(mat.uuid, out);
    return out;
  };

  scene.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh) return;
    // Baked ground/shadow planes would fight our floor and distort the scale.
    if (/shadow|ground|floor|backdrop/i.test(mesh.name)) {
      mesh.visible = false;
      return;
    }
    mesh.material = Array.isArray(mesh.material)
      ? mesh.material.map((m) => upgrade(m, mesh.name))
      : upgrade(mesh.material, mesh.name);
    const isGlass = (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).some(
      (m) => m.name === "vantage-glass"
    );
    mesh.castShadow = !isGlass;
    mesh.receiveShadow = true;
  });
}

/** Bounding box of visible meshes only (ignores hidden helper planes). */
function visibleBounds(root: THREE.Object3D) {
  root.updateMatrixWorld(true);
  const box = new THREE.Box3();
  const tmp = new THREE.Box3();
  root.traverseVisible((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh) return;
    if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox();
    tmp.copy(mesh.geometry.boundingBox!).applyMatrix4(mesh.matrixWorld);
    box.union(tmp);
  });
  return box;
}

/* ------------------------------------------------------------------ */
/* Real model (.glb / .gltf)                                           */
/* ------------------------------------------------------------------ */

export function GltfCar({ config, onReady }: ModelProps) {
  const { scene } = useGLTF(config.model);

  // Scale to the real vehicle length, centre on the turntable, sit wheels on y = 0.
  const fit = useMemo(() => {
    prepareScene(scene, config.paint.hex);
    const box = visibleBounds(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const s = config.lengthM / Math.max(size.x, size.z);
    return {
      scale: s,
      position: [-center.x * s, -box.min.y * s, -center.z * s] as [number, number, number],
      dims: { length: Math.max(size.x, size.z) * s, width: Math.min(size.x, size.z) * s, height: size.y * s },
    };
  }, [scene, config.lengthM, config.paint.hex]);

  useEffect(() => onReady(fit.dims), [fit, onReady]);

  return (
    <group rotation-y={config.modelYaw ?? 0}>
      <group position={fit.position} scale={fit.scale}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Procedural stand-in (used until the real .glb is added)             */
/* ------------------------------------------------------------------ */

const WHEEL_R = 0.4;
const WHEELBASE_HALF = 1.5; // 2,997 mm wheelbase
const TRACK_HALF = 0.85;

function extrude(points: [number, number][], width: number, bevel: number, arches: number[] = [], archR = 0) {
  const shape = new THREE.Shape();
  shape.moveTo(points[0][0], points[0][1]);
  for (const [x, y] of points.slice(1)) {
    // Cut a round wheel arch whenever the outline passes an axle along the sill.
    const arch = arches.find((ax) => Math.abs(x - (ax + archR)) < 1e-6);
    if (arch !== undefined) {
      shape.lineTo(arch - archR, WHEEL_R);
      shape.absarc(arch, WHEEL_R, archR, Math.PI, 0, true);
    }
    shape.lineTo(x, y);
  }
  shape.closePath();
  const depth = width - bevel * 2;
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel * 0.8,
    bevelSegments: 5,
    curveSegments: 32,
  });
  geo.translate(0, 0, -depth / 2);
  return geo;
}

function Wheel({ x, z, mats }: { x: number; z: number; mats: ReturnType<typeof usePlaceholderMaterials> }) {
  // Rotating +90° about X maps the cylinder's local +Y onto world +Z, so `out` points to the outer face.
  const out = Math.sign(z);
  return (
    <group position={[x, WHEEL_R, z]} rotation-x={Math.PI / 2}>
      <mesh material={mats.tire} castShadow receiveShadow>
        <cylinderGeometry args={[WHEEL_R, WHEEL_R, 0.28, 48]} />
      </mesh>
      <mesh material={mats.rim} position-y={0.141 * out} castShadow>
        <cylinderGeometry args={[0.285, 0.285, 0.01, 48]} />
      </mesh>
      {/* 5 split-spoke pairs, 22" */}
      {Array.from({ length: 10 }, (_, i) => (
        <group key={i} position-y={0.149 * out} rotation-y={Math.floor(i / 2) * ((Math.PI * 2) / 5) + (i % 2 ? 0.11 : -0.11)}>
          <mesh material={mats.rimFace} position-z={0.15}>
            <boxGeometry args={[0.05, 0.018, 0.25]} />
          </mesh>
        </group>
      ))}
      <mesh material={mats.rimFace} position-y={0.152 * out}>
        <cylinderGeometry args={[0.06, 0.06, 0.02, 24]} />
      </mesh>
    </group>
  );
}

function usePlaceholderMaterials(paintHex: string) {
  const mats = useMemo(
    () => ({
      paint: makePaint(paintHex),
      glass: new THREE.MeshPhysicalMaterial({
        color: "#06080b",
        metalness: 0.3,
        roughness: 0.04,
        clearcoat: 1,
        envMapIntensity: 2.4,
      }),
      trim: new THREE.MeshStandardMaterial({ color: "#050506", metalness: 0.4, roughness: 0.35 }),
      liner: new THREE.MeshStandardMaterial({ color: "#020202", roughness: 1 }),
      tire: new THREE.MeshStandardMaterial({ color: "#0d0d0e", roughness: 0.9 }),
      rim: new THREE.MeshStandardMaterial({ color: "#1c1d20", metalness: 1, roughness: 0.35 }),
      rimFace: new THREE.MeshStandardMaterial({ color: "#8d9096", metalness: 1, roughness: 0.22 }),
      head: new THREE.MeshStandardMaterial({ color: "#ffffff", emissive: "#eaf2ff", emissiveIntensity: 4 }),
      // Not tone-mapped so ACES doesn't shift the red towards orange.
      tail: new THREE.MeshStandardMaterial({ color: "#300000", emissive: "#d80000", emissiveIntensity: 1.3, toneMapped: false }),
    }),
    [paintHex]
  );
  useEffect(() => () => Object.values(mats).forEach((m) => m.dispose()), [mats]);
  return mats;
}

/** Range Rover Sport-proportioned stand-in so the studio can be previewed without the .glb. */
export function PlaceholderCar({ config, onReady }: ModelProps) {
  const ref = useRef<THREE.Group>(null);
  const mats = usePlaceholderMaterials(config.paint.hex);

  const geo = useMemo(() => {
    const A = WHEELBASE_HALF;
    // Side profile (x forward, y up), metres.
    const body = extrude(
      [
        [-2.46, 0.5],
        [-2.3, 0.36],
        [-A + 0.5, 0.36],
        [A - 0.5, 0.33],
        [A + 0.5, 0.36],
        [2.33, 0.4],
        [2.46, 0.6],
        [2.45, 0.94],
        [2.3, 1.06],
        [1.05, 1.13],
        [-2.28, 1.13],
        [-2.44, 1.02],
        [-2.47, 0.72],
      ],
      1.99,
      0.07,
      [-A, A],
      0.5
    );
    const cabin = extrude(
      [
        [1.08, 1.1],
        [0.2, 1.68],
        [-1.9, 1.72],
        [-2.3, 1.38],
        [-2.28, 1.1],
      ],
      1.68,
      0.06
    );
    return { body, cabin };
  }, []);
  useEffect(() => () => Object.values(geo).forEach((g) => g.dispose()), [geo]);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const size = visibleBounds(ref.current).getSize(new THREE.Vector3());
    onReady({ length: size.x, width: size.z, height: size.y });
  }, [onReady]);

  const A = WHEELBASE_HALF;
  return (
    <group ref={ref}>
      <mesh geometry={geo.body} material={mats.paint} castShadow receiveShadow />
      <mesh geometry={geo.cabin} material={mats.glass} castShadow />
      {/* Floating roof */}
      <mesh material={mats.paint} position={[-0.9, 1.765, 0]} castShadow>
        <boxGeometry args={[1.9, 0.05, 1.56]} />
      </mesh>
      {/* Wheel-well liners so arches don't show through */}
      {[-A, A].map((x) => (
        <mesh key={x} material={mats.liner} position={[x, 0.64, 0]}>
          <boxGeometry args={[1.0, 0.56, 1.5]} />
        </mesh>
      ))}
      {/* Mirrors */}
      {[1, -1].map((s) => (
        <mesh key={s} material={mats.paint} position={[0.95, 1.2, s * 1.06]} castShadow>
          <boxGeometry args={[0.22, 0.12, 0.14]} />
        </mesh>
      ))}
      {/* Slim headlights, grille, intake */}
      {[1, -1].map((s) => (
        <mesh key={s} material={mats.head} position={[2.515, 0.93, s * 0.64]}>
          <boxGeometry args={[0.02, 0.05, 0.5]} />
        </mesh>
      ))}
      <mesh material={mats.trim} position={[2.52, 0.76, 0]}>
        <boxGeometry args={[0.02, 0.2, 0.86]} />
      </mesh>
      <mesh material={mats.trim} position={[2.46, 0.5, 0]}>
        <boxGeometry args={[0.02, 0.12, 1.4]} />
      </mesh>
      {/* Full-width tail-light bar */}
      <mesh material={mats.tail} position={[-2.51, 0.98, 0]}>
        <boxGeometry args={[0.02, 0.045, 1.72]} />
      </mesh>
      {/* Lower cladding */}
      <mesh material={mats.trim} position={[0, 0.38, 0]}>
        <boxGeometry args={[1.85, 0.08, 2.0]} />
      </mesh>
      {[
        [A, TRACK_HALF],
        [A, -TRACK_HALF],
        [-A, TRACK_HALF],
        [-A, -TRACK_HALF],
      ].map(([x, z]) => (
        <Wheel key={`${x}${z}`} x={x} z={z} mats={mats} />
      ))}
    </group>
  );
}
