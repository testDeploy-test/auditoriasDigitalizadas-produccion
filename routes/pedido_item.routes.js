import { Router } from "express";
import { getAllOrdersItems, getOneOrderitem, addOrderItem, updateOrderItem, deleteOrderitem } from "../controllers/pedido_item.controller.js";
import userRequired from "../middleware/user.validator.js";
import adminRequired from "../middleware/admin.validator.js";
import validateSchema from "../middleware/validator.middleware.js";
import { addOISchema, updateOISchema } from "../schemas/pedido_item.schema.js";
import { oiQuery } from "../controllers/search.controller.js";

const router = Router();

router.get("/pedidos-items", userRequired, getAllOrdersItems);
router.get("/pedido-item/:IDpedido_item", userRequired, getOneOrderitem);
router.post("/add-pedido-item", userRequired, validateSchema(addOISchema), addOrderItem);
router.put("/update-pedido-item/:IDpedido_item", userRequired, validateSchema(updateOISchema), updateOrderItem);
router.delete("/delete-pedido-item/:IDpedido_item", adminRequired, deleteOrderitem);
router.get("/pedidos-items/search", userRequired, oiQuery);

export default router;