import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  white?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', white = false }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2.5 font-bold tracking-tight select-none ${className}`}>
      {/* YerevanGo Icon: Converging Yerevan roads forming a location pin */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center rounded-xl transition-transform hover:scale-105 shadow-sm overflow-hidden ${
          white ? 'bg-white text-orange-600' : 'bg-gradient-to-br from-orange-500 via-rose-500 to-amber-500 text-white shadow-orange-500/20'
        }`}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 drop-shadow-sm"
        >
          {/* Location pin outline with road curve inside */}
          <path
            d="M16 3C10.4772 3 6 7.47715 6 13C6 19.5 14.5 28.5 16 29C17.5 28.5 26 19.5 26 13C26 7.47715 21.5228 3 16 3Z"
            fill="currentColor"
            fillOpacity={white ? '0.15' : '0.2'}
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* S-curve road representing movement across Yerevan */}
          <path
            d="M13 22C13 18 19 16 19 12C19 10 17.5 9 16 9C14.5 9 13.5 10 13 11"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Pin center point */}
          <circle cx="16" cy="12" r="2.2" fill="currentColor" />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <span className={`${textSizes[size]} font-extrabold tracking-tight ${white ? 'text-white' : 'text-slate-900'}`}>
          Yerevan<span className="text-orange-500">Go</span>
        </span>
      </div>
    </div>
  );
};
