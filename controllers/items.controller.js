import items from "../models/items.model.js"
import technologies from "../models/tecnologias.model.js";
import uploadImage from "../utils/uploadImage.js";
import removeImage from "../utils/removeImage.js";

export const getAllItems = async (req, res) => {
    try {
        const allItems = await items.findAll({
            attributes: [ "codigoItem", "descripcion", "imagen" ],
            include: [{
                model: technologies,
                attributes: [ "IDtecnologia", "nombre" ]
            }],
            order: [["codigoItem", "ASC"]]
        });
        return res.json(allItems);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error."})
    }
}

export const getOneItem = async (req, res) => {
    try {
        const oneItem = await items.findByPk(req.params.codigoItem, {
            attributes: ["codigoItem", "descripcion", "imagen"],
            include: [{
                model: technologies,
                attributes: [ "IDtecnologia", "nombre" ]
            }]
        });
        if(!oneItem) {
            return res.status(404).json({error: "This record does not exist."});
        }
        if(oneItem.imagen) console.log(oneItem.imagen)
        return res.json(oneItem);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}

export const addItem =  async (req, res) => {
    let imagen;
    const {
        codigoItem,
        descripcion, 
        IDtecnologia
    } = req.body;

    try {
        imagen = await uploadImage(req.files.file)
        const newItem = await items.create({ codigoItem, descripcion, IDtecnologia, imagen: imagen})
        
        return res.json(newItem);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}

export const updateItem = async (req, res) => {
    let data;
    if(!req.files) {
        data = req.body;
    } else {
        let imagen = await uploadImage(req.files.file)
        const textFields = req.body;
        data = { textFields, imagen }
    }
    
    try {
        const prevImg = await items.findByPk(req.params.codigoItem);
        const uItem = await items.update( data, { where: { codigoItem: req.params.codigoItem } });
        if (prevImg.imagen != "" && data.imagen) {
            removeImage(prevImg.imagen)
        }
        return res.json(uItem);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}

export const deleteItem = async (req, res) => {
    try {
        const item = await items.findByPk(req.params.codigoItem);
        if(!item) {
            return res.status(404).json({ error: "This record does not exist."})
        }
        await items.destroy({ where: { codigoItem: req.params.codigoItem} });
        console.log(item)
        if (item.imagen != "") {
            removeImage(item.imagen)
        }
        return res.status(200).json({ message: `Record ${req.params.codigoItem} deleted`});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}