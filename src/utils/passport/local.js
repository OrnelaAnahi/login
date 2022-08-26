import passport from "passport"
import { Strategy } from "passport-local"
import Usuarios from "../../db/models/usuarios.js"

const LocalStrategy = Strategy

passport.use('registro', new LocalStrategy(
  { usernameField: 'email', passwordField: 'password', passReqToCallback: true },
  async (req, email, password, done) => {
    const usuarioFind = await Usuarios.findOne({ email })
    if (usuarioFind) {
      return done(null, false)
    } else {
      const usuario = new Usuarios()
      usuario.nombre = req.body.nombre
      usuario.email = email
      usuario.password = usuario.encriptar(password)
      await usuario.save()
      return done(null, usuario)
    }
  }
))

passport.use('login', new LocalStrategy(
  { usernameField: 'email', passwordField: 'password', passReqToCallback: true },
  async (req, email, password, done) => {
    const usuarioFind = await Usuarios.findOne({ email })
    if (usuarioFind) {
      if (usuarioFind.password === password) {
        return done(null, usuarioFind)
      } else {
        return done(null, false)
      }
    } else {
      return done(null, false)
    }
  }
))

passport.serializeUser((usuario, done) => {
  done(null, usuario.id)
})

passport.deserializeUser(async (id, done) => {
  const usuario = await Usuarios.findById(id)
  done(null, usuario)
})