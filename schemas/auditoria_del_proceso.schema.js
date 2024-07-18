import { z } from "zod";

export const addProcessSchema = z.object({
    pnc: z.string({
        required_error: "#PNC is required.",
        invalid_type_error: "#PNC must be a string."
    }),

    fecha_apertura: z.coerce.date({
        required_error: "Fecha de apertura is required.",
        invalid_type_error: "Fecha de apertura must be a date"
    }),

    cantidad_rechazada: z.number({
        required_error: "Cantidad rechazada is required.",
        invalid_type_error: "Cantidad rechazada must be a number",
    }).nonnegative().int(),

    defectos_encontrados: z.number({
        required_error: "Cantidad de defecto encontrados is required.",
        invalid_type_error: "Cantidad de defectos encontrados must be a number."
    }).nonnegative().int(),

    operario: z.string({
        required_error: "Operario is required.",
        invalid_type_error: "Operario must be a string."
    }),
    accion: z.string({
        required_error: "Accion is required.",
        invalid_type_error: "Accion must be a string."
    }),
    aprobado_por: z.string({
        required_error: "Aprobado por is required.",
        invalid_type_error: "Aprobado por must be a string."
    }),

    comentario_accion: z.string({
        required_error: "Comentario de la accion is required.",
        invalid_type_error: "Comentario de la accion must be a string."
    }),

    cantidad_descarte: z.number({
        required_error: "Cantidad de descarte is required.",
        invalid_type_error: "Cantidad de descarte must be a number."
    }).nonnegative().int(),

    cantidad_aceptada: z.number({
        required_error: "Cantidad aceptada is required.",
        invalid_type_error: "Cantidad aceptada must be a number."
    }).nonnegative().int(),

    observacion: z.string({
        invalid_type_error: "Observacion must be a string."
    }),

    fecha_cierre: z.coerce.date({
        required_error: "Fecha de cierre is required.",
        invalid_type_error: "Fecha de cierre must be a date."
    }),

    re_auditoria: z.string({
        required_error: "Re auditoria is required.",
        invalid_type_error: "Re auditoria must be a string."
    }),

    estado_re_auditoria: z.string({
        required_error: "Estado re auditoria is required.",
        invalid_type_error: "Estado re auditoria must be a string."
    }),

    IDauditoria: z.number({
        required_error: "IDauditoria is required.",
        invalid_type_error: "IDauditoria must be a number."
    }).positive().int(),

    imagen: z.any().optional()
});

export const updateProcessSchema = z.object({
    pnc: z.string({
        invalid_type_error: "#PNC must be a string."
    }).optional(),

    fecha_apertura: z.coerce.date({
        invalid_type_error: "Fecha de apertura must be a date."
    }).optional(),

    cantidad_rechazada: z.number({
        invalid_type_error: "Cantidad rechazada must be a number."
    }).nonnegative().int().optional(),

    defectos_encontrados: z.number({
        invalid_type_error: "Cantidad de defectos encontrados must be a number."
    }).nonnegative().int().optional(),

    operario: z.string({
        invalid_type_error: "Operario must be a string."
    }).optional(),

    accion: z.string({
        invalid_type_error: "Accion must be a string."
    }).optional(),

    aprobado_por: z.string({
        invalid_type_error: "Aprobado por must be a string."
    }).optional(),

    comentario_accion: z.string({
        invalid_type_error: "Comentario de la accion must be a string."
    }).optional(),

    cantidad_descarte: z.number({
        invalid_type_error: "Cantidad de descarte must be a number."
    }).nonnegative().int().optional(),

    cantidad_aceptada: z.number({
        invalid_type_error: "Cantidad aceptada must be a number."
    }).nonnegative().int().optional(),

    observacion: z.string({
        invalid_type_error: "Observacion must be a string."
    }).optional(),

    fecha_cierre: z.coerce.date({
        invalid_type_error: "Fecha de cierre must be a date."
    }).optional(),

    re_auditoria: z.string({
        invalid_type_error: "Re auditoria must be a string."
    }).optional(),

    estado_re_auditoria: z.string({
        invalid_type_error: "Estado de re auditoria must be a string."
    }).optional(),

    IDauditoria: z.number({
        invalid_type_error: "IDauditoria must be a number."
    }).positive().int().optional(),

    imagen: z.any().optional()
});