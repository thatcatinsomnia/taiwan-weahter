import type { TMesh } from '../components/Taiwan';
import { create } from 'zustand';
import locations from '../constants/locations';

type Weather = {
  location?: string;
  temp?: [string, string];
  ci?: string;
  wx?: {
    name: string;
    code: string;
  };
};

type MabyWeather = Weather | null | undefined;
type MabyTMesh = TMesh | null | undefined;

type SelectedCityState = {
  city: MabyTMesh;
  weather: MabyWeather;
};

export const useSelectedCity = create<SelectedCityState>()(set => ({
  city: null,
  weather: null
}));

export const setCity = (city: MabyTMesh, weathers: Weather[] = []) => useSelectedCity.setState(() => {
  if (!city) {
    return {
      city: null,
      weather: null
    };
  }

  const cityName = locations[city?.name as keyof typeof locations];
  const cityWeather = weathers?.find(weather => weather.location === cityName);
  
  return {
    city,
    weather: cityWeather
  };
});
