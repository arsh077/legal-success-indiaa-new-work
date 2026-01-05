
import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "h-10", variant = 'dark', showText = true }) => {
  return (
    <div className={`flex items-center gap-3 ${className} overflow-visible`}>
      <img 
        src="logo.png" 
        alt="Legal Success India Logo" 
        className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
        style={{ minWidth: '32px' }}
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
      {showText && (
        <div className="flex flex-col justify-center whitespace-nowrap">
          <span className={`text-sm md:text-[15px] font-bold tracking-tight leading-tight ${variant === 'dark' ? 'text-[#0B0B0B]' : 'text-white'}`}>
            LEGAL SUCCESS INDIA
          </span>
          <span className={`text-[7px] md:text-[8px] font-bold uppercase tracking-[0.15em] mt-1 leading-none ${variant === 'dark' ? 'text-[#6B7280]' : 'text-gray-400'}`}>
            Legal Works Private Limited
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
