import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import inicio from './routes/inicio.js'
import './db/databaseMongo.js'
import './passport/local.js'


const app = express()

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
  store: MongoStore.create({ mongoUrl: "mongodb+srv://user_coder:*******@cluster0.b8idn.mongodb.net/sessionMongo?retryWrites=true&w=majority" })
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', inicio)



const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})