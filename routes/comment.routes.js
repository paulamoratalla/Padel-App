const router = require("express").Router()
const Comment = require("../models/Comment.model")
const User = require("../models/User.model")
const Match = require("../models/Match.model")


router.post('/:id/crear', (req, res, next) => {

    const { id } = req.params
    const { content } = req.body
    const { _id } = req.session.currentUser
    
    Comment
        .create({ user: _id, match: id, content, date: new Date() })
        .then(() => {
            res.redirect(`/partidos/${id}`)
        })
        .catch(err => console.log(err))
})


router.post('/:id/eliminar', (req, res, next) => {
    
    const { id } = req.params

    Comment
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/')
        })
        .catch(err => console.log(err))
});



module.exports = router