express = require('express');
router = express.Router({ mergeParams: true });

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/dog/:id', function (req,res){
	res.render('dogsPage');
});

module.exports = router;