var listen_port = 5000;
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var Room = require('./room.js');

var _ = require('underscore')._;

var index = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');

var app = require('express')();
var http = require('http').Server(app)
var io = require('socket.io')(http);

var express=require('express');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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

app.use('/', index);
app.use('/users', users);
app.use('/admin', admin);


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'aguelsatria',
  password : 'root',
  database : 'ajkuiz'
});

connection.connect();



io.set("log level", 1);
var people = {};
var rooms = {};
var clients = [];


function purge(s, action) {
  if (people[s.id].roomID) { //user is in a room
    var room = rooms[people[s.id].roomID]; //check which room user is in.
    if (s.id === room.owner) { //user in room and owns room
      if (action === "disconnect") {
        //io.sockets.in(people[socket.id].roomID).emit('disconnect');
        var socketids = [];
        for (var i in clients) {
          socketids.push(clients[i].id);
          if(_.contains((socketids)), room.people) {
            clients[i].leave(room.id);
          }
        }

        if(_.contains((room.people)), s.id) {
          for (var i in room.people){
            people[room.people[i]].roomID = null;
          }
        }
        room.people = _.without(room.people, s.id); //remove people from the room:people{}collection
        delete rooms[people[s.id].roomID]; //delete the room
        delete people[s.id]; //delete user from people collection
        var o = _.findWhere(clients, {'id': s.id});
        clients = _.without(clients, o);
        //socket.emit('joinServerDash');
      } 
      else {//user in room but does not own room
        if (action === "disconnect") {
          if (_.contains((room.people), s.id)) {
            var personIndex = room.people.indexOf(s.id);
            room.people.splice(personIndex, 1);
            s.leave(room.id);
          }
          delete people[s.id];
          console.log(people[s.id]);
          var o = _.findWhere(clients, {'id': s.id});
          clients = _.without(clients, o);
          //socket.emit('showFirst');
        }
      }
    }
  }
  else {
    //The user isn't in a room, but maybe he just disconnected, handle the scenario:
    if (action === "disconnect") {
      delete people[s.id];
      var o = _.findWhere(clients, {'id': s.id});
      clients = _.without(clients, o);
      //socket.emit('showFirst');
    }   
  }
}

io.on('connection', function(socket){

  socket.on("joinServerDash", function() {
    console.log("Server "+socket.id+" join to server");
    var d = new Date();
    var id = d.valueOf();
    var room = new Room(id, socket.id);
    rooms[id] = room;

    var name = 'layar_'+id;
    people[socket.id] = {"name" : name, "roomID": id};

    room.addPerson(socket.id);
    people[socket.id].roomID = id;
    socket.join(people[socket.id].roomID);
    console.log("Server "+socket.id+" join the room "+people[socket.id].roomID);
    clients.push(socket);
    socket.emit("numberView", id);
  });

  socket.on("joinServerClient", function(name) {
    var exists = false;
    var roomID = null;

    _.find(people, function(key,value) {
    if (key.name.toLowerCase() === name.toLowerCase())
      return exists = true;
    });

    if (exists) {
      var randomNumber=Math.floor(Math.random()*1001);
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
      clients.push(socket);
      socket.emit('showNext');
    }
    console.log("Client "+socket.id+" Username:"+name+" join to server");
  });

  socket.on("joinRoom", function(noid) {
    if (typeof people[socket.id] !== "undefined") {
      var room = rooms[noid];
      room.addPerson(socket.id);
      people[socket.id].roomID = noid;
      socket.join(people[socket.id].roomID);
      console.log("Client "+socket.id+" Username:"+people[socket.id].name+" join room "+people[socket.id].roomID);
    }
  });

  /*socket.on("leaveRoom", function(id) {
    var room = rooms[id];
    if (room)
      purge(socket, "leaveRoom");
  });*/

  /*socket.on("removeRoom", function(id) {
     var room = rooms[id];
     if (socket.id === room.owner) {
      purge(socket, "removeRoom");
    }
  });*/

  socket.on("getUserRoomId", function() {
     socket.emit('recvUserRoomId',people[socket.id].roomID);
  });

  socket.on("displayTimer", function(counter) {
     io.sockets.in(people[socket.id].roomID).emit('showTimer',counter);
     console.log(counter);
  });

  socket.on("disconnect", function() {
    if (typeof people[socket.id] !== "undefined") { //this handles the refresh of the name screen
      purge(socket, "disconnect");
    }
  });

  /*socket.on('disconnect', function()
  {
      var index = clients.indexOf(socket);
      if(index!=1)
      {
        clients.splice(index,1);
        console.log('Client disconnect -> id = '+ socket.id+', username');
      }
  });*/

  socket.on("getSoal", function(catSoal){
        //sendUserApp();
        
    queryAct = "SELECT * from soalAjkuiz where kategori_ajkuiz ='"+catSoal+"'";
    console.log(queryAct);
    connection.query(queryAct, function(err, rows, fields) {
      if (!err)
      {
        //console.log(rows);
        io.sockets.in(people[socket.id].roomID).emit('recvSoal',rows);
      }
      else
      {
        console.log('Gagal');
      }
    });
  });

  /*socket.on("getWinner", function(data){
    connection.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      var sql = "INSERT INTO tblWinner (username, channel, urutan, score) VALUES ('"+data.username+"', '"+data.roomID+"', '"+data.urutan+"', '"+data.nilai+"')";
          con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
      });
    });
  });*/

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
      io.sockets.in(people[socket.id].roomID).emit('recvClientAns', data);
  });

  socket.on('triggerNoSoal', function(noSoal, soalData){
    //console.log(soalData);
      io.sockets.in(people[socket.id].roomID).emit('recvNoSoal', noSoal, soalData);
  });

  socket.on('sendScore', function(userScore)
  {
      //console.log(userScore);
      io.sockets.in(people[socket.id].roomID).emit('recvScore', userScore);
  });

  socket.on('statusHubungan', function(status){
      io.sockets.in(people[socket.id].roomID).emit('status', status);
  });
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
