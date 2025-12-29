export default function WeatherIcon({ code, size = 64 }) {
  // Mapping Open-Meteo ke Visual
  const isRain = [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code);
  const isCloudy = [1, 2, 3, 45, 48].includes(code);
  const isClear = code === 0;

  return (
    <div style={{ width: size, height: size }} className="flex items-center justify-center">
      {isClear && (
        <svg viewBox="0 0 64 64" className="drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">
          <circle cx="32" cy="32" r="18" fill="#FBBF24" />
        </svg>
      )}
      {isCloudy && (
        <svg viewBox="0 0 64 64">
          <circle cx="24" cy="28" r="12" fill="#FBBF24" opacity="0.4" />
          <path d="M46 45a14 14 0 10-20-20 14 14 0 0020 20z" fill="#94a3b8" />
          <path d="M30 45a12 12 0 100-24 12 12 0 000 24z" fill="#cbd5e1" />
        </svg>
      )}
      {isRain && (
        <svg viewBox="0 0 64 64">
          <path d="M46 35a14 14 0 10-28 0c0 8 6 8 14 8s14 0 14-8z" fill="#64748b" />
          <path d="M26 45l-2 8 M34 45l-2 8" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )}
      {!isClear && !isCloudy && !isRain && <span style={{ fontSize: size/2 }}>☁️</span>}
    </div>
  );
}