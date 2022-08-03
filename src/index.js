import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import inicio from './routes/inicio.js'
import './db/databaseMongo.js'
import './passport/local.js'
import info from './routes/info.js'
import minimist from 'minimist'
import cluster from 'cluster'

const options = { default: { port: 3000, modo: 'FORK' } }
const args = minimist(process.argv.slice(2), options)
console.log(args)
const PORT = args.port
const MODO = args.modo
const numCPUs = os.cpus().length


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


  app.get('/info', (req, res) => {
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


    app.get('/info', (req, res) => {
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


    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`)
    })
  }
} else {
  console.log('error')
}
