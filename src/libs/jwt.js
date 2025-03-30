import {token_secret} from '../config.js'; 
import jwt from 'jsonwebtoken';
// Generar token JWT
export const creandoToken = (payload) =>
{
    return new Promise((resolve, reject) =>
    {
        jwt.sign
        ( 
            payload,
            token_secret,
            {expiresIn: "1d"},
            (err, token) => {
                if (err) reject (err)
                resolve(token)
            }
        );
    });

}