import { Router } from "express";
import { getAllItems, getOneItem, addItem, updateItem, deleteItem } from "../controllers/items.controller.js";
import userRequired from "../middleware/user.validator.js";
import adminRequired from "../middleware/admin.validator.js";
import validateSchema from "../middleware/validator.middleware.js";
import { addItemSchema, updateItemSchema } from "../schemas/items.schema.js";
import { itemsQuery } from "../controllers/search.controller.js";

const router = Router();

router.get("/item/:codigoItem", userRequired, getOneItem);
router.get("/items", userRequired, getAllItems);
router.post("/add-item", userRequired, validateSchema(addItemSchema), addItem);
router.put("/update-item/:codigoItem", userRequired, validateSchema(updateItemSchema), updateItem);
router.delete("/delete-item/:codigoItem", adminRequired, deleteItem);
router.get("/items/search", userRequired, itemsQuery);

export default router;
