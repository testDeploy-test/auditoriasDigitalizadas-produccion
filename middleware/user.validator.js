import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const userRequired = (req, res, next) => {
    const { token } = req.cookies;

    if(!token) {
        return res.status(401).json({ message: 'Unauthorized'});
    }

    jwt.verify(token, process.env.KEY, (err, user) => {
        if(err) {
            return res.status(401).json({ message: 'Unauthorized'});
        }
        req.usuario = user;
    })
    next();
}

export default userRequired;