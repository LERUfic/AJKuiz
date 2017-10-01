var listen_port = 5000;
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var Room = require('./room.js');

var _ = require('underscore')._;

var routes = require('./routes/index');
var users = require('./routes/users');

var app = require('express')();
var http = require('http').Server(app)
var io = require('socket.io')(http);

var express=require('express');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img',express.static(path.join(__dirname, 'public/images')));
app.use('/js',express.static(path.join(__dirname, 'public/javascripts')));
app.use('/css',express.static(path.join(__dirname, 'public/stylesheets')));
app.use('/font',express.static(path.join(__dirname, 'public/fonts')));

app.use('/', routes);
app.use('/users', users);

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'agugelsatria',
  password : 'root',
  database : 'ajkuiz'
});

connection.connect();



socket.set("log level", 1);
var people = {};
var rooms = {};
var clients = [];

function purge(s, action) {
  if (people[s.id].roomID) { //user is in a room
    var room = rooms[people[s.id].roomID]; //check which room user is in.
    if (s.id === room.owner) { //user in room and owns room
      if (action === "disconnect") {
        var socketids = [];
        for (var i=0; i<sockets.length; i++) {
          socketids.push(sockets[i].id);
          if(_.contains((socketids)), room.people) {
            sockets[i].leave(room.name);
          }
        }

        if(_.contains((room.people)), s.id) {
          for (var i=0; i<room.people.length; i++) {
            people[room.people[i]].inroom = null;
          }
        }
        room.people = _.without(room.people, s.id); //remove people from the room:people{}collection
        delete rooms[people[s.id].roomID]; //delete the room
        delete people[s.id]; //delete user from people collection
        var o = _.findWhere(sockets, {'id': s.id});
        sockets = _.without(sockets, o);
      } else if (action === "removeRoom") { //room owner removes room
        var socketids = [];
        for (var i=0; i<sockets.length; i++) {
          socketids.push(sockets[i].id);
          if(_.contains((socketids)), room.people) {
            sockets[i].leave(room.name);
          }
        }

        if(_.contains((room.people)), s.id) {
          for (var i=0; i<room.people.length; i++) {
            people[room.people[i]].roomID = null;
          }
        }
        delete rooms[people[s.id].roomID];
        people[s.id].roomID = null;
        room.people = _.without(room.people, s.id); //remove people from the room:people{}collection
        delete chatHistory[room.name]; //delete the chat history
        sizeRooms = _.size(rooms);
        io.sockets.emit("roomList", {rooms: rooms, count: sizeRooms});
    } else {//user in room but does not own room
      if (action === "disconnect") {
        io.sockets.emit("update", people[s.id].name + " has disconnected from the server.");
        if (_.contains((room.people), s.id)) {
          var personIndex = room.people.indexOf(s.id);
          room.people.splice(personIndex, 1);
          s.leave(room.name);
        }
        delete people[s.id];
        var o = _.findWhere(sockets, {'id': s.id});
        sockets = _.without(sockets, o);
        }
      }
    }
  }
}


io.on('connection', function(socket){
  console.log("Socket name: "+socket.username+", Socket id: "+socket.id);

  socket.on("joinServer", function(name, roomID) {
    var exists = false;

    _.find(people, function(key,value) {
      if (key.name.toLowerCase() === name.toLowerCase())
        return exists = true;
    });

    if (exists) {
      var randomNumber=Math.floor(Math.random()*1001)
      do {
        proposedName = name+randomNumber;
        _.find(people, function(key,value) {
          if (key.name.toLowerCase() === proposedName.toLowerCase())
            return exists = true;
        });
      } while (!exists);
      socket.emit("errorMsg", {msg: "The username already exists, please pick another one.", proposedName: proposedName});
    } else {
      people[socket.id] = {"name" : name, "roomID": roomID};
      sockets.push(socket);
    }
  });

  socket.on("createRoom", function() {
      var id = new Date();
      var room = new Room(name, id, socket.id);
      rooms[id] = room;

      //add room to socket, and auto join the creator of the room
      socket.room = id;
      socket.join(socket.room);
      people[socket.id].roomID = id;
      room.addPerson(socket.id);
      socket.emit("sendRoomID", {id: id});
        
  });

  socket.on("joinRoom", function(id) {
    if (typeof people[socket.id] !== "undefined") {
      var room = rooms[id];
      room.addPerson(socket.id);
      people[socket.id].roomID = id;
      socket.room = room.id;
      socket.join(socket.room);
      socket.emit("sendRoomID", {id: id});
    }
  });

  /*socket.on("leaveRoom", function(id) {
    var room = rooms[id];
    if (room)
      purge(socket, "leaveRoom");
  });*/

  socket.on("removeRoom", function(id) {
     var room = rooms[id];
     if (socket.id === room.owner) {
      purge(socket, "removeRoom");
    }
  });

  socket.on("disconnect", function() {
    if (typeof people[socket.id] !== "undefined") { //this handles the refresh of the name screen
      purge(socket, "disconnect");
    }
  });

  socket.on('disconnect', function()
  {
      var index = clients.indexOf(socket);
      if(index!=1)
      {
        clients.splice(index,1);
        console.log('Client disconnect -> id = '+ socket.id+', username');
      }
  });

  socket.on('getSoal', function(catSoal){
        //sendUserApp();
        queryAct = "SELECT * from soalAjkuiz where kategori_ajkuiz ='"+catSoal+"'";
        connection.query(queryAct, function(err, rows, fields) {
        if (!err)
        {
            //console.log(rows);
            io.emit('recvSoal',rows);
        }
        else
        {
            console.log('Gagal');
        }
      });
  });

 /*socket.on('user', function(sock_id,username)
  {
      var tmp_id = '/#'+sock_id;
      for (i in clients) {
        if(clients[i].id==tmp_id)
        {
          clients[i].username=username;
           console.log('ID socket = '+clients[i].id+', with username = '+clients[i].username);
        }
      }
  });*/


  socket.on('receiveClient', function(data){
      io.emit('recvClientAns', data);
  });

  socket.on('triggerNoSoal', function(noSoal, soalData){
    //console.log(soalData);
      io.emit('recvNoSoal', noSoal, soalData);
  });

  socket.on('sendScore', function(userScore)
  {
      //console.log(userScore);
      io.emit('recvScore', userScore);
  });

  socket.on('statusHubungan', function(status){
    io.emit('status', status)
  })

});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



http.listen(listen_port, function(){
  console.log('listening on *: '+listen_port);
});

module.exports = app;
