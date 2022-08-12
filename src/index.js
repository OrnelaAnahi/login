import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import inicio from './routes/inicio.js'
import './db/databaseMongo.js'
import './passport/local.js'
import minimist from 'minimist'
import cluster from 'cluster'
import os from 'os'
import info from './routes/info.js'
import log4js from 'log4js'

// LOGGER

log4js.configure({
  appenders: {
    miLoggerConsole: { type: "console" },
    miWarnFile: { type: "file", filename: "warn.log" },
    warnFileLevel: { type: 'logLevelFilter', appender: 'miWarnFile', level: 'warn' },
  },
  categories: {
    default: { appenders: ["miLoggerConsole"], level: "info" },
    logs: { appenders: ["warnFileLevel", "miLoggerConsole"], level: "all" },
  },
})
const loggerConsole = log4js.getLogger()
const loggerFiles = log4js.getLogger('logs')





const options = { default: { port: 3000, modo: 'FORK' } }
const args = minimist(process.argv.slice(2), options)
console.log(args)
const PORT = process.env.PORT || args.port
const MODO = args.modo

const app = express()

if (MODO === 'FORK') {
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.set('view engine', 'ejs')
  app.set('views', './src/views')

  app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: 'secret',
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 600000
    },
    store: MongoStore.create({ mongoUrl: "mongodb+srv://user_coder:42856227@cluster0.b8idn.mongodb.net/sessionMongo?retryWrites=true&w=majority" })
  }))

  app.use(passport.initialize())
  app.use(passport.session())

  app.use('/', inicio)

  app.use('/info', info)


  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
  })
}
else if (MODO === 'CLUSTER') {
  if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`)
    for (let i = 0; i < os.cpus().length; i++) {
      cluster.fork()
    }
    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`)
      cluster.fork()
    })
  } else {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.set('view engine', 'ejs')
    app.set('views', './src/views')

    app.use(session({
      saveUninitialized: false,
      resave: false,
      secret: 'secret',
      cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 600000
      },
      store: MongoStore.create({ mongoUrl: "mongodb+srv://user_coder:42856227@cluster0.b8idn.mongodb.net/sessionMongo?retryWrites=true&w=majority" })
    }))

    app.use(passport.initialize())
    app.use(passport.session())

    app.use('/', inicio)

    app.use('/info', info)

    app.use((req, res, next) => {
      loggerConsole.info(`RUTA ${req.url} METODO ${req.method} RECIBIDO`)
      next()
    })

    app.get('*', (req, res) => {
      loggerFiles.warn(`RUTA ${req.url} METODO ${req.method} INVALID`)
      res.send({ warning: `RUTA ${req.url} METODO ${req.method} INVALID` })
    })

    app.post('*', (req, res) => {
      loggerFiles.warn(`RUTA ${req.url} METODO ${req.method} INVALID`)
      res.send({ warning: `RUTA ${req.url} METODO ${req.method} INVALID` })
    })

    app.put('*', (req, res) => {
      loggerFiles.warn(`RUTA ${req.url} METODO ${req.method} INVALID`)
      res.send({ warning: `RUTA ${req.url} METODO ${req.method} INVALID` })
    })

    app.delete('*', (req, res) => {
      loggerFiles.warn(`RUTA ${req.url} METODO ${req.method} INVALID`)
      res.send({ warning: `RUTA ${req.url} METODO ${req.method} INVALID` })
    })

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`)
    })
  }
} else {
  console.log('error')
}
