let express = require('express');
router = express.Router({ mergeParams: true });
User = require("../models/user");
// Dog = require("../models/dog");

//AUTHENTICATION
let passport = require("passport");

router.get('/login', function(req, res) {
    // Dog.find({
    //     location: {
    //         $near: [34.0689, -118.4452],
    //         $maxDistance: 1,
    //     }
    // }, function(error, foundPups) {
    //     if (error) {
    //         console.log(error);
    //     } else {
    //         console.log("FOUND DOGS");
    //         foundPups.forEach(function(pup) {
    //             if (typeof pup.location !== "undefined") {
    //                 console.log(pup.location);
    //             }
    //         });
    //     }
    // });
    res.render('login', { currentUser: req.user });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: "/main",
    failureRedirect: "/login",
}), function(req, res) {});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect("/");
});

router.get('/register', function(req, res) {
    res.render('register', { currentUser: req.user });
});


router.post("/register", function(req, res) {
    console.log('USERNAME: ' + req.body.username);
    User.register(new User({ username: req.body.username }), req.body.password, function(error, newlyCreatedUser) {
        if (error) {
            console.log("COULD NOT REGISTER USER IN THE POST ROUTE");
            res.render("register");
            console.log(error);
        } else {
            passport.authenticate("local")(req, res, function() {
                let user = req.body.user;
                newlyCreatedUser.name = user.name;
                newlyCreatedUser.nickname = user.nickname;
                newlyCreatedUser.address = user.address;
                newlyCreatedUser.email = user.email;
                newlyCreatedUser.numberOfDogs = user.numberOfDogs;
                newlyCreatedUser.url = "/user/" + newlyCreatedUser.id;

                newlyCreatedUser.save(function(error, savedUser) {
                    for (let i = 0; i < user.numberOfDogs; i++) {
                        let tempDog = req.body[`dog${i}`];
                        Dog.create(tempDog, function(error, createdDog) {
                            if (error) {
                                console.log("DOG NOT CREATED! WOOF WOOF");
                            } else {
                                //TO DO CORDINATES
                                createdDog.img = req.body.dog.img;
                                console.log('coordinates:')
                                console.log(req.body.lng + ' ' + req.body.lat);
                                createdDog.geo = { "lng": Number(req.body.lng), "lat": Number(req.body.lat) };
                                console.log([Number(req.body.lng), Number(req.body.lat)])
                                createdDog.owner = newlyCreatedUser;
                                createdDog.url = "/dog/" + createdDog.id;
                                createdDog.save(function(error, savedDog) {
                                    if (error) {
                                        console.log(error);
                                        console.log("COULD NOT SAVE DOG")
                                    } else {
                                        newlyCreatedUser.update({
                                            $push: {
                                                dogs: savedDog._id,
                                            }
                                        }, function(error, updatedUser) {
                                            if (error) {
                                                console.log('UNABLE TO UPDATE USER');
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                    console.log("USER REGISTERED");
                    res.render('maps', {
                        gmapsCredential: credentials.gmaps,
                        'authorized': true,
                        currentUser: req.user,
                        local: req.app.get('isLocal')
                    });
                });
            });
        }
    });
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;