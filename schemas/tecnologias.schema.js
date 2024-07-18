import { z } from "zod";

export const addTechnologySchema = z.object({
    nombre: z.string({
        required_error: "Nombre de la tecnologia is required.",
        invalid_type_error: "Nombre de la tecnologia must be a string."
    })
});

export const updateTechnologySchema = z.object({
    nombre: z.string({
        invalid_type_error: "El nomnbre de la tecnologia must be a string."
    }).optional()
});