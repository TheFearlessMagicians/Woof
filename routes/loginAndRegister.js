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
passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get('/404', function(req, res) {
    res.send("Failed to Log in", 404);
});

router.post('/login', passport.authenticate('local', {
    successRedirect: "/main?_WilsonFixTHis",
    failureRedirect: "/404",
}), function(req, res) {});

router.get('/register', function(req, res) {
    res.render('register', {});
});


router.post("/register", function(req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, function(error, newlyCreatedUser) {
        if (error) {
            console.log("COULD NOT REGISTER USER IN THE POST ROUTE");
            res.render("register");
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

module.exports = router;