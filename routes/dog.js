express = require('express');
router = express.Router({ mergeParams: true });
Dog = require("../models/dog");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/dog/:id', function(req, res) {
    Dog.findById(req.params.id).populate('owner').exec(function(error, foundDog) {
        if (error) {
            console.log("ERROR DOG NOT FOUND");
        } else {
            foundDog.url = "/dog/" + foundDog.id;
            foundDog.save(function(error, savedDog) {
                console.log(foundDog);
                res.render('dogsPage', {
                    dog: savedDog,
                    currentUser: req.user,
                });
            });

        }
    });
});

module.exports = router;