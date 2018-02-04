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
  app.use(function(req,res,next){
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
          socket.emit('CONNECTED_USERS_INFO',{'connected':sockets});
          socket.broadcast.emit('SPECIAL_MESSAGE_SENT',{'message':`${socket} connected!`})
//          sockets.push(socket);
    // console.log('a client connected.')

    //socket login attempts.
    /*socket.on('LOGIN_ATTEMPT', function(user) {
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

});*/
    socket.on('POSITION_RECEIVED',function(latLng){
              //Note: latLng is a json object of :
              //{lat: LATITUDE, lng: LONGITUDE};
              let geospatial_query_result = "TODO: INSERT GEO QUERY RESULT HERE"; // get all dogs within range of latLng.
              socket.emit('DOGS_NEAR_USER',geospatial_query_result);
   });
   socket.on('SEND_MESSAGE',function(message){
             socket.broadcast.emit('MESSAGE_SENT',message);
   })


});
