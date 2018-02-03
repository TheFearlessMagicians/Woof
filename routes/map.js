var express = require('express');
var router = express.Router({mergeParams:true});


router.get('/main', function(req, res) {
          res.render('maps', {
            });
});
module.exports = router;
