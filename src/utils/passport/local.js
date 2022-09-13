 import passport from "passport"
import { Strategy } from "passport-local"
import {usuarioDao as Usuarios} from "../../db/index.js"

const LocalStrategy = Strategy

passport.use('registro', new LocalStrategy(
  { usernameField: 'email', passwordField: 'password', passReqToCallback: true },
  async (req, email, password, done) => {
    const usuarioBD = await Usuarios.mostrar(user)
    if (usuarioBD) {
      return done(null, false);
    }
    const usuarioNuevo = await Usuarios.guardar({
      email: email,
      password: Usuarios.encriptar(password),
    })
    done(null, usuarioNuevo);
  }
))

passport.use('login', new LocalStrategy(
  { usernameField: 'email', passwordField: 'password', passReqToCallback: true },
  async (req, email, password, done) => {
    const user = { email: email }
      const usuarioBD = await Usuarios.mostrar(user);
      if (!usuarioBD) {
        return done(null, false);
      }
      if (!Usuarios.comparar(usuarioBD.password, password)) {
        return done(null, false);
      }
      return done(null, usuarioBD)
  }
))

passport.serializeUser((usuario, done) => {
  done(null, usuario.id)
})

passport.deserializeUser(async (id, done) => {
  const usuario = await Usuarios.findById(id)
  done(null, usuario)
})