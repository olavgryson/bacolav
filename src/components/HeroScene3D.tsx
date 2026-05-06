"use client";

import { useEffect, useMemo, type RefObject } from "react";
import { useThree } from "@react-three/fiber";
import { PerspectiveCamera, Environment, useGLTF } from "@react-three/drei";
import {
  Box3,
  Group,
  LinearMipmapLinearFilter,
  LinearFilter,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  SRGBColorSpace,
  Texture,
  Vector3,
  WebGLRenderer,
} from "three";

const ASSET_VERSION = "v5";
const CRATE_URL = `/models/bacolav_crate.glb?${ASSET_VERSION}`;
const BOTTLE_URL = `/models/bacolav_bottle.glb?${ASSET_VERSION}`;

// Empty-slot world position (Blender X=33.17mm, Z=18mm, Y=-111.75mm
// → glTF Y-up: x=0.033, y=0.018, z=0.112). Verify visually after first render.
const SLOT_POSITION: [number, number, number] = [0.033, 0.018, 0.112];

// Crate uses mm units in source → 0.001 m per unit.
const CRATE_SCALE = 0.001;

// Real bottle should match a 65×65×233 mm slot. The Sketchfab source bottle
// bbox spans ~24×86×23 source units → multiplier ≈ 0.00271 to land in metres.
const BOTTLE_TARGET_HEIGHT_M = 0.233;

type Props = {
  bottleRef: RefObject<Group | null>;
  crateRef: RefObject<Group | null>;
  elevatorRef: RefObject<Group | null>;
  onReady?: () => void;
};

function tuneTextures(root: Object3D, maxAniso: number) {
  const seen = new Set<Texture>();
  const upgrade = (tex: Texture | null | undefined, isColor: boolean) => {
    if (!tex || seen.has(tex)) return;
    seen.add(tex);
    tex.anisotropy = maxAniso;
    tex.magFilter = LinearFilter;
    tex.minFilter = LinearMipmapLinearFilter;
    tex.generateMipmaps = true;
    if (isColor) tex.colorSpace = SRGBColorSpace;
    tex.needsUpdate = true;
  };
  root.traverse((obj) => {
    const mesh = obj as Mesh;
    if (!mesh.isMesh) return;
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    for (const m of mats) {
      const std = m as MeshStandardMaterial;
      upgrade(std.map ?? null, true);
      upgrade(std.emissiveMap ?? null, true);
      upgrade(std.normalMap ?? null, false);
      upgrade(std.roughnessMap ?? null, false);
      upgrade(std.metalnessMap ?? null, false);
      upgrade(std.aoMap ?? null, false);
    }
  });
}

export default function HeroScene3D({
  bottleRef,
  crateRef,
  elevatorRef,
  onReady,
}: Props) {
  const crate = useGLTF(CRATE_URL, true, true);
  const bottle = useGLTF(BOTTLE_URL, true, true);
  const { gl } = useThree();
  const maxAniso = useMemo(
    () => (gl as WebGLRenderer).capabilities.getMaxAnisotropy(),
    [gl]
  );

  useEffect(() => {
    tuneTextures(crate.scene, maxAniso);
    tuneTextures(bottle.scene, maxAniso);
  }, [crate.scene, bottle.scene, maxAniso]);

  // Recenter the bottle so its rotation pivots at base-center: clone the loaded
  // scene, measure its bbox in source units, translate children so that
  // (0, 0, 0) sits at the bottom-centre of the bottle, then derive the scale
  // factor that brings the bottle to ~233 mm tall.
  const { bottleObject, bottleScale } = useMemo(() => {
    const root = bottle.scene.clone(true);
    const bbox = new Box3().setFromObject(root);
    const size = bbox.getSize(new Vector3());
    const center = bbox.getCenter(new Vector3());
    root.position.set(-center.x, -bbox.min.y, -center.z);
    const scale = size.y > 0 ? BOTTLE_TARGET_HEIGHT_M / size.y : 0.001;
    return { bottleObject: root, bottleScale: scale };
  }, [bottle.scene]);

  useEffect(() => {
    if (bottleRef.current && crateRef.current && elevatorRef.current) onReady?.();
  }, [bottleRef, crateRef, elevatorRef, onReady]);

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[0.6, 1.2, 0.8]}
        intensity={0.9}
        castShadow={false}
      />
      <Environment preset="apartment" environmentIntensity={0.15} />

      <group ref={crateRef} scale={CRATE_SCALE}>
        <primitive object={crate.scene} />
      </group>

      {/* The elevator group moves both camera and bottle up together */}
      <group ref={elevatorRef}>
        <PerspectiveCamera
          makeDefault
          position={[0, 0.32, 0.62]}
          fov={75}
          onUpdate={(c) => {
            const yOffset = elevatorRef.current?.position.y || 0;
            c.lookAt(0, 0.08 + yOffset, 0);
          }}
        />

        <group ref={bottleRef} position={SLOT_POSITION}>
          <group scale={bottleScale}>
            <primitive object={bottleObject} />
          </group>
        </group>
      </group>
    </>
  );
}

useGLTF.preload(CRATE_URL, true, true);
useGLTF.preload(BOTTLE_URL, true, true);
