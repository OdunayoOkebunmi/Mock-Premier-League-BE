import express from 'express';
import authRoutes from './auth';
import teamRoutes from './team';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/team', teamRoutes);
export default router;
