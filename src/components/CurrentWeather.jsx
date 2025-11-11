export default function CurrentWeather({ city, temp, chanceRain, icon }) {
  return (
    <div className="flex flex-row justify-between items-center opacity-0 animate-card sm:px-10">
      <div className="flex flex-col">
        <h1 className="text-2xl md:text-5xl font-bold dark:text-white mb-2">{city}</h1>
        <p className="text-sm dark:text-gray-400 mb-4">Pelunag Hujan: {chanceRain}%</p>
        <h2 className="text-2xl md:text-6xl font-bold dark:text-white">{temp}</h2>
      </div>

      <div>
        <img src={icon} alt="Weather icon" className="w-32 h-32 md:w-52 md:h-52 animate-pulse" />
      </div>
    </div>
  );
}
