import audit_format from "../models/formato_auditoria.model.js";
import aql from "../models/aql_defectos_mayores.model.js";
import users from "../models/usuarios.model.js";
import technologies from "../models/tecnologias.model.js";
import sequelize from "../conexion.js";

export const getAllAudits = async (req, res) => {
    try {
        const allAudits = await audit_format.findAll({
            /*Es necesario especificar la tabla en la funcion timediff porque usuarios tambien 
            tiene los campos hora_inicio y hora_fin por lo que sequelize lo interpreta como ambiguo. */
            /*attributes: [ "IDauditoria", "PO", "codigoPedido", "codigoItem", "fecha_auditoria", "hora_inicio", 
                "hora_fin", [sequelize.fn("timediff", sequelize.col("formato_auditoria.hora_fin"), 
                sequelize.col("formato_auditoria.hora_inicio")), "tiempo"],"tipo_auditoria", "alertas_proceso",
                "cantidad_lote", "estado", "tipo_muestra"
            ],*/
            attributes: [ "IDauditoria", "PO", "codigoPedido", "codigoItem", "fecha_auditoria", "hora_inicio", 
                "hora_fin", [sequelize.literal('(EXTRACT(EPOCH FROM (formato_auditoria.hora_fin - formato_auditoria.hora_inicio)))::integer'), "tiempo"],"tipo_auditoria", "alertas_proceso",
                "cantidad_lote", "estado", "tipo_muestra"
            ],
            include: [
                { model: aql, as: "aql", attributes: { exclude: [ "minimo", "maximo" ] } },
                { model: users, attributes: [ "IDusuario", "nombre"] },
                { model: technologies, attributes: [ "IDtecnologia", "nombre" ] }
            ],
            order: [["IDauditoria", "ASC"]]
        });
        return res.json(allAudits);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

export const getOneAudit = async (req, res) => {
    try {
        const oneAudit = await audit_format.findByPk(req.params.IDauditoria, {
            attributes: [ "IDauditoria", "PO", "codigoPedido", "codigoItem", "fecha_auditoria", "hora_inicio", 
                "hora_fin", [sequelize.fn("timediff", sequelize.col("hora_fin"), sequelize.col("hora_inicio")), "tiempo"],
                "tipo_auditoria", "alertas_proceso", "cantidad_lote", "estado", "tipo_muestra"
            ],
            include: [
                { model: aql, attributes: { exclude: [ "minimo", "maximo" ] } },
                { model: users, attributes: [ "nombre" ] },
                { model: technologies, attributes: [ "nombre" ] }
            ]
        });
        if(!oneAudit) {
            return res.status(404).json({error: "This record does not exist."});
        }
        return res.json(oneAudit);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

export const addAudit = async (req, res) => {
    const {
        PO,
        codigoPedido,
        codigoItem,
        fecha_auditoria,
        hora_inicio,
        hora_fin,
        IDusuario,
        tipo_auditoria,
        IDtecnologia,
        alertas_proceso,
        cantidad_lote,
        tipo_muestra,
        IDaql,
        estado
    } = req.body;

    try {
        const newAudit = await audit_format.create({
            PO,
            codigoPedido,
            codigoItem,
            fecha_auditoria,
            hora_inicio,
            hora_fin,
            IDusuario,
            tipo_auditoria,
            IDtecnologia,
            alertas_proceso,
            cantidad_lote,
            tipo_muestra,
            IDaql,
            estado
        });
        return res.json(newAudit);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

export const updateAudit = async (req, res) => {
    try {
        const uAudit = await audit_format.update(req.body, { 
            where: { IDauditoria: req.params.IDauditoria } 
        });
        return res.json(uAudit);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}

export const deleteAudit = async (req, res) => {
    try {
        await audit_format.destroy({ where: {IDauditoria: req.params.IDauditoria}});
        return res.status(200).json({ message: `Record ${req.params.IDauditoria} deleted.`});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error." });
    }
}