import process_defect from "../models/proceso_defecto.model.js";

export const getAllProcessesDefects = async (req, res) => {
    try {
        const allProcessesDefects = await process_defect.findAll();
        return res.json(allProcessesDefects);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}

export const getOneProcessDefect = async (req, res) => {
    try {
        const oneProcessDefect = await process_defect.findByPk(req.params.IDproceso_defecto);
        if(!oneProcessDefect) {
            return res.status(404).json({error: "This record does not exist."});
        }
        return res.json(oneProcessDefect);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}

export const addProcessDefect = async (req, res) => {
    try {
        const newProcessDefect = await process_defect.bulkCreate(req.body);
        return res.json(newProcessDefect);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}

export const updateProcessDefect = async (req, res) => {
    try {
        const uProcessDefect = await process_defect.update( req.body, { 
            where: { IDproceso_defecto: req.params.IDproceso_defecto}
        });
        return res.json(uProcessDefect);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}

export const deleteProcessDefect = async (req, res) => {
    try {
        await process_defect.destroy({ where: { IDproceso_defecto: req.params.IDproceso_defecto }});
        return res.status(200).json({ message: `Register ${req.params.IDproceso_defecto} deleted`});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}