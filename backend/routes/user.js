const express = require('express')
const bcrypt = require('bcrypt')

const User = require('../model/user')

const router = express.Router();

router.post('/signup', (req,res,next) => {
    bcrypt.hash(req.body.password, 12).then((hash) => {
        const user = new User({
            email: req.body.email,
            username: req.body.username,
            phone: req.body.phone,
            password: hash
        });
        user.save().then((result) => {
            res.status(201).json({
                message: 'User created',
                result: result
            })
        }).catch(err => {
            res.status(500).json({
                message: err.message
        })
    })
})

})

module.exports = router;