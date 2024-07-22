import users from "../models/usuarios.model.js";
import bcrypt from "bcryptjs";
import crateAccesToken from "../lib/jwt.js";
import jwt from "jsonwebtoken"
import { configDotenv } from "dotenv";

configDotenv();

export const login = async (req, res) => {
    if(!req.body.usuario || !req.body.contraseña) return res.status(400).json({ error: "User and password are required."})

    const { usuario, contraseña } = req.body;
    const  hora_actual = new Date();
    const expirationDate = new Date();

    try {
        const user = await users.findOne({ where: { usuario: usuario, activo: true } });
        if(!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const firstHour = user.hora_inicio;
        const secondHour = user.hora_fin;
        const hourParts1 = firstHour.split(":");
        const hourParts2 = secondHour.split(":");
        const hora_inicio = new Date();
        hora_inicio.setHours(parseInt(hourParts1[0]), parseInt(hourParts1[1]), parseInt(hourParts1[2]));
        const hora_fin = new Date();
        hora_fin.setHours(parseInt(hourParts2[0]), parseInt(hourParts2[1]), parseInt(hourParts2[2]));
        expirationDate.setHours(parseInt(hourParts2[0]), parseInt(hourParts2[1]), parseInt(hourParts2[2]));

        console.log("ahora",hora_actual)
        console.log("inicio",hora_inicio)
        console.log("fin",hora_fin)
        if(hora_actual < hora_inicio || hora_actual > hora_fin) {
            return res.status(400).json({  message: "Wrong time." })
        }

        const isMatch = await bcrypt.compare(contraseña, user.contraseña);
        if (!isMatch) { 
            return res.status(400).json({  message: "Incorrect password." })
        }
        const token = await crateAccesToken({ id: user.IDusuario, isAdmin: user.superAdmin})
        console.log(token)
        res.cookie('token', token, { secure: true, sameSite: 'Strict', expires: expirationDate, httpOnly: true });
        return res.json({message: "Login successful.", id: user.IDusuario});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'There was an internal server error.' });
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie('token', null, { secure: true, sameSite: 'Strict', expires: new Date(0), httpOnly: true });
        return res.json({ message: 'Logout successful.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'There was an internal server error.' });
    }
}

export const verify = async (req, res) => {
    const { token } = req.cookies;
    if(!token) return res.status(401).json({error: "Unauthorized"});

    try {
        const decoded = jwt.verify(token, process.env.KEY );
        if(!decoded) return res.status(401).json({error: "Unauthorized"});

        const user = await users.findByPk(decoded.id);
        if(!user) return res.status(401).json({error: "Unauthorized"})
        
        return res.json({ message: "Authorized"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error."})
    }
}