import { useState, useEffect } from 'react';
import { animated, useTransition } from '@react-spring/web'
import { Stats } from '@react-three/drei';
import Experience from './components/Experience';
import WeatherInfo from './components/WeatherInfo';
import { Leva } from 'leva';
import useWeather from './hooks/useWeather';


type Weather = {
  location?: string;
  temp?: [string, string];
  wx?: string;
};

const AnimatedWeatherInfo = animated(WeatherInfo);

export default function App() {
  const { data, isLoading, error } = useWeather();
  const [location, setLocation] = useState<string>('');
  const [weather, setWeather] = useState<Weather>();

  const transition = useTransition(weather ?? [], {
    from: {
      opacity: 0,
      y: 80,
    },
    enter: {
      opacity: 1,
      y: 0
    },
    exitBeforeEnter: true,

  });

  useEffect(() => {
    if (isLoading || !data) {
      return;
    }

    const locationWeather = data.find(d => d.location === location);

    setWeather(locationWeather);
  }, [data, location]);

  return (
    <>
      <Leva flat collapsed hidden />
      <Stats />

      <Experience setLocation={setLocation} />

      <div className="px-12 py-10 mx-auto w-full max-w-[1200px] h-full dark:text-gray-50 relative pointer-events-none">
        <h1 className="mb-6 py-4 text-4xl font-bold">台灣天氣預報</h1>

        {weather && (
          transition((style) => (
            <AnimatedWeatherInfo weatherElement={weather} style={style} />
          ))
        )}
      </div>
    </>
  );
}

