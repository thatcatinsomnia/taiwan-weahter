import type { ChangeEvent } from 'react';
import type { TMesh } from './components/Taiwan';
import { useRef, useMemo, Suspense } from 'react';
import { shallow } from 'zustand/shallow';
import * as THREE from 'three';
import { animated, useTransition } from '@react-spring/web';
import { Stats } from '@react-three/drei';
import { Leva } from 'leva';
import BarLoader from 'react-spinners/BarLoader';
import useFetchWeathers from './hooks/useFetchWeathers';
import { useSelectedCity, setCity } from './stores/useCityWeatherStore';
import Select from './components/Select';
import Experience from './components/Experience';
import WeatherInfo from './components/WeatherInfo';
import locations from './constants/locations';
import cityList from './constants/cityList';

const AnimatedWeatherInfo = animated(WeatherInfo);

export default function App() {
  const { data: weathers, isLoading, error } = useFetchWeathers();
  const { city, weather } = useSelectedCity(({ city, weather }) => ({ city, weather }), shallow);
  const taiwanRef = useRef<THREE.Group>(null);
  
  const transition = useTransition(weather ?? [], {
    from: {
      opacity: 0,
      y: 80,
    },
    enter: {
      opacity: 1,
      y: 0
    },
    exitBeforeEnter: true
  });

  const cities = useMemo(() => {
    const cityEnNames = Object.keys(locations);

    return cityList.map(cityCh => {
      const cityEn = cityEnNames.find(CityEn => locations[CityEn as keyof typeof locations] === cityCh);

      return {
        key: cityEn,
        name: cityCh
      }
    });
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-full grid place-items-center text-4xl text-white bg-gray-800">
        <BarLoader color="white" height={6} />
      </div>
    );
  }

  const onSelectCity = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!taiwanRef.current) {
      return;
    }
    
    const cityKey = e.target.value;

    if (!cityKey) {
      setCity(null);
      return;
    }
    
    const foundMesh = taiwanRef.current.children.find(mesh => mesh.name === cityKey) as TMesh;

    if (foundMesh) {
      setCity(foundMesh, weathers);
    } 
  };

  return (
    <>
      <Leva flat collapsed hidden />
      <Stats />

      <Experience taiwanRef={taiwanRef} />

      <div className="p-6 md:p-10 mx-auto w-full max-w-[1200px] h-full dark:text-gray-50 relative pointer-events-none">
        <h1 className="mb-6 md:py-4 text-center md:text-left text-3xl md:text-4xl font-bold">台灣天氣預報</h1>

        <Select onChange={onSelectCity} title="selected city" value={city?.name || ''}>
          <option value="">請選擇城市...</option>
          {cities.map(city => (
            <option key={city.key} value={city.key}>{city.name}</option>
          ))}
        </Select>

        {weather && (
          transition((style) => (
            <AnimatedWeatherInfo weather={weather} style={style} />
          ))
        )}
      </div>
    </>
  );
}

