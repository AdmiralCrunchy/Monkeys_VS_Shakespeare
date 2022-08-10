const express = require('express');
const router = express.Router();
const { Section } = require('../../models');


router.get('/', (req, res) => {
    Section.findAll(), then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).json({ msg: "womp womp", err })
    })
})
module.exports = router;