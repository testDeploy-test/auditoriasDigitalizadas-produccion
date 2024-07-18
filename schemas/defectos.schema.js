import { z } from "zod";

export const addDefectSchema = z.object({
    codigoDefecto: z.string({
        required_error: "Codigo defecto is required.",
        invalid_type_error: "Codigo defecto must be a string."
    }),

    nombre: z.string({
        required_error: "Nombre del defecto is required.",
        invalid_type_error: "Nombre del defecto must be a string."
    }),

    criterio_aceptacion: z.string({
        required_error: "Criterios de aceptacion is required.",
        invalid_type_error: "Criterios de aceptacion must be a string."
    })
});

export const updateDefectSchema = z.object({
    codigoDefecto: z.string({
        invalid_type_error: "Codigo defecto must be a string."
    }).optional(),

    nombre: z.string({
        invalid_type_error: "Nombre del defecto must be a string."
    }).optional(),

    criterio_aceptacion: z.string({
        invalid_type_error: "Criterios de aceptacion must be a string."
    }).optional()
});