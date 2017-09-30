var listen_port = 5000;
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var Room = require('./room.js');

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
  user     : 'sukhawari',
  password : 'khawari',
  database : 'ajkuis'
});

connection.connect();



socket.set("log level", 1);
var people = {};
var rooms = {};
var clients = [];


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

 socket.on('user', function(sock_id,username)
  {
      var tmp_id = '/#'+sock_id;
      for (i in clients) {
        if(clients[i].id==tmp_id)
        {
          clients[i].username=username;
           console.log('ID socket = '+clients[i].id+', with username = '+clients[i].username);
        }
      }
  });


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
