import { Router } from 'express';
import { postSignUp } from '../controllers/usersControllers.js';
import { schemaValidateSignUp } from '../middlewares/schemaValidateSignUp.js';

const router = Router();

router.post('/sign-up', schemaValidateSignUp, postSignUp);

/*router.post('/sign-in', postSignIn);*/

export default router