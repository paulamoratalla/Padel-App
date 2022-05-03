const router = require("express").Router()

const { formatDate, formatDay } = require("../utils/formatDate")

const Club = require("../models/Club.model")
const Match = require("./../models/Match.model")
const Comment = require("./../models/Comment.model")
const { isLoggedIn } = require('../middleware/route-guard')


// Matches list 

router.get('/', isLoggedIn, (req, res) => {

    Match
        .find()
        .populate("club players")
        .then(matches => {

            res.render('matches/match-list', { matches })
        })
        .catch(err => console.log(err))
})

// Create match 

router.get("/crear", isLoggedIn, (req, res, next) => {

    Club
        .find()
        .then(clubes => res.render('matches/match-create', { clubes }))
        .catch(() =>
            console.log(err)
        )

})

router.post('/crear', (req, res) => {
    const { date, club, price, genre, time } = req.body
    const { _id } = req.session.currentUser



    Match
        .create({ date, club, price, genre, time, players: _id })
        .then(() => {
            res.redirect(`/partidos`)
        })
        .catch(err => console.log(err))
})


// Match details

router.get('/:id', (req, res, next) => {
    const { id } = req.params

    const promises = [
        Match.findById(id).populate("club").populate("players"),
        Comment.find({ 'match': { $eq: id } }).populate("user"),
    ]

    Promise
        .all(promises)
        .then(([detMatch, comments]) => {

            const isCreator = detMatch.players[0].id === req.session.currentUser._id
            let isPlayer = false

            detMatch.players.forEach(player => {
                if (player._id == req.session.currentUser._id) {
                    isPlayer = true
                }
            })

            let date = formatDate(detMatch.date)
            let day = formatDay(detMatch.date)

            res.render('matches/match-details', { detMatch, comments, date, day, isCreator, isPlayer })
        })
        .catch(err => console.log(err))
})


// Join match 

router.post('/:id/unirse', (req, res) => {

    const { id } = req.params
    const { _id } = req.session.currentUser


    Match
        .findById(id)
        .then(matches => {

            if (matches.players.length < 4) {

                Match
                    .findByIdAndUpdate(id, { $addToSet: { players: _id } })
                    .then(() => res.redirect('/partidos'))
                    .catch(err => console.log(err))
            } else {
                res.redirect('/partidos')
            }
        })

})

router.post('/:id/desunirse', (req, res) => {

    const { id } = req.params
    const { _id } = req.session.currentUser

    Match
        .findByIdAndUpdate(id, { $pull: { players: _id } })
        .then(() => res.redirect("/partidos"))
        .catch(err => console.log(err))
})


// Delete match 

// router.post('/:id/delete', (req, res) => {

//     const { id } = req.params
//     const isAdmin = req.session.currentUser.role === 'ADMIN'

//     Match
//         .findByIdAndDelete(id)
//         .then(() => {
//             res.redirect('/partidos', isAdmin)
//         })
//         .catch(err => console.log(err))
// })

// router.get('/:id/edit', (req, res) => {

//     const { id } = req.params


//     const promisesEdit = [
//         Match.findById(id).populate("players").populate("club"),
//         Club.find(),
//     ]

//     Promise
//         .all(promisesEdit)
//         .then(([editMatch, clubs]) => {
//             res.render('matches/match-edit', { editMatch, clubs })
//         })
//         .catch(err => console.log(err))

// })


// Edit match 

router.post('/:id/edit', (req, res) => {

    const { id } = req.params
    const { date, genre, players, club } = req.body

    Match
        .findByIdAndUpdate(id, { date, genre, players, club })
        .then(() => res.redirect("/partidos"))
        .catch(err => console.log(err))
})

router.post('/:matchID/edit/eliminar-jugador/:playerID', (req, res) => {

    const { matchID, playerID } = req.params

    Match
        .updateOne({ matchID }, { $pull: { players: playerID } })
        .then(() => res.redirect("/partidos"))
        .catch(err => console.log(err))
})


// Results form

router.get('/:id/resultado', (req, res, next) => {
    const { id } = req.params

    Match
        .findById(id)
        .then(match => {
            res.render('matches/result-form', match)
        })
        .catch(err => console.log(err))
});

router.post('/:id/resultado', (req, res, next) => {
    const { id } = req.params
    const { set1team1, set1team2, set2team1, set2team2, set3team1, set3team2 } = req.body

    console.log('el id del partido es ------->', id)

    const result = {
        set1: {
            team1: set1team1,
            team2: set1team2,
        },
        set2: {
            team1: set2team1,
            team2: set2team2,
        },
        set3: {
            team1: set3team1,
            team2: set3team2,
        },
    }

    Match
        .findByIdAndUpdate(id, { result }, { new: true })
        .then(result => {
            res.render('matches/match-details', result)
        })
        .catch(err => console.log(err))
});


module.exports = router



