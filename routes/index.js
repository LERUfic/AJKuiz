var express = require('express');
var router = express.Router();
//var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index_client', { title: 'AJKuiz' });
});

router.get('/dashboard', function(req, res, next) {
  res.render('index_dashboard', { title: 'AJKuiz Dashboard' });
});

router.get('/admin', function(req, res, next){
	res.render('admin', { title: "Admin" });
})

module.exports = router;
