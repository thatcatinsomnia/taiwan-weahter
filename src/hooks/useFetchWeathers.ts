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
    parameterValue: string;
  };
};

type ElementName = 'MinT' | 'MaxT' | 'Wx' | 'CI';

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
  wx?: {
    name: string;
    code: string;
  };
  ci?: string;
};

// Wx: 天氣現象
// MaxT: 最高溫度
// MaxT: 最低溫度
// CI: 舒適度
const fetchWeatherData = async () => {
  const REQUIRED_ELEMENT_LIST = ['Wx', 'MaxT', 'MinT', 'CI'];

  const res = await axios.get(`${API_URL}?Authorization=${import.meta.env.VITE_WEATHER_AUTH_KEY}`);
  const data = await res.data;

  const locations: QueryData = data.records.location;

  return locations.map(location => {
    // fiter the elements we need.
    const requiredWeatherElements = location.weatherElement.filter(el => REQUIRED_ELEMENT_LIST.includes(el.elementName));

    const now = new Date();
    
    const timeIndexOfNow = requiredWeatherElements[0].time.findIndex(time => {
      const startTime = new Date(time.startTime);
      const endTime = new Date(time.endTime);

      return isAfter(now, startTime) && isBefore(now, endTime)
    });
    
    // formated weather data, we only need wx, maxT, minT,
    // store minT and maxT in array, so we can use it to display temperature range later.
    return requiredWeatherElements.reduce<FormatedWeather>((total, element) => {
      const elementName = element.elementName;

      // the api may not have the current time data, cause it weather "forecast", the time will be in the future, if so we set index to 0 to get first data
      const elementTime = element.time[timeIndexOfNow] || element.time[0];

      // initlal total['temp'] and ['location'] to prevent error
      total['temp'] = total['temp'] ? total['temp'] : [] as unknown as [string, string];
      total['location'] = total['location'] ? total['location'] : location.locationName;

      if (elementName === 'MinT') {
        total['temp'][0] = `${elementTime.parameter.parameterName} ℃`;
      } else if (elementName === 'MaxT') {
        total['temp'][1] = `${elementTime.parameter.parameterName} ℃`;
      } else if (elementName === 'CI') {
        const lowerCaseElementName = elementName.toLocaleLowerCase() as Lowercase<typeof elementName>;
        total['ci'] = elementTime.parameter.parameterName;
      } else {
        const lowerCaseElementName = elementName.toLocaleLowerCase() as Lowercase<typeof elementName>;

        total[lowerCaseElementName] = {
          name: elementTime.parameter.parameterName,
          code: elementTime.parameter.parameterValue
        };
      }
      
      return total;
    }, {} as FormatedWeather);
  });
};

export default function useFetchWeathers() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['weathers'],
    queryFn: fetchWeatherData,
    staleTime: Infinity,
    retry: 3
  });

  return {
    data,
    error,
    isLoading,
    isError
  };
}
