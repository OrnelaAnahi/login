import log4js from "log4js"

const loggerFiles = log4js.getLogger("warnLogs")

export default (req, res) => {
  loggerFiles.warn(`RUTA ${req.url} METODO ${req.method} INVALID`)
  res.send({ warning: `RUTA ${req.url} METODO ${req.method} INVALID` })
}