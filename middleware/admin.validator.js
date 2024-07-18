import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const adminRequired = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json('Unauthorized');
    }

    jwt.verify(token, process.env.KEY, (err, user) => {
        if(err) {
            return res.status(401).json({ message: 'Unauthorized'});
        }
        req.usuario = user;
    })
    if(!req.usuario.isAdmin) {
        return res.status(401).json({ message: 'Unauthorized'});
    }
    next();
};

export default adminRequired;