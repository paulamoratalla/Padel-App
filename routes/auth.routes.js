const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const saltRounds = 10

const fileUploader = require("../config/cloudinary.config")


router.get('/registro', (req, res, next) => {
    res.render('auth/signup')
})

router.post('/registro', fileUploader.single('avatarFile'), (req, res, next) => {

    const { password } = req.body
    const { path } = req.file

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(password, salt))
        .then(hashedPassword => User.create({ ...req.body, avatar: path, password: hashedPassword }))
        .then(() => res.redirect('/perfil'))
        .catch(error => next(error))
})


router.get('/iniciar-sesion', (req, res, next) => {
    res.render('auth/login')
})


router.post('/iniciar-sesion', (req, res, next) => {

    const { email, password } = req.body

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render('auth/login', { errorMessage: 'Email no registrado en la Base de Datos' })
                return
            } else if (bcrypt.compareSync(password, user.password) === false) {
                res.render('auth/login', { errorMessage: 'La contraseña es incorrecta' })
                return
            } else {
                req.session.currentUser = user

                if (req.session.currentUser.role === 'ADMIN') {
                    req.app.locals.isAdmin = true
                } else {
                    req.app.locals.isAdmin = false
                }
                res.redirect('/perfil')
            }
        })
        .catch(error => next(error))
})


router.post('/cerrar-sesion', (req, res, next) => {
    req.session.destroy(() => res.redirect('/'))
})


module.exports = router