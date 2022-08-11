const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const { User } = require('../../models');

router.get('/', (req, res) => {
    User.findAll().then(data => {
        res.json(data)
        console.log("You are getting this information!")
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

// FROM UserRoutes
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    console.log("login attempt")
    try {
        console.log(req.body)
        const userData = await User.findOne({ where: { email: req.body.email } });
        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = bcrypt.compareSync(req.body.password, userData.password)

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});

// router.post('/logout', (req, res) => {
//   if (req.session.logged_in) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });


module.exports = router;