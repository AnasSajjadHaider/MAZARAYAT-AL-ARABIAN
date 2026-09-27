'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { useHorseStore } from '@/store/useHorseStore';

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.Mesh;
  };
  materials: Record<string, THREE.Material>;
  animations: THREE.AnimationClip[];
};

// Reused vector/color buffers outside component to prevent GC pauses
const targetColor = new THREE.Color();

export function Horse3D() {
  const group = useRef<THREE.Group>(null);
  const { nodes, animations } = useGLTF('/horse-transformed.glb') as unknown as GLTFResult;
  const { actions } = useAnimations(animations, group);

  const activeHorse = useHorseStore((state) => state.activeHorse);
  const currentAnimation = useHorseStore((state) => state.currentAnimation);

  // Dedicated luxury PBR material with metallic sheen and soft rim response
  const customMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(activeHorse.coat.color),
      roughness: activeHorse.coat.roughness,
      metalness: activeHorse.coat.metalness,
      envMapIntensity: 1.5,
    });
  }, [activeHorse.coat.color, activeHorse.coat.roughness, activeHorse.coat.metalness]);

  // Update material properties smoothly when horse selection changes
  useEffect(() => {
    if (customMaterial) {
      targetColor.set(activeHorse.coat.color);
      customMaterial.color.copy(targetColor);
      customMaterial.roughness = activeHorse.coat.roughness;
      customMaterial.metalness = activeHorse.coat.metalness;
      customMaterial.needsUpdate = true;
    }
  }, [activeHorse, customMaterial]);

  // Manage animation playback & speed scaling based on Zustand animation state
  useEffect(() => {
    const action = actions['horse_A_'];
    if (!action) return;

    action.reset().fadeIn(0.3).play();

    if (currentAnimation === 'idle') {
      // Subtle stationary breathing stance
      action.paused = false;
      action.setEffectiveTimeScale(0.08);
    } else if (currentAnimation === 'trot') {
      // Noble, composed cadence
      action.paused = false;
      action.setEffectiveTimeScale(0.7);
    } else if (currentAnimation === 'gallop') {
      // Desert thunder full speed
      action.paused = false;
      action.setEffectiveTimeScale(1.35);
    }
  }, [currentAnimation, actions]);

  return (
    <group ref={group} dispose={null} position={[0, -1.2, 0]} scale={0.024}>
      <mesh
        name="arabian_horse_mesh"
        castShadow
        receiveShadow
        geometry={nodes.mesh_0.geometry}
        material={customMaterial}
        morphTargetDictionary={nodes.mesh_0.morphTargetDictionary}
        morphTargetInfluences={nodes.mesh_0.morphTargetInfluences}
      />
    </group>
  );
}

useGLTF.preload('/horse-transformed.glb');
