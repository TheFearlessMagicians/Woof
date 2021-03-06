let express = require('express');
email = require('../scripts/email');
credentials = require('../credentials/credentials.js');
router = express.Router({ mergeParams: true });


router.get('/main', function(req, res) {
    if (req.user) {
        res.render('maps', {
            gmapsCredential: credentials.gmaps,
            'authorized': true,
            currentUser: req.user,
            local:req.app.get('isLocal')
        });
    } else {
        res.render('mapsFailed', {
            gmapsCredential:'',
            'authorized': false,
            currentUser: req.user
        });
    }
});

module.exports = router;
