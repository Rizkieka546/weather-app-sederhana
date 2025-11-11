// src/components/WeatherIcon.jsx
export default function WeatherIcon({ code, size = 50 }) {
  // Warna dasar icon
  const color = "#FBBF24"; // kuning matahari default

  switch (code) {
    case 0: // Clear sky
      return (
        <svg width={size} height={size} viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="16" fill={color} />
        </svg>
      );
    case 1: // Mainly clear
      return (
        <svg width={size} height={size} viewBox="0 0 64 64">
          <circle cx="32" cy="28" r="14" fill={color} />
          <circle cx="40" cy="40" r="14" fill="lightblue" opacity="0.5" />
        </svg>
      );
    case 2: // Partly cloudy
      return (
        <svg width={size} height={size} viewBox="0 0 64 64">
          <circle cx="24" cy="28" r="12" fill={color} />
          <ellipse cx="36" cy="36" rx="16" ry="10" fill="lightgray" />
        </svg>
      );
    case 3: // Overcast
      return <ellipse cx={32} cy={32} rx={24} ry={14} fill="gray" />;
    case 61: // Rain
      return (
        <svg width={size} height={size} viewBox="0 0 64 64">
          <ellipse cx="32" cy="28" rx="20" ry="12" fill="gray" />
          <line x1="24" y1="40" x2="24" y2="52" stroke="blue" strokeWidth="2" />
          <line x1="32" y1="40" x2="32" y2="52" stroke="blue" strokeWidth="2" />
          <line x1="40" y1="40" x2="40" y2="52" stroke="blue" strokeWidth="2" />
        </svg>
      );
    case 71: // Snow
      return (
        <svg width={size} height={size} viewBox="0 0 64 64">
          <ellipse cx="32" cy="28" rx="20" ry="12" fill="lightgray" />
          <text x="32" y="44" textAnchor="middle" fontSize="16" fill="white">❄️</text>
        </svg>
      );
    default:
      return <text>❓</text>;
  }
}
