import { useControls } from 'leva';

export default function() {
  return useControls('camera', {
    x: {
      min: -20,
      max: 20,
      step: 0.1,
      value: 0.6
    },
    y: {
      min: -20,
      max: 20,
      step: 0.1,
      value: -1.3 
    },
    z: {
      min: -20,
      max: 20,
      step: 0.1,
      value: 0.8 
    },
    rotationX: {
      min: 0,
      max: Math.PI / 2,
      step: 0.01,
      value: 1.18
    },
    animation: true 
  });
}
