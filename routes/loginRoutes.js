const express = require('express');
const passport  = require('passport');
const router = express.Router();


router.get('/login', (req, res) => {
    res.render('login')
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),(req, res) => {
	console.log("This is the login data", req.body)
	req.session.user = req.user
	res.redirect('/dashboard');
})



module.exports = router;