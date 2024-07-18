import path from "path";
import { configDotenv } from "dotenv";

configDotenv();

const uploadImage = (image) => {
    return new Promise((resolve, reject) => {
        let ext = path.extname(image.name);
        const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;

        const rute = path.join(process.env.BASE_URL, "uploads", fileName);

        image.mv(rute, error => {
            if(error) {
                console.log(error);
                return reject(res.status(500).json({ error: "There was an internal sever error." } ))
            }
            resolve(rute)
        })
    })
}

export default uploadImage;