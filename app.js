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

    con.query('SELECT * from users', function(err,results) {
        if (err) throw err
        for (var i in results) {
            console.log('Results: ', results[i].ID);
            res.write(results[i].ID + ' ' + results[i].Password + ' ' + results[i].Role + '\n');
            }
        res.end();
        })
    })  
})