import { useQuery } from '@tanstack/react-query';
import locations from '../constants/locations';
import axios from 'axios';
import { isBefore, isAfter } from 'date-fns';

const API_URL = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001';

type LocationName = typeof locations[keyof typeof locations];

type WeatherTime = {
  startTime: string;
  endTime: string;
  parameter: {
    parameterName: string;
    parameterUnit: string;
  };
};

type ElementName = 'MinT' | 'MaxT' | 'Wx' | 'PoP' | 'CI';

type WeatherElement = {
  elementName: ElementName;
  time: WeatherTime[];
};

type Location = {
  locationName: LocationName;
  weatherElement: WeatherElement[];
};

type QueryData = Location[];

type FormatedWeather = {
  location?: string;
  temp?: [string, string];
  wx?: string;
};

const fetchWeatherData = async () => {
  const res = await axios.get(`${API_URL}?Authorization=${import.meta.env.VITE_WEATHER_AUTH_KEY}`);
  const data = await res.data;

  const locations: QueryData = data.records.location;

  return locations.map(location => {
    // fiter the elements we need.
    const requiredWeatherElements = location.weatherElement.filter(el => el.elementName === 'Wx' || el.elementName === 'MaxT' || el.elementName === 'MinT');

    const now = new Date();
    const timeIndexOfNow = requiredWeatherElements[0].time.findIndex(time => isAfter(now, new Date(time.startTime)) && isBefore(now, new Date(time.endTime)));

    // formated weather data, we only need wx, maxT, minT,
    // store minT and maxT in array, so we can use it to display temperature range later.
    return requiredWeatherElements.reduce<FormatedWeather>((total, element) => {
      const elementName = element.elementName;
      const elementTime = element.time[timeIndexOfNow];

      // initlal total['temp'] and ['location'] to prevent error
      total['temp'] = total['temp'] ? total['temp'] : [] as unknown as [string, string];
      total['location'] = total['location'] ? total['location'] : location.locationName;

      if (elementName === 'Wx') {
        total['wx'] = elementTime.parameter.parameterName;
      } else if (elementName === 'MinT') {
        total['temp'][0] = `${elementTime.parameter.parameterName} ℃`;
      } else {
        total['temp'][1] = `${elementTime.parameter.parameterName} ℃`;
      }
      
      return total;
    }, {} as FormatedWeather);
  });
};

export default function useWeather() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['weathers'],
    queryFn: fetchWeatherData,
    staleTime: Infinity
  });

  return {
    data,
    error,
    isLoading,
    isError
  };
}
