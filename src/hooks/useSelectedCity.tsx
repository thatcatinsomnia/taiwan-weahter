import type { ReactNode, Dispatch, SetStateAction } from 'react';
import type { TMesh } from '../components/Taiwan';
import { useContext, createContext, useState } from 'react';

type Weather = {
  location?: string;
  temp?: [string, string];
  ci?: string;
  wx?: {
    name: string;
    code: string;
  };
};

type Context = {
  selectedCity: TMesh | undefined;
  setSelectedCity: Dispatch<SetStateAction<TMesh | undefined>>;
  weather: Weather | undefined;
  setWeather: Dispatch<SetStateAction<Weather | undefined>>;
};

type Props = {
  children: ReactNode;
};

const CityContext = createContext<Context | undefined>(undefined);

export function SelectedCityProvider({ children }: Props) {
  const [selectedCity, setSelectedCity] = useState<TMesh>();
  const [weather, setWeather] = useState<Weather>();

  const value = {
    selectedCity,
    setSelectedCity,
    weather,
    setWeather
  };

  return (
    <CityContext.Provider value={value}>
      {children}
    </CityContext.Provider>
  );
}

export function useSelectedCity() {
  const context = useContext(CityContext);

	if (context === undefined) {
		throw new Error('city context must be used with provider');
	}

	return context;
}