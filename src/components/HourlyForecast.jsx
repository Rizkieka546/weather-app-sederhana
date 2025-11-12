export default function HourlyForecast({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col w-full bg-white dark:bg-gray-700/20 p-5 rounded-xl">
        <p className="font-bold text-sm dark:text-gray-400 mb-3">
          PRAKIRAAN CUACA HARI INI
        </p>
        <p className="text-gray-500 text-sm">Tidak ada data tersedia.</p>
      </div>
    );
  }

  // Ambil semua 24 jam (biasanya 0–23 dari WeatherAPI)
  const filteredData = data.slice(0, 24);

  return (
    <div className="flex flex-col w-full bg-white dark:bg-gray-700/20 p-5 rounded-xl">
      <p className="font-bold text-sm dark:text-gray-400 mb-3">
        PRAKIRAAN CUACA HARI INI (24 JAM)
      </p>

      <div
        className="
          grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10
          gap-3 justify-items-center
        "
      >
        {filteredData.map((hour, index) => {
          // Ambil jam saja, contoh: "2025-11-12 14:00" → "14:00"
          const timeLabel = hour.time
            ? hour.time.split(" ")[1].slice(0, 5)
            : `${index}:00`;

          return (
            <div
              key={index}
              className="
                flex flex-col items-center justify-center
                bg-white dark:bg-gray-700/30
                border border-gray-300 dark:border-gray-600
                rounded-md p-3 w-[70px]
                transition-all duration-200 hover:shadow-md hover:-translate-y-1
              "
            >
              <p className="text-[10px] sm:text-xs dark:text-gray-400 font-semibold">
                {timeLabel}
              </p>
              <img
                src={`https:${hour.condition.icon}`}
                alt={hour.condition.text}
                className="w-7 h-7 my-1"
                loading="lazy"
              />
              <p className="text-sm dark:text-gray-200 font-bold">
                {Math.round(hour.temp_c)}°C
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
