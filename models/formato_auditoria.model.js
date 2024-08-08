import sequelize from "../conexion.js"
import { DataTypes } from "sequelize"
import orders from "./pedidos.model.js";
import users from "./usuarios.model.js"
import technologies from "./tecnologias.model.js";
import aql from "./aql_defectos_mayores.model.js"

const audit_format = sequelize.define("formato_auditoria",  {
    IDauditoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    PO: { type: DataTypes.STRING },
    codigoPedido: { type: DataTypes.STRING },
    codigoItem: { type: DataTypes.STRING },
    fecha_auditoria: { type: DataTypes.DATEONLY},
    hora_inicio: { type: DataTypes.TIME },
    hora_fin: { type: DataTypes.TIME },
    IDusuario: { type: DataTypes.INTEGER },
    tipo_auditoria: { type: DataTypes.STRING },
    IDtecnologia: { type: DataTypes.INTEGER },
    alertas_proceso: { type: DataTypes.STRING },
    cantidad_lote: { type: DataTypes.INTEGER },
    tipo_muestra: { 
        type: DataTypes.STRING,
        validate: { isIn: [[ "reducida", "normal", "severa" ]] }
    },
    IDaql: { type: DataTypes.INTEGER },
    estado: { type: DataTypes.STRING }
});

orders.hasMany(audit_format, { foreignKey: "codigoPedido" });
audit_format.belongsTo(orders, { foreignKey: 'codigoPedido' });

users.hasMany(audit_format, { foreignKey: "IDusuario" });
audit_format.belongsTo(users, { foreignKey: 'IDusuario' });

technologies.hasMany(audit_format, { foreignKey: "IDtecnologia" });
audit_format.belongsTo(technologies, { foreignKey: 'IDtecnologia' });

aql.hasMany(audit_format, { foreignKey: "IDaql" });
audit_format.belongsTo(aql, { as: "aql" ,foreignKey: 'IDaql' });

//await audit_format.sync({ alter: true });
await audit_format.sync();

export default audit_format;