import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

function crateAccesToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.KEY, {
            expiresIn: "1d"
        }, (err, token) => {
            if(err) {
                reject (err);
            }
            resolve(token);
        })
    })
}

export default crateAccesToken;