import log4js from "log4js";
const loggerConsole = log4js.getLogger();

export default (req, res, next) => {
    loggerConsole.info(`RUTA ${req.url} METODO ${req.method} RECIBIDO`);
    next();
  }