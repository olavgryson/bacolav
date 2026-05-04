export default function BottleSvg() {
  return (
    <svg viewBox="0 0 90 260" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bottleGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1a0a05" />
          <stop offset="30%" stopColor="#3d1a08" />
          <stop offset="60%" stopColor="#6b2e0f" />
          <stop offset="85%" stopColor="#3d1a08" />
          <stop offset="100%" stopColor="#1a0a05" />
        </linearGradient>
        <linearGradient id="labelGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8B0000" />
          <stop offset="50%" stopColor="#CC1414" />
          <stop offset="100%" stopColor="#8B0000" />
        </linearGradient>
        <linearGradient id="glassShine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="25%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="45%" stopColor="rgba(255,255,255,0.15)" />
          <stop offset="55%" stopColor="rgba(255,255,255,0.05)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
        <linearGradient id="liquidGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3d1a08" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#1a0805" stopOpacity="0.95" />
        </linearGradient>
        <clipPath id="bottleClip">
          <path d="M30,50 C24,58 18,68 16,82 L14,200 Q14,214 22,220 L68,220 Q76,214 76,200 L74,82 C72,68 66,58 60,50 L58,30 C58,24 52,20 45,20 C38,20 32,24 32,30 Z" />
        </clipPath>
      </defs>

      <rect x="36" y="8" width="18" height="5" rx="2" fill="#2a1006" />
      <rect x="33" y="4" width="24" height="8" rx="3" fill="#CC1414" />
      <rect x="35" y="2" width="20" height="4" rx="2" fill="#e01818" />

      <path
        d="M30,50 C24,58 18,68 16,82 L14,200 Q14,214 22,220 L68,220 Q76,214 76,200 L74,82 C72,68 66,58 60,50 L58,30 C58,24 52,20 45,20 C38,20 32,24 32,30 Z"
        fill="url(#bottleGrad)"
      />
      <rect x="15" y="110" width="60" height="108" fill="url(#liquidGrad)" clipPath="url(#bottleClip)" />
      <rect x="17" y="115" width="56" height="80" rx="2" fill="url(#labelGrad)" />
      <rect x="18" y="116" width="54" height="78" rx="1.5" fill="none" stroke="#FFD700" strokeWidth="1" />
      <rect
        x="20"
        y="118"
        width="50"
        height="74"
        rx="1"
        fill="none"
        stroke="#FFD700"
        strokeWidth="0.4"
        strokeDasharray="2,2"
      />

      <text x="45" y="145" textAnchor="middle" fontFamily="'Bebas Neue', sans-serif" fontSize="14" fill="#FFD700" letterSpacing="1">
        BACOLAV
      </text>
      <text x="45" y="160" textAnchor="middle" fontFamily="Arial" fontSize="5" fill="rgba(255,230,180,0.8)" letterSpacing="0.5">
        RUM &amp; COLA
      </text>
      <line x1="22" y1="164" x2="68" y2="164" stroke="#FFD700" strokeWidth="0.5" strokeOpacity="0.6" />
      <text x="45" y="178" textAnchor="middle" fontFamily="'Bebas Neue', sans-serif" fontSize="11" fill="#FFD700">
        60% VOL
      </text>

      <circle cx="45" cy="131" r="6" fill="none" stroke="rgba(255,215,0,0.4)" strokeWidth="0.5" />
      <text x="45" y="134" textAnchor="middle" fontFamily="Arial" fontSize="7" fill="rgba(255,215,0,0.5)">
        🦇
      </text>

      <path
        d="M30,50 C24,58 18,68 16,82 L14,200 Q14,214 22,220 L68,220 Q76,214 76,200 L74,82 C72,68 66,58 60,50 L58,30 C58,24 52,20 45,20 C38,20 32,24 32,30 Z"
        fill="url(#glassShine)"
      />
      <path
        d="M28,55 C26,65 25,80 25,95 L25,180"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
