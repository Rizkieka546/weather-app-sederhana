import Navbar from "./components/Navbar";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import WeatherStats from "./components/WeatherStats";
import WeeklyForecast from "./components/WeeklyForecast";
import ThemeToggle from "./components/ThemeToggle";

// API_KEY = ed73eedf8dd575ebccfbf5a278e5d75f
// https://api.weatherapi.com/v1/forecast.json?key=API_KEY&q=Cianjur&days=7&aqi=no&alerts=no

const weeklyForecast = [
  { day: "Sen", weather: "Cerah", temp: "36/22", icon: "/assets/cloud.png" },
  { day: "Sel", weather: "Berawan", temp: "34/21", icon: "/assets/cloud.png" },
  { day: "Rab", weather: "Hujan", temp: "30/20", icon: "/assets/cloud.png" },
  { day: "Kam", weather: "Cerah", temp: "35/23", icon: "/assets/cloud.png" },
  { day: "Jum", weather: "Hujan", temp: "29/21", icon: "/assets/cloud.png" },
  { day: "Sab", weather: "Berawan", temp: "33/22", icon: "/assets/cloud.png" },
  { day: "Min", weather: "Cerah", temp: "36/24", icon: "/assets/cloud.png" },
];


const hourlyForecast = [
  { time: "6:00 AM", temp: "31°", icon: "/assets/cloud.png" },
  { time: "9:00 AM", temp: "33°", icon: "/assets/cloud.png" },
  { time: "12:00 PM", temp: "36°", icon: "/assets/cloud.png" },
  { time: "3:00 PM", temp: "35°", icon: "/assets/cloud.png" },
  { time: "6:00 PM", temp: "32°", icon: "/assets/cloud.png" },
  { time: "9:00 PM", temp: "30°", icon: "/assets/cloud.png" },
  { time: "12:00 AM", temp: "28°", icon: "/assets/cloud.png" },
];

export default function App() {
  return (
    <div className="bg-slate-50 dark:bg-gray-900 min-h-screen p-4 md:p-8">
      <nav className="flex w-full items-center justify-between p-4 md:p-8 bg-white dark:bg-gray-900 rounded-lg">
        <input
          type="text"
          placeholder="Masukkan nama kota"
          className="w-1/2 p-3 pl-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 transition-all duration-200"
        />
        <ThemeToggle />
      </nav>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Bagian Kiri - 2/3 */}
        <div className="flex-[2] flex flex-col rounded-xl space-y-6 p-6 shadow-lg ">
          <CurrentWeather city="Cianjur" temp="31°" chanceRain={0} icon="/assets/cloud.png" />
          <HourlyForecast data={hourlyForecast} />
          <WeatherStats stats={{ "Kelembapan udara": "60%", "Kecepatan angin": "12 km/h", "UV Index": "5" }} />
        </div>

        {/* Bagian Kanan - 1/3 */}
        <WeeklyForecast data={weeklyForecast} />
      </div>
    </div>
  );
}
