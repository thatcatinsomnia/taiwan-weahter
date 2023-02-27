type WeatherElement = {
  location?: string;
  temp?: [string, string];
  wx?: string;
  ci?: string;
};

type Props = {
  weatherElement?: WeatherElement;
};

export default function WeatherInfo({ weatherElement }: Props ) {
  const temperatureRange = `${weatherElement?.temp?.[0]} ~ ${weatherElement?.temp?.[1]}`;

  return (
    <div className="p-8 w-[440px] flex flex-col gap-4 dark:bg-neutral-900 rounded-lg shadow-lg backdrop-blur">
      <div>
        <h2 className="text-3xl">{weatherElement?.location}</h2> 
        <p className="text-md italic text-gray-500">{weatherElement?.ci}</p>
      </div>

      <p className="text-4xl">{temperatureRange}</p>
    </div> 
  );
}
