import type { ReactNode } from 'react';
import Experience from './components/Experience';
import WeatherInfo from './components/WeatherInfo';
import { Leva } from 'leva';

function Wrapper({ children }: {
  children?: ReactNode
}) {
  return (
    <div className="px-16 py-20 w-full h-full dark:bg-gray-800">
      {children}
    </div>
  );
}

export default function App() {
  return (
    <Wrapper>
      <Leva flat collapsed hidden />

      <Experience />

      <div className="mx-auto max-w-[1440px] w-full h-full">
        <div className="flex-1 max-w-[600px] pointer-events-none">
          <WeatherInfo />
        </div>
      </div>
    </Wrapper>
  );
}

