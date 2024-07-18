import { z } from "zod";

export const addOrderSchema = z.object({
    codigoPedido: z.string({
        required_error: "Codigo pedido is required.",
        invalid_type_error: "Codigo pedido must be a string."
    }),

    descripcion: z.string({
        required_error: "Descripcion is required.",
        invalid_type_error: "Descripcion must be a string."
    }),

    IDtecnologia: z.number({
        required_error: "IDtecnologia is required.",
        invalid_type_error: "IDtecnologia must be a number."
    }).positive().int(),

    codigoCliente: z.string({
        required_error: "Codigo cliente is required.",
        invalid_type_error: "Codigo cliente must be a string"
    }),

    imagen: z.any().optional()
});

export const updateOrderSchema = z.object({
    codigoPedido: z.string({
        invalid_type_error: "Codigo pedido must be a string."
    }).optional(),

    descripcion: z.string({
        invalid_type_error: "Descripcion must be a string."
    }).optional(),

    IDtecnologia: z.number({
        invalid_type_error: "IDtecnologia must be a number."
    }).positive().int().optional(),

    codigoCliente: z.string({
        invalid_type_error: "Codigo cliente must be a string."
    }).optional(),

    imagen: z.any().optional()
})