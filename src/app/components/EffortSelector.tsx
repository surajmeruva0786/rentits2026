import React from 'react';
import { EffortLevel } from '../types';

interface EffortSelectorProps {
  value: EffortLevel;
  onChange: (level: EffortLevel) => void;
}

export const EffortSelector: React.FC<EffortSelectorProps> = ({ value, onChange }) => {
  const options: { level: EffortLevel; label: string; color: string }[] = [
    { level: 'low', label: 'Low', color: 'bg-[#3CB371]/20 hover:bg-[#3CB371]/30' },
    { level: 'medium', label: 'Medium', color: 'bg-[#F4B400]/20 hover:bg-[#F4B400]/30' },
    { level: 'high', label: 'High', color: 'bg-[#E53935]/20 hover:bg-[#E53935]/30' },
  ];

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-2">
        {options.map((option) => (
          <button
            key={option.level}
            type="button"
            onClick={() => onChange(option.level)}
            className={`
              py-3 px-4 rounded-lg font-medium transition-all duration-200
              ${value === option.level ? option.color.replace('hover:', '') : 'bg-gray-100 hover:bg-gray-200'}
              ${value === option.level ? 'ring-2 ring-offset-2 ring-[#1A1A1A]' : ''}
            `}
          >
            {option.label}
          </button>
        ))}
      </div>
      <p className="text-sm text-[#666666] text-center">
        Low ≈ 1–3 hrs · Medium ≈ 4–8 hrs · High ≈ 8+ hrs
      </p>
    </div>
  );
};
