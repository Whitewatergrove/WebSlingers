'use strict'
<<<<<<< HEAD

let mysql = require('mysql');
=======
>>>>>>> 07ca6b8b4980bde9c273ff76d282d212187f0893
let express = require('express');
let app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
const routes = require('./routes/routes');
let session = require('express-session');

app.use(session({
    secret: 'jocketest',
    resave: false,
    saveUninitialized: false
}))

app.use('/', routes);

app.set('port', 80);
var server = app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + server.address().port);
});