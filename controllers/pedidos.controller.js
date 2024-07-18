import orders from "../models/pedidos.model.js";
import technologies from "../models/tecnologias.model.js";
import uploadImage from "../utils/uploadImage.js";
import removeImage from "../utils/removeImage.js";

export const getAllOrders = async (req, res) => {
    try {
        const allOrders = await orders.findAll({
            attributes: ["codigoPedido", "descripcion", "codigoCliente", "imagen", "createdAt"],
            include: [ { model: technologies, attributes: [ "nombre" ] } ]
        });
        return res.json(allOrders);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}

export const getOneOrder = async (req, res) => {
    try {
        const oneOrder = await orders.findByPk(req.params.codigoPedido, {
            attributes: ["codigoPedido", "descripcion", "codigoCliente", "imagen", "createdAt"],
            include: [ {model: technologies, attributes: [ "nombre" ] } ]
        });
        if(!oneOrder) {
            return res.status(404).json({error: "This record does not exist."});
        }
        return res.json(oneOrder);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}

export const addOrder = async (req, res) => {
    let imagen;
    if (!req.files) {
        imagen = req.body.imagen;
    } else {
        imagen = await uploadImage(req.files.file)
    }
    const {
        codigoPedido,
        descripcion,
        IDtecnologia,
        codigoCliente
    } = req.body;

    try {
        
        const newOrder = await orders.create({
            codigoPedido,
            descripcion,
            IDtecnologia,
            codigoCliente,
            imagen
        });
        return res.json(newOrder);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}

export const updateOrder = async (req, res) => {
    let data;
    let imagen;
    if(!req.files) {
        data = req.body;
    } else {
        imagen = await uploadImage(req.files.file);

        const textFields = req.body;
        data = { textFields, imagen}
    }
    try {
        const prevImg = await orders.findByPk(req.params.codigoPedido)
        const uOrder = await orders.update(data, { where: { codigoPedido: req.params.codigoPedido } });
        if(req.files && prevImg.imagen != ""){
            removeImage(prevImg.imagen)
        }
        return res.json(uOrder);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}

export const deleteOrder = async (req, res) => {
    try {
        const order = await orders.findByPk(req.params.codigoPedido)
        if(!order) {
            return res.status(404).json({ error: "This record does not exist."})
        }
        await orders.destroy({ where: { codigoPedido: req.params.codigoPedido } });
        if(order.imagen != "") {
            removeImage(order.imagen)
        }
        return res.status(200).json({ message: `Register ${req.params.codigoPedido} deleted`});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}