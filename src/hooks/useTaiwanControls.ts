import { useControls } from 'leva';

export default function() {
  return useControls('taiwan', {
    x: {
      min: -3,
      max: 3,
      step: 0.01,
      value: 0.8 
    },
    y: {
      min: -3,
      max: 3,
      step: 0.01,
      value: 0.38 
    },
    z: {
      min: -3,
      max: 3,
      step: 0.01,
      value: 0
    }
  });
}
