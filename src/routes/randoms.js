import { Router } from 'express'
import { randoms } from '../controllers/randoms.js'

const router = Router()

router.get("/randoms", randoms)

export default router