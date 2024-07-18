import { Router } from "express";
import { getAllCustomers, getOneCustomer, addCustomer, updateCustomer, deleteCustomer } from "../controllers/clientes.controller.js";
import userRequired from "../middleware/user.validator.js";
import adminRequired from "../middleware/admin.validator.js";
import validateSchema from "../middleware/validator.middleware.js";
import { addCustomerSchema, updateCustomerSchema } from "../schemas/clientes.schema.js";
import { customersQuery } from "../controllers/search.controller.js";

const router = Router();

router.get("/clientes", userRequired, getAllCustomers);
router.get("/cliente/:codigoCliente", userRequired, getOneCustomer);
router.post("/add-cliente",userRequired, validateSchema(addCustomerSchema), addCustomer);
router.put("/update-cliente/:codigoCliente",userRequired, validateSchema(updateCustomerSchema), updateCustomer);
router.delete("/delete-cliente/:codigoCliente", adminRequired, deleteCustomer);
router.get("/clientes/search", userRequired, customersQuery);

export default router;
