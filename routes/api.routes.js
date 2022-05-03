const router = require('express').Router()
const Club = require('../models/Club.model')


router.get('/clubs', (req, res) => {

    Club
        .find()
        .then(clubs => res.json(clubs))
        .catch(err => res.status(500).json({ message: 'Server error', error: err }))
})


module.exports = router

