/**
 * Type definitions for the Student Load Calculator
 */

export type EffortLevel = 'low' | 'medium' | 'high';
export type LoadCategory = 'light' | 'medium' | 'heavy';

export interface LoadItem {
    title: string;
    dueInDays: number;
    effortLevel: EffortLevel;
}

export interface RecommendedAction {
    ctaLabel: string;
    description: string;
}

export interface LoadCalculationResult {
    totalEstimatedHours: number;
    loadScore: number;
    loadCategory: LoadCategory;
    insightSentence: string;
    recommendedAction: RecommendedAction;
}

export interface LoadRequest {
    items: LoadItem[];
}
