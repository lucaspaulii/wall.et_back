import { Router } from 'express';
import { postSignIn, postSignUp } from '../controllers/usersControllers.js';
import { schemaValidateSignUp } from '../middlewares/schemaValidateSignUp.js';
import { validateSignIn } from '../middlewares/validateSignIn.js';

const router = Router();

router.post('/sign-up', schemaValidateSignUp, postSignUp);

router.post('/sign-in', validateSignIn, postSignIn);

export default router