const express = require('express');
const router = express.Router();
const { Enemy } = require('../../models');

router.get('/', (req, res) => {
    Enemy.findAll().then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).json({ msg: "womp womp", err })
    })
})

module.exports = router;