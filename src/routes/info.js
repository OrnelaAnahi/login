import { Router } from "express"
import os from 'os'
import compression from "compression"


const numCPUs = os.cpus().length


const router = Router()

router.get('/compresion', compression(), (req, res) => {
  res.send({
    'argumentos de entrada': process.argv,
    'sistema operativo': process.platform,
    'version de node': process.version,
    'memoria total reservada': process.rss,
    'path de ejecucion': process.execPath,
    'process id': process.pid,
    'carpeta del proyecto': process.cwd(),
    'numero de procesadores': numCPUs
  })
})
router.get('/sin-compresion', (req, res) => {
  res.send({
    'argumentos de entrada': process.argv,
    'sistema operativo': process.platform,
    'version de node': process.version,
    'memoria total reservada': process.rss,
    'path de ejecucion': process.execPath,
    'process id': process.pid,
    'carpeta del proyecto': process.cwd(),
    'numero de procesadores': numCPUs
  })
})
router.get('/con-console', (req, res) => {
  console.log('profiling')
  res.send({
    'argumentos de entrada': process.argv,
    'sistema operativo': process.platform,
    'version de node': process.version,
    'memoria total reservada': process.rss,
    'path de ejecucion': process.execPath,
    'process id': process.pid,
    'carpeta del proyecto': process.cwd(),
    'numero de procesadores': numCPUs
  })
})
router.get('/sin-console', (req, res) => {
  res.send({
    'argumentos de entrada': process.argv,
    'sistema operativo': process.platform,
    'version de node': process.version,
    'memoria total reservada': process.rss,
    'path de ejecucion': process.execPath,
    'process id': process.pid,
    'carpeta del proyecto': process.cwd(),
    'numero de procesadores': numCPUs
  })
})

export default router