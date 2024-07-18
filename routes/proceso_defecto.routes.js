import { Router } from "express";
import { getAllProcessesDefects, getOneProcessDefect, addProcessDefect, updateProcessDefect, deleteProcessDefect } from "../controllers/proceso_defecto.controller.js";
import userRequired from "../middleware/user.validator.js";
import adminRequired from "../middleware/admin.validator.js";
import validateSchema from "../middleware/validator.middleware.js";
import { addPDSchema, updatePDSchema } from "../schemas/proceso_defecto.schema.js";
import { pdQuery } from "../controllers/search.controller.js";

const router = Router();

router.get("/procesos-defectos", userRequired, getAllProcessesDefects);
router.get("/proceso-defecto/:IDproceso_defecto", userRequired, getOneProcessDefect);
router.post("/add-proceso-defecto", userRequired, validateSchema(addPDSchema), addProcessDefect);
router.put("/update-proceso-defecto/:IDproceso_defecto", userRequired, validateSchema(updatePDSchema), updateProcessDefect);
router.delete("/delete-proceso-defecto/:IDproceso_defecto", adminRequired, deleteProcessDefect);
router.get("/procesos-defectos/search", userRequired, pdQuery);

export default router;