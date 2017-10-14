var mysql = require("mysql");
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'aguelsatria',
    password: 'root',
    database: 'ajkuiz'
});
var data2;

//beres
exports.list = function(req, res){
  var data = {title: "", res: {}};
        results_aaa(function(result) {
            //console.log(data2);
            for (i in result){
                for(j in data2){
                    if(result[i].kategori_id == data2[j].id){
                        result[i].kategori_id = data2[j].nama;
                    }
                }
            }
            console.log(result);
            res.render('admin/soal-list', {title: 'Daftar Soal', res: result});
        });
};

function results_aaa(callback) {
    teams(function(res) {
        callback(res)
    });
}

function teams(callback) {
    var query = connection.query("SELECT * FROM kategori_ajkuiz", function(err, result, fields) {
        data2 = result;
        players(function(results) {
            callback(results);
        });
    });
}

function players(callback) {
    query("SELECT * FROM soalAjkuiz ", function(results) {
        callback(results);
    });
}

function query(sql, callback) {
    connection.query(sql, function(error, results, fields) {
        callback(results);
    });
}


//beres
exports.add = function(req, res){
    req.getConnection(function (err, connection) {
        connection.query("SELECT * FROM kategori_ajkuiz", function(err, rows){
            if (err)
                console.log(err);
            res.render('admin/soal-add', {
                title: 'Tambah Soal',
                soal_ajkuiz: '',
                opsiA_ajkuiz: '',
                opsiB_ajkuiz: '',
                opsiC_ajkuiz: '',
                opsiD_ajkuiz: '',
                kategori_ajkuiz: '',
                jawaban_ajkuiz: '',
                data: rows
            });    
        });
    });
};

//beres
exports.save = function(req,res){
    var input = JSON.parse(JSON.stringify(req.body));
    
    req.getConnection(function (err, connection) {

        connection.query("SELECT * FROM kategori_ajkuiz WHERE nama = ?",[input.kategori_ajkuiz], function(err, rows){
            if(rows.length > 0){
                var data = {
                    soal_ajkuiz     : input.soal_ajkuiz,
                    opsiA_ajkuiz    : input.opsiA_ajkuiz,
                    opsiB_ajkuiz    : input.opsiB_ajkuiz,
                    opsiC_ajkuiz    : input.opsiC_ajkuiz,
                    opsiD_ajkuiz    : input.opsiD_ajkuiz,
                    kategori_id     : rows[0].id,
                    jawaban_ajkuiz  : input.jawaban_ajkuiz
                    
                };
                connection.query("INSERT INTO soalAjkuiz set ? ",[data], function(err, rows){
                    if (err)
                        console.log("Error Updating : %s ",err );
                    res.redirect('/admin');
                });
            }
            else{
                var data={
                    nama: input.kategori_ajkuiz
                }

                connection.query("INSERT INTO kategori_ajkuiz set ? ", [data], function(err, rows){

                    if (err)
                        console.log("Error Updating : %s ",err );
                    else{
                        connection.query("SELECT * FROM kategori_ajkuiz WHERE nama = ?",[input.kategori_ajkuiz],function(err, rows2){
                            var data2 = {
                                soal_ajkuiz     : input.soal_ajkuiz,
                                opsiA_ajkuiz    : input.opsiA_ajkuiz,
                                opsiB_ajkuiz    : input.opsiB_ajkuiz,
                                opsiC_ajkuiz    : input.opsiC_ajkuiz,
                                opsiD_ajkuiz    : input.opsiD_ajkuiz,
                                kategori_id     : rows2[0].id,
                                jawaban_ajkuiz  : input.jawaban_ajkuiz
                            }
                            connection.query("INSERT INTO soalAjkuiz set ? ",[data2], function(err, rows){
                                if (err)
                                    console.log("Error Updating : %s ",err );
                                res.redirect('/admin');
                            });
                        });
                    };
                });
            }; 
        });
    });
};

