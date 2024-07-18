import defects from "../models/defectos.model.js";

export const getAllDefects = async (req, res) => {
    try {
        const allDefects = await defects.findAll();
        return res.json(allDefects);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}

export const getOneDefect = async (req, res) => {
    try {
        const oneDefect = await defects.findByPk(req.params.codigoDefecto);
        if(!oneDefect) {
            return res.status(404).json({error: "This record does not exist."});
        }
        return res.json(oneDefect);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}

export const addDefect = async (req, res) => {
    const {codigoDefecto, nombre, criterio_aceptacion } = req.body;
    try {
        const newDefect = await defects.create({
            codigoDefecto, nombre, criterio_aceptacion
        });
        return res.json(newDefect);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}

export const updateDefect = async (req, res) => {
    try {
        const uDefect = await defects.update(req.body, { where: { codigoDefecto: req.params.codigoDefecto } });
        return res.json(uDefect)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

export const deleteDefect = async (req, res) => {
    try {
       await defects.destroy({ where: { codigoDefecto: req.params.codigoDefecto} });
       return res.status(200).json({ message: `Register ${req.params.codigoDefecto} deleted.`}); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}