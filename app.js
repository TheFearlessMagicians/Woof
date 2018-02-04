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

  //req.user avalaible to all routes
  app.use(function(req, res, next) {
      res.locals.currentUser = req.user;
      next();
  });

  //App settings
  app.set('port', serverPort);
  app.set('view engine', 'ejs');
  app.set('views', 'views');
  app.set('sockets', []);

  //Servloger listen:
  let server = app.listen(app.get('port'), function() {
      console.log('Listening on port ' + app.get('port'));
  });


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
          distance = 100 * 1000; //in meteres
          point = {
              type: "Point",
              'coordinates': coordinates,
          };
          Dog.find({
              loc: {
                  $near: {
                      $geometry: point,
                      $maxDistance: distance,
                  }
              }
          }, function(error, foundDogs) {
                    if(error){
                              //IT GOES HERE. THERE IS AN ERROR FINDING DOGs.
                              console.log('ERROR FINDING DOGS APP JS')
                    }else{
                    console.log('found dogs object server side:')
            console.log(foundDogs);
            //  var geospatial_query_result =
              socket.emit('DOGS_NEAR_USER', foundDogs); // VARUN. This result undefined. ??
   }});

      });
      socket.on('SEND_MESSAGE', function(message) {
          socket.broadcast.emit('MESSAGE_SENT', message);
      })


  });
