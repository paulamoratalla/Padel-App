const router = require("express").Router()
const User = require("../models/User.model")
const Match = require("../models/Match.model")

const { isLoggedIn } = require('../middleware/route-guard')
const { isLoggedOut } = require('../middleware/route-guard')
const { formatDate, formatDay } = require("../utils/formatDate")

const fileUploader = require("../config/cloudinary.config")

// User profile 

router.get('/', isLoggedIn, (req, res, next) => {

    const { _id } = req.session.currentUser

    const promises = [
        User.findById(_id).populate("favouriteClubs"),
        Match.find({ 'players': { $eq: _id } }).populate("club").populate("players"),
    ]

    Promise
        .all(promises)
        .then(([userDet, matchDet]) => {

            console.log("asdadadad----------", userDet);
            res.render('user/profile-page', { userDet, matchDet })
        })
        .catch(err => console.log(err))
})

// Edit user profile 

router.get('/:id/editar', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(player => {
            res.render('user/edit-form', player)
        })
        .catch(err => console.log(err))
})


router.post('/:id/editar', fileUploader.single('avatarFile'), (req, res, next) => {

    const { id } = req.params
    const { name, email } = req.body
    const { path } = req.file


    User
        .findByIdAndUpdate(id, { name, avatar: path, email }, { new: true })
        .then(() => {
            res.redirect('/perfil')
        })
        .catch(err => console.log(err))
})

// Delete profile

router.post('/:id/eliminar', (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/')
        })
        .catch(err => console.log(err))
});



module.exports = router