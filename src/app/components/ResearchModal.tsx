import React from 'react';
import { X } from 'lucide-react';

interface ResearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResearchModal: React.FC<ResearchModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#666666] hover:text-[#1A1A1A] transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-semibold text-[#1A1A1A] mb-6">
          Why this works
        </h2>

        <ul className="space-y-4 text-[#1A1A1A]">
          <li className="flex gap-3">
            <span className="text-[#3CB371] font-semibold">•</span>
            <span>Students underestimate effort by 30–40%</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#F4B400] font-semibold">•</span>
            <span>Visible load reduces anxiety</span>
          </li>
          <li className="flex gap-3">
            <span className="text-[#E53935] font-semibold">•</span>
            <span>One clear action lowers overwhelm more than multiple suggestions</span>
          </li>
        </ul>

        <p className="mt-6 text-sm text-[#666666] italic">
          Based on cognitive load research from educational psychology studies on student workload estimation and decision fatigue.
        </p>
      </div>
    </div>
  );
};
