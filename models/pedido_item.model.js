import sequelize from "../conexion.js"
import { DataTypes } from "sequelize"
import orders from "./pedidos.model.js";
import items from "./items.model.js";

const order_item = sequelize.define("pedido_item", {
    IDpedido_item: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codigoPedido: { type: DataTypes.STRING},
    codigoItem: { type: DataTypes.STRING },
    cantidad: { type: DataTypes.INTEGER },
    createdAt: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    }
});

orders.hasMany(order_item, { foreignKey: "codigoPedido" });
order_item.belongsTo(orders, { foreignKey: "codigoPedido" });

items.hasMany(order_item, { foreignKey: "codigoItem" });
order_item.belongsTo(items, { foreignKey: "codigoItem" });

//await order_item.sync({ alter: true });
await order_item.sync();

export default order_item;