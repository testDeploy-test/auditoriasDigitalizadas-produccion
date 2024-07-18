import sequelize from "../conexion.js"
import { DataTypes } from "sequelize"
import auditFormat from "./formato_auditoria.model.js"

const process = sequelize.define("auditoria_del_proceso", {
    IDproceso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pnc: {type: DataTypes.STRING },
    fecha_apertura: { type: DataTypes.DATEONLY },
    cantidad_rechazada: { type: DataTypes.INTEGER },
    defectos_encontrados: { type: DataTypes.INTEGER },
    operario: { type: DataTypes.STRING },
    accion: { type: DataTypes.STRING },
    aprobado_por: { type: DataTypes.STRING },
    comentario_accion: { type: DataTypes.STRING },
    cantidad_descarte: { type: DataTypes.INTEGER },
    cantidad_aceptada: { type: DataTypes.INTEGER },
    observacion: { type: DataTypes.STRING(1234) },
    fecha_cierre: { type: DataTypes.DATEONLY },
    re_auditoria: { type: DataTypes.STRING },
    estado_re_auditoria: { type: DataTypes.STRING },
    IDauditoria: { type: DataTypes.INTEGER },
    imagen: { type: DataTypes.STRING }
});

auditFormat.hasOne(process, { foreignKey: "IDauditoria" });
process.belongsTo(auditFormat, { foreignKey: "IDauditoria"});

//await process.sync({ alter: true });
await process.sync();

export default process;