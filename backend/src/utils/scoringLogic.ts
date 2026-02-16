import {
    EffortLevel,
    LoadCategory,
    LoadItem,
    RecommendedAction,
} from '../types';

/**
 * Base effort hours for each effort level
 */
const BASE_EFFORT_HOURS: Record<EffortLevel, number> = {
    low: 2,
    medium: 6,
    high: 10,
};

/**
 * Urgency multipliers based on due date
 */
const URGENCY_MULTIPLIERS: Record<number, number> = {
    0: 1.5, // Today
    1: 1.4,
    2: 1.2,
    3: 1.2,
    4: 1.0,
    5: 1.0,
    6: 1.0,
};

/**
 * Maximum sustainable weekly load in hours
 */
const MAX_WEEKLY_HOURS = 45;

/**
 * Calculate weighted effort for a single item
 */
export function calculateWeightedEffort(item: LoadItem): number {
    const baseHours = BASE_EFFORT_HOURS[item.effortLevel];
    const multiplier = URGENCY_MULTIPLIERS[item.dueInDays];
    return baseHours * multiplier;
}

/**
 * Calculate total estimated hours from all items
 */
export function calculateTotalHours(items: LoadItem[]): number {
    return items.reduce(
        (total, item) => total + calculateWeightedEffort(item),
        0
    );
}

/**
 * Normalize total hours to a 0-100 score
 */
export function calculateLoadScore(totalHours: number): number {
    const rawScore = (totalHours / MAX_WEEKLY_HOURS) * 100;
    return Math.min(Math.round(rawScore), 100);
}

/**
 * Determine load category based on score
 */
export function determineLoadCategory(score: number): LoadCategory {
    if (score <= 35) return 'light';
    if (score <= 65) return 'medium';
    return 'heavy';
}

/**
 * Generate insight sentence based on load category and total hours
 */
export function generateInsightSentence(
    category: LoadCategory,
    totalHours: number
): string {
    switch (category) {
        case 'light':
            return "You're operating within a sustainable workload.";
        case 'medium':
            return 'This week requires focused planning to stay ahead.';
        case 'heavy':
            return `You're trying to fit approximately ${Math.round(totalHours)} hours into a normal academic week.`;
    }
}

/**
 * Generate recommended action based on load category
 */
export function generateRecommendedAction(
    category: LoadCategory
): RecommendedAction {
    switch (category) {
        case 'light':
            return {
                ctaLabel: 'Lock This Week',
                description: 'Avoid adding unnecessary commitments.',
            };
        case 'medium':
            return {
                ctaLabel: 'Simplify One Task',
                description: 'Reduce effort on something before it grows.',
            };
        case 'heavy':
            return {
                ctaLabel: 'Reduce One Commitment',
                description: 'Push, reduce, or ask for help on one item.',
            };
    }
}
