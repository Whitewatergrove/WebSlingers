'use strict'
let express = require('express');
let app = express();
let upload = require("express-fileupload");

app.use(upload());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
const routes = require('./routes/routes');

let bcrypt = require('bcrypt');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

let flash = require('connect-flash');

app.use(cookieParser());
app.use(flash());

app.use(session({
    secret: 'ufcQC`m~^8TQ-FdCRv2*YdquF3E]T`48hBA2`k%dF#dcn*&d?jbFWE*>u5zUg+cjXB.+"R$dgV]t55wS,eh+_',
    resave: false,
    saveUninitialized: false
}))

app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});
app.use('/', routes);

app.set('port', 80);
var server = app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + server.address().port);
});