var express = require('express');
var router = express.Router({mergeParams:true});
var bodyParser = require('body-parser');

router.post('/login', function(req, res) {
          let password = '' ; //TODO HANDLE password post request.
          
          res.render('login', {
            });
});
          //TODO: register page.
router.get('/register',function(req,res){
          res.render('register',{

          });
});
module.exports = router;
