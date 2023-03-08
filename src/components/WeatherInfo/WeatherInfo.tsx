
type Weather = {
  location?: string;
  temp?: [string, string];
  wx?: {
    name: string;
    code: string;
  };
  ci?: string;
};

type Props = {
  weather?: Weather;
};

export default function WeatherInfo({ weather, ...delegated }: Props ) {
  const temperatureRange = `${weather?.temp?.[0]} ~ ${weather?.temp?.[1]}`;

  return (
    <div className="p-10 max-md:mx-auto max-w-[440px] w-full flex flex-col gap-4 dark:bg-neutral-900/80 rounded-lg shadow-lg backdrop-blur" {...delegated}>
      <div>
        <h2 className="text-3xl">{weather?.location}</h2> 
        <p className="text-md italic text-gray-500">{weather?.ci}</p>
      </div>

      <p className="text-4xl">{temperatureRange}</p>
      <p className="text-2xl">{weather?.wx?.name}</p>
    </div>
  );
}
