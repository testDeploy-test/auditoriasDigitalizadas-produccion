import { z } from "zod";

const authSchema = z.object({
    usuario: z.string({
        required_error: "Usuario is required.",
        invalid_type_error: "Usuario must be a string."
    }),
    contraseña: z.string({
        required_error: "Contraseña is required.",
        invalid_type_error: "Contraseña must be a string."
    })
});

export default authSchema;