import WeatherIcon from "./WeatherIcon";

export default function CurrentWeather({ temp, code, feel }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center relative z-10">
      <div className="text-center md:text-left">
        <p className="text-lg font-medium opacity-80 mb-2">Hari Ini</p>
        <h2 className="text-8xl md:text-9xl font-black tracking-tighter mb-4">
          {Math.round(temp)}°
        </h2>
        <p className="text-xl font-medium">Terasa seperti {Math.round(feel)}°</p>
      </div>
      <div className="mt-10 md:mt-0 flex flex-col items-center">
        <WeatherIcon code={code} size={180} />
        <p className="text-2xl font-bold mt-4 capitalize">
          {getWeatherDesc(code)}
        </p>
      </div>
    </div>
  );
}

function getWeatherDesc(code) {
  const map = { 0: "Cerah", 1: "Cerah Berawan", 2: "Berawan", 3: "Mendung", 45: "Kabut", 61: "Hujan Ringan", 95: "Badai Petir" };
  return map[code] || "Berawan";
}