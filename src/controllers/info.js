import os from 'os'
const numCPUs = os.cpus().length

export const conConsole = (req, res) =>{
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
}
export const sinConsole = (req, res) =>{
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
}