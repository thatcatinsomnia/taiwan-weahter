import { useControls } from 'leva';

export default function useCloudControls() {
  return useControls('cloud', {
    z: {
      min: 0,
      max: 1,
      step: 0.01,
      value: 0.5
    }
  });
}
