import { Router } from 'express';
import {
  createTeam, getAllTeams, getOneTeam, updateTeam, deleteTeam,
} from '../../controller/TeamController';
import { verifyUser, verifyAdmin } from '../../middleware/authorize';
import TeamValidation from '../../middleware/validation/teamValidation';

const router = Router();

const { validateTeam } = TeamValidation;


router.post('/', validateTeam, verifyUser, verifyAdmin, createTeam);
router.get('/', verifyUser, getAllTeams);
router.get('/:id', verifyUser, getOneTeam);
router.put('/:id', validateTeam, verifyUser, verifyAdmin, updateTeam);
router.delete('/:id', verifyUser, verifyAdmin, deleteTeam);


export default router;
