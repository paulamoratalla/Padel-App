const isLoggedIn = (req, res, next) => {
    console.log('Comprobar sesión', req.session)
    !req.session.currentUser ? res.render('auth/login', { errorMessage: 'Desautorizado' }) : next()
}

const isLoggedOut = (req, res, next) => {
    req.session.currentUser ? res.redirect('/') : next()
}

module.exports = { isLoggedIn, isLoggedOut }