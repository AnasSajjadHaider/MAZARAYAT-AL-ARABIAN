'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useGLTF, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import { useHorseStore } from '@/store/useHorseStore';

import { createHorseCustomPBRMaterial } from '@/utils/horseMaterials';

export function Horse3D() {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/horse-transformed.glb');
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { actions } = useAnimations(animations, group);

  const activeHorse = useHorseStore((state) => state.activeHorse);
  const currentAnimation = useHorseStore((state) => state.currentAnimation);

  // Apply immaculate, smooth luxury PBR coat material with authentic markings
  useEffect(() => {
    if (!clone) return;

    clone.traverse((child) => {
      const mesh = child as THREE.SkinnedMesh;
      if (mesh.isSkinnedMesh || (child as THREE.Mesh).isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.geometry) {
          // Compute smooth interpolated vertex normals
          mesh.geometry.computeVertexNormals();
        }

        mesh.material = createHorseCustomPBRMaterial(activeHorse);
      }
    });
  }, [clone, activeHorse]);

  // Manage animations: 'idle' | 'trot' | 'gallop'
  useEffect(() => {
    if (!actions) return;

    const walkAction = actions['walk'];
    const gallopAction = actions['gallop1'];

    // Fade out all actions first
    Object.values(actions).forEach((act) => act?.fadeOut(0.3));

    if (currentAnimation === 'idle') {
      if (walkAction) {
        walkAction.reset().fadeIn(0.3).play();
        walkAction.setEffectiveTimeScale(0.1); // Regal breathing posture
      }
    } else if (currentAnimation === 'trot') {
      if (walkAction) {
        walkAction.reset().fadeIn(0.3).play();
        walkAction.setEffectiveTimeScale(0.9); // Composed cadence
      }
    } else if (currentAnimation === 'gallop') {
      if (gallopAction) {
        gallopAction.reset().fadeIn(0.3).play();
        gallopAction.setEffectiveTimeScale(1.05); // Full desert thunder
      } else if (walkAction) {
        walkAction.reset().fadeIn(0.3).play();
        walkAction.setEffectiveTimeScale(1.6);
      }
    }
  }, [currentAnimation, actions]);

  return (
    <group ref={group} dispose={null} position={[0, -1.05, 0]} scale={0.78}>
      <primitive object={clone} />
    </group>
  );
}

useGLTF.preload('/horse-transformed.glb');
