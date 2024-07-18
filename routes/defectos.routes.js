import { Router } from "express";
import { getAllDefects, getOneDefect, addDefect, updateDefect, deleteDefect } from "../controllers/defectos.controller.js";
import userRequired from "../middleware/user.validator.js";
import adminRequired from "../middleware/admin.validator.js";
import validateSchema from "../middleware/validator.middleware.js";
import { addDefectSchema, updateDefectSchema } from "../schemas/defectos.schema.js";
import { defectsQuery } from "../controllers/search.controller.js";

const router = Router();

router.get("/defectos", userRequired, getAllDefects);
router.get("/defecto/:codigoDefecto", userRequired, getOneDefect);
router.post("/add-defecto",userRequired, validateSchema(addDefectSchema), addDefect);
router.put("/update-defecto/:codigoDefecto",userRequired, validateSchema(updateDefectSchema), updateDefect);
router.delete("/delete-defecto/:codigoDefecto", adminRequired, deleteDefect);
router.get("/defectos/search", userRequired, defectsQuery);

export default router;
