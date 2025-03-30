import mongoose from "mongoose";
import {v4 as uuidv4} from 'uuid';

const userSchema = new mongoose.Schema(
    {
        idUsuario: { type: String, unique: true, default: uuidv4 },
        nombreUsuario: { type: String, required: true },
        apellidosUsuario: { type: String, required: true },
        emailUsuario: { type: String, required: true, unique: true },
        contrasenaUsuario: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model('User', userSchema)