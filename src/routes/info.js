import { Router } from "express"

const router = Router()

router.get('/', (req, res) => {
  res.send({
    'argumentos de entrada': process.argv,
    'sistema operativo': process.platform,
    'version de node': process.version,
    'memoria total reservada': process.rss,
    'path de ejecucion': process.execPath,
    'process id': process.pid,
    'carpeta del proyecto': process.cwd(),
  })
})


export default router