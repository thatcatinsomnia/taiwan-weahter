import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import Experience from './components/Experience';
import WeatherInfo from './components/WeatherInfo';
import { Leva } from 'leva';
import useWeather from './hooks/useWeather';


type Weather = {
  location?: string;
  temp?: [string, string];
  wx?: string;
};

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
  const { data, isLoading, error } = useWeather();
  const [location, setLocation] = useState<string>('');
  const [weather, setWeather] = useState<Weather>();

  useEffect(() => {
    if (isLoading || !data) {
      return;
    }

    const locationWeather = data.find(d => d.location === location);

    setWeather(locationWeather);
  }, [data, location]);

  return (
    <Wrapper>
      <Leva flat collapsed hidden />

      <Experience setLocation={setLocation} />

      {weather && (
        <div className="mx-auto max-w-[1440px] w-full h-full">
          <div className="flex-1 max-w-[600px] pointer-events-none">
            <WeatherInfo weatherElement={weather} />
          </div>
        </div>
      )}
      
    </Wrapper>
  );
}

