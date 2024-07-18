import { Router } from "express";
import { getAllAudits, getOneAudit, addAudit, updateAudit, deleteAudit } from "../controllers/formato_auditoria.controller.js";
import userRequired from "../middleware/user.validator.js";
import adminRequired from "../middleware/admin.validator.js";
import validateSchema from "../middleware/validator.middleware.js";
import { addAuditSchema, updateAuditSchema } from "../schemas/formato_auditoria.schema.js";
import { auditQuery } from "../controllers/search.controller.js";

const router = Router();

router.get("/auditorias", userRequired, getAllAudits);
router.get("/auditoria/:IDauditoria", userRequired, getOneAudit);
router.post("/add-auditoria", userRequired, validateSchema(addAuditSchema), addAudit);
router.put("/update-auditoria/:IDauditoria", userRequired, validateSchema(updateAuditSchema), updateAudit);
router.delete("/delete-auditoria/:IDauditoria",adminRequired, deleteAudit);
router.get("/auditorias/search", userRequired, auditQuery);

export default router;
