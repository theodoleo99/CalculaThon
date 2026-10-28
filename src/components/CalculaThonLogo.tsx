import React from "react";

interface CalculaThonLogoProps {
  size?: number;
  className?: string;
  showOrbitalRing?: boolean;
}

export function CalculaThonLogo({
  size = 44,
  className = "",
  showOrbitalRing = true,
}: CalculaThonLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-label="CalculaThon - Logo Python com 4 Operadores"
    >
      <defs>
        {/* Gradientes dos Operadores e Serpentes */}
        <linearGradient id="pythonBlue" x1="20" y1="20" x2="65" y2="65" gradientUnits="userSpaceOnUse">
          <stop stopColor="#387EB8" />
          <stop offset="1" stopColor="#2B5B84" />
        </linearGradient>
        <linearGradient id="pythonYellow" x1="55" y1="55" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE873" />
          <stop offset="1" stopColor="#FFC331" />
        </linearGradient>

        <linearGradient id="opBg" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F172A" />
          <stop offset="1" stopColor="#1E293B" />
        </linearGradient>

        {/* Sombra suave para o logo */}
        <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodOpacity="0.12" />
        </filter>
      </defs>

      {/* Círculo de Fundo Suave */}
      <circle cx="60" cy="60" r="58" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />

      {/* Anel Orbital conectando os operadores */}
      {showOrbitalRing && (
        <circle
          cx="60"
          cy="60"
          r="44"
          stroke="#CBD5E1"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          opacity="0.8"
        />
      )}

      {/* LOGO DO PYTHON CENTRAL */}
      <g transform="translate(33, 33) scale(0.54)" filter="url(#softGlow)">
        {/* Serpente Azul (Superior/Esquerda) */}
        <path
          d="M 49.8,11.5 C 33.7,11.5 25.1,14.6 25.1,23.3 L 25.1,32.6 L 50.2,32.6 L 50.2,35.8 L 17.5,35.8 C 8.7,35.8 6.2,43.9 6.2,51.4 C 6.2,62.1 12.5,65.8 22.5,65.8 L 28.2,65.8 L 28.2,58.3 C 28.2,49.5 35.8,42 44.5,42 L 59.5,42 C 67,42 72.6,36.4 72.6,28.9 L 72.6,23.3 C 72.6,14.6 63.9,11.5 49.8,11.5 Z M 39.8,17.8 C 41.9,17.8 43.6,19.5 43.6,21.6 C 43.6,23.7 41.9,25.4 39.8,25.4 C 37.7,25.4 36,23.7 36,21.6 C 36,19.5 37.7,17.8 39.8,17.8 Z"
          fill="url(#pythonBlue)"
        />

        {/* Serpente Amarela (Inferior/Direita) */}
        <path
          d="M 50.2,88.5 C 66.3,88.5 74.9,85.4 74.9,76.7 L 74.9,67.4 L 49.8,67.4 L 49.8,64.2 L 82.5,64.2 C 91.3,64.2 93.8,56.1 93.8,48.6 C 93.8,37.9 87.5,34.2 77.5,34.2 L 71.8,34.2 L 71.8,41.7 C 71.8,50.5 64.2,58 55.5,58 L 40.5,58 C 33,58 27.4,63.6 27.4,71.1 L 27.4,76.7 C 27.4,85.4 36.1,88.5 50.2,88.5 Z M 60.2,82.2 C 58.1,82.2 56.4,80.5 56.4,78.4 C 56.4,76.3 58.1,74.6 60.2,74.6 C 62.3,74.6 64,76.3 64,78.4 C 64,80.5 62.3,82.2 60.2,82.2 Z"
          fill="url(#pythonYellow)"
        />
      </g>

      {/* 4 OPERADORES AO REDOR */}

      {/* 1. TOPO: Adição (+) */}
      <g transform="translate(60, 16)">
        <circle cx="0" cy="0" r="11" fill="#0284C7" stroke="#FFFFFF" strokeWidth="1.8" />
        {/* Ícone + */}
        <line x1="-5" y1="0" x2="5" y2="0" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="0" y1="-5" x2="0" y2="5" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
      </g>

      {/* 2. DIREITA: Multiplicação (× / *) */}
      <g transform="translate(104, 60)">
        <circle cx="0" cy="0" r="11" fill="#D97706" stroke="#FFFFFF" strokeWidth="1.8" />
        {/* Ícone × */}
        <line x1="-4" y1="-4" x2="4" y2="4" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="4" y1="-4" x2="-4" y2="4" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
      </g>

      {/* 3. BASE: Subtração (−) */}
      <g transform="translate(60, 104)">
        <circle cx="0" cy="0" r="11" fill="#E11D48" stroke="#FFFFFF" strokeWidth="1.8" />
        {/* Ícone − */}
        <line x1="-5" y1="0" x2="5" y2="0" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
      </g>

      {/* 4. ESQUERDA: Divisão (÷ / /) */}
      <g transform="translate(16, 60)">
        <circle cx="0" cy="0" r="11" fill="#059669" stroke="#FFFFFF" strokeWidth="1.8" />
        {/* Ícone ÷ */}
        <line x1="-5" y1="0" x2="5" y2="0" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="0" cy="-3.8" r="1.2" fill="#FFFFFF" />
        <circle cx="0" cy="3.8" r="1.2" fill="#FFFFFF" />
      </g>
    </svg>
  );
}
