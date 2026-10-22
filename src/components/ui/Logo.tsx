import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'symbol';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'full',
  showSubtitle = true,
}) => {
  // Símbolo vetorial isolado em viewBox limpo (sem padding vazio ao redor)
  const SymbolSvg = (
    <svg
      viewBox="10 10 90 85"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logoSymbolGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="50%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
      <g stroke="url(#logoSymbolGrad)" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 84.6 68 L 84.6 30 L 50 10 L 39.6 16 M 34.4 19 L 29.2 22 M 24 25 L 15.4 30 L 15.4 70 L 50 90 L 74.3 76 L 82 76 M 86 76 L 90 76 M 94 76 L 96 76" />
        <path d="M 36 38 L 48 50 L 36 62 M 52 64 L 66 64" />
      </g>
    </svg>
  );

  if (variant === 'symbol') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{SymbolSvg}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Símbolo com tamanho proporcional fixo e nítido */}
      <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 p-1 rounded-xl bg-violet-950/40 border border-violet-500/20 shadow-md shadow-violet-500/10 flex items-center justify-center">
        {SymbolSvg}
      </div>

      {/* Tipografia em HTML nativo (legível em qualquer tamanho e resolução, sem blur de SVG rasterizado) */}
      <div className="flex flex-col text-left leading-none">
        <span className="font-mono font-semibold text-sm sm:text-base text-white tracking-tight hover:text-violet-300 transition-colors">
          [Leo nascimento]
        </span>
        {showSubtitle && (
          <span className="font-mono text-[10px] sm:text-[11px] text-slate-400 tracking-normal mt-1 font-normal">
            desenvolvimento de sistemas
          </span>
        )}
      </div>
    </div>
  );
};
