import aql from "../models/aql_defectos_mayores.model.js"

export const getAql = async (req, res) => {
    try {
        const dataAql = await aql.findAll();
        return res.json(dataAql);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

export const getOneAql = async (req, res) => {
    try {
        const oneAql = await aql.findByPk(req.params.IDaql);
        if(!oneAql) {
            return res.status(404).json({error: "This record does not exist."});
        }
        return res.json(oneAql)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

// funcion para añadir un registro, se utiliza la funcion create de sequelize
// ya que este lo guarda automaticamente
export const addAql = async (req, res) => {
    const { 
        minimo, 
        maximo, 
        muestra_inspeccion_reducida, 
        muestra_inspeccion_normal, 
        muestra_inspeccion_severa
    } = req.body;

    try {
        const newAql = await aql.create({
            minimo, 
            maximo, 
            muestra_inspeccion_reducida, 
            muestra_inspeccion_normal, 
            muestra_inspeccion_severa
        });
        return res.json(newAql);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}


export const updateAql = async (req, res) => {
    try {
        const uAql = await aql.update(req.body, {where: {IDaql: req.params.IDaql}});
        return res.json(uAql);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

export const deleteAql = async(req, res) => {
    try {
        await aql.destroy({where: {IDaql: req.params.IDaql} });
        return res.status(200).json({ message: `Record ${req.params.IDaql} deleted.`});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}