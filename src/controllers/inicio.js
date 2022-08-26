import passport from "passport"

export const getRegistro = (req, res) =>{
  res.render('registro')
}

export const postRegistro = passport.authenticate('registro', {
  failureRedirect: '/errorRegistro',
  successRedirect: '/info'
})

export const getLogin = (req, res) =>{
  res.render('login')
}

export const postLogin = passport.authenticate('login', {
  failureRedirect: '/errorLogin',
  successRedirect: '/info'
})

export const getInfo = (req, res)=>{
  res.render('info', { nombre: req.user.nombre })
}

export const errorLogin = (req, res)=>{
  res.render('errorLogin')
}
export const errorRegistro = (req, res)=>{
  res.render('errorRegistro')
}