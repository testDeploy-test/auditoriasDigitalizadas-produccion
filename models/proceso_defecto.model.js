import sequelize from "../conexion.js"
import { DataTypes } from "sequelize"
import process from "./auditoria_del_proceso.model.js";
import defects from "./defectos.model.js";

const process_defect = sequelize.define("proceso_defecto", {
    IDproceso_defecto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    IDproceso: { type: DataTypes.INTEGER },
    codigoDefecto: { type: DataTypes.STRING },
    createdAt: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    }
});

process.hasMany(process_defect, { foreignKey: "IDproceso" });
process_defect.belongsTo(process, { foreignKey: "IDproceso" });

defects.hasMany(process_defect, { foreignKey: "codigoDefecto" });
process_defect.belongsTo(defects, { foreignKey: "codigoDefecto" });

//await process_defect.sync({ alter: true });
await process_defect.sync();

export default process_defect;