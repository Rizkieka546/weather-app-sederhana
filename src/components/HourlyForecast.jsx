import WeatherIcon from "./WeatherIcon";

export default function HourlyForecast({ hourly }) {
  const next24Hours = hourly.time.slice(0, 24);

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
      {next24Hours.map((time, i) => (
        <div 
          key={i} 
          className="flex-shrink-0 flex flex-col items-center p-4 rounded-3xl bg-white/30 dark:bg-white/5 border border-white/20 min-w-[90px]"
        >
          <p className="text-xs font-bold opacity-60 mb-3">{time.split("T")[1]}</p>
          <WeatherIcon code={hourly.weather_code[i]} size={32} />
          <p className="text-lg font-bold mt-3">{Math.round(hourly.temperature_2m[i])}°</p>
        </div>
      ))}
    </div>
  );
}