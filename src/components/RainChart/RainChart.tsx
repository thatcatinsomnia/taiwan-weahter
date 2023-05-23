import type { FormattedData, HourType } from '../../hooks/useFetchRain';
import { useState, useMemo } from 'react';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

type Props = {
  data: FormattedData[];
  selectedHour: HourType
};

export default function RainChart({ data, selectedHour }: Props) {
  const [angle, setAngle] = useState(-45);
  const [fontSize, setFontSize] = useState(14);

  const memoData = useMemo(() => [...data], [data, selectedHour]);

  const handleResize = (width: number, height: number) => {
    if (width <= 600) {
      setFontSize(12);
      setAngle(-90);
    } else {
      setFontSize(14);
      setAngle(-45);
    }
  };
  
  return (
      <ResponsiveContainer 
        className="dark:bg-neutral-900/80 rounded"
        width="100%"
        height={600}
        onResize={handleResize}
      >
        <BarChart
          data={memoData}
          margin={{
            top: 30,
            right: 30,
            bottom: 30
          }}
        >
          <Tooltip
            wrapperClassName='rounded'
            labelClassName='text-gray-600'
            formatter={(value) => `${value} mm`}
            cursor={{ fill: '#272a34' }}
          />

          <XAxis 
            name="縣市"
            dataKey="city"
            padding={{
              right: 12,
              left: 12
            }}
            tick={{
              fill: '#d6d7df',
              fontSize: fontSize,
            }}
            interval={0}
            angle={angle}
            textAnchor="end"
          />

          <YAxis
            tick={{
              fill: '#d6d7df',
            }}
          />
          
          <Bar
            name="降雨量"
            dataKey={selectedHour}
            fill="#41568d"
          />
        </BarChart>
      </ResponsiveContainer>
  );
}