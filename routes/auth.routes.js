import { Router } from "express";
import { login, logout, verify } from "../controllers/auth.controller.js";
import validateSchema from "../middleware/validator.middleware.js";
import userRequired from "../middleware/user.validator.js"
import authSchema from "../schemas/auth.schema.js";

const router = Router();

router.post("/login", validateSchema(authSchema), login);
router.post("/logout", userRequired, logout);
router.post("/verify", userRequired, verify)

export default router;