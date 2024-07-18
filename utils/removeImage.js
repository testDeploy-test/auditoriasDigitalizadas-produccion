import fs from "fs/promises";

const removeImage = (rute) => {
    fs.unlink(rute).then(() => {
        console.log("File removed.")
    }).catch(error => {
        console.error('Something wrong happened removing the file', error)
    })
}

export default removeImage;