import { z } from "zod";

export const addOISchema = z.object({
    codigoPedido: z.string({
        required_error: "Codigo pedido is required.",
        invalid_type_error: "Codigo Pedido must be a string."
    }),

    codigoItem: z.string({
        required_error: "Codigo item is required.",
        invalid_type_error: "Codigo item must be a string."
    }),
    cantidad: z.number({
        required_error: "Cantidad is required.",
        invalid_type_error: "Cantidad must be a number."
    }).positive().int()
});

export const updateOISchema = z.object({
    codigoPedido: z.string({
        invalid_type_error: "Codigo pedido must be a string."
    }).optional(),

    codigoItem: z.string({
        invalid_type_error: "Codigo item must be a string."
    }).optional(),
    
    cantidad: z.number({
        invalid_type_error: "Cantidad must be a number."
    }).positive().int().optional()
});