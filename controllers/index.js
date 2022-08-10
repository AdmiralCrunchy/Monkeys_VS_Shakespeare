const express = require('express');
const router = express.Router();
const { User } = require('../models')
const apiRoutes = require('./api');

router.use("/api", apiRoutes)



router.get('/', (req, res) => {
	res.render('login');
});

// router.get('/', (req, res) => {
// 	if (!req.session.user) {
// 		4;
// 		res.redirect('/login');
// 	}
// 	res.render('chat', req.session.user);
// });


router.get('/chat', (req, res) => {
	res.render('chat');
});

router.get('/game', (req, res) => {
	res.render('game');
});

// router.get('/secretclub', (req, res) => {
// 	if (!req.session.user) {
// 		4;
// 		res.redirect('/login');
// 	}
// 	res.render('chat', req.session.user);
// });

// router.get('/readsession', (req, res) => {
// 	res.json(req.session);
// });

// router.get('/addcounter', (req, res) => {
// 	if (req.session.counter) {
// 		req.session.counter++;
// 	} else {
// 		req.session.counter = 1;
// 	}
// 	res.send('req.session updated');
// });

// router.get('/logout', (req, res) => {
// 	req.session.destroy();
// 	res.json({ msg: 'logged out!' });
// });

// router.use("/api",apiRoutes)

module.exports = router;
