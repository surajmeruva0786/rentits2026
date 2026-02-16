import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { CircularMeter } from '../components/CircularMeter';
import { ResearchModal } from '../components/ResearchModal';
import { TaskItem, LoadResult } from '../types';
import { calculateLoad } from '../utils/calculator';

export default function ResultScreen() {
  const navigate = useNavigate();
  const [result, setResult] = useState<LoadResult | null>(null);
  const [showResearchModal, setShowResearchModal] = useState(false);

  useEffect(() => {
    const tasksJson = sessionStorage.getItem('tasks');
    if (!tasksJson) {
      navigate('/');
      return;
    }

    const tasks: TaskItem[] = JSON.parse(tasksJson);
    const loadResult = calculateLoad(tasks);
    setResult(loadResult);
  }, [navigate]);

  if (!result) {
    return null;
  }

  const getLevelLabel = () => {
    switch (result.level) {
      case 'light':
        return 'Light Week';
      case 'medium':
        return 'Medium Week';
      case 'heavy':
        return 'Heavy Week';
      default:
        return '';
    }
  };

  const getButtonVariant = (): 'light' | 'medium' | 'heavy' => {
    return result.level;
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8 px-6">
      <div className="max-w-[480px] mx-auto">
        <Header title="Your Week Load" />

        <div className="flex flex-col items-center mb-8">
          <CircularMeter score={result.score} level={result.level} />
          <p className="text-2xl font-medium text-[#1A1A1A] mt-6">
            {getLevelLabel()}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
          <p className="text-lg text-[#1A1A1A] text-center leading-relaxed mb-6">
            {result.insight}
          </p>

          <Button variant={getButtonVariant()} fullWidth className="mb-4">
            {result.action}
          </Button>

          <p className="text-sm text-[#666666] text-center">
            Push, reduce, or ask for help on one item.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={() => setShowResearchModal(true)}
            className="text-sm text-[#666666] hover:text-[#1A1A1A] underline transition-colors"
          >
            Based on cognitive load research.
          </button>

          <button
            onClick={() => navigate('/')}
            className="text-sm text-[#666666] hover:text-[#1A1A1A] transition-colors"
          >
            Recalculate
          </button>
        </div>
      </div>

      <ResearchModal
        isOpen={showResearchModal}
        onClose={() => setShowResearchModal(false)}
      />
    </div>
  );
}
