import { calculateLoad } from '../loadCalculator';
import { LoadItem } from '../../types';

describe('Load Calculator Service', () => {
    describe('calculateLoad', () => {
        it('should correctly calculate light load', () => {
            const items: LoadItem[] = [
                { title: 'Easy Task', dueInDays: 5, effortLevel: 'low' }, // 2 * 1 = 2
            ];

            const result = calculateLoad(items);

            expect(result.totalEstimatedHours).toBe(2);
            expect(result.loadScore).toBe(4); // (2/45)*100 = 4.44 -> 4
            expect(result.loadCategory).toBe('light');
            expect(result.insightSentence).toBe("You're operating within a sustainable workload.");
            expect(result.recommendedAction).toEqual({
                ctaLabel: 'Lock This Week',
                description: 'Avoid adding unnecessary commitments.',
            });
        });

        it('should correctly calculate medium load', () => {
            const items: LoadItem[] = [
                { title: 'Project 1', dueInDays: 2, effortLevel: 'high' }, // 10 * 1.2 = 12
                { title: 'Project 2', dueInDays: 3, effortLevel: 'high' }, // 10 * 1.2 = 12
            ];
            // Total = 24

            const result = calculateLoad(items);

            expect(result.totalEstimatedHours).toBe(24);
            expect(result.loadScore).toBe(53); // (24/45)*100 = 53.33 -> 53
            expect(result.loadCategory).toBe('medium');
            expect(result.insightSentence).toBe('This week requires focused planning to stay ahead.');
            expect(result.recommendedAction).toEqual({
                ctaLabel: 'Simplify One Task',
                description: 'Reduce effort on something before it grows.',
            });
        });

        it('should correctly calculate heavy load', () => {
            const items: LoadItem[] = [
                { title: 'Urgent Exam', dueInDays: 0, effortLevel: 'high' },    // 10 * 1.5 = 15
                { title: 'Big Project', dueInDays: 1, effortLevel: 'high' },    // 10 * 1.4 = 14
                { title: 'Assignment', dueInDays: 1, effortLevel: 'medium' },   // 6 * 1.4 = 8.4
            ];
            // Total = 37.4 -> 37

            const result = calculateLoad(items);

            expect(result.totalEstimatedHours).toBe(37);
            expect(result.loadScore).toBe(83); // (37.4/45)*100 = 83.11 -> 83
            expect(result.loadCategory).toBe('heavy');
            expect(result.insightSentence).toContain("You're trying to fit approximately 37 hours");
            expect(result.recommendedAction).toEqual({
                ctaLabel: 'Reduce One Commitment',
                description: 'Push, reduce, or ask for help on one item.',
            });
        });

        it('should cap load score at 100', () => {
            const items: LoadItem[] = [
                { title: 'Impossible Load 1', dueInDays: 0, effortLevel: 'high' }, // 15
                { title: 'Impossible Load 2', dueInDays: 0, effortLevel: 'high' }, // 15
                { title: 'Impossible Load 3', dueInDays: 0, effortLevel: 'high' }, // 15
                { title: 'Impossible Load 4', dueInDays: 0, effortLevel: 'high' }, // 15
            ];
            // Total = 60

            const result = calculateLoad(items);

            expect(result.totalEstimatedHours).toBe(60);
            expect(result.loadScore).toBe(100); // (60/45)*100 = 133.33 -> max 100
            expect(result.loadCategory).toBe('heavy');
        });

        it('should handle empty list correctly (though validator prevents this)', () => {
            // This tests logic safety even if validation was bypassed
            const items: LoadItem[] = [];

            const result = calculateLoad(items);

            expect(result.totalEstimatedHours).toBe(0);
            expect(result.loadScore).toBe(0);
            expect(result.loadCategory).toBe('light');
        });

        it('should handle max items correctly', () => {
            // Create 20 items (max allowed)
            const items: LoadItem[] = Array(20).fill({
                title: 'Small Task',
                dueInDays: 6,
                effortLevel: 'low'
            });
            // Each item: 2 * 1.0 = 2 hours
            // Total: 40 hours

            const result = calculateLoad(items);

            expect(result.totalEstimatedHours).toBe(40);
            expect(result.loadScore).toBe(89); // (40/45)*100 = 88.88 -> 89
            expect(result.loadCategory).toBe('heavy');
        });

        it('should exactly match boundary conditions', () => {
            // Test score boundary 35 (light/medium cutoff)
            // Need approx 15.75 hours to get score 35
            // Let's rely on specific inputs

            // 16 hours -> 35.5 -> 36 score (medium)
            // 15 hours -> 33.3 -> 33 score (light)

            /* 
             * Testing specific hours to hit categories boundaries
             * Score = hours / 45 * 100
             * 35 score = 15.75 hours
             * 65 score = 29.25 hours
             */
        });
    });
});
