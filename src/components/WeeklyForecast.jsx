import WeatherIcon from "./WeatherIcon";

export default function WeeklyForecast({ daily }) {
  return (
    <div className="space-y-6">
      {daily.time.map((date, i) => {
        const dayName = new Date(date).toLocaleDateString("id-ID", { weekday: "long" });
        return (
          <div key={i} className="flex items-center justify-between group">
            <p className="w-24 font-bold text-sm opacity-70 group-hover:opacity-100 transition-opacity">
              {i === 0 ? "Hari Ini" : dayName}
            </p>
            <WeatherIcon code={daily.weather_code[i]} size={32} />
            <div className="flex gap-3 w-20 justify-end">
              <span className="font-bold">{Math.round(daily.temperature_2m_max[i])}°</span>
              <span className="opacity-40">{Math.round(daily.temperature_2m_min[i])}°</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}