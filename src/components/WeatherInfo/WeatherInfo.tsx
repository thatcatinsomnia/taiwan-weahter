type WeatherElement = {
  location?: string;
  temp?: [string, string];
  wx?: string;
};

type Props = {
  weatherElement?: WeatherElement;
};

export default function WeatherInfo({ weatherElement }: Props ) {
  const temperatureRange = `${weatherElement?.temp?.[0]} ~ ${weatherElement?.temp?.[1]}`;

  return (
    <div className="w-full dark:text-gray-50">
      <h1 className="py-4 text-4xl font-bold">台灣天氣預報</h1>

      <div className="px-10 py-16 mt-20 text-2xl space-y-4 dark:bg-neutral-900 rounded-lg shadow-lg backdrop-blur">
        <h2 className="text-4xl">{weatherElement?.location}</h2> 
        <small className="py-0.5">{weatherElement?.wx}</small>
        <p className="text-4xl">{temperatureRange}</p>
      </div> 
    </div>
  );
}
