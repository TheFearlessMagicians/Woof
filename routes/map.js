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
            'host': req.app.get('host'),
            'port': req.app.get('port')
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
