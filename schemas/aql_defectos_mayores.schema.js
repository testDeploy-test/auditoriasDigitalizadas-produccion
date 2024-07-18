import { z } from "zod";

export const addAqlSchema = z.object({
    minimo: z.number({
        required_error: "Minimo is required.",
        invalid_type_error: "Minimo must be a number."
    }).nonnegative().int(),

    maximo: z.number({
        invalid_type_error: "Maximo must be a number."
    }).positive().int().optional(),

    muestra_inspeccion_reducida: z.number({
        required_error: "Muestra de inspeccion reducida is required.",
        invalid_type_error: "Muestra de inspeccion reducida must be a number."
    }).positive().int(),

    muestra_inspeccion_normal: z.number({
        required_error: "Muestra de inspeccion normal is required.",
        invalid_type_error: "Muestra de inspeccion normal must be a number."
    }).positive().int(),

    muestra_inspeccion_severa: z.number({
        required_error: "Muestra inspeccion severa is required.",
        invalid_type_error: "Muestra inspeccion severa must be a number."
    })
});

export const updateAqlSchema = z.object({
    minimo: z.number({
        invalid_type_error: "Minimo must be a number."
    }).nonnegative().int().optional(),

    maximo: z.number({
        invalid_type_error: "Maximo must be a number."
    }).positive().int().optional(),

    muestra_inspeccion_reducida: z.number({
        invalid_type_error: "Muestra de inspeccion reducida must be a number."
    }).positive().int().optional(),

    muestra_inspeccion_normal: z.number({
        invalid_type_error: "Muestra de inspeccion normal must be a number."
    }).positive().int().optional(),

    muestra_inspeccion_severa: z.number({
        invalid_type_error: "Mustra de inspeccion severa must be a number."
    }).positive().int().optional()
});