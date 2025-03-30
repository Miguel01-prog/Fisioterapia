import jwt from 'jsonwebtoken';
import {token_secret} from '../config.js'; // Asegúrate de que la ruta es correcta

export const autenticaciones =(req, res, next) => {
    // Obtener el token del header
    const {token} = req.cookies;
    if (!token) {
        return res.status(401).json({ message: "No hay token, permiso no válido" });
    }
    jwt.verify(token, token_secret, (error, user) => {
        if (error) {
            return res.status(401).json({ message: "Token inválido, permiso no válido" });
        }
        req.usuario = user;
        next();
    });
}