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
    dbfunctions.getuname(function(err,result)
    {
        if(err) throw err;
        res.json(result);
    })
});
