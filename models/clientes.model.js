import sequelize from "../conexion.js";
import { DataTypes } from "sequelize";

const customers = sequelize.define("clientes", {
    codigoCliente: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING
    }
});

//await customers.sync({ alter: true });
await customers.sync();

export default customers;
