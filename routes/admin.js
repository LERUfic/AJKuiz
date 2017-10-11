var express = require('express');
var app = express();

var connection = require('../db');
// var router = express.Router();
//var db = require('../db');

app.get('/', function(req, res, next){
	connection.query('SELECT * FROM soalAjkuiz ORDER BY soal_id DESC',function(err, rows, fields) {
		if (err) {
			console.log("Error Selecting : %s ",err );
		} else {
			res.render('admin/soal-list', {
				title: 'Daftar Soal',
				data: rows
			})
		}
	})
});

// // SHOW ADD USER FORM
app.get('/add', function(req, res, next){    
    res.render('admin/soal-add', {
        title: 'Tambah Soal',
        soal_ajkuiz: '',
        opsiA_ajkuiz: '',
        opsiB_ajkuiz: '',
        opsiC_ajkuiz: '',
        opsiD_ajkuiz: '',
        kategori_ajkuiz: '',
        jawaban_ajkuiz: ''        
    })
})
 
// ADD NEW USER POST ACTION
app.post('/add', function(req, res, next){    

        var soal = {
            soal_ajkuiz: req.sanitize('soal_ajkuiz').escape().trim(),
            opsiA_ajkuiz: req.sanitize('opsiA_ajkuiz').escape().trim(),
            opsiB_ajkuiz: req.sanitize('opsiB_ajkuiz').escape().trim(),
            opsiC_ajkuiz: req.sanitize('opsiC_ajkuiz').escape().trim(),
            opsiD_ajkuiz: req.sanitize('opsiD_ajkuiz').escape().trim(),
            kategori_ajkuiz: req.sanitize('kategori_ajkuiz').escape().trim(),
            jawaban_ajkuiz: req.sanitize('jawaban_ajkuiz').escape().trim()
        }
       	res.json(soal);
        connection.query('INSERT INTO users SET ?', soal, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                
                // render to views/user/add.ejs
                res.render('admin/soal-add', {
                    title: 'Tambah Soal',
                    soal_ajkuiz: soal.soal_ajkuiz,
                    opsiA_ajkuiz: soal.opsiA_ajkuiz,
                    opsiB_ajkuiz: soal.opsiB_ajkuiz,
                    opsiC_ajkuiz: soal.opsiC_ajkuiz,
                    opsiD_ajkuiz: soal.opsiD_ajkuiz,
                    kategori_ajkuiz: soal.kategori_ajkuiz,
                    jawaban_ajkuiz: soal.jawaban_ajkuiz
                })
            } else {                
                req.flash('success', 'Data added successfully!')
                
                // render to views/user/add.ejs
                res.render('admin/soal-add', {
                    title: 'Tambah Soal',
                    soal_ajkuiz: '',
			        opsiA_ajkuiz: '',
			        opsiB_ajkuiz: '',
			        opsiC_ajkuiz: '',
			        opsiD_ajkuiz: '',
			        kategori_ajkuiz: '',
			        jawaban_ajkuiz: ''                    
                })
            }
        })
    
})
 
// SHOW EDIT USER FORM
app.get('/edit/(:soal_id)', function(req, res, next){
	connection.query('SELECT * FROM soalAjkuiz WHERE soal_id = ' + req.params.soal_id, function(err, rows, fields) {
	    if(err) throw err
	    
	    // if user not found
	    if (rows.length <= 0) {
	        req.flash('error', 'User not found with id = ' + req.params.soal_id)
	        res.redirect('/admin')
	    }
	    else { // if user found
	        // render to views/admin/soal-edit.ejs template file
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
	    }
	})
});
 
