// * Par rapport à require avec dotenv : avec ESM, on n'a qu'une ligne à écrire
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// ! import du package anti csrf
import { doubleCsrf } from 'csrf-csrf';

import express from 'express';
const app = express();

// DONE : Expliquer cors
app.use(
    cors({
        origin: [
            'http://localhost',
            'http://localhost:5173',
            'http://127.0.0.1:5173',
            'http://localhost:5174',
            'http://127.0.0.1:5174',
        ],
        credentials: true,
    })
);

// * on pourait accepter les requêtes de n'importe qui, mais dans ce cas l'authentification par csrf serait désactiver
// app.use(cors('*'));

const {
    invalidCsrfTokenError, // * This is just for convenience if you plan on making your own middleware.
    generateToken, // * Use this in your routes to provide a CSRF hash + token cookie and token.
    validateRequest, // * Also a convenience if you plan on making your own middleware.
    doubleCsrfProtection, // * This is the default CSRF protection middleware.
} = doubleCsrf({
    getSecret: () => process.env.TOKEN_SECRET, // A function that optionally takes the request and returns a secret
    cookieName: '__Host-psifi.x-csrf-token', // The name of the cookie to be used, recommend using Host prefix.
    cookieOptions: {
        //sameSite: 'lax', // Recommend you make this strict if posésible
        path: '/',
        //secure: false, // * false car on n'a pas https
        httpOnly: true, // par défaut, ce package transmet des cookies par le protocole http : on ne pourra pas modifier ce cookie depuis le navigateur
    },
    size: 64, // The size of the generated tokens in bits
    ignoredMethods: ['GET', 'HEAD', 'OPTIONS'], // A list of request methods that will not be protected.
    getTokenFromRequest: req => req.headers['x-csrf-token'], // A function that returns the token from the request
});
// * On branche cookieParser dont se sert csrf-csrf pour vérifier la validité du token
app.use(cookieParser());

// Quand on utilise ESM, on doit préciser l'extension de fichier
import { router } from './src/routers/index.js';

// * ce middleware sert à interpréter du json que l'on reçoit par req.body
app.use(express.json());
// TODO : les statics
app.use(express.static('./dist'));

// * ce middleware sert à ajouter un csrf token sur la réponse
// * si on ne met pas en place le double submit pattern, il ne faut pas faire de route dédiée au token
app.get('/token', (req, res) => {
    try {
        if (!req.headers['x-csrf-token']) {
            // ! on passer req et res à generateToken pour qu'il puisse gérer le cookie et les headers
            const token = generateToken(req, res);

            return res.json(token);
        }
    } catch (error) {
        console.log(error);
        console.log(error.message);
    }
});

// ! A Désactiver si on est sur chrome
//app.use(doubleCsrfProtection); // après cette ligne, les routes POST seront protégées
app.use(router);

app.listen(process.env.PORT, () => {
    console.log(
        `Example app listening on port ${process.env.BASE_URL}:${process.env.PORT}`
    );
});
