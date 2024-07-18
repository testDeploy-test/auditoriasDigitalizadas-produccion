import { z } from "zod";

export const addAuditSchema = z.object({
    PO: z.string({
        required_error: "PO is required.",
        invalid_type_error: "PO must be a string."
    }),

    codigoPedido: z.string({
        required_error: "Codigo pedido is required.",
        invalid_type_error: "Codigo pedido must be a string."
    }),

    codigoItem: z.string({
        required_error: "Codigo item is required.",
        invalid_type_error: "Codigo item must be a string."
    }),

    fecha_auditoria: z.coerce.date({
        required_error: "Fecha auditoria is required.",
        invalid_type_error: "Fecha auditoria must be a date."
    }),

    hora_inicio: z.string({
        required_error: "Hora de incio is required.",
        invalid_type_error: "Hora de inicio must be an hour."
    }).time(),

    hora_fin: z.string({
        required_error: "Hora fin is required.",
        invalid_type_error: "Hora fin must be an hour."
    }).time(),

    IDusuario: z.number({
        required_error: "IDusuario is required.",
        invalid_type_error: "IDusuario must be a number."
    }).positive().int(),

    tipo_auditoria: z.string({
        required_error: "Tipo auditoria is required.",
        invalid_type_error: "Tipo auditoria must be a string."
    }),

    IDtecnologia: z.number({
        required_error: "IDtecnologia is required.",
        invalid_type_error: "IDtecnologia must be a number."
    }).positive().int(),

    alertas_proceso: z.string({
        required_error: "Alertas proceso is required.",
        invalid_type_error: "Alertas proceso must be a string."
    }),

    cantidad_lote: z.number({
        required_error: "Cantidad del lote is required.",
        invalid_type_error: "Cantidad del lote must be a number."
    }).positive().int(),

    IDaql: z.number({
        required_error: "IDaql is required.",
        invalid_type_error: "IDaql must be a number."
    }).positive().int(),

    estado: z.string({
        required_error: "Status is required.",
        invalid_type_error: "Status must be a string."
    })
});

export const updateAuditSchema = z.object({
    PO: z.string({
        invalid_type_error: "PO must be a string."
    }).optional(),

    codigoPedido: z.string({
        invalid_type_error: "Codigo Pedido must be a string."
    }).optional(),

    codigoItem: z.string({
        invalid_type_error: "Codigo Item must be a string."
    }).optional(),

    fecha_auditoria: z.coerce.date({
        invalid_type_error: "Fecha auditoria must be a date."
    }).optional(),

    hora_inicio: z.string({
        invalid_type_error: "Hora de inicio must be an hour."
    }).time().optional(),

    hora_fin: z.string({
        invalid_type_error: "Hora fin must be an hour."
    }).time().optional(),

    IDusuario: z.number({
        invalid_type_error: "IDusuario must be a number."
    }).positive().int().optional(),

    tipo_auditoria: z.string({
        invalid_type_error: "Tipo de auditoria must be a string."
    }).optional(),

    IDtecnologia: z.number({
        invalid_type_error: "IDtecnologia must be a number."
    }).positive().int().optional(),

    alertas_proceso: z.string({
        invalid_type_error: "Alertas proceso must be a string."
    }).optional(),

    cantidad_lote: z.number({
        invalid_type_error: "Cantidad del lote must be a number."
    }).positive().int().optional(),

    IDaql: z.number({
        invalid_type_error: "IDaql must be a number."
    }).positive().int().optional(),

    estado: z.string({
        invalid_type_error: "Status must be a string."
    }).optional()
});