import { TaskItem, LoadResult, LoadLevel } from '../types';

const EFFORT_HOURS = {
  low: 2,
  medium: 6,
  high: 10,
};

// Urgency multiplier based on how soon something is due
const getUrgencyMultiplier = (daysUntilDue: number): number => {
  if (daysUntilDue === 0) return 1.5; // Today
  if (daysUntilDue === 1) return 1.3; // Tomorrow
  if (daysUntilDue <= 2) return 1.2; // In 2 days
  if (daysUntilDue <= 3) return 1.1; // In 3 days
  return 1.0; // 4+ days away
};

export const calculateLoad = (tasks: TaskItem[]): LoadResult => {
  if (tasks.length === 0) {
    return {
      score: 0,
      level: 'light',
      totalHours: 0,
      insight: 'No tasks added yet.',
      action: 'Add tasks to calculate your load.',
    };
  }

  // Calculate weighted hours
  let totalWeightedHours = 0;
  let totalActualHours = 0;

  tasks.forEach((task) => {
    const baseHours = EFFORT_HOURS[task.effort];
    const urgencyMultiplier = getUrgencyMultiplier(task.dueDay);
    const weightedHours = baseHours * urgencyMultiplier;
    
    totalWeightedHours += weightedHours;
    totalActualHours += baseHours;
  });

  // Normalize to 0-100 scale
  // Assuming 40 hours/week as maximum sustainable load
  const score = Math.min(100, Math.round((totalWeightedHours / 40) * 100));

  // Determine load level
  let level: LoadLevel;
  if (score < 50) {
    level = 'light';
  } else if (score <= 70) {
    level = 'medium';
  } else {
    level = 'heavy';
  }

  // Generate insight
  let insight: string;
  if (level === 'light') {
    insight = "You're operating within a sustainable workload.";
  } else if (level === 'medium') {
    insight = "This week requires focused planning to stay ahead.";
  } else {
    insight = `You're trying to fit ~${Math.round(totalActualHours)} hours of work into a normal academic week.`;
  }

  // Generate action
  let action: string;
  if (level === 'light') {
    action = "Lock This Week";
  } else if (level === 'medium') {
    action = "Simplify One Task";
  } else {
    action = "Reduce One Commitment";
  }

  return {
    score,
    level,
    totalHours: Math.round(totalActualHours),
    insight,
    action,
  };
};
