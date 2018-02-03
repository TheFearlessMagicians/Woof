let credentials = require('../credentials/credentials.js');
express = require('express');
router = express.Router({ mergeParams: true });
email = require('../scripts/email').expressInterest;


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/expressinterest/:id', function(req, res) {
    let sender = req.params.id;
    email(sender, "wilsonjusuf1998@gmail.com", "I want your doggo!", credentials.mailgun, () => {})

})
module.exports = router;