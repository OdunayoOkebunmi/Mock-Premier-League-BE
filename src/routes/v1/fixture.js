import { Router } from 'express';
import {
  createFixture, getAllFixtures, getFixtureBySlug, updateFixture, deleteFixture,
} from '../../controller/FixtureController';
import { verifyUser, verifyAdmin } from '../../middleware/authorize';
import FixtureValidation from '../../middleware/validation/fixtureValidation';

const router = Router();

const { validateFixture } = FixtureValidation;


router.post('/', validateFixture, verifyUser, verifyAdmin, createFixture);
router.get('/', verifyUser, getAllFixtures);
router.get('/:slug', verifyUser, getFixtureBySlug);
router.patch('/:id', verifyUser, verifyAdmin, updateFixture);
router.delete('/:id', verifyUser, verifyAdmin, deleteFixture);


export default router;
