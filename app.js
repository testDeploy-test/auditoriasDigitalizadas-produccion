import express from "express";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import aqlRoutes from "./routes/aql_defectos_mayores.routes.js";
import processRoutes from "./routes/auditoria_del_proceso.routes.js";
import customersRoutes from "./routes/clientes.routes.js";
import defectsRoutes from "./routes/defectos.routes.js";
import usersRoutes from "./routes/usuarios.routes.js";
import auditRoutes from "./routes/formato_auditoria.routes.js"
import technologies from "./routes/tecnologias.routes.js";
import itemsRoutes from "./routes/items.routes.js";
import ordersRoutes from "./routes/pedidos.routes.js";
import ordersItemsRoutes from "./routes/pedido_item.routes.js";
import processDefectRoutes from "./routes/proceso_defecto.routes.js";
import authRoutes from "./routes/auth.routes.js";
import tables from "./controllers/tables.controller.js";
import path from 'path';
import history from 'connect-history-api-fallback';;
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(history());

//Para servir archivos estáticos desde la carpeta 'public' y 'uploads'
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: ["http://localhost:3000", "http://localhost:4200"] }));
app.use(fileUpload({createParentPath: true}));
app.use("/api", aqlRoutes);
app.use("/api", processRoutes);
app.use("/api", customersRoutes);
app.use("/api", defectsRoutes);
app.use("/api", auditRoutes);
app.use("/api", itemsRoutes);
app.use("/api", ordersItemsRoutes);
app.use("/api", ordersRoutes);
app.use("/api", processDefectRoutes);
app.use("/api", technologies);
app.use("/api", usersRoutes);
app.use("/api", authRoutes);
app.get("/api/tablas", tables)

export default app;