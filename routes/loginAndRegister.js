let express = require('express');
	router = express.Router({ mergeParams: true });
	User = require("../models/user")

//REGISTER ROUTE
router.get('/register', function(req, res) {
    res.render('register', {});
}); 

router.post("/register", function (req,res){
	User.create(req.body.user, function (error, newlyCreatedUser){
		if (error){
			console.log("COULD NOT REGISTER USER IN THE POST ROUTE");
		} else {
			res.redirect("/main");
		}
	});
});

module.exports = router;