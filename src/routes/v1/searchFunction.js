import { Router } from 'express';
import { searchFunction } from '../../controller/SearchController';

const router = Router();
router.get('/', searchFunction);


export default router;
