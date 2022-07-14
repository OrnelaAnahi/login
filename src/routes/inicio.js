import { Router } from "express"
import passport from "passport"

const router = Router()

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

router.get('/', (req, res) => {
  res.render('registro')
})

router.get('/registro', (req, res) => {
  res.render('registro')
})
router.post('/registro', passport.authenticate('registro', {
  failureRedirect: '/errorRegistro',
  successRedirect: '/info'
}))


router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', passport.authenticate('login', {
  failureRedirect: '/errorLogin',
  successRedirect: '/info'
}))

router.get('/info', isAuth, (req, res) => {
  res.render('info', { nombre: req.user.nombre })
})

router.get('/errorLogin', (req, res) => {
  res.render('errorLogin')
})
router.get('/errorRegistro', (req, res) => {
  res.render('errorRegistro')
})


export default router