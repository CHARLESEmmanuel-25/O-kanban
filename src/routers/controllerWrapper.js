// BONUS : factorisation du try/catch
export function controllerWrapper(controllerMethod) {
    return async (req, res, next) => {
        try {
            await controllerMethod(req, res, next);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Unexpected server error' });
        }
    };
}
