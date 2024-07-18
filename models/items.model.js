import sequelize from "../conexion.js"
import { DataTypes } from "sequelize"
import technologies from "./tecnologias.model.js";

const items = sequelize.define("items", {
    codigoItem: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    descripcion: { type: DataTypes.STRING(1234) },
    IDtecnologia: { type: DataTypes.INTEGER },
    imagen: { type: DataTypes.STRING }
});

technologies.hasMany(items, { foreignKey: "IDtecnologia" });
items.belongsTo(technologies, { foreignKey: "IDtecnologia"});

//await items.sync({ alter: true });
await items.sync();

export default items;

