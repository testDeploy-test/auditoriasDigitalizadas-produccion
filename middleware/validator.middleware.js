const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.safeParse(req.body);
        next()
    } catch (error) {
        return res.status(400).json({ error: error.errors.map((error) => error.message) });
    }
}

export default validateSchema;