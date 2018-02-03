let credentials = require('../credentials/credentials.js');
express = require('express');
router = express.Router({ mergeParams: true });
email = require('../scripts/email').expressInterest;
User = require('../models/user');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/expressinterest/:id', function(req, res) {
    let sender = req.params.id;
    email(sender, "wilsonjusuf1998@gmail.com", "I want your doggo!", credentials.mailgun, () => {})

})
router.get('/user/:id', function(req, res) {
	User.findById(req.params.id, function(error, foundUser){
		if (error){
			console.log('UNABLE TO FIND USER');
		} else {
			res.render('userPage',
				{
					user: foundUser,
				}
			);
		}
	});

});
module.exports = router;