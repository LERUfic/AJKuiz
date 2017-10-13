
exports.list = function(req, res){

  req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM soalAjkuiz',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
            
            res.render('admin/soal-list', {title: 'Daftar Soal',data: rows});
         });
         
         //console.log(query.sql);
    });
  
};

exports.add = function(req, res){
    res.render('admin/soal-add', {
        title: 'Tambah Soal',
        soal_ajkuiz: '',
        opsiA_ajkuiz: '',
        opsiB_ajkuiz: '',
        opsiC_ajkuiz: '',
        opsiD_ajkuiz: '',
        kategori_ajkuiz: '',
        jawaban_ajkuiz: ''        
    });
};

exports.save = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {
        var data = {
            soal_ajkuiz     : input.soal_ajkuiz,
            opsiA_ajkuiz    : input.opsiA_ajkuiz,
            opsiB_ajkuiz    : input.opsiB_ajkuiz,
            opsiC_ajkuiz    : input.opsiC_ajkuiz,
            opsiD_ajkuiz    : input.opsiD_ajkuiz,
            kategori_ajkuiz : input.kategori_ajkuiz,
            jawaban_ajkuiz  : input.jawaban_ajkuiz
        
        };

        var query = connection.query("INSERT INTO soalAjkuiz set ? ",data, function(err, rows)
        {
  
          if (err)
              console.log("Error inserting : %s ",err );
         
          res.redirect('/admin');
          
        });
    
    });
};

exports.edit = function(req, res){
    
    var id = req.params.soal_id;
    
    req.getConnection(function(err,connection){
       
        var query = connection.query('SELECT * FROM soalAjkuiz WHERE soal_id = ?',[id],function(err,rows)
        {   
            
            if(err)
                console.log("Error Selecting : %s ",err );
                res.render('admin/soal-edit', {
                    title: 'Edit Soal', 
                    //data: rows[0],
                    soal_id: rows[0].soal_id,
                    soal_ajkuiz: rows[0].soal_ajkuiz,
                    opsiA_ajkuiz: rows[0].opsiA_ajkuiz,
                    opsiB_ajkuiz: rows[0].opsiB_ajkuiz,
                    opsiC_ajkuiz: rows[0].opsiC_ajkuiz,
                    opsiD_ajkuiz: rows[0].opsiD_ajkuiz,
                    kategori_ajkuiz: rows[0].kategori_ajkuiz,
                    jawaban_ajkuiz: rows[0].jawaban_ajkuiz                  
                })
           
         });
         
         //console.log(query.sql);
    }); 
};

/*Save the customer*/


exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.soal_id;
    
    req.getConnection(function (err, connection) {
        
        var data = {
            soal_ajkuiz     : input.soal_ajkuiz,
            opsiA_ajkuiz    : input.opsiA_ajkuiz,
            opsiB_ajkuiz    : input.opsiB_ajkuiz,
            opsiC_ajkuiz    : input.opsiC_ajkuiz,
            opsiD_ajkuiz    : input.opsiD_ajkuiz,
            kategori_ajkuiz : input.kategori_ajkuiz,
            jawaban_ajkuiz  : input.jawaban_ajkuiz
        
        };
        
        connection.query("UPDATE soalAjkuiz set ? WHERE soal_id = ? ",[data,id], function(err, rows)
        {
  
          if (err)
              console.log("Error Updating : %s ",err );
         
          res.redirect('/admin');
          
        });
    
    });
};


exports.delete = function(req,res){
          
     var id = req.params.soal_id;
    
     req.getConnection(function (err, connection) {
        
        connection.query("DELETE FROM soalAjkuiz  WHERE soal_id = ? ",[id], function(err, rows)
        {
            
             if(err)
                 console.log("Error deleting : %s ",err );
            
             res.redirect('/admin');
             
        });
        
     });
};