import { Router } from "express";
import { register, login, logout, profile } from "../controllers/auth.controller.js";
import {autenticaciones} from '../middlewares/validarToken.js'
// para crear peticiones
const router = Router()

//la  funcion estara en controlers
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/profile', autenticaciones, profile)


export default router;