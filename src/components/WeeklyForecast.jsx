export default function WeeklyForecast({ data }) {
    return (
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-700/20 rounded-xl p-4 shadow-lg border border-gray-400 dark:border-none">
            <p className="font-bold text-sm dark:text-gray-500 mb-4">PRAKIRAAN CUACA 7 HARI KEDEPAN</p>

            {data.map((forecast, index) => (
                <div
                    key={index}
                    className="flex justify-between items-center bg-white dark:bg-gray-800/40 rounded-lg p-4 mb-3 shadow-sm transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg opacity-0 translate-y-3 animate-card border border-gray-400 dark:border-none"
                    style={{ animationDelay: `${index * 100}ms` }}
                >

                    <div className="flex items-center gap-2">
                        <p className="text-xs font-bold dark:text-gray-300">{forecast.day}</p>
                        <img src={forecast.icon} alt="Weather icon" className="w-6 h-6" loading="lazy" />
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="text-xs font-bold dark:text-gray-300">{forecast.weather}</p>
                        <p className="text-xs font-bold dark:text-gray-400">{forecast.temp}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
