let express = require('express');
	router = express.Router({ mergeParams: true });

router.get('/', function(req, res) {
    res.render('landing', {currentUser: req.user});
});

module.exports = router;