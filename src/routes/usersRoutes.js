import { Router } from 'express';
import { postSignIn, postSignUp } from '../controllers/usersControllers.js';
import { schemaValidateSignUp } from '../middlewares/schemaValidateSignUp.js';
import { schemaValidateSignIn } from '../middlewares/schemaValidateSignIn.js';

const router = Router();

router.post('/sign-up', schemaValidateSignUp, postSignUp);

router.post('/sign-in', schemaValidateSignIn, postSignIn);

export default router