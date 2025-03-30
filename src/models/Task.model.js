import mongoose from "mongoose";
import {v4 as uuidv4} from 'uuid';

const taskSchema = new mongoose.Schema(
    {
        idTarea: { type: String, unique: true, default: uuidv4 },
        titulo: { type: String, required: true },
        descripcion: { type: String, required: true },
        fechaCreacion: { type: Date, default: Date.now },
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    },
  
    { timestamps: true }
);

export default mongoose.model('Task', taskSchema)