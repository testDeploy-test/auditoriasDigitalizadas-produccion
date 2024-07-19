import process from "../models/auditoria_del_proceso.model.js";
import audit_format from "../models/formato_auditoria.model.js";
import uploadImage from "../utils/uploadImage.js";
import removeImage from "../utils/removeImage.js";

export const getAllProcesses = async (req, res) => {
    try {
        const allProcesses = await process.findAll({ 
            attributes: { exclude: "IDauditoria" },
            include: {
                model: audit_format,
                attributes: [ "IDauditoria", "PO" ]
            },
            order: [["IDproceso", "ASC"]]
        });
        return res.json(allProcesses);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

export const getOneProcess = async (req, res) => {
    try {
        const oneProcess = await process.findByPk(req.params.IDproceso, { 
            attributes: { exclude: "IDauditoria" },
            include: {
                model: audit_format,
                attributes: [ "IDauditoria", "PO" ]
            }
        });
        if (!oneProcess) {
            return res.status(404).json({error: "This record does not exist."});
        }
        return res.json(oneProcess);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

export const addProcess = async (req, res) => {
    let imagen;
    if(!req.files) {
        imagen = req.body.imagen
    } else {
        imagen = await uploadImage(req.files.file)
    }
    const {
        pnc,
        fecha_apertura,
        cantidad_rechazada,
        defectos_encontrados,
        operario,
        accion,
        aprobado_por,
        comentario_accion,
        cantidad_descarte,
        cantidad_aceptada,
        observacion,
        fecha_cierre,
        re_auditoria,
        estado_re_auditoria,
        IDauditoria
    } = req.body;
    try {
        const newProcess = await process.create({
            pnc,
            fecha_apertura,
            cantidad_rechazada,
            defectos_encontrados,
            operario,
            accion,
            aprobado_por,
            comentario_accion,
            cantidad_descarte,
            cantidad_aceptada,
            observacion,
            fecha_cierre,
            re_auditoria,
            estado_re_auditoria,
            IDauditoria,
            imagen
        });
        return res.json(newProcess);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

export const updateProcess = async (req, res) => {
    let data;
    if(!req.files) {
        data = req.body;
    } else {
        let imagen = await uploadImage(req.files.file)
        const textFields = req.body;
        data = { textFields, imagen}
    }
    try {
        const prevImg = await process.findByPk(req.params.IDproceso);
        const uProcess = await process.update(data, { where: { IDproceso: req.params.IDproceso} });
        if(req.files && prevImg.imagen != "") {
            removeImage(prevImg.imagen)
        }
        return res.json(uProcess)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

export const deleteProcess = async (req, res) => {
    try {
        const object = await process.findByPk(req.params.IDproceso);
        if(!object) {
            return res.stauts(404).json({ error: "This record does not exist." })
        }
        if(object.imagen != "") {
            removeImage(object.imagen)
        }
        await process.destroy({ where: { IDproceso: req.params.IDproceso } });
        return res.status(200).json({ message: `Record ${req.params.IDproceso} deleted.`});

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "There was an internal server error." });
    }
}