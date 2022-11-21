import { Router } from "express";
import {
  deleteInflow,
  getInflow,
  postInflow,
  updateInflow,
} from "../controllers/inflowsControllers.js";
import { schemaValidateInflow } from "../middlewares/schemaValidateInflow.js";
import { validateToken } from "../middlewares/validateToken.js";

const router = Router();

router.use(validateToken);

router.post("/inflow", schemaValidateInflow, postInflow);

router.get("/inflow", getInflow);

router.delete("/inflow/:inflowId", deleteInflow);

router.put("/inflow/:inflowID", schemaValidateInflow, updateInflow);

export default router;
