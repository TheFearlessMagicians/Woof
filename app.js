//Express set up
let express = require("express");
app = express();
serverPort = 8000;
io = require('socket.io')();

//BodyParser set up
bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));


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

// //AUTHENTICATION
// let passport = require("passport");
// LocalStratergy = require("passport-local");

// //PASSPORT CONFIGURATION
// app.use(require("express-session")({
//         secret: "I wanna go poopie!",
//         resave: false,
//         saveUninitialized: false,
//     }
// ));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStratergy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

//Servloger listen:
let server = app.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port'));
});


//*************SOCKET code*******************
io.attach(server);
let sockets = []
io.on('connection', function(socket) {
    // console.log('a client connected.')

    //socket login attempts.
    socket.on('LOGIN_ATTEMPT', function(user) {
        User.findOne({
            username: user.username,
        }, function(error, foundUser) {
            if (error) {
                socket.emit('LOGIN_RESPONSE', { 'authorized': false, 'userNotFound': true });
            } else if (foundUser.password == user.password) {
                let temp = app.get('sockets');
                temp.push(socket);
                app.set('sockets', temp);
                console.log(`${app.get('sockets').length} players`);
                socket.emit('LOGIN_RESPONSE', { 'authorized': true });
            } else {
                socket.emit('LOGIN_RESPONSE', { 'authorized': false, 'userNotFound': false });
            }
        })

    });

    socket.on('POSITION_RECEIVED', function(latLng) {
        //Note: latLng is a json object of :
        //{lat: LATITUDE, lng: LONGITUDE};
        let geospatial_query_result = "TODO: INSERT GEO QUERY RESULT HERE";
        socket.emit('DOGS_NEAR_USER', geospatial_query_result);
    })

    // Events:

});


