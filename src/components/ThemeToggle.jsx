import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:ring-2 ring-blue-400 transition-all"
    >
      {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-yellow-400" />}
    </button>
  );
}