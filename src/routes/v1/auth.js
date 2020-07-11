import { Router } from 'express';
import AuthValidation from '../../middleware/validation/authValidation';
import { createUser, loginUser } from '../../controller/AuthController';

const router = Router();
const { validateSignup, validateSignin } = AuthValidation;

router.post('/signup', validateSignup, createUser);
router.post('/signin', validateSignin, loginUser);
export default router;
