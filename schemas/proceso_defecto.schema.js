import { z } from "zod";

export const addPDSchema = z.object({
    IDproceso: z.number({
        required_error: "IDproceso is required.",
        invalid_type_error: "IDproceso must be a number."
    }).positive().int(),

    codigoDefecto: z.string({
        required_error: "Codigo defecto is required.",
        invalid_type_error: "Codigo defecto must be a string."
    })
});

export const updatePDSchema = z.object({
    IDproceso: z.number({
        invalid_type_error: "IDproceso must be a number."
    }).positive().int().optional(),

    codigoDefecto: z.string({
        invalid_type_error: "Codigo defecto must be a string."
    }).optional()
});