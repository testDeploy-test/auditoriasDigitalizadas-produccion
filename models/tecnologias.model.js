import sequelize from "../conexion.js"
import { DataTypes } from "sequelize"

const technologies = sequelize.define("tecnologias", {
    IDtecnologia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: { type: DataTypes.STRING}
});

//await technologies.sync({ alter: true });
await technologies.sync();

export default technologies;