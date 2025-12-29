import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ onSearch }) {
    const [city, setCity] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (onSearch) onSearch(city);
    };

    return (
        <nav className="flex w-full items-center justify-between p-4 md:px-10 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <h1 className="hidden md:block text-xl font-bold text-blue-600 dark:text-blue-400 mr-4">
                WeatherApp
            </h1>

            <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4 relative group">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Cari nama kota..."
                    className="w-full p-2.5 pl-4 pr-12 border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 transition-all duration-200"
                />
                <button 
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-500 hover:text-blue-500 dark:text-gray-400"
                >
                    🔍
                </button>
            </form>

            <ThemeToggle />
        </nav>
    );
}