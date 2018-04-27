'use strict'
var dbfunctions = require('./DBFunctions');

let express = require('express');
let mysql = require('mysql');
let app = express();
let bodyParser = require('body-parser')


app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({     
  extended: true
})); 
app.use(express.json());     
app.use(express.urlencoded()); 

app.use(express.static('public'));

app.set('port', 3000);
var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + server.address().port);
});

app.get('/test', function(req, res)
{
  var uname = "sectra";
  dbfunctions.getuname(uname, function(err,result){
    if (err) throw err;
    res.json(result);
    console.log(result);
  })
});




