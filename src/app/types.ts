export type EffortLevel = 'low' | 'medium' | 'high';

export interface TaskItem {
  id: string;
  title: string;
  dueDay: number;
  effort: EffortLevel;
}

export type LoadLevel = 'light' | 'medium' | 'heavy';

export interface LoadResult {
  score: number;
  level: LoadLevel;
  totalHours: number;
  insight: string;
  action: string;
}
