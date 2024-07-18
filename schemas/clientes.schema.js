import { z } from "zod";

export const addCustomerSchema = z.object({
    codigoCliente: z.string({
        required_error: "Codigo cliente is required.",
        invalid_type_error: "Codigo cliente must be a string."
    }),

    nombre: z.string({
        required_error: "Nombre del cliente is required.",
        invalid_type_error: "Nombre del cliente must be a string."

    })
});

export const updateCustomerSchema = z.object({
    codigoCliente: z.string({
        invalid_type_error: "Codigo cliente must be a string."
    }).optional(),

    nombre: z.string({
        invalid_type_error: "Nombre del cliente must be a string."
    }).optional()
});