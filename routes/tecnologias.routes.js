import { Router } from "express";
import { getAllTechnologies, getOneTechnology, addTechnology, updateTechnology, deleteTechnology } from "../controllers/tecnologias.controller.js";
import userRequired from "../middleware/user.validator.js";
import adminRequired from "../middleware/admin.validator.js";
import validateSchema from "../middleware/validator.middleware.js";
import { addTechnologySchema, updateTechnologySchema } from "../schemas/tecnologias.schema.js";
import { technologiesQuery } from "../controllers/search.controller.js";

const router = Router();

router.get("/tecnologias", userRequired, getAllTechnologies);
router.get("/tecnologia/:IDtecnologia", userRequired, getOneTechnology);
router.post("/add-tecnologia", userRequired, validateSchema(addTechnologySchema), addTechnology);
router.put("/update-tecnologia/:IDtecnologia", userRequired, validateSchema(updateTechnologySchema), updateTechnology);
router.delete("/delete-tecnologia/:IDtecnologia", adminRequired, deleteTechnology);
router.get("/tecnologias/search", userRequired, technologiesQuery);

export default router;