import sequelize from "../conexion.js"
import { DataTypes } from "sequelize"
import technologies from "./tecnologias.model.js";
import customers from "./clientes.model.js";

const orders = sequelize.define("pedidos", {
    codigoPedido: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    descripcion: { type: DataTypes.STRING(1234)},
    IDtecnologia: { type: DataTypes.INTEGER },
    codigoCliente: { type: DataTypes.STRING },
    imagen: { type: DataTypes.STRING},
    createdAt: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    }
});

technologies.hasMany(orders, { foreignKey: "IDtecnologia" })
orders.belongsTo(technologies, {foreignKey: "IDtecnologia"});

customers.hasMany(orders, { foreignKey: "codigoCliente" })
orders.belongsTo(customers, {foreignKey: "codigoCliente"})


//await orders.sync({ alter: true });
await orders.sync();

export default orders;