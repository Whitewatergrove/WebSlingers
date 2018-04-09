let mysql = require('mysql');
let express = require('express');
let app = express();

//app.use(express.static('public'));

var con = mysql.createConnection({
    host: "83.255.197.121",
    user: "mans",
    password: "forslund",
    port: "3306",
    database: "webbslingers"
});

con.connect(function (err) {
    if (err) {
        console.log('error while connectiong to database' + err);
    }
    console.log("Connected!");
})
app.set('port', 3000);

var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});

app.get('/', function(req,res) {
    res.send('hello world');
})
