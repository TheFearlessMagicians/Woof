let credentials = require('../credentials/credentials.js');
express = require('express');
router = express.Router({ mergeParams: true });
var email = require('../scripts/email').expressInterest;// THIS HAS TO BE VAR.
User = require('../models/user');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/expressinterest/:id', function(req, res) {
    let sender = req.params.id;
    let msg = req.body.message;
    //email(sender, "wilsonjusuf1998@gmail.com", "I want your doggo!", credentials.mailgun, () => {})
    email(sender, "wilsonjusuf1998@gmail.com", msg, credentials.mailgun, () => {});


})
router.get('/user/:id', function(req, res) {
    User.findById(req.params.id).populate('dogs').exec(function(error, foundUser) {
        if (error) {
            console.log('UNABLE TO FIND USER');
        } else {
            console.log(foundUser);
            res.render('userPage', {
                user: foundUser,
                currentUser: req.user,
            });
        }
    });

});
module.exports = router;
