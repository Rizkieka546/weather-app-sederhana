import { useState, useEffect, useRef, useCallback } from "react";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import WeatherStats from "./components/WeatherStats";
import WeeklyForecast from "./components/WeeklyForecast";
import ThemeToggle from "./components/ThemeToggle";
import { Search, MapPin, Loader2, X, AlertCircle, CloudRain } from "lucide-react";

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dropdownRef = useRef(null);

  const fetchWeather = useCallback(async (lat, lon, cityName) => {
    setLoading(true);
    setError(null);
    setShowSuggestions(false);
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
      );
      
      if (!res.ok) throw new Error("Gagal mengambil data dari server.");
      
      const data = await res.json();
      setWeatherData({ ...data, cityName });
      setSearch(""); 
    } catch (err) {
      setError("Gagal memuat data cuaca. Periksa koneksi internet Anda.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (search.trim().length < 3) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=5&language=id&format=json`
        );
        const data = await res.json();
        setSuggestions(data.results || []);
      } catch (err) {
        console.error("Geocoding error", err);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    fetchWeather(-6.2088, 106.8456, "Jakarta");
  }, [fetchWeather]);

  return (
    <div className="min-h-screen transition-colors duration-700 bg-[#f8fafc] dark:bg-[#020617] text-slate-800 dark:text-slate-100 p-4 md:p-10 font-sans overflow-x-hidden">
      
      <div className="fixed -top-24 -right-24 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed -bottom-24 -left-24 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        <header className="relative z-[100] flex flex-col md:flex-row gap-6 items-center justify-between mb-10 p-6 rounded-[2.5rem] bg-white/60 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
          
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-2xl shadow-xl shadow-blue-500/30">
              <MapPin className="text-white" size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Lokasi Sekarang</p>
              <h1 className="text-2xl font-black leading-none">{weatherData?.cityName || "---"}</h1>
            </div>
          </div>

          <div className="relative w-full md:w-1/2" ref={dropdownRef}>
            <div className="relative">
              <input
                type="text"
                value={search}
                onFocus={() => setShowSuggestions(true)}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari Kota (min. 3 karakter)..."
                className="w-full p-4 pl-12 pr-10 rounded-2xl bg-white/80 dark:bg-black/40 border border-white dark:border-white/5 focus:outline-none focus:ring-4 ring-blue-500/20 transition-all backdrop-blur-md shadow-inner text-sm md:text-base"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              {search && (
                <button 
                  onClick={() => setSearch("")} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-3 p-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl border border-white dark:border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-[110] animate-in fade-in slide-in-from-top-2 duration-300">
                {suggestions.map((item, i) => (
                  <button
                    key={`${item.latitude}-${i}`}
                    onClick={() => fetchWeather(item.latitude, item.longitude, item.name)}
                    className="w-full text-left p-4 hover:bg-blue-600 hover:text-white rounded-2xl transition-all flex items-center justify-between group"
                  >
                    <div>
                      <p className="font-bold text-sm">{item.name}</p>
                      <p className="text-[10px] opacity-60 group-hover:opacity-100">
                        {item.admin1 ? `${item.admin1}, ` : ""}{item.country}
                      </p>
                    </div>
                    <span className="text-[10px] px-2 py-1 bg-slate-100 dark:bg-white/10 rounded-lg group-hover:bg-white/20 uppercase font-bold">Kota</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <ThemeToggle />
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
            <Loader2 className="animate-spin text-blue-500" size={56} />
            <p className="font-bold animate-pulse opacity-50 tracking-widest uppercase text-xs">Menyelaraskan Data...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center p-6 bg-white/20 dark:bg-white/5 rounded-[3rem] backdrop-blur-md border border-red-500/20">
            <AlertCircle className="text-red-500 mb-4" size={64} />
            <h2 className="text-2xl font-black mb-2">Terjadi Kesalahan</h2>
            <p className="opacity-60 max-w-sm mb-6">{error}</p>
            <button 
              onClick={() => fetchWeather(-6.2088, 106.8456, "Jakarta")}
              className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/40 hover:scale-105 transition-transform"
            >
              Coba Lagi
            </button>
          </div>
        ) : weatherData && (
          <main className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            
            <div className="lg:col-span-2 space-y-8">
              
              <div className="p-10 rounded-[3rem] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white shadow-[0_32px_64px_-12px_rgba(37,99,235,0.4)] relative overflow-hidden group">
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 blur-[80px] rounded-full group-hover:scale-110 transition-transform duration-1000"></div>
                <CurrentWeather 
                  temp={weatherData.current.temperature_2m} 
                  code={weatherData.current.weather_code}
                  feel={weatherData.current.apparent_temperature}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <WeatherStats 
                  humidity={weatherData.current.relative_humidity_2m}
                  wind={weatherData.current.wind_speed_10m}
                />
              </div>

              <div className="p-8 rounded-[3rem] bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 shadow-xl">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] opacity-40">Alur Waktu Per Jam</h3>
                  <div className="h-[2px] flex-1 bg-slate-200 dark:bg-white/10 mx-6"></div>
                </div>
                <HourlyForecast hourly={weatherData.hourly} />
              </div>
            </div>

            <aside className="p-8 rounded-[3rem] bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white dark:border-white/10 shadow-xl self-start h-full lg:sticky lg:top-10">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] opacity-40 mb-10 text-center lg:text-left">Agenda Cuaca 7 Hari</h3>
              <WeeklyForecast daily={weatherData.daily} />
              
              <div className="mt-10 p-6 rounded-3xl bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-center gap-3 mb-2 text-blue-500">
                  <CloudRain size={20} />
                  <span className="font-bold text-sm">Saran Hari Ini</span>
                </div>
                <p className="text-xs opacity-70 leading-relaxed">
                  {weatherData.current.weather_code > 50 
                    ? "Hujan terdeteksi. Jangan lupa sedia payung sebelum keluar rumah!" 
                    : "Cuaca cukup bersahabat untuk aktivitas luar ruangan."}
                </p>
              </div>
            </aside>
            
          </main>
        )}

        <footer className="mt-10 mb-6 text-center opacity-30 text-[10px] font-bold tracking-[0.5em] uppercase">
          Powered by Open-Meteo & Lucide Icons
        </footer>
      </div>
    </div>
  );
}