// EDIT USER POST ACTION
app.put('/edit/(:soal_id)', function(req, res, next) {
    req.assert('soal_ajkuiz', 'Soal harus diisi').notEmpty()          
    req.assert('opsiA_ajkuiz', 'Opsi A harus diisi').notEmpty()           
    req.assert('opsiB_ajkuiz', 'Opsi B harus diisi').notEmpty()
    req.assert('opsiC_ajkuiz', 'Opsi C harus diisi').notEmpty()
    req.assert('opsiD_ajkuiz', 'Opsi D harus diisi').notEmpty()
    req.assert('kategori_ajkuiz', 'Kategori Soal harus diisi').notEmpty()
    req.assert('jawaban_ajkuiz', 'Jawaban Soal harus diisi').notEmpty()
 
    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
        
        /********************************************
         * Express-validator module
         
        req.body.comment = 'a <span>comment</span>';
        req.body.username = '   a user    ';
 
        req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
        req.sanitize('username').trim(); // returns 'a user'
        ********************************************/
        var soal = {
            soal_ajkuiz: req.sanitize('soal_ajkuiz').escape().trim(),
            opsiA_ajkuiz: req.sanitize('opsiA_ajkuiz').escape().trim(),
            opsiB_ajkuiz: req.sanitize('opsiB_ajkuiz').escape().trim(),
            opsiC_ajkuiz: req.sanitize('opsiC_ajkuiz').escape().trim(),
            opsiD_ajkuiz: req.sanitize('opsiD_ajkuiz').escape().trim(),
            kategori_ajkuiz: req.sanitize('kategori_ajkuiz').escape().trim(),
            jawaban_ajkuiz: req.sanitize('jawaban_ajkuiz').escape().trim()
        }
        
        connection.query('UPDATE soalAjkuiz SET ? WHERE soal_id = ', req.params.soal_id, soal, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                
                // render to views/user/add.ejs
                res.render('admin/soal-edit', {
                    title: 'Edit Soal',
                    soal_id: req.params.soal_id,
                    soal_ajkuiz: req.body.soal_ajkuiz,
                    opsiA_ajkuiz: req.body.opsiA_ajkuiz,
                    opsiB_ajkuiz: req.body.opsiB_ajkuiz,
                    opsiC_ajkuiz: req.body.opsiC_ajkuiz,
                    opsiD_ajkuiz: req.body.opsiD_ajkuiz,
                    kategori_ajkuiz: req.body.kategori_ajkuiz,
                    jawaban_ajkuiz: req.body.jawaban_ajkuiz
                })
            } else {                
                req.flash('success', 'Data updated successfully!')
                
                // render to views/user/add.ejs
                res.render('admin/soal-edit', {
                    title: 'Edit Soal',
                    soal_id: req.params.soal_id,
                    soal_ajkuiz: req.body.soal_ajkuiz,
                    opsiA_ajkuiz: req.body.opsiA_ajkuiz,
                    opsiB_ajkuiz: req.body.opsiB_ajkuiz,
                    opsiC_ajkuiz: req.body.opsiC_ajkuiz,
                    opsiD_ajkuiz: req.body.opsiD_ajkuiz,
                    kategori_ajkuiz: req.body.kategori_ajkuiz,
                    jawaban_ajkuiz: req.body.jawaban_ajkuiz                    
                })
            }
        })
    }
    else {   //Display errors to user
        var error_msg = ''
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        })                
        req.flash('error', error_msg)        
        
        /**
         * Using req.body.name 
         * because req.param('name') is deprecated
         */ 
        res.render('admin/soal-edit', { 
            title: 'Edit Soal',
            soal_id: req.params.soal_id,
            soal_ajkuiz: req.body.soal_ajkuiz,
            opsiA_ajkuiz: req.body.opsiA_ajkuiz,
            opsiB_ajkuiz: req.body.opsiB_ajkuiz,
            opsiC_ajkuiz: req.body.opsiC_ajkuiz,
            opsiD_ajkuiz: req.body.opsiD_ajkuiz,
            kategori_ajkuiz: req.body.kategori_ajkuiz,
            jawaban_ajkuiz: req.body.jawaban_ajkuiz
        })
    }
})
 
// DELETE USER
app.delete('/delete/(:soal_id)', function(req, res, next) {
    var soal = { soal_id: req.params.soal_id }
    
    connection.query('DELETE FROM soalAjkuiz WHERE id = ' + req.params.soal_id, soal, function(err, result) {
        //if(err) throw err
        if (err) {
            req.flash('error', err)
            // redirect to users list page
            res.redirect('/admin')
        } else {
            req.flash('success', 'User deleted successfully! id = ' + req.params.soal_id)
            // redirect to users list page
            res.redirect('/admin')
        }
    })
})


module.exports = app;
