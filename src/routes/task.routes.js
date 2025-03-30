import { Router } from "express";
import {autenticaciones} from '../middlewares/validarToken.js'
import { getTasks,getTask, createTask, updateTask, deleteTask } from "../controllers/task.controler.js";
const router = Router();

router.get('/tasks', autenticaciones,getTasks);
router.get('/tasks/:id', autenticaciones, getTask);
router.post('/tasks/', autenticaciones, createTask);
router.delete('/tasks/:id', autenticaciones, deleteTask);
router.put('/tasks', autenticaciones,updateTask);

export default router;