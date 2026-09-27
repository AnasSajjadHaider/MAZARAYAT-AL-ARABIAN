'use client';

import dynamic from 'next/dynamic';

export const CapsuleCanvasDynamic = dynamic(
  () => import('./CapsuleCanvasViewport').then((mod) => mod.CapsuleCanvasViewport),
  { ssr: false }
);
