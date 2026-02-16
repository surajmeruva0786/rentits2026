import React, { useState } from 'react';
import { TaskItem, EffortLevel } from '../types';
import { EffortSelector } from './EffortSelector';
import { X } from 'lucide-react';

interface ItemCardProps {
  item?: TaskItem;
  onSave: (item: Omit<TaskItem, 'id'>) => void;
  onDelete?: () => void;
  onCancel: () => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, onSave, onDelete, onCancel }) => {
  const [title, setTitle] = useState(item?.title || '');
  const [dueDay, setDueDay] = useState(item?.dueDay ?? 0);
  const [effort, setEffort] = useState<EffortLevel>(item?.effort || 'medium');

  const handleSave = () => {
    if (title.trim()) {
      onSave({ title, dueDay, effort });
    }
  };

  const dueDayOptions = [
    { value: 0, label: 'Today' },
    { value: 1, label: 'Tomorrow' },
    { value: 2, label: 'In 2 days' },
    { value: 3, label: 'In 3 days' },
    { value: 4, label: 'In 4 days' },
    { value: 5, label: 'In 5 days' },
    { value: 6, label: 'In 6 days' },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-md animate-fade-in relative">
      {onDelete && (
        <button
          onClick={onDelete}
          className="absolute top-4 right-4 text-[#666666] hover:text-[#E53935] transition-colors"
          aria-label="Delete task"
        >
          <X size={20} />
        </button>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-[#1A1A1A] mb-2">
            Task Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Data Structures Assignment"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="dueDay" className="block text-sm font-medium text-[#1A1A1A] mb-2">
            Due Date
          </label>
          <select
            id="dueDay"
            value={dueDay}
            onChange={(e) => setDueDay(Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:border-transparent bg-white"
          >
            {dueDayOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
            Effort Required
          </label>
          <EffortSelector value={effort} onChange={setEffort} />
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={handleSave}
            disabled={!title.trim()}
            className="flex-1 bg-[#1A1A1A] text-white py-3 rounded-lg font-medium hover:translate-y-[-1px] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {item ? 'Update' : 'Add Task'}
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
