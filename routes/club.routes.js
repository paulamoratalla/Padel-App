const router = require("express").Router()

const Club = require("./../models/Club.model")
const User = require("./../models/User.model")
const Match = require("./../models/Match.model")

const { isLoggedIn } = require('../middleware/route-guard.js')

const fileUploader = require("../config/cloudinary.config")


// Clubs list 

router.get('/', isLoggedIn, (req, res, next) => {

    Club
        .find()
        .then(clubs => {
            res.render('clubs/club-list', { clubs })
        })
        .catch(err => console.log(err))
})


// Create club 

router.get("/crear", (req, res, next) => {
    res.render('clubs/club-create')
})

router.post('/crear', fileUploader.single('imageFile'), (req, res) => {
    const { name, street, city, zip, image, longitude, latitude, numberOfFields, web, phone, weekdaysFrom, weekdaysTo, weekendsFrom, weekendsTo, holidaysFrom, holidaysTo } = req.body

    const { path } = req.file

    const location = {
        type: "Point",
        coordinates: [longitude, latitude]
    }
    const address = { street, city, zip }

    const schedule = {
        weekdays: {
            from: weekdaysFrom,
            to: weekdaysTo,
        },

        weekends: {
            from: weekendsFrom,
            to: weekendsTo,
        },

        holidays: {
            from: holidaysFrom,
            to: holidaysTo,
        }
    }

    Club
        .create({ name, address, location, schedule, numberOfFields, web, phone, image: path })
        .then(() => {
            res.redirect(`/clubs`)
        })
        .catch(err => console.log(err))
})


// Club details 

router.get('/:clubId', (req, res, next) => {

    const { clubId } = req.params
    const { _id } = req.session.currentUser
    const isAdmin = req.session.currentUser.role === 'ADMIN'

    const promises = [
        Club.findById(clubId),
        Match.find({ 'club': { $eq: clubId } }),
        User.find({ 'favouriteClubs': { $eq: clubId } }).populate('favouriteClubs')
    ]

    Promise
        .all(promises)
        .then(([clubInfo, matchInfo, favClubs]) => {

            let isFollowing = favClubs.some(({ _id }) => _id == req.session.currentUser._id)

            res.render('clubs/club-details', { clubInfo, matchInfo, followers: favClubs, isAdmin, isFollowing })
        })
        .catch(err => console.log(err))
})


// Edit club

router.get('/:id/editar', (req, res, next) => {

    const { id } = req.params

    Club
        .findById(id)
        .then(club => {
            res.render('clubs/club-edit', club)
        })
        .catch(err => console.log(err))
})

router.post('/:id/editar', (req, res) => {

    const { id } = req.params
    const { name, street, city, zip, longitude, latitude, image, numberOfFields, web, phone, weekdaysFrom, weekdaysTo, weekendsFrom, weekendsTo, holidaysFrom, holidaysTo } = req.body

    const schedule = {
        weekdays: {
            from: weekdaysFrom,
            to: weekdaysTo,
        },

        weekends: {
            from: weekendsFrom,
            to: weekendsTo,
        },

        holidays: {
            from: holidaysFrom,
            to: holidaysTo,
        }
    }

    Club
        .findByIdAndUpdate(id, { name, street, city, zip, longitude, latitude, image, numberOfFields, web, phone, schedule }, { new: true })
        .then(club => {
            res.redirect('/clubs')
        })
        .catch(err => console.log(err))
})


// Add to favouriteClubs

router.post('/:id/favourite', (req, res, next) => {

    const { id } = req.params
    const { _id } = req.session.currentUser

    User
        .findByIdAndUpdate(_id, { $addToSet: { favouriteClubs: id } })
        .then(() => {
            res.redirect(`/clubs/${id}`)
        })
        .catch(err => console.log(err))
})


// Eliminate from favourite
router.post('/:id/eliminate-favourite', (req, res, next) => {

    const { id } = req.params
    const { _id } = req.session.currentUser

    User
        .findByIdAndUpdate(_id, { $pull: { favouriteClubs: id } })
        .then(() => {
            res.redirect(`/clubs/${id}`)
        })
        .catch(err => console.log(err))
})


// Delete club 

router.post('/:id/eliminar', (req, res) => {

    const { id } = req.params

    Club
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/clubs')
        })
        .catch(err => console.log(err))
})


module.exports = router


