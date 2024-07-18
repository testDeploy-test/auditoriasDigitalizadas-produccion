import sequelize from "../conexion.js"
import { DataTypes } from "sequelize"

const users = sequelize.define("usuarios", {
    IDusuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: { type: DataTypes.STRING },
    usuario: {
        type: DataTypes.STRING,
        unique: true
    },
    contraseña: { type: DataTypes.STRING },
    activo: { 
        type: DataTypes.BOOLEAN,
        defaultValue: true 
    },
    superAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    hora_inicio: { 
        type: DataTypes.TIME,
    },
    hora_fin: { 
        type: DataTypes.TIME,
    }
});

//await users.sync({ alter: true });
await users.sync();

export default users;