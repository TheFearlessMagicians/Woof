let express = require('express');
	router = express.Router({ mergeParams: true });
	User = require("../models/user");


router.post('/login', function(req, res) {
    res.render('login', {});
});
//TODO: register page.
router.get('/register', function(req, res) {
    res.render('register', {

    });
});

router.post('/register', function (req,res){
	User.create({
		name: req.body.name;
	})
});

module.exports = router;