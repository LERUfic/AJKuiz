var listen_port = 5000;
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');


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
  user     : 'root',
  password : 'root',
  database : 'ajkuiz'
});

connection.connect();



var clients=[];


io.on('connection', function(socket){
  console.log("Socket name: "+socket.username+", Socket id: "+socket.id);
  clients.push(socket);
  socket.send(socket.id);

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
