'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import { useHorseStore } from '@/store/useHorseStore';
import { createHorseCustomPBRMaterial } from '@/utils/horseMaterials';

interface KeyframeData {
  progress: number;
  horsePos: [number, number, number];
  horseRot: [number, number, number];
  cameraPos: [number, number, number];
  cameraFov: number;
  timeScale: number;
}

const KEYFRAMES: KeyframeData[] = [
  // 0: Hero - Perfectly centered intersecting the giant typography (like Capsul-in-Pro)
  {
    progress: 0.0,
    horsePos: [0.0, -0.45, 0.2],
    horseRot: [0, -0.35, 0],
    cameraPos: [0, 0.1, 5.2],
    cameraFov: 38,
    timeScale: 0.7,
  },
  // 1: Conformation - Moves to left-center, turns broadside (lateral profile)
  {
    progress: 0.28,
    horsePos: [-0.65, -0.7, 0.1],
    horseRot: [0, Math.PI / 2, 0],
    cameraPos: [0, 0.05, 4.8],
    cameraFov: 36,
    timeScale: 0.35,
  },
  // 2: Four Champions Roster - Centered three-quarter view
  {
    progress: 0.52,
    horsePos: [0.65, -0.72, 0.1],
    horseRot: [0, -0.25, 0],
    cameraPos: [0, 0.1, 5.2],
    cameraFov: 38,
    timeScale: 0.8,
  },
  // 3: Arena Video Cinema - Shifted to right background
  {
    progress: 0.78,
    horsePos: [1.7, -0.78, -0.8],
    horseRot: [0, -1.1, 0],
    cameraPos: [0, 0.1, 5.6],
    cameraFov: 40,
    timeScale: 1.05,
  },
  // 4: VIP Concierge & Treaty - Grounded center
  {
    progress: 1.0,
    horsePos: [0, -0.85, 0],
    horseRot: [0, 0.1, 0],
    cameraPos: [0, 0.2, 5.0],
    cameraFov: 38,
    timeScale: 0.25,
  },
];

// Helper for smooth linear/cosine interpolation between keyframes
function interpolateKeyframes(p: number) {
  const clamped = Math.max(0, Math.min(1, p));

  // Find surrounding keyframes
  let idx = 0;
  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    if (clamped >= KEYFRAMES[i].progress && clamped <= KEYFRAMES[i + 1].progress) {
      idx = i;
      break;
    }
  }

  const k1 = KEYFRAMES[idx];
  const k2 = KEYFRAMES[idx + 1] || KEYFRAMES[idx];
  const range = k2.progress - k1.progress;
  const t = range > 0 ? (clamped - k1.progress) / range : 0;

  // Smooth ease-in-out curve
  const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  return {
    horsePos: [
      THREE.MathUtils.lerp(k1.horsePos[0], k2.horsePos[0], ease),
      THREE.MathUtils.lerp(k1.horsePos[1], k2.horsePos[1], ease),
      THREE.MathUtils.lerp(k1.horsePos[2], k2.horsePos[2], ease),
    ] as [number, number, number],
    horseRot: [
      THREE.MathUtils.lerp(k1.horseRot[0], k2.horseRot[0], ease),
      THREE.MathUtils.lerp(k1.horseRot[1], k2.horseRot[1], ease),
      THREE.MathUtils.lerp(k1.horseRot[2], k2.horseRot[2], ease),
    ] as [number, number, number],
    cameraPos: [
      THREE.MathUtils.lerp(k1.cameraPos[0], k2.cameraPos[0], ease),
      THREE.MathUtils.lerp(k1.cameraPos[1], k2.cameraPos[1], ease),
      THREE.MathUtils.lerp(k1.cameraPos[2], k2.cameraPos[2], ease),
    ] as [number, number, number],
    cameraFov: THREE.MathUtils.lerp(k1.cameraFov, k2.cameraFov, ease),
    timeScale: THREE.MathUtils.lerp(k1.timeScale, k2.timeScale, ease),
  };
}

export function CapsuleScrollHorse() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/horse-transformed.glb');
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { actions } = useAnimations(animations, group);
  const { camera } = useThree();

  const activeHorse = useHorseStore((state) => state.activeHorse);

  // Smooth scroll tracking ref
  const currentProgress = useRef(0);

  // Apply smooth PBR coat material
  useEffect(() => {
    if (!clone) return;
    const coatColor = new THREE.Color(activeHorse.coat.color);

    clone.traverse((child) => {
      const mesh = child as THREE.SkinnedMesh;
      if (mesh.isSkinnedMesh || (child as THREE.Mesh).isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.geometry) {
          mesh.geometry.computeVertexNormals();
        }

        mesh.material = createHorseCustomPBRMaterial(activeHorse);
      }
    });
  }, [clone, activeHorse]);

  // Initial animation setup
  useEffect(() => {
    if (!actions) return;
    const walkAction = actions['walk'];
    if (walkAction) {
      walkAction.reset().fadeIn(0.5).play();
    }
    return () => {
      walkAction?.fadeOut(0.5);
    };
  }, [actions]);

  // 60fps Scroll-bound interpolation
  useFrame((state, delta) => {
    // Calculate page scroll progress (0.0 to 1.0)
    const scrollY = window.scrollY || 0;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const targetProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);

    // Smooth inertia lerp (Apple / Capsul-in-Pro feel)
    currentProgress.current = THREE.MathUtils.lerp(
      currentProgress.current,
      targetProgress,
      delta * 4.5
    );

    const interp = interpolateKeyframes(currentProgress.current);

    // Update Horse Transform
    if (group.current) {
      // Responsive scale adjustment: smaller on narrow screens
      const isMobile = window.innerWidth < 768;
      const targetScale = isMobile ? 0.6 : 0.78;

      group.current.scale.setScalar(targetScale);

      // On mobile, keep horse more centered
      const posX = isMobile ? interp.horsePos[0] * 0.35 : interp.horsePos[0];
      const posY = isMobile ? interp.horsePos[1] + 0.1 : interp.horsePos[1];

      group.current.position.set(posX, posY, interp.horsePos[2]);
      group.current.rotation.set(interp.horseRot[0], interp.horseRot[1], interp.horseRot[2]);
    }

    // Update Camera Position & FOV
    camera.position.set(interp.cameraPos[0], interp.cameraPos[1], interp.cameraPos[2]);
    if ('fov' in camera) {
      const persp = camera as THREE.PerspectiveCamera;
      persp.fov = interp.cameraFov;
      persp.updateProjectionMatrix();
    }

    // Dynamically update animation cadence according to scroll state
    if (actions && actions['walk']) {
      actions['walk'].setEffectiveTimeScale(interp.timeScale);
    }
  });

  return (
    <group ref={group} dispose={null} scale={0.78}>
      <primitive object={clone} />
    </group>
  );
}

useGLTF.preload('/horse-transformed.glb');
