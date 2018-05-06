'use strict'
let express = require('express');
let app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
const routes = require('./routes/routes');
let session = require('express-session');

app.use(session({
    secret: 'ufcQC`m~^8TQ-FdCRv2*YdquF3E]T`48hBA2`k%dF#dcn*&d?jbFWE*>u5zUg+cjXB.+"R$dgV]t55wS,eh+_',
    resave: false,
    saveUninitialized: false
}))
app.use('/', routes);

app.set('port', 3000);
var server = app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + server.address().port);
});