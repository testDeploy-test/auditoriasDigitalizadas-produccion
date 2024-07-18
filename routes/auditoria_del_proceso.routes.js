import { Router } from "express";
import { getAllProcesses, getOneProcess, addProcess, updateProcess, deleteProcess } from "../controllers/auditoria_del_proceso.controller.js";
import userRequired from "../middleware/user.validator.js";
import adminRequired from "../middleware/admin.validator.js";
import validateSchema from "../middleware/validator.middleware.js";
import { addProcessSchema, updateProcessSchema } from "../schemas/auditoria_del_proceso.schema.js";
import { processQuery } from "../controllers/search.controller.js";

const router = Router();

router.get("/auditoria-del-proceso", userRequired, getAllProcesses);
router.get("/auditoria-del-proceso/:IDproceso", userRequired, getOneProcess);
router.post("/add-auditoria-del-proceso", userRequired, validateSchema(addProcessSchema), addProcess);
router.put("/update-auditoria-del-proceso/:IDproceso", userRequired, validateSchema(updateProcessSchema), updateProcess);
router.delete("/delete-auditoria-del-proceso/:IDproceso", adminRequired, deleteProcess);
router.get("/auditoria-proceso/search", userRequired, processQuery);

export default router;