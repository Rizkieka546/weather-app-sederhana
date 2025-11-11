export default function HourlyForecast({ data }) {
  return (
    <div className="flex flex-col w-full bg-white dark:bg-gray-700/20 p-5 rounded-xl">
      
      <p className="font-bold text-sm dark:text-gray-500 mb-3">PRAKIRAAN CUACA HARI INI</p>

      <div
        className="
          flex gap-2
          overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar
          py-1 justify-around
        "
      >
        {data.map((hour, index) => (
          <div
            key={index}
            className="
              snap-start
              flex-shrink-0
              min-w-[65px]
              bg-white dark:bg-gray-700/30
              rounded-md border border-gray-400 dark:border-gray-600
              flex flex-col items-center justify-center
              p-4
              transition-all duration-200
              hover:shadow-md hover:-translate-y-1
            "
          >
            <p className="text-[10px] sm:text-xs dark:text-gray-400 font-semibold">{hour.time}</p>
            <img src={hour.icon} alt="icon" className="w-5 h-5 my-1" loading="lazy" />
            <p className="text-sm dark:text-gray-200 font-bold">{hour.temp}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
