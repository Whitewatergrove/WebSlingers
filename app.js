'use strict'
let express = require('express');
let app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
const routes = require('./routes/routes');

let bcrypt = require('bcrypt');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
let flash = require('connect-flash');
/*-----------------Socket.io-------------------------- */
// let http = require('http').Server(app); // server
let io = require('socket.io')(server); // instansierar socket.io


// /*-----------------Server function-------------------------- */
// listen on every connection
io.on('connection', (socket) => {
    console.log('new user connected')
    // default username
    socket.io = "Anonymous"
    // listen on change username
    socket.io('change username', (data) => {
        socket.username = data.username
    })
    // listen on new msg
    socket.on('new msg', (data) => {
        // broadcast the new msg
        io.socket.emit('new msg', {message : data.message, username : socket.username});
    })
});


// io.on('connection', function(client){
//     console.log('a user connected');

//     client.on('chat message', function(msg){
//         io.emit('chat message', msg);
//       });
//     client.on('disconnect', function(){
//         console.log('user disconnected');
//         client.emit('thread')
//       });
//     });

//    /*-----------------------------------------------------*/ 



// io.on('connection', function(client) {
// 	console.log('Client connected...');

// 	client.on('join', function(data) {
// 		console.log(data);
// 	});

// 	client.on('messages', function(data){
// 		client.emit('thread', data);
// 		client.broadcast.emit('thread', data);
// 	});
// });



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

app.get('/',(req,res)=> {
    res.send('StudentProfile')
});

app.set('port', 80);
var server = app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + server.address().port);




  

});