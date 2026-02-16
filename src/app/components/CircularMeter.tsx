import React, { useEffect, useState } from 'react';
import { LoadLevel } from '../types';

interface CircularMeterProps {
  score: number;
  level: LoadLevel;
}

export const CircularMeter: React.FC<CircularMeterProps> = ({ score, level }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = score / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score]);

  const getColor = () => {
    switch (level) {
      case 'light':
        return '#3CB371';
      case 'medium':
        return '#F4B400';
      case 'heavy':
        return '#E53935';
      default:
        return '#1A1A1A';
    }
  };

  const color = getColor();
  const radius = 120;
  const strokeWidth = 16;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          stroke="#E5E5E5"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Progress circle */}
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{
            strokeDashoffset,
            transition: 'stroke-dashoffset 0.5s ease-in-out',
          }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-6xl font-semibold text-[#1A1A1A]">
          {animatedScore}
        </div>
        <div className="text-lg text-[#666666]">/ 100</div>
      </div>
    </div>
  );
};
