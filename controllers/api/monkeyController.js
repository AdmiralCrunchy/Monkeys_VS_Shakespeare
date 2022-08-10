const express = require('express');
const router = express.Router();
const { Monkey } = require('../../models');


router.get('/', (req, res) => {
    Monkey.findAll(), then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).json({ msg: "womp womp", err })
    })
})

module.exports = router;