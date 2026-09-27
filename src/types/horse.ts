export interface HorseCoat {
  name: string;
  color: string;
  roughness: number;
  metalness: number;
  specular: string;
}

export interface HorseData {
  id: string;
  name: string;
  arabicName: string;
  title: string;
  lineage: string;
  sire: string;
  dam: string;
  strain: string; // e.g. Saklawi-Jidran, Kehilan, Dahman Shahwan
  coat: HorseCoat;
  stats: {
    speed: number;
    stamina: number;
    purity: number;
    temperament: number;
  };
  temperamentText: string;
  height: string;
  age: string;
  studFee: string;
  description: string;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
}

export type AnimationState = 'idle' | 'trot' | 'gallop';
export type CameraViewPreset = 'full' | 'head' | 'motion';
