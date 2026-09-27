import { create } from 'zustand';
import { ARABIAN_HORSES } from '@/data/horses';
import { AnimationState, CameraViewPreset, HorseData } from '@/types/horse';

interface HorseStoreState {
  horses: HorseData[];
  activeHorseId: string;
  activeHorse: HorseData;
  currentAnimation: AnimationState;
  cameraPreset: CameraViewPreset;
  isBookingModalOpen: boolean;
  isSoundEnabled: boolean;
  isDetailsDrawerOpen: boolean;

  // Actions
  setActiveHorse: (id: string) => void;
  setAnimation: (animation: AnimationState) => void;
  setCameraPreset: (preset: CameraViewPreset) => void;
  openBookingModal: () => void;
  closeBookingModal: () => void;
  toggleSound: () => void;
  toggleDetailsDrawer: () => void;
}

export const useHorseStore = create<HorseStoreState>((set) => ({
  horses: ARABIAN_HORSES,
  activeHorseId: ARABIAN_HORSES[0].id,
  activeHorse: ARABIAN_HORSES[0],
  currentAnimation: 'trot',
  cameraPreset: 'full',
  isBookingModalOpen: false,
  isSoundEnabled: false,
  isDetailsDrawerOpen: false,

  setActiveHorse: (id: string) =>
    set((state) => {
      const found = state.horses.find((h) => h.id === id) || state.horses[0];
      return {
        activeHorseId: found.id,
        activeHorse: found,
      };
    }),

  setAnimation: (animation: AnimationState) =>
    set({ currentAnimation: animation }),

  setCameraPreset: (preset: CameraViewPreset) =>
    set({ cameraPreset: preset }),

  openBookingModal: () => set({ isBookingModalOpen: true }),
  closeBookingModal: () => set({ isBookingModalOpen: false }),

  toggleSound: () => set((state) => ({ isSoundEnabled: !state.isSoundEnabled })),
  toggleDetailsDrawer: () =>
    set((state) => ({ isDetailsDrawerOpen: !state.isDetailsDrawerOpen })),
}));
