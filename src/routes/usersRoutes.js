import { Router } from 'express';
import { getUserInfo, postSignIn, postSignUp } from '../controllers/usersControllers.js';
import { schemaValidateSignUp } from '../middlewares/schemaValidateSignUp.js';
import { schemaValidateSignIn } from '../middlewares/schemaValidateSignIn.js';
import { validateToken } from '../middlewares/validateToken.js';

const router = Router();

router.post('/sign-up', schemaValidateSignUp, postSignUp);

router.post('/sign-in', schemaValidateSignIn, postSignIn);

router.get('/user', validateToken, getUserInfo);

export default router