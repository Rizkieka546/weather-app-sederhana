import { Droplets, Wind, Sun } from "lucide-react";

export default function WeatherStats({ humidity, wind, uv }) {
  const stats = [
    {
      label: "Kelembapan",
      value: `${humidity}%`,
      icon: Droplets,
      accent: "bg-blue-500",
    },
    {
      label: "Angin",
      value: `${wind} km/h`,
      icon: Wind,
      accent: "bg-emerald-500",
    },
    {
      label: "UV",
      value: uv ?? "0",
      icon: Sun,
      accent: "bg-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((item, i) => {
        const Icon = item.icon;

        return (
          <div
            key={i}
            className="relative p-5 rounded-2xl bg-white/50 dark:bg-white/5 backdrop-blur-xl
                       border border-white/30 dark:border-white/10
                       shadow-sm hover:shadow-md transition-all"
          >
            {/* accent bar */}
            <div className={`absolute left-0 top-0 h-full w-1 rounded-l-2xl ${item.accent}`} />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-extrabold leading-none">
                  {item.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest opacity-50">
                  {item.label}
                </p>
              </div>

              <Icon
                size={22}
                className="opacity-30"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