//beres
exports.edit = function(req, res){
    
    var id = req.params.soal_id;
    console.log(id);
    var finalData;    
    var data = {title: "", res: {}};
    results_aaa(function(result) {
        //console.log(data2);
        for (i in result){
            if(result[i].soal_id == id){
                for(j in data2){
                    if(result[i].kategori_id == data2[j].id){
                        result[i].kategori_id = data2[j].nama;
                    }
                    finalData = result[i];
                }
            }
        }
        console.log(result);
        res.render('admin/soal-edit', {title: 'Edit Soal', res: finalData, kategori: data2});
    });
};

//beres
exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.soal_id;

    req.getConnection(function (err, connection) {

        connection.query("SELECT * FROM kategori_ajkuiz WHERE nama = ?",[input.kategori_ajkuiz], function(err, rows){
            if(rows.length > 0){
                var data = {
                    soal_ajkuiz     : input.soal_ajkuiz,
                    opsiA_ajkuiz    : input.opsiA_ajkuiz,
                    opsiB_ajkuiz    : input.opsiB_ajkuiz,
                    opsiC_ajkuiz    : input.opsiC_ajkuiz,
                    opsiD_ajkuiz    : input.opsiD_ajkuiz,
                    kategori_id     : rows[0].id,
                    jawaban_ajkuiz  : input.jawaban_ajkuiz
                    
                };
                connection.query("UPDATE soalAjkuiz set ? WHERE soal_id = ? ",[data,id], function(err, rows){
                    if (err)
                        console.log("Error Updating : %s ",err );
                    res.redirect('/admin');
                });
            }
            else{
                var data={
                    nama: input.kategori_ajkuiz
                }

                connection.query("INSERT INTO kategori_ajkuiz set ? ", [data], function(err, rows){

                    if (err)
                        console.log("Error Updating : %s ",err );
                    else{
                        connection.query("SELECT * FROM kategori_ajkuiz WHERE nama = ?",[input.kategori_ajkuiz],function(err, rows2){
                            var data2 = {
                                soal_ajkuiz     : input.soal_ajkuiz,
                                opsiA_ajkuiz    : input.opsiA_ajkuiz,
                                opsiB_ajkuiz    : input.opsiB_ajkuiz,
                                opsiC_ajkuiz    : input.opsiC_ajkuiz,
                                opsiD_ajkuiz    : input.opsiD_ajkuiz,
                                kategori_id     : rows2[0].id,
                                jawaban_ajkuiz  : input.jawaban_ajkuiz
                            }
                            connection.query("UPDATE soalAjkuiz set ? WHERE soal_id = ? ",[data2, id], function(err, rows){
                                if (err)
                                    console.log("Error Updating : %s ",err );
                                res.redirect('/admin');
                            });
                        });
                    };
                });
            }; 
        });
    });
};


exports.delete = function(req,res){
          
    var id = req.params.soal_id;

    req.getConnection(function (err, connection) {
        connection.query("SELECT * FROM soalAjkuiz WHERE soal_id = ?", [id], function(err, rows){
            var kategorID = rows[0].kategori_id;
            connection.query("DELETE FROM soalAjkuiz WHERE soal_id = ? ",[id], function(err, rows2){
                if(err)
                    console.log("Error deleting : %s ",err );
                else{
                    connection.query("SELECT * FROM soalAjkuiz WHERE kategori_id = ?", [kategorID], function(err, rows3){
                        if(rows3.length > 0){
                            console.log("Terhapus 1 Row");
                            res.redirect('/admin');
                        }
                        else{
                            connection.query("DELETE FROM kategori_ajkuiz  WHERE id = ? ",[kategorID], function(err, rows2){
                                if(err)
                                    console.log("Error deleting : %s ",err );
            
                                res.redirect('/admin');
                            });
                        }
                    });
                }
            });
        });
    });
};