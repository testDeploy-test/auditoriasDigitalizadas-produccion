import { z } from "zod";

export const addItemSchema = z.object({
    codigoItem: z.string({
        required_error: "Codigo item is required.",
        invalid_type_error: "Codigo item must be a string."
    }),

    descripcion: z.string({
        required_error: "Descripcion is required.",
        invalid_type_error: "Descripcion must be a string."
    }),

    IDtecnologia: z.number({
        required_error: "IDtecnologia is required.",
        invalid_type_error: "IDtecnologia must be a number."
    }).int().positive(),

    imagen: z.any().optional()
});

export const updateItemSchema = z.object({
    codigoItem: z.string({
        invalid_type_error: "Codigo item must be a string."
    }).optional(),

    descripcion: z.string({
        invalid_type_error: "Descripcion must be a string."
    }).optional(),

    IDtecnologia: z.number({
        invalid_type_error: "IDtecnologia must be a number."
    }).positive().int().optional(),

    imagen: z.any().optional()
})