import { Router } from "express"
import {getRegistro, postRegistro, getLogin, postLogin, getInfo, errorLogin, errorRegistro} from '../controllers/inicio.js'
const router = Router()
import auth from '../middleware/auth.js'

router.get('/', getRegistro)

router.get('/registro', getRegistro)
router.post('/registro', postRegistro)


router.get('/login', getLogin)
router.post('/login', postLogin)

router.get('/info', auth, getInfo)

router.get('/errorLogin', errorLogin)
router.get('/errorRegistro',errorRegistro)


export default router