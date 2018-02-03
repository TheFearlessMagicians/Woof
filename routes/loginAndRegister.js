let express = require('express');
router = express.Router({ mergeParams: true });
User = require("../models/user")


router.post('/login', function(req, res) {
    let password = ''; //TODO HANDLE password post request.

    res.render('login', {});
    //TODO: register page.
});

router.get('/register', function(req, res) {
    res.render('register', {

    });
});


router.post("/register", function(req, res) {
    User.create(req.body.user, function(error, newlyCreatedUser) {
        if (error) {
            console.log("COULD NOT REGISTER USER IN THE POST ROUTE");
        } else {
            newlyCreatedUser.url = "/user/" + newlyCreatedUser.id;
            newlyCreatedUser.save(function(error, savedUser) {
                res.render('maps', {
                    gmapsCredential: credentials.gmaps,
                    'authorized': true
                });
            });
        }
    });
});

module.exports = router;