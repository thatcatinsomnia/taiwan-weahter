import type { ChangeEvent } from 'react';
import type { HourType } from '../hooks/useFetchRain';
import { useState } from 'react';
import Select from '../components/Select';
import useRainData from '../hooks/useFetchRain';
import BaseLayout from '../components/BaseLayout';
import PageTitle from '../components/PageTitle';
import RainChart from '../components/RainChart';


export default function Rains() {
  const { data, isLoading, error } = useRainData();
  const [selectedHour, setSelectedHour] = useState<HourType>('hour_6');

  if (isLoading) {
    return (
      <BaseLayout>
        <PageTitle>降雨量</PageTitle>
        <p className="mb-2 h-12 w-[200px] dark:bg-neutral-900 rounded animate-pulse"></p>
        <div className="h-[500px] w-full dark:bg-neutral-900 rounded animate-pulse"></div>
      </BaseLayout>
    );
  }

  if (!!error) {
    throw error;
  }

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const hour = e.target.value as HourType;
    setSelectedHour(hour);
  };

  return (
    <BaseLayout>
      <PageTitle>降雨量</PageTitle>
      <Select
        className="w-full sm:w-[200px]"
        onChange={handleChange}
      >
        <option value="hour_6">6 小時</option>
        <option value="hour_12">12 小時</option>
        <option value="hour_24">24 小時</option>
      </Select>

      <RainChart data={data || []} selectedHour={selectedHour} />
    </BaseLayout>
  );
}