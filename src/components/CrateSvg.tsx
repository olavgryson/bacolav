export default function CrateSvg() {
  return (
    <svg
      viewBox="0 0 340 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: 340, height: 220, position: "relative", zIndex: 4 }}
    >
      <defs>
        <linearGradient id="crateTopGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a2d0c" />
          <stop offset="100%" stopColor="#3d1e08" />
        </linearGradient>
        <linearGradient id="crateFrontGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3d1e08" />
          <stop offset="100%" stopColor="#251208" />
        </linearGradient>
        <linearGradient id="crateSideGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1e0e04" />
          <stop offset="100%" stopColor="#3d1e08" />
        </linearGradient>
      </defs>

      <path d="M50,60 L290,60 L320,40 L80,40 Z" fill="url(#crateTopGrad)" stroke="#2a1006" strokeWidth="1" />
      <line x1="80" y1="40" x2="50" y2="60" stroke="#2a1006" strokeWidth="0.8" opacity="0.6" />
      <line x1="140" y1="40" x2="110" y2="60" stroke="#2a1006" strokeWidth="0.8" opacity="0.6" />
      <line x1="200" y1="40" x2="170" y2="60" stroke="#2a1006" strokeWidth="0.8" opacity="0.6" />
      <line x1="260" y1="40" x2="230" y2="60" stroke="#2a1006" strokeWidth="0.8" opacity="0.6" />
      <line x1="320" y1="40" x2="290" y2="60" stroke="#2a1006" strokeWidth="0.8" opacity="0.6" />
      <line x1="80" y1="40" x2="290" y2="60" stroke="#2a1006" strokeWidth="0.8" opacity="0.4" />
      <line x1="113" y1="40" x2="323" y2="43" stroke="#2a1006" strokeWidth="0.5" opacity="0.3" />

      <rect x="50" y="60" width="240" height="130" fill="url(#crateFrontGrad)" stroke="#1a0806" strokeWidth="1" />
      <path d="M290,60 L320,40 L320,170 L290,190 Z" fill="url(#crateSideGrad)" stroke="#1a0806" strokeWidth="1" />

      <line x1="90" y1="60" x2="90" y2="190" stroke="#2a1006" strokeWidth="1.5" opacity="0.7" />
      <line x1="130" y1="60" x2="130" y2="190" stroke="#2a1006" strokeWidth="1.5" opacity="0.7" />
      <line x1="170" y1="60" x2="170" y2="190" stroke="#2a1006" strokeWidth="1.5" opacity="0.7" />
      <line x1="210" y1="60" x2="210" y2="190" stroke="#2a1006" strokeWidth="1.5" opacity="0.7" />
      <line x1="250" y1="60" x2="250" y2="190" stroke="#2a1006" strokeWidth="1.5" opacity="0.7" />
      <line x1="50" y1="100" x2="290" y2="100" stroke="#2a1006" strokeWidth="2" opacity="0.5" />
      <line x1="50" y1="140" x2="290" y2="140" stroke="#2a1006" strokeWidth="2" opacity="0.5" />

      <ellipse cx="90" cy="64" rx="18" ry="7" fill="#1a0805" stroke="#3d1a08" strokeWidth="1" />
      <ellipse cx="130" cy="64" rx="18" ry="7" fill="#1a0805" stroke="#3d1a08" strokeWidth="1" />
      <ellipse cx="170" cy="64" rx="18" ry="7" fill="#0d0503" stroke="#1a0806" strokeWidth="1" strokeDasharray="3,2" opacity="0.5" />
      <ellipse cx="210" cy="64" rx="18" ry="7" fill="#1a0805" stroke="#3d1a08" strokeWidth="1" />
      <ellipse cx="250" cy="64" rx="18" ry="7" fill="#1a0805" stroke="#3d1a08" strokeWidth="1" />

      <ellipse cx="90" cy="63" rx="14" ry="5" fill="#CC1414" />
      <ellipse cx="130" cy="63" rx="14" ry="5" fill="#CC1414" />
      <ellipse cx="210" cy="63" rx="14" ry="5" fill="#CC1414" />
      <ellipse cx="250" cy="63" rx="14" ry="5" fill="#CC1414" />

      <rect x="85" y="108" width="140" height="50" rx="2" fill="none" stroke="#5a2d0c" strokeWidth="1" />
      <text x="155" y="128" textAnchor="middle" fontFamily="'Bebas Neue', sans-serif" fontSize="18" fill="#5a2d0c" letterSpacing="3">
        BACOLAV
      </text>
      <text x="155" y="143" textAnchor="middle" fontFamily="Arial" fontSize="7" fill="#3d1e08" letterSpacing="2">
        RUM &amp; COLA · 24 FLESSEN
      </text>

      <line x1="310" y1="40" x2="310" y2="170" stroke="#1a0806" strokeWidth="1" opacity="0.5" />
      <line x1="290" y1="100" x2="320" y2="105" stroke="#1a0806" strokeWidth="1" opacity="0.4" />
      <line x1="290" y1="140" x2="320" y2="145" stroke="#1a0806" strokeWidth="1" opacity="0.4" />

      <path d="M50,190 L290,190 L320,170 L290,190 L50,190" stroke="#1a0806" strokeWidth="1.5" />
      <path d="M290,190 L320,170" stroke="#1a0806" strokeWidth="1" />

      <rect x="50" y="58" width="6" height="135" fill="#4a2510" rx="1" />
      <rect x="284" y="58" width="6" height="135" fill="#4a2510" rx="1" />

      <ellipse cx="170" cy="196" rx="145" ry="8" fill="rgba(0,0,0,0.5)" />
    </svg>
  );
}
