import technologies from "../models/tecnologias.model.js";

export const getAllTechnologies = async (req, res) => {
    try {
        const allTechnologies = await technologies.findAll({
            order: [["IDtecnologia", "ASC"]]
        });
        return res.json(allTechnologies);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

export const getOneTechnology = async (req, res) => {
    try {
        const oneTechnology = await technologies.findByPk(req.params.IDtecnologia);
        if(!oneTechnology) {
            return res.status(404).json({error: "This record does not exist."});
        }
        return res.json(oneTechnology);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

export const  addTechnology = async (req, res) => {
    const nombre = req.body.nombre;
    try {
        const newTechnology = await technologies.create({ nombre });
        return res.json(newTechnology);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

export const updateTechnology = async (req, res) => {
    try {
        const uTechnology = await technologies.update(req.body, { where: {IDtecnologia: req.params.IDtecnologia} });
        return res.json(uTechnology);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

export const deleteTechnology = async (req, res) => {
    try {
        await technologies.destroy({ where: {IDtecnologia: req.params.IDtecnologia}});
        return res.status(200).json({ message: `Register ${req.params.IDtecnologia} deleted`});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}