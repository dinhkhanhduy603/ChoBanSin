import React from 'react';

export const HmongBrocadeBorder: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full overflow-hidden h-3 flex items-center ${className}`} aria-hidden="true">
      <svg className="w-full h-full text-indigo-800 opacity-80" preserveAspectRatio="none" viewBox="0 0 120 12" fill="none">
        <pattern id="hmong-border-pattern" width="24" height="12" patternUnits="userSpaceOnUse">
          {/* Geometric Diamond & Cross typical in H'mong beeswax batik */}
          <path d="M12 0 L24 6 L12 12 L0 6 Z" fill="currentColor" fillOpacity="0.15" />
          <path d="M12 2 L20 6 L12 10 L4 6 Z" stroke="currentColor" strokeWidth="1" fill="none" />
          <circle cx="12" cy="6" r="1.5" fill="#ea580c" />
          <path d="M0 6 L4 6 M20 6 L24 6" stroke="currentColor" strokeWidth="1" />
        </pattern>
        <rect width="100%" height="12" fill="url(#hmong-border-pattern)" />
      </svg>
    </div>
  );
};

export const HmongSunEmblem: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* 8-pointed traditional sun motif on drum and collar */}
      <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" />
      <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.5" />
      <polygon
        points="20,4 23,15 34,12 26,20 34,28 23,25 20,36 17,25 6,28 14,20 6,12 17,15"
        fill="currentColor"
        fillOpacity="0.85"
      />
      <circle cx="20" cy="20" r="4" fill="#f59e0b" />
    </svg>
  );
};

export const HmongBatikMotif: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Spiral spiral snail / pumpkin flower batik motif */}
      <rect x="2" y="2" width="56" height="56" rx="4" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
      <path
        d="M30 10 C41 10 50 19 50 30 C50 41 41 50 30 50 C19 50 10 41 10 30 C10 22 16 16 23 16 C30 16 35 21 35 27 C35 32 31 36 27 36 C24 36 21 33 21 30"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="30" cy="30" r="2" fill="#ea580c" />
    </svg>
  );
};
