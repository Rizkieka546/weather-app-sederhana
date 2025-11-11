export default function WeatherStats({ stats }) {
    return (
        <div className="flex justify-between mt-6">
            {Object.entries(stats).map(([key, value], index) => (
                <div
                    key={index}
                    className="flex flex-col items-center dark:bg-gray-700/20 rounded-lg p-4 flex-1 mx-1
                    transition-all duration-300 transform hover:scale-105 hover:shadow-md opacity-0 translate-y-3 animate-card border border-gray-400 dark:border-none "
                    style={{ animationDelay: `${index * 120}ms` }}
                >

                    <p className="text-xs text-gray-800 dark:text-gray-400">{key}</p>
                    <p className="text-lg font-bold text-gray-700 dark:text-white">{value}</p>
                </div>
            ))}
        </div>
    );
}
