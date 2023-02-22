import { useEffect } from "react";

export default function WeatherInfo() {
  return (
    <div className="w-full dark:text-gray-50">
      <h1 className="py-4 text-4xl font-bold">台灣天氣預報</h1>

      <div className="px-10 py-16 mt-20 text-2xl space-y-4 dark:bg-neutral-900 rounded-lg shadow-lg backdrop-blur">
        <h2 className="text-4xl">台北市</h2> 
        <small className="py-0.5">稍有寒意至舒適</small>
        <p className="text-4xl">18˚C ~ 23˚C</p>
        <p>降雨機率：100%</p>
      </div> 
    </div>
  );
}
