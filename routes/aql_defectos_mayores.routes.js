import { Router } from "express";
import { getAql, getOneAql, addAql, updateAql, deleteAql } from "../controllers/aql_defectos_mayores.controller.js";
import userRequired from "../middleware/user.validator.js";
import adminRequired from "../middleware/admin.validator.js";
import validateSchema from "../middleware/validator.middleware.js"
import { addAqlSchema, updateAqlSchema } from "../schemas/aql_defectos_mayores.schema.js";


const router = Router();

router.get("/aql", userRequired, getAql);
router.get("/aql/:IDaql", userRequired, getOneAql);
router.post("/add-aql", userRequired, validateSchema(addAqlSchema), addAql);
router.put("/update-aql/:IDaql", userRequired, validateSchema(updateAqlSchema), updateAql);
router.delete("/delete-aql/:IDaql", adminRequired, deleteAql);

export default router;
