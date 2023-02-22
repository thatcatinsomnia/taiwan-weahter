import type { SpringValue } from '@react-spring/three';
import { animated } from '@react-spring/three';
import { useControls } from 'leva';
import Raindrop from '../Raindrop';
import Cloud from '../Cloud';

type Props = JSX.IntrinsicElements['group'] & {
  weather?: 'sun' | 'cloud' | 'rain';
  position: SpringValue<[number, number, number]>;
};

const AnimatedCloud = animated(Cloud);
const AnimatedRaindrop = animated(Raindrop);

export default function WeatherScene({ weather, position, ...delegated }: Props) {

  console.log(position);

  return (
    <group {...delegated} position={position}>
      <AnimatedRaindrop />

      <AnimatedCloud />
    </group>
  );
}
