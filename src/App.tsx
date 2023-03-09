import type { ChangeEvent } from 'react';
import type { TMesh } from './components/Taiwan';
import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { animated, useTransition } from '@react-spring/web'
import { Stats } from '@react-three/drei';
import Select from './components/Select';
import Experience from './components/Experience';
import WeatherInfo from './components/WeatherInfo';
import { Leva } from 'leva';
import useFetchWeathers from './hooks/useFetchWeathers';
import { useSelectedCity } from './hooks/useSelectedCity';
import locations from './constants/locations';

const AnimatedWeatherInfo = animated(WeatherInfo);

export default function App() {
  const { data, isLoading, error } = useFetchWeathers();
  const { weather, setWeather, selectedCity, setSelectedCity } = useSelectedCity();
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

  useEffect(() => {
    if (isLoading || !data) {
      return;
    }
    
    const locationChinese = locations[selectedCity?.name as keyof typeof locations]
    const locationWeather = data.find(d => d.location === locationChinese);

    if (locationWeather) {
      setWeather(locationWeather);
    } else {
      setWeather(undefined);
    }
  }, [selectedCity]);

  const onSelectCity = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!taiwanRef.current) {
      return;
    }
    
    const cityName = e.target.value;

    if (!cityName) {
      setSelectedCity(undefined);
    }
    
    const foundMesh = taiwanRef.current.children.find(mesh => mesh.name === cityName);

    if (foundMesh) {
      setSelectedCity(foundMesh as TMesh);
    } 
  };

  return (
    <>
      <Leva flat collapsed hidden />
      <Stats />

      <Experience taiwanRef={taiwanRef} />

      <div className="p-6 md:p-10 mx-auto w-full max-w-[1200px] h-full dark:text-gray-50 relative pointer-events-none">
        <h1 className="mb-6 md:py-4 text-center md:text-left text-3xl md:text-4xl font-bold">台灣天氣預報</h1>

        <Select onChange={onSelectCity} title="selected city" value={selectedCity?.name || ''}>
          <option value="">請選擇城市...</option>
          <option value="KeelungCity">基隆市</option>
          <option value="TaipeiCity">臺北市</option>
          <option value="NewTaipeiCity">新北市</option>
          <option value="TaoyuanCountry">桃園市</option>
          <option value="HsinchuCity">新竹市</option>
          <option value="HsinchuCountry">新竹縣</option>
          <option value="MiaoliCountry">苗栗縣</option>
          <option value="TaichungCity">臺中市</option>
          <option value="ChanghuaCountry">彰化縣</option>
          <option value="NantouCountry">南投縣</option>
          <option value="YunlinCountry">雲林縣</option>
          <option value="ChiayiCity">嘉義市</option>
          <option value="ChiayiCountry">嘉義縣</option>
          <option value="TainanCity">臺南市</option>
          <option value="KaohsiungCity">高雄市</option>
          <option value="PingtungCountry">屏東縣</option>
          <option value="TaitungCountry">臺東縣</option>
          <option value="HualienCountry">花蓮縣</option>
          <option value="YilanCountry">宜蘭縣</option>
          <option value="PenghuCountry">澎湖縣</option>
          <option value="KinmenCountry">金門縣</option>
          <option value="LienchiangCountry">連江縣</option>
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

