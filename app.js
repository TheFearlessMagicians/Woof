//Express set up
let express = require("express");
	app = express();
	serverPort = 8000;
          io = require('socket.io')();

//BodyParser set up
	bodyParser = require("body-parser");
	app.use(bodyParser.urlencoded({extended: true}));


//Mongoose set up
	mongoose = require("mongoose");
	mongoose.connect("mongodb://localhost/Woof");

//Models settings
	Dog = require("./models/dog");
	User = require("./models/user");

//Seed file set up and run!
	seed = require("./models/seed");
	seed();

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
app.set('sockets',[]);

//Server listen:
let server = app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});


//*************SOCKET code*******************
io.attach(server);
let sockets = []
io.on('connection', function(socket) {
    console.log('a client connected.')
    let temp = app.get('sockets');
    temp.push(socket);
    app.set('sockets',temp);
    console.log(`${app.get('sockets').length} players`)
    socket.on('')

    // Events:

});
