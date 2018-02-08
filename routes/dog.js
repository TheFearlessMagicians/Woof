express = require('express');
router = express.Router({ mergeParams: true });
Dog = require("../models/dog");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/dog/:id', function(req, res) {
    Dog.findById(req.params.id).populate('owner').exec(function(error, foundDog) {
        if (error || foundDog == null) {
            console.log("ERROR DOG NOT FOUND");
        } else {
            foundDog.url = "/dog/" + foundDog.id;
            foundDog.save(function(error, savedDog) {
                res.render('dogsPage', {
                    dog: savedDog,
                    currentUser: req.user,
                });
            });
        }
    });
});
router.delete('/dog/:id', function (req,res){
    Dog.remove({_id: req.params.id}, function(error){
        if (error){
            console.log("COULD NOT DELETE DOG");
        } else {
            res.send("DELETED DOG");
        }
    });
});

router.put('/dog/:id', function (req,res){
    Dog.findById(req.params.id, req.body.dog, {new: true}, function (error, updatedDog) {
        if (error){
            console.log(error);
        } else {
            res.send("DOG EDITED");
        }
    });  
});


router.get('/dog/:id/edit', function (req,res){
    //TODO render a dog form with value equalling the previously inputted values and allow the user to edit it
    //and then submit using a button called save
    //then make the action of the form the following
    //action="<%=dog.url%>?_method=PUT" method="POST"
    //thats all!
    //res.render(); RENDER THE EDIT FORM
});

module.exports = router;