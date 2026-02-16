import { LoadItem, LoadCalculationResult } from '../types';
import {
    calculateTotalHours,
    calculateLoadScore,
    determineLoadCategory,
    generateInsightSentence,
    generateRecommendedAction,
} from '../utils/scoringLogic';

/**
 * Service layer for load calculation
 * Pure function with no side effects
 */
export function calculateLoad(items: LoadItem[]): LoadCalculationResult {
    // Calculate total weighted effort hours
    const totalEstimatedHours = calculateTotalHours(items);

    // Normalize to 0-100 score
    const loadScore = calculateLoadScore(totalEstimatedHours);

    // Determine load category
    const loadCategory = determineLoadCategory(loadScore);

    // Generate insight and recommendation
    const insightSentence = generateInsightSentence(
        loadCategory,
        totalEstimatedHours
    );
    const recommendedAction = generateRecommendedAction(loadCategory);

    return {
        totalEstimatedHours: Math.round(totalEstimatedHours),
        loadScore,
        loadCategory,
        insightSentence,
        recommendedAction,
    };
}
