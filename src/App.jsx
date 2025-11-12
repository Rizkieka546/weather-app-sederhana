import { useState, useEffect } from "react";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import WeatherStats from "./components/WeatherStats";
import WeeklyForecast from "./components/WeeklyForecast";
import ThemeToggle from "./components/ThemeToggle";
import { CloudSun, CloudOff } from "lucide-react";

const API_KEY = "81ea851bc35147fbb6041943251211"; // pastikan key aktif dari WeatherAPI

export default function App() {
  const [city, setCity] = useState("Cianjur");
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchWeatherData(cityName) {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=7&aqi=no&alerts=no&lang=id`
      );
      if (!res.ok) throw new Error("Kota tidak ditemukan atau API key salah.");
      const data = await res.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      setCity(search);
      setSearch("");
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-gray-900 min-h-screen p-4 md:p-8">
      {/* Navbar */}
      <nav className="flex w-full items-center justify-between p-4 md:p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <form onSubmit={handleSearch} className="flex w-3/4 md:w-1/2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Masukkan nama kota"
            className="w-full p-3 pl-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all duration-200"
          />
          <button
            type="submit"
            className="px-4 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition"
          >
            Cari
          </button>
        </form>
        <ThemeToggle />
      </nav>

      {/* 🌩️ Kondisi Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center mt-32 animate-pulse">
          <CloudSun className="w-16 h-16 text-blue-400 animate-spin-slow" />
          <p className="text-gray-500 mt-3 text-sm">Memuat data cuaca...</p>
        </div>
      )}

      {/* 🚫 Jika Error atau Tidak Ada Kota */}
      {!loading && error && (
        <div className="flex flex-col items-center justify-center mt-32 text-center">
          <CloudOff className="w-16 h-16 text-gray-400 mb-3 animate-bounce" />
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      )}

      {/* Konten utama */}
      {weatherData && !loading && (
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          {/* Bagian kiri */}
          <div className="flex-[2] flex flex-col rounded-xl space-y-6 p-6 shadow-lg bg-white dark:bg-gray-800">
            <CurrentWeather
              city={weatherData.location.name}
              temp={`${weatherData.current.temp_c}°C`}
              chanceRain={weatherData.forecast.forecastday[0].day.daily_chance_of_rain}
              icon={`https:${weatherData.current.condition.icon}`}
              condition={weatherData.current.condition.text}
            />

            <HourlyForecast data={weatherData.forecast.forecastday[0].hour} />

            <WeatherStats
              stats={{
                "Kelembapan": `${weatherData.current.humidity}%`,
                "Kecepatan Angin": `${weatherData.current.wind_kph} km/h`,
                "UV Index": `${weatherData.current.uv}`,
              }}
            />
          </div>

          {/* Bagian kanan */}
          <WeeklyForecast
            data={weatherData.forecast.forecastday.map((d) => ({
              day: new Date(d.date).toLocaleDateString("id-ID", { weekday: "short" }),
              weather: d.day.condition.text,
              temp: `${Math.round(d.day.maxtemp_c)}/${Math.round(d.day.mintemp_c)}°C`,
              icon: `https:${d.day.condition.icon}`,
            }))}
          />
        </div>
      )}
    </div>
  );
}
