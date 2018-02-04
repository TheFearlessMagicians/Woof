//Express set up
let express = require("express");
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
app.set('port','169.234.99.106');
//Servloger listen:
let server = app.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port'));
});

function distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295; // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 +
        c(lat1 * p) * c(lat2 * p) *
        (1 - c((lon2 - lon1) * p)) / 2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

//*************SOCKET code*******************
io.attach(server);
let sockets = []
io.on('connection', function(socket) {

    console.log('connection callback called.');
    socket.emit('CONNECTED_USERS_INFO', { 'connected': sockets });
    socket.broadcast.emit('SPECIAL_MESSAGE_SENT', { 'message': `${socket} connected!` })

    socket.on('POSITION_RECEIVED', function(latLng) {
        console.log('position received.');
        //Note: latLng is a json object of :
        //{lat: LATITUDE, lng: LONGITUDE};
        let coordinates = [Number(latLng.lng), Number(latLng.lat)];
        let tolearance = 1;

        Dog.find({}, function(error, foundDogs) {
            if (error) {
                console.log('DOGS NOT FOUND :( ');
            } else {
                foundDogs.forEach(function(foundDog) {
                    delta = distance(coordinates[1], coordinates[0], foundDog.geo.lat, foundDog.geo.lng);
                    foundDog.update({
                        delta: delta,
                    }, function(error, updatedDog) {
                        if (error) {
                            console.log("COULDN'T SAVE DOG");
                        }
                    })
                });
            }

        });
        Dog.find({}).sort([
            ['delta', 'ascending']
        ]).exec(function(error, sortedDogs) {
            if (error) {
                console.log(error);
            } else {

                //Wilson here is your sorted dogs
                socket.emit('DOGS_NEAR_USER', sortedDogs); // VARUN. This result undefined. ??
                sortedDogs.forEach(function(pup) {

                    console.log(pup.name + ' ' + pup.delta);
                });
            }
        });


        /*   Dog.find({
               geo: {
                       $near: coordinates,
             }*/
        //let distance = 0.001



        //let queryObject={"$and":[latObject,lngObject]}

        //console.log(JSON.stringify(queryObject));
        //           queryString = {"$and":[{'geo.lat':{"$lt":(Number(latLng.lat)+distance),"$gt":(Number(latLng.lat)-distance)}},
        //           {'geo.lng':{"$lt":(Number(latLng.lng)+distance),"$gt":(Number(latLng.lng)-distance)}}]//queryObject

        // };        //For now, we will bypass this to save time
        //            Dog.find(/*queryString*/{}, function(error, foundDogs) {
        //             if (error) {
        //                 console.log(error);
        //                 //IT GOES HERE. THERE IS AN ERROR FINDING DOGs.
        //                 console.log('ERROR FINDING DOGS APP JS')
        //             } else {
        //                 console.log('found dogs object server side:')
        //                 console.log(foundDogs);
        //                 //  var geospatial_query_result =
        //                 socket.emit('DOGS_NEAR_USER', foundDogs); // VARUN. This result undefined. ??
        //             }
        //  });//.and([latObject,lngObject]);

    });
    socket.on('SEND_MESSAGE', function(message) {
        socket.broadcast.emit('MESSAGE_SENT', message);
    })


});
