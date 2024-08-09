import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';
import { configDotenv } from "dotenv";

configDotenv();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const removeImage = (rute) => {
    const pathImage = process.env.NODE_ENV === "development"
    ? path.join(__dirname, "..", "uploads", path.basename(rute))
    : rute
    fs.unlink(pathImage).then(() => {
        console.log("File removed.")
    }).catch(error => {
        console.error('Something wrong happened removing the file', error)
    })
}

export default removeImage;