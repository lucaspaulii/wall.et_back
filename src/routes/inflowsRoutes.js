import { Router } from 'express';
import { getInflow, postInflow } from '../controllers/inflowsControllers.js';
import { schemaValidateInflow } from '../middlewares/schemaValidateInflow.js';
import { validateToken } from '../middlewares/validateToken.js';

const router = Router();

router.use(validateToken)

router.post('/inflow', schemaValidateInflow, postInflow);

router.get('/inflow', getInflow);

export default router