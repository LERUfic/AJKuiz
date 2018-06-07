var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'aguelsatria',
  password : 'aswijaya',
  database : 'ajkuiz'
});

connection.connect();

module.exports = connection;
