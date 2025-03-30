import User from '../models/user.model.js';
import { v4 as uuidv4 } from 'uuid'; // Importamos UUID para generar identificadores únicos
import bycrypt from 'bcryptjs'; 
import {creandoToken} from '../libs/jwt.js'; // Importamos la función creandoToken del archivo jwt.js

export const register = async (req, res) => {
    try {
        const { nombreUsuario, apellidosUsuario, emailUsuario, contrasenaUsuario } = req.body;

        // Generar un idUsuario único si no se envía en el request
        const idUsuario = uuidv4();

        // Verificar si el usuario ya existe (evitar emails duplicados)
        const existingUser = await User.findOne({ emailUsuario });
        if (existingUser) {
            return res.status(400).json({ message: "El email ya está registrado." });
        }

        // Crear nuevo usuario
        const contrasenaCifrada = await bycrypt.hash(contrasenaUsuario, 10);
        const newUser = new User({
            idUsuario,
            nombreUsuario,
            apellidosUsuario,
            emailUsuario,
            contrasenaUsuario: contrasenaCifrada,
        });

        const userSaved = await newUser.save();
        const token = await creandoToken({id: userSaved._id});
        res.cookie('token', token)
        //datos para el front
        res.json
        ({
            id: userSaved._id,
            nombreUsuario: userSaved.nombreUsuario,
            apellidosUsuario: userSaved.apellidosUsuario,
            emailUsuario: userSaved.emailUsuario,
        }); 
    } catch (error) {
       res.status(500).json({ message: "Error al registrar el usuario" });
    }
};

export const login = async (req, res) => {
    const { emailUsuario, contrasenaUsuario } = req.body;

    try {
        // Verificar si el usuario existe
        const usuarioExiste = await User.findOne({ emailUsuario });
        if (!usuarioExiste) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        // Comparar la contraseña con la base de datos
        const usuarioCorrecto = await bycrypt.compare(contrasenaUsuario, usuarioExiste.contrasenaUsuario);

        if (!usuarioCorrecto) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        // Crear token
        const token = await creandoToken({ id: usuarioExiste._id });
        res.cookie('token', token);

        // Datos para el frontend
        res.json({
            id: usuarioExiste._id,
            nombreUsuario: usuarioExiste.nombreUsuario,
            apellidosUsuario: usuarioExiste.apellidosUsuario,
            emailUsuario: usuarioExiste.emailUsuario,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    res.cookie('token', " ", {expires: new Date(0)});
   return res.sendStatus(200);
};

export const profile = async (req, res, next) => {
    const userFout = await User.findById(req.usuario.id)
    if(!userFout) return res.status(404).send('El usuario no existe');
    return res.json({
        id: userFout._id,
        nombreUsuario: userFout.nombreUsuario,
        apellidosUsuario: userFout.apellidosUsuario,
        emailUsuario: userFout.emailUsuario,
    });
    
};