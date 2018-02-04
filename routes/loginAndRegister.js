let express = require('express');
router = express.Router({ mergeParams: true });
User = require("../models/user")

//AUTHENTICATION
let passport = require("passport");
LocalStratergy = require("passport-local");

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "I wanna go poopie",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});
passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get('/login', function(req, res) {
    res.render('login');
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
    res.render('register', {});
});


router.post("/register", function(req, res) {
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
                                console.log(req.body.lng + ' ' + req.body.lat);
                                createdDog.location = [Number(req.body.lng), Number(req.body.lat)];
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
                        'authorized': true
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
