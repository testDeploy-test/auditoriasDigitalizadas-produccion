import { Router } from "express";
import { getAllUsers, getOneUser, addUser, updateUser, deleteUser } from "../controllers/usuarios.controller.js";
import userRequired from "../middleware/user.validator.js";
import adminRequired from "../middleware/admin.validator.js";
import validateSchema from "../middleware/validator.middleware.js";
import { addUserSchema, updateUserSchema } from "../schemas/usuarios.schema.js";
import { usersQuery } from "../controllers/search.controller.js";

const router = Router();

router.get("/usuarios", userRequired, getAllUsers);
router.get("/usuario/:IDusuario", userRequired, getOneUser);
router.post("/add-usuario", adminRequired, validateSchema(addUserSchema), addUser);
router.put("/update-usuario/:IDusuario", adminRequired, validateSchema(updateUserSchema), updateUser);
router.delete("/delete-usuario/:IDusuario", adminRequired, deleteUser);
router.get("/usuarios/search", adminRequired, usersQuery);

export default router;