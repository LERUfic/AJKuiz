var express = require('express');
var router  = express.Router();
var db      = require('./../../db');

router.get('/', function(req, res, next) {

  var isFinishedCount = 1;
  var category        = [];

  db.select('*').from('soalAjkuiz').then(function(rows){
      if(category.length == 0){
        category.push(rows[1].kategori_ajkuiz);
      }
      else{
        for(i in category){
          var flag_exist=0;
          if(category[i]==rows[i].kategori_ajkuiz){
            flag_exist=1;
          break;
          }
          if(flag_exist==0){
            userAns.push(rows);
            category[i].push(rows[i].kategori_ajkuiz)
          }
        }
      }
    isFinished();
  });

  function isFinished(){
    if(isFinishedCount == 0){
      res.render('index_dashboard',{title:'AJKuiz Dashboard',category: category});
    }else{
      isFinishedCount--;
    }
  }

});

module.exports = router;