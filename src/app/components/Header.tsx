import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-[28px] font-medium text-[#1A1A1A] mb-2">
        {title}
      </h1>
      {subtitle && (
        <p className="text-[#666666]">
          {subtitle}
        </p>
      )}
    </div>
  );
};
