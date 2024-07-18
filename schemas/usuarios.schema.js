import { z } from "zod";

export const addUserSchema = z.object({
    nombre: z.string({
        required_error: "Nombre is required.",
        invalid_type_error: "Nombre must be a string."
    }),

    usuario: z.string({
        required_error: "Usuario is required.",
        invalid_type_error: "Usuario mues be a string."
    }),

    contraseña: z.string({
        required_error: "Contraseña is required.",
        invalid_type_error: "COnstraseña must be a string."
    }),

    activo: z.boolean({
        invalid_type_error: "Activo must be a boolean."
    }).optional(),

    superAdmin: z.boolean({
        invalid_type_error: "Super admin must be a boolean."
    }).optional(),

    hora_inicio: z.string({
        required_error: "Hora de inicio is required.",
        invalid_type_error: "Hora de inicio must be an hour."
    }).time(),

    hora_fin: z.string({
        required_error: "Hora fin is required.",
        invalid_type_error: "Hora fin must be an hour."
    }).time()
});

export const updateUserSchema = z.object({
    nombre: z.string({
        invalid_type_error: "Nombre muste be a string."
    }).optional(),

    usuario: z.string({
        invalid_type_error: "Usuario must be a string."
    }).optional(),

    contraseña: z.string({
        invalid_type_error: "Contraseña must be a string."
    }).optional(),

    activo: z.boolean({
        invalid_type_error: "Activo must be a boolean."
    }).optional(),

    superAdmin: z.boolean({
        invalid_type_error: "Super admin must be a boolean."
    }).optional(),

    hora_inicio: z.string({
        invalid_type_error: "Hora de inicio must be an hour."
    }).time().optional(),

    hora_fin: z.string({
        invalid_type_error: "Hora fin must be an hour."
    }).time().optional()
});