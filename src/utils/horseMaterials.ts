import * as THREE from 'three';
import { HorseData } from '@/types/horse';

export function createHorseCustomPBRMaterial(horse: HorseData): THREE.MeshStandardMaterial {
  const coatColor = new THREE.Color(horse.coat.color);

  const mat = new THREE.MeshStandardMaterial({
    color: coatColor,
    roughness: horse.coat.roughness,
    metalness: horse.coat.metalness,
    flatShading: false,
    envMapIntensity: 1.5,
  });

  const horseTypeId =
    horse.id === 'lucky'
      ? 1
      : horse.id === 'sensation'
      ? 2
      : horse.id === 'parizaad'
      ? 3
      : 4; // zulfiqar

  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uHorseId = { value: horseTypeId };
    mat.userData.shader = shader;

    // Inject position varying in vertex shader
    shader.vertexShader = `
      varying vec3 vModelPos;
      ${shader.vertexShader}
    `.replace(
      '#include <begin_vertex>',
      `
      #include <begin_vertex>
      vModelPos = position;
      `
    );

    // Inject markings in fragment shader
    shader.fragmentShader = `
      varying vec3 vModelPos;
      uniform int uHorseId;
      ${shader.fragmentShader}
    `.replace(
      '#include <color_fragment>',
      `
      #include <color_fragment>

      // =========================================================================
      // 1. LUCKY: Auburn Chestnut with White Facial Blaze & White Lower Socks
      // =========================================================================
      if (uHorseId == 1) {
        // Distinct White Facial Blaze down center of bridge/forehead
        float distToCenter = abs(vModelPos.x);
        bool isForeheadOrBridge = vModelPos.z < -1.15 && vModelPos.z > -1.52 && vModelPos.y > 1.40 && vModelPos.y < 1.95;
        if (isForeheadOrBridge && distToCenter < 0.042) {
          float edge = smoothstep(0.042, 0.024, distToCenter);
          diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.97, 0.96, 0.95), edge * 0.95);
        }

        // White lower socks on fetlocks and pasterns
        if (vModelPos.y < 0.32) {
          float sockBlend = smoothstep(0.35, 0.27, vModelPos.y);
          diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.96, 0.95, 0.94), sockBlend * 0.92);
        }

        // Dark amber shading around hooves
        if (vModelPos.y < 0.06) {
          diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.20, 0.17, 0.14), 0.7);
        }
      }

      // =========================================================================
      // 2. SENSATION: Golden Honey Sun Chestnut with Branded Markings
      // =========================================================================
      else if (uHorseId == 2) {
        // Sun-drenched golden crest highlights
        float crestHighlight = smoothstep(1.4, 2.0, vModelPos.y) * 0.12;
        diffuseColor.rgb += vec3(0.15, 0.09, 0.02) * crestHighlight;

        // Brand markings (59 & RD) on hindquarter
        bool isBrandArea = vModelPos.z > 0.42 && vModelPos.z < 0.76 && vModelPos.y > 1.15 && vModelPos.y < 1.42 && abs(vModelPos.x) > 0.28;
        if (isBrandArea) {
          diffuseColor.rgb *= 0.84;
        }

        // Slate hooves
        if (vModelPos.y < 0.07) {
          diffuseColor.rgb = vec3(0.18, 0.16, 0.14);
        }
      }

      // =========================================================================
      // 3. PARIZAAD: Pure Ethereal Alabaster White with Soft Shaded Muzzle
      // =========================================================================
      else if (uHorseId == 3) {
        // Delicate soft rose-slate shaded muzzle
        bool isMuzzle = vModelPos.z < -1.40 && vModelPos.y < 1.62 && vModelPos.y > 1.30;
        if (isMuzzle) {
          float muzzleDepth = smoothstep(-1.40, -1.54, vModelPos.z);
          diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.74, 0.66, 0.63), muzzleDepth * 0.48);
        }

        // Shimmering pearl white highlights on crest
        float pearl = smoothstep(1.3, 2.0, vModelPos.y) * 0.08;
        diffuseColor.rgb = min(vec3(1.0), diffuseColor.rgb + vec3(pearl));

        // Soft slate hooves
        if (vModelPos.y < 0.06) {
          diffuseColor.rgb = vec3(0.42, 0.40, 0.38);
        }
      }

      // =========================================================================
      // 4. ZULFIQAR: Obsidian Midnight Black with Velvety Sheen
      // =========================================================================
      else if (uHorseId == 4) {
        // Deep obsidian body with dark charcoal muzzle
        bool isMuzzle = vModelPos.z < -1.40 && vModelPos.y < 1.62 && vModelPos.y > 1.30;
        if (isMuzzle) {
          diffuseColor.rgb = vec3(0.04, 0.04, 0.05);
        }

        // Dark jet hooves
        if (vModelPos.y < 0.06) {
          diffuseColor.rgb = vec3(0.06, 0.06, 0.07);
        }
      }
      `
    );
  };

  return mat;
}
