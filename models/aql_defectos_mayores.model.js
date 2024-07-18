import sequelize from "../conexion.js"
import { DataTypes } from "sequelize"

const aql = sequelize.define("AQL_defectos_mayores", {
    IDaql: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    minimo: { type: DataTypes.INTEGER },
    maximo: { type: DataTypes.INTEGER },
    muestra_inspeccion_reducida: { type: DataTypes.INTEGER },
    muestra_inspeccion_normal: { type: DataTypes.INTEGER },
    muestra_inspeccion_severa: { type: DataTypes.INTEGER }
});

//await aql.sync({ alter: true });
await aql.sync();

export default aql;