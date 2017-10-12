var express = require('express');
var app = express();
//var router = express.Router();
var connection = require('../db');

//var db = require('../db');

/* GET home page. */
app.get('/', function(req, res, next) {
	res.render('index_client', { title: 'AJKuiz' });
});

app.get('/dashboard', function(req, res, next) {
	var kategori = [];
	connection.query("SELECT * FROM soalAjkuiz",function(err, rows, fields) {
		//res.render('index_dashboard', { title: 'AJKuiz Dashboard', category: rows });
		for(var i=0; i<rows.length; i++){
			if(kategori.length == 0){
				kategori.push(rows[i].kategori_ajkuiz);
			}
			else{
				var flagCat = 0;
				for(var j=0;j<kategori.length;j++){
					if(kategori[j]==rows[i].kategori_ajkuiz){
						flagCat = 1;
					}
				}
				if(flagCat==0){
					kategori.push(rows[i].kategori_ajkuiz);
				}
			}
		}
		res.render('index_dashboard', { title: 'AJKuiz Dashboard', category: kategori });
	});
});



module.exports = app;
