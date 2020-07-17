import express from 'express';
import authRoutes from './auth';
import teamRoutes from './team';
import fixtureRoutes from './fixture';
import searchFunctionRoutes from './searchFunction';


const router = express.Router();

router.use('/auth', authRoutes);
router.use('/team', teamRoutes);
router.use('/fixture', fixtureRoutes);
router.use('/search', searchFunctionRoutes);
export default router;
