// EXPRESS
import express from 'express'
const app = express()
// 
import compression from "compression"
app.use(compression())
import session from 'express-session'
import MongoStore from 'connect-mongo'
import './src/db/databaseMongo.js'
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

// PASSPORT
import ('./src/utils/passport/local.js')
import passport from 'passport'

app.use(passport.initialize())
app.use(passport.session())

// ARCHIVOS ESTATICOS
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)
app.use(express.static(__dirname + "/public"))



// JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// VISTAS
app.set('view engine', 'ejs')
app.set('views', './src/views')

app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: 'secret',
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 600000
    },
    store: MongoStore.create({ 
      mongoUrl: "mongodb+srv://user_coder:42856227@cluster0.b8idn.mongodb.net/sessionMongo?retryWrites=true&w=majority",
      mongoOptions: advancedOptions})
  })
)

// Logueo rutas
import logeoRutas from './src/middleware/logeo-rutas.js'


// ROUTES
import inicio from './src/routes/inicio.js'
import info from './src/routes/info.js'
app.use('/', inicio)
app.use('/info', info)


export default app