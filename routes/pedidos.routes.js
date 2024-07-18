import { Router } from "express";
import { getAllOrders, getOneOrder, addOrder, updateOrder, deleteOrder } from "../controllers/pedidos.controller.js";
import userRequired from "../middleware/user.validator.js";
import adminRequired from "../middleware/admin.validator.js";
import validateSchema from "../middleware/validator.middleware.js";
import { addOrderSchema, updateOrderSchema } from "../schemas/pedidos.schema.js";
import { ordersQuery } from "../controllers/search.controller.js";

const router = Router();

router.get("/pedidos", userRequired, getAllOrders);
router.get("/pedido/:codigoPedido", userRequired, getOneOrder);
router.post("/add-pedido", userRequired, validateSchema(addOrderSchema), addOrder);
router.put("/update-pedido/:codigoPedido", userRequired, validateSchema(updateOrderSchema), updateOrder);
router.delete("/delete-pedido/:codigoPedido", adminRequired, deleteOrder);
router.get("/pedidos/search", userRequired, ordersQuery);

export default router;
