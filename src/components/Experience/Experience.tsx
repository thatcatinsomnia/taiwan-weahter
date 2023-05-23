import type { RefObject } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/three';
import useDefaultPositions from '../../hooks/useDefaultPositions';
import Taiwan from '../Taiwan';

const AnimatedPerspectiveCamera = animated(PerspectiveCamera);

type CameraSpring = {
  position: [x: number, y: number, z: number];
  rotationX: number;
};

type Props = {
  taiwanRef: RefObject<THREE.Group>;
};

export default function Experience({ taiwanRef }: Props) {
  const { camera } = useDefaultPositions();
  
  const [springs, api] = useSpring<CameraSpring>(() => ({
    position: [camera.position.x, camera.position.y, camera.position.z],
    rotationX: 0
  }));


  return (
    <div className="fixed inset-0">
      <Canvas>
        <AnimatedPerspectiveCamera position={springs.position} rotation-x={springs.rotationX} makeDefault />
        <ambientLight intensity={0.2} />
        <directionalLight position={[0, 0, 10]} intensity={0.5} />

        <Taiwan cameraApi={api} ref={taiwanRef} />
      </Canvas>
    </div>
  );
}
