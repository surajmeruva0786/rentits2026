import { Router } from 'express';
import { calculateLoadController } from '../controllers/loadController';

const router = Router();

/**
 * POST /api/v1/calculate
 * Calculate student workload and return load metrics
 */
router.post('/calculate', calculateLoadController);

export default router;
