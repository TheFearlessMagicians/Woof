var express = require('express');
var email = require('../scripts/email');
var credentials =require('../credentials/credentials.js');
var router = express.Router({mergeParams:true});


router.get('/main', function(req, res) {
          res.render('maps', {
          gmapsCredential : credentials.gmaps
            });
});
module.exports = router;
