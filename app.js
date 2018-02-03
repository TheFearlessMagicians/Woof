//Express set up
let express = require("express");
	app = express();
	serverPort = 8000;

//BodyParser set up
	bodyParser = require("body-parser");
	app.use(bodyParser.urlencoded({extended: true}));


//Mongoose set up
	mongoose = require("mongoose");
	mongoose.connect("mongodb://localhost/Woof");

//Models settings
	Dog = require("./models/dog");
	User = require("./models/user");

//Routes
app.use('/public',express.static(__dirname + '/public'));
app.use(require('./routes/dogOwners'));
app.use(require('./routes/landing'));
app.use(require('./routes/login'));
app.use(require('./routes/map'));

//App settings
app.set('port',serverPort);
app.set('view engine', 'ejs');
app.set('views', 'views');




//Server listen:

var server = app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});
