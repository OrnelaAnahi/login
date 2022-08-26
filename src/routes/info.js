import { Router } from "express"
import { conConsole, sinConsole } from "../controllers/info.js"

const router = Router()

router.get('sinConsole', sinConsole)
router.get('conConsole', conConsole)

export default router