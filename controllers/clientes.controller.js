import customers from "../models/clientes.model.js";

export const getAllCustomers = async (req, res) => {
    try {
        const allCustomers = await customers.findAll({
            order: [["codigoCliente", "ASC"]]
        });
        return res.json(allCustomers);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

export const getOneCustomer = async (req, res) => {
    try {
        const oneCustomer = await customers.findByPk(req.params.codigoCliente);
        if(!oneCustomer) {
            res.status(404).json({error: "This record does not exist."});
        }
        return res.json(oneCustomer);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

export const addCustomer = async (req, res) => {
    const { codigoCliente, nombre } = req.body;
    try {
        const newCustomer = await customers.create({codigoCliente, nombre});
        return res.json(newCustomer);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

export const updateCustomer = async (req, res) => {
    try {
        const uCustomer = await customers.update( req.body, { where: { codigoCliente: req.params.codigoCliente }});
        return res.json(uCustomer);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

export const deleteCustomer = async (req, res) => {
    try {
        await customers.destroy({ where: { codigoCliente: req.params.codigoCliente } });
        return res.status(200).json({ message: `Register ${req.params.codigoCliente} deleted.`});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}