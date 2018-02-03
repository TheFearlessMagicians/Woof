var express = require('express');
var router = express.Router({mergeParams:true});


router.post('/login', function(req, res) {
          res.render('login', {
            });
});
          //TODO: register page.
router.get('/register',function(req,res){
          res.render('register',{

          });
});
module.exports = router;
