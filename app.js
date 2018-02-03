//Express set up
let express = require("express");
	app = express();

//BodyParser set up
	bodyParser = require("body-parser");
	app.use(bodyParser.urlencoded({extended: true}));

//Mongoose set up
	mongoose = require("mongoose");
	mongoose.connect("mongodb://localhost/Woof");

//Routes

app.use(require('./routes/dogOwners'));
app.use(require('./routes/index'));
app.use(require('./routes/login'));
app.use(require('./routes/map'));

//connection settings

app.set('port',8000);


//server listen:

var server = app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});
