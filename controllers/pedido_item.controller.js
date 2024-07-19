import order_item from "../models/pedido_item.model.js";
import items from "../models/items.model.js";
import technologies from "../models/tecnologias.model.js";

export const getAllOrdersItems = async (req, res) => {
    try {
        const allOrdersItems = await order_item.findAll({
            attributes: { exclude: "codigoItem" },
            include: [ { 
                model: items, 
                attributes: [ "codigoItem" ],
                include: [ { model: technologies, attributes: [ "nombre" ] }]
            } ],
            order: [["IDpedido_item", "ASC"]]
        });
        return res.json(allOrdersItems);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}

export const getOneOrderitem = async (req, res) => {
    try {
        const oneOrderItem = await order_item.findByPk(req.params.IDpedido_item, {
            attributes: { exclude: "codigoItem" },
            include: [ { 
                model: items, 
                attributes: [ "codigoItem" ],
                include: [ { model: technologies, attributes: [ "nombre" ] }]
            } ]
        });
        if(!oneOrderItem) {
            return res.status(404).json({error: "This record does not exist."});
        }
        return res.json(oneOrderItem);       
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}

export const addOrderItem = async (req, res) => {
    try {
        const newOrderItem = await order_item.bulkCreate( req.body );
        return res.json(newOrderItem);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}

export const updateOrderItem = async (req, res) => {
    try {
        const uOrderItem = await order_item.update(req.body, 
            { where: { IDpedido_item: req.params.IDpedido_item } });
        return res.json(uOrderItem);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}

export const deleteOrderitem = async (req, res) => {
    try {
        await order_item.destroy({ where: { IDpedido_item: req.params.IDpedido_item } });
        return res.status(200).json({ message: `Register ${req.params.IDpedido_item} deleted`});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}