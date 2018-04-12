let mysql = require('mysql');
let express = require('express');
let app = express();

//app.use(express.static('public'));

var con = mysql.createConnection({
    host: "83.255.197.121",
    user: "joakim",
    password: "jockele",
    port: "3306",
    database: "webslingers"
});
app.set('port', 3000);
var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});

app.get('/', function(req,res) {
    con.connect(function (err) {
        if (err) {
            console.log('error while connectiong to database' + err);
        }
    console.log("Connected!");

    // con.query('INSERT INTO users (ID, Password, Role) VALUES (?, ?, ?)', ['jocke2', 'Jocketest1', 'student1'], function(err, result) {
    //     if (err) throw err
        con.query('SELECT * FROM users', function(err, results) {
            if (err) throw err
            let temp = '';
            for(var i in results) {
                temp += ('<tr><td>' + results[i].ID + '</td><td>' + results[i].Password + '</td><td>' + results[i].Role + '</td></tr>');
            }
            res.write('<table>' + temp + '</table>')
            res.end();
            })
        })
    // })  
})