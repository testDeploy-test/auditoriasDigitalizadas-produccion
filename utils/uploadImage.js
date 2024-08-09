import path from "path";
import { fileURLToPath } from 'url';
import { configDotenv } from "dotenv";

configDotenv();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadImage = (image) => {
    return new Promise((resolve, reject) => {
        let ext = path.extname(image.name);
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;

        let rute, fullPath;
        if(process.env.NODE_ENV === "development") {
            fullPath = path.join(__dirname, "..", "uploads", fileName);
            rute = `http://localhost:3000/uploads/${fileName}`;
        } else {
            fullPath = path.join("uploads", fileName);
            rute = path.join("uploads", fileName);
        }

        image.mv(fullPath, error => {
            if(error) {
                console.log(error);
                return reject(res.status(500).json({ error: "There was an internal sever error." } ))
            }
            resolve(rute)
        })
    })
}

export default uploadImage;