let mysql = require('mysql');
let express = require('express');
let app = express();

app.use(express.static('public'));

app.set('port', 3000);
var dbfunctions = require('./DBFunctions');

var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});
app.get('/test', function(req, res)
{
  var uname = "måns";
  dbfunctions.getstudentinfo(uname, function(err,result){
    if (err) throw err;
    res.json(result);
    console.log(result);
  })
});




//app.get('/', function(req,res) {
//    con.connect(function (err) {
//        if (err) {
//            console.log('error while connectiong to database' + err);
//        }
//    console.log("Connected!");
//
//    // con.query('INSERT INTO users (ID, Password, Role) VALUES (?, ?, ?)', ['jocke2', 'Jocketest1', 'student1'], function(err, result) {
//    //     if (err) throw err
//        con.query('SELECT * FROM users', function(err, results) {
//            if (err) throw err
//            let temp = '';
//            for(var i in results) {
//                temp += ('<tr><td>' + results[i].ID + '</td><td>' + results[i].Password + '</td><td>' + results[i].Role + '</td></tr>');
//            }
//            res.write('<table>' + temp + '</table>')
//            res.end();
//            })
//        })
//    // })  
//})
//app.post('/test', function (req, res) {
//     var ID = req.body.username;
//     var Password = req.body.password;
//     var Role = 'student1';
//     console.log('ID = %s', ID);
//     console.log('req.body.username = %s', req.body.username);
//     console.log('Password = %s' , Password);
//     console.log('req.body.password = %s', req.body.password);
//     console.log('Role : %s',Role);
//     
//     con.query('INSERT INTO users (ID, Password, Role) VALUES (?, ?, ?)', [ID, Password, Role], function(err, resp) {
//             if (err) throw err
//       res.sendFile(__dirname + '/public/modalLogin.html');
//       console.log('new user added')
//     });
//   });
