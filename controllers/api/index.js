const express = require('express');
const router = express.Router();
const userController = require("./userController")
const sectionController = require("./sectionController")
const enemyController = require("./enemyController")
const monkeyController = require("./monkeyController")
const jobController = require('./jobController')
const bookController = require('./bookController')

router.use("/users", userController)
router.use("/sections", sectionController)
router.use("/enemys", enemyController)
router.use("/jobs", jobController)
router.use("/monkeys", monkeyController)
router.use("/books", bookController)

module.exports = router;
