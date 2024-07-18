import sequelize from "../conexion.js"
import { DataTypes } from "sequelize"

const defects = sequelize.define("defectos", {
    codigoDefecto: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    nombre: { type: DataTypes.STRING },
    criterio_aceptacion: { type: DataTypes.STRING(1234)}
});

//await defects.sync({ alter: true });
await defects.sync();

export default defects;