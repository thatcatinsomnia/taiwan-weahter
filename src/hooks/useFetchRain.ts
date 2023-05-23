import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export type HourType = 'hour_6' | 'hour_12' | 'hour_24';

type LocationInfo = {
  locationName: string;
  parameter: {
    parameterName: 'CITY';
    parameterValue: string;
  }[];
  weatherElement: {
    elementName: HourType,
    elementValue: string;
  }[];
};

type RainInfo = {
  hour_6: number;
  hour_12: number;
  hour_24: number;
};

export type FormattedData = RainInfo & {
  city: string;
};

const elementNames = ['HOUR_6', 'HOUR_12', 'HOUR_24'];
const stationIds = ['466940' , '466920', '466881', 'C0C480', 'C0D660', '467571', 'C0E750', '467490', 'C0G650', 'C0I460', 'C0K580', '467480', '467530', 'C0X100', '467441', 'C0R170', '467660', '466990', '467080','467350', '467110', '467990'];
const API_URL = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0002-001'

const fetchRainData = async () => {
  const url = `${API_URL}?Authorization=${import.meta.env.VITE_WEATHER_AUTH_KEY}&elementName=${elementNames}&stationId=${stationIds.join(',')}&elementName=HOUR_24&parameterName=CITY`;
  const res = await axios.get(url);
  const { records: { location } } = await res.data;

 const data = location.map((loc: LocationInfo) => {
    // group all rain data to object that has hour_6, hour_12, hour_24
    const rainInfo = loc.weatherElement.reduce((allData, element) => {
    const { elementName, elementValue } = element;
    const hours = elementName.toLowerCase() as HourType;

    allData[hours] = elementValue.includes('-998') ? 0 : Number(elementValue);

    return allData;
    }, {} as RainInfo);

    // return city name and rain data
    return {
      city: loc.parameter[0].parameterValue,
      ...rainInfo
    };
 });

  return data;
};

export default function useFetchRain() {
  const { data, isLoading, error } = useQuery<FormattedData[]>({
    queryKey: ['rains'],
    queryFn: fetchRainData,
    staleTime: Infinity,
    retry: 3
  });

  return {
    data,
    isLoading,
    error
  };
}
