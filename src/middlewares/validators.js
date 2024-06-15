// * Made in Marilou
const isNumberMiddleware = (req, res, next) => {
    // Si on récupère id, on l'enregistre
    if (req.params.id) {
        const listId = Number.parseInt(req.params.id, 10);
        // Si NaN
        if (!Number.isInteger(listId)) {
            // * il faudrait envoyer next(err)
            return res
                .status(400)
                .json({ message: 'Bad request in middleware' });
        }

        return next();
    } else {
        // Si on ne récupère pas d'Id
        return res
            .status(404)
            .json({ message: 'Not found Bad request in middleware' });
    }
};

export { isNumberMiddleware };
