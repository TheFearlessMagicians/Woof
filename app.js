let fs = require('fs')
//HTTPS credentials:
//Express set up
let express = require("express");
//var http = require('http')
//var https = require('https');
app = express();
serverPort = 8000;
io = require('socket.io')();
router = require('express-router');

//Passport JS setup
let passport = require('passport');
LocalStrategy = require('passport-local').Strategy;

//BodyParser set up
bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

//Mongoose set up
mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Woof");

//Models settings
Dog = require("./models/dog");
User = require("./models/user");

//MethodOverride set up
let methodOverride = require('method-override')
app.use(methodOverride('_method'))

//Seed file set up and run!
seed = require("./models/seed");
seed();

//App config
app.use(require('express-session')({
    secret: 'I wanna go poopiee',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Route config
app.use('/public', express.static(__dirname + '/public'));
app.use(require('./routes/dogOwners'));
app.use(require('./routes/landing'));
app.use(require('./routes/loginAndRegister'));
app.use(require('./routes/map'));
app.use(require('./routes/dog'));

//App settings
app.set('port', serverPort);
app.set('view engine', 'ejs');
app.set('views', 'views');
app.set('sockets', []);
var server = '';
if (process.argv[2] == 'live') {
    server = app.listen(app.get('port'), app.get('host'), function() {
        console.log('Listening on host' + app.get('host') + ', port ' + app.get('port'));
    });
    /* let pkey = fs.readFileSync('ssl/server.key');
     let pcert = fs.readFileSync( 'ssl/mydomain.csr' )
     var credentials = {key: pkey, cert: pcert};
     var httpsServer = https.createServer(credentials, app).listen(app.get('port'));
    */
    app.set('isLocal', false);
} else {

    server = app.listen(app.get('port'), function() {
        console.log('Listening on port ' + app.get('port'));
    });
    /*var httpServer = http.createServer(app).listen(app.get('port'));
     */
    app.set('isLocal', true);
    console.log('serving on local host ')

}


//*************SOCKET code*******************
io.attach(server);
let sockets = []
io.on('connection', function(socket) {
    console.log('connection callback called.');
    socket.emit('CONNECTED_USERS_INFO', { 'connected': sockets });
    socket.broadcast.emit('SPECIAL_MESSAGE_SENT', { 'message': `Someone connected!` })
    socket.on('POSITION_RECEIVED', function(latLng) {
        sockets.push(0);
        console.log('position received.');
        //Note: latLng is a json object of :
        //{lat: LATITUDE, lng: LONGITUDE};
        let coordinates = [Number(latLng.lng), Number(latLng.lat)];
        let location = coordinates; //[34.0689, -118.4452];
        console.log('my coordinates:' + coordinates)
        let tolerance = 1;
        Dog.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: coordinates
                    }
                }
            }
        }, function(error, foundPups) {
            if (error) {
                console.log("GEO-SPATIAL QUERRY FAILED")
                console.log(error);
            } else {
                console.log(foundPups);
            }
        });
    });
    socket.on('SEND_MESSAGE', function(message) {
        socket.broadcast.emit('MESSAGE_SENT', message);
    });
});