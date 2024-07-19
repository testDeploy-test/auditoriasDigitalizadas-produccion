import users from "../models/usuarios.model.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res) => {
    try {
        const allUsers = await users.findAll({
            attributes: { exclude: "contraseña" },
            order: [["IDusuario", "ASC"]]
        });
        return res.json(allUsers);
    } catch (error) {
        console.error();
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

export const getOneUser = async (req, res) => {
    try {
        const oneUser = await users.findByPk(req.params.IDusuario, {
            attributes: { exclude: "contraseña" }
        });
        if(!oneUser) {
            return res.status(404).json({error: "This record does not exist."});
        }
        return res.json(oneUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

export const addUser = async (req, res) => {
    const { nombre, usuario, contraseña, activo, superAdmin, hora_inicio, hora_fin } = req.body;
    const passHash = await bcrypt.hash(contraseña, 10);
    try {
        const newUser = await users.create({ nombre, usuario, contraseña: passHash, activo, superAdmin,
             hora_inicio, hora_fin });
        return res.json(newUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

export const updateUser = async (req, res) => {
    try {
        if (req.body.contraseña) {
            const passHash = await bcrypt.hash(req.body.contraseña, 10)
            req.body.contraseña = passHash;
        }
        const uUser = await users.update(req.body, { where: { IDusuario: req.params.IDusuario} });
        return res.json(uUser); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

export const deleteUser = async (req, res) => {
    try {
        await users.destroy({ where: { IDusuario: req.params.IDusuario} });
        return res.status(200).json({ message: `Register ${req.params.IDusuario} deleted`});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}