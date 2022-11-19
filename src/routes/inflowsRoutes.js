import { Router } from 'express';
import { deleteInflow, getInflow, postInflow } from '../controllers/inflowsControllers.js';
import { schemaValidateInflow } from '../middlewares/schemaValidateInflow.js';
import { validateToken } from '../middlewares/validateToken.js';

const router = Router();

router.use(validateToken)

router.post('/inflow', schemaValidateInflow, postInflow);

router.get('/inflow', getInflow);

router.delete('/inflow/:inflowId', deleteInflow);

export default router