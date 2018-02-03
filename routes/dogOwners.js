var credentials =require('../credentials/credentials.js');
var express = require('express');
var router = express.Router({mergeParams:true});
var email = require('../scripts/email').expressInterest;
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/expressinterest/:id',function(req,res){
          let sender = req.params.id;
          email(sender,"wilsonjusuf1998@gmail.com","I want your doggo!",credentials.mailgun,()=>{})

})
module.exports = router;
