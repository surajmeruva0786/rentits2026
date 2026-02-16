import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { Button } from '../components/Button';
import { ItemCard } from '../components/ItemCard';
import { TaskItem } from '../types';
import { Plus } from 'lucide-react';

export default function InputScreen() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [showAddCard, setShowAddCard] = useState(false);

  const handleAddTask = (taskData: Omit<TaskItem, 'id'>) => {
    const newTask: TaskItem = {
      ...taskData,
      id: Date.now().toString(),
    };
    setTasks([...tasks, newTask]);
    setShowAddCard(false);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleCalculate = () => {
    // Store tasks in sessionStorage to pass to result screen
    sessionStorage.setItem('tasks', JSON.stringify(tasks));
    navigate('/result');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8 px-6">
      <div className="max-w-[480px] mx-auto">
        <Header
          title="30-Second Student Load"
          subtitle="See your real academic load in under 30 seconds."
        />

        <div className="mb-8">
          <h2 className="text-2xl font-medium text-[#1A1A1A] mb-2">
            What's due in the next 7 days?
          </h2>
          <p className="text-sm text-[#666666]">
            Add only what requires real effort.
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-medium text-[#1A1A1A] mb-1">{task.title}</h3>
                  <div className="flex gap-3 text-sm text-[#666666]">
                    <span>
                      {task.dueDay === 0
                        ? 'Today'
                        : task.dueDay === 1
                        ? 'Tomorrow'
                        : `In ${task.dueDay} days`}
                    </span>
                    <span>•</span>
                    <span className="capitalize">{task.effort} effort</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-[#666666] hover:text-[#E53935] transition-colors ml-4"
                  aria-label="Delete task"
                >
                  <Plus size={20} className="rotate-45" />
                </button>
              </div>
            </div>
          ))}

          {!showAddCard && (
            <Button
              variant="outline"
              fullWidth
              onClick={() => setShowAddCard(true)}
              className="border-dashed"
            >
              <Plus size={20} className="inline mr-2" />
              Add Item
            </Button>
          )}

          {showAddCard && (
            <ItemCard
              onSave={handleAddTask}
              onCancel={() => setShowAddCard(false)}
            />
          )}
        </div>

        <Button
          variant="primary"
          fullWidth
          disabled={tasks.length === 0}
          onClick={handleCalculate}
        >
          Calculate My Week
        </Button>
      </div>
    </div>
  );
}
