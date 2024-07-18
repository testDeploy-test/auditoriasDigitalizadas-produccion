import { Op } from "sequelize";
import sequelize from "../conexion.js";
import aql from "../models/aql_defectos_mayores.model.js";
import process from "../models/auditoria_del_proceso.model.js";
import customers from "../models/clientes.model.js";
import defects from "../models/defectos.model.js";
import audit_format from "../models/formato_auditoria.model.js";
import items from "../models/items.model.js";
import order_item from "../models/pedido_item.model.js";
import orders from "../models/pedidos.model.js";
import process_defect from "../models/proceso_defecto.model.js";
import technologies from "../models/tecnologias.model.js";
import users from "../models/usuarios.model.js";

// Funciones para buscar registros por tabla

export const processQuery = async (req, res) => {
    const text = req.query.text;
    try {
        const processSearch = await process.findAll({
            attributes: { exclude: "IDauditoria" },
            include: {
                model: audit_format,
                attributes: [ "IDauditoria", "PO" ]
            },
            order: [["IDproceso", "ASC"]],
            where: {
            [Op.or]: [
                {pnc: { [Op.like]: `%${text}%` }},
                {fecha_apertura: { [Op.like]: `%${text}%` }},
                {cantidad_rechazada: { [Op.like]: `%${text}%` }},
                {defectos_encontrados: { [Op.like]: `%${text}%` }},
                {operario: { [Op.like]: `%${text}%` }},
                {accion: { [Op.like]: `%${text}%` }},
                {aprobado_por: { [Op.like]: `%${text}%` }},
                {comentario_accion: { [Op.like]: `%${text}%` }},
                {cantidad_descarte: { [Op.like]: `%${text}%` }},
                {cantidad_aceptada: { [Op.like]: `%${text}%` }},
                {observacion: { [Op.like]: `%${text}%` }},
                {fecha_cierre: { [Op.like]: `%${text}%` }},
                {re_auditoria: { [Op.like]: `%${text}%` }},
                {estado_re_auditoria: { [Op.like]: `%${text}%` }},
                {"$formato_auditorium.PO$": { [Op.like]: `%${text}%`  }}
            ]
        }});
        return res.json(processSearch)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}

export const customersQuery = async (req, res) => {
    const text = req.query.text;
    try {
        const customersSearch = await customers.findAll({ where: {
            [Op.or]: [
                {codigoCliente: { [Op.like]: `%${text}%` }},
                {nombre: { [Op.like]: `%${text}%` }}
            ]
        }});
        return res.json(customersSearch);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}

export const defectsQuery = async (req, res) => {
    const text = req.query.text;
    try {
        const defectsSearch = await defects.findAll({ where: {
            [Op.or]: [
                {codigoDefecto: { [Op.like]: `%${text}%` }},
                {nombre: { [Op.like]: `%${text}%` }},
                {criterio_aceptacion: { [Op.like]: `%${text}%` }}
            ]
        }});
        return res.json(defectsSearch);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}

export const auditQuery = async (req, res) => {
    const text = req.query.text;
    try {
        const auditSearch = await audit_format.findAll({
            /*Es necesario especificar la tabla en la funcion timediff porque usuarios tambien 
            tiene los campos hora_inicio y hora_fin por lo que sequelize lo interpreta como ambiguo. */
            attributes: [ "IDauditoria", "PO", "codigoPedido", "codigoItem", "fecha_auditoria", "hora_inicio",
                "hora_fin", [sequelize.fn("timediff", sequelize.col("formato_auditoria.hora_fin"), 
                sequelize.col("formato_auditoria.hora_inicio")), "tiempo"], "tipo_auditoria", 
                "alertas_proceso", "cantidad_lote", "estado" 
            ],
            include: [
                { model: aql, as: "aql", attributes: [ "muestra_inspeccion_normal" ] },
                { model: users, attributes: [ "nombre"] },
                { model: technologies, attributes: [ "nombre" ] }
            ],
            where: {
                [Op.or]: [
                    {PO: { [Op.like]: `%${text}%` }},
                    {codigoPedido: { [Op.like]: `%${text}%` }},
                    {codigoItem: { [Op.like]: `%${text}%` }},
                    {"$usuario.nombre$": { [Op.like]: `%${text}%` }},
                    {"$tecnologia.nombre$": { [Op.like]: `%${text}%` }},
                    {alertas_proceso: { [Op.like]: `%${text}%` }},
                    {fecha_auditoria: { [Op.like]: `%${text}%`}}
                ]
            }
        });
        return res.json(auditSearch);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}

export const ordersQuery = async (req, res) => {
    const text = req.query.text;
    try {
        const ordersSearch = await orders.findAll( { 
            attributes: ["codigoPedido", "descripcion", "codigoCliente", "imagen"],
            include: [ {model: technologies, attributes: [ "nombre" ] } ],
            where: {
                [Op.or]: [
                    {codigoPedido: { [Op.like]: `%${text}%` }},
                    {"$tecnologia.nombre$": { [Op.like]: `%${text}%` }},
                    {codigoCliente: { [Op.like]: `%${text}%` }}
                ]
            }
        });
        return res.json(ordersSearch);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}

export const itemsQuery = async (req, res) => {
    const text = req.query.text;
    try {
        const itemsSearch = await items.findAll({
            attributes: ["codigoItem", "descripcion", "imagen"],
            include: [{
                model: technologies,
                attributes: [ "nombre" ]
            }],
            where: { 
                [Op.or]: [
                    {codigoItem: { [Op.like]: `%${text}%` }},
                    {"$tecnologia.nombre$": { [Op.like]: `%${text}%` }}
                ]
            }
        });
        return res.json(itemsSearch);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error."})
    }
}

export const technologiesQuery = async (req, res) => {
    const text = req.query.text;
    try {
        const technologiesSearch = await technologies.findAll({ where: {
            nombre: { [Op.like]: `%${text}%` }
        }});
        return res.json(technologiesSearch);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}

export const usersQuery = async (req, res) => {
    const text = req.query.text;
    console.log(text)
    try {
        const usersSearch = await users.findAll({
            attributes: { exclude: "contraseña" },
            where: {
                [Op.or]: [
                    {nombre: { [Op.like]: `%${text}%` }},
                    {usuario: { [Op.like]: `%${text}%` }}
                ]
            }
        });
        return res.json(usersSearch);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}

export const oiQuery = async (req, res) => {
    const text = req.query.text;
    try {
        const oiSearch = await order_item.findAll({ 
            attributes: { exclude: "codigoItem" },
            include: [ { 
                model: items, 
                attributes: [ "codigoItem" ],
                include: [ { model: technologies, attributes: [ "nombre" ] }]
            } ],
            where: {
            [Op.or]: [
                {codigoPedido: { [Op.like]: `%${text}%` }},
                {cantidad: { [Op.like]: `%${text}%` }},
                {"$item.codigoItem$": { [Op.like]: `%${text}%` }},
                {"$item.tecnologia.nombre$": { [Op.like]: `%${text}%` }}
            ]}
        });
        return res.json(oiSearch);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}

export const pdQuery = async (req, res) => {
    const text = req.query.text;
    try {
        const pdSearch = await process_defect.findAll({ where: {
            [Op.or]: [
                {codigoDefecto: { [Op.like]: `%${text}%` }},
                {IDproceso: { [Op.like]: `%${text}%` }}
            ]
        },
        order: [["IDproceso", "ASC"]]
    });
        return res.json(pdSearch);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "There was an internal server error" });
    }
}