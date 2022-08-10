const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const { User } = require('../../models');

router.get('/', (req, res) => {
    User.findAll().then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).json({ msg: "womp womp", err })
    })
})

router.post('/', (req, res) => {
    User.create({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username
    }).then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).json({ msg: "womp womp", err })
    })
})
module.exports = router;