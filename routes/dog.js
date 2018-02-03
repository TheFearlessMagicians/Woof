express = require('express');
router = express.Router({ mergeParams: true });
Dog = require("../models/dog");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/dog/:id', function (req,res){
	Dog.findById(req.params.id).populate('owner').exec(function (error, foundDog){
		if (error){
			console.log("ERROR DOG NOT FOUND");
		} else {
			console.log(foundDog);
			res.render('dogsPage',
				{
					dog: foundDog,
				}
			);
		}
	});
});

module.exports = router;