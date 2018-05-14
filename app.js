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

//routes
app.use('/', routes)
// app.get('/', (req, res) => {
// 	res.render('')
// })

//socket.io instantiation
const io = require("socket.io")(server)


//listen on every connection
io.on('connection', (socket) => {
	console.log('New user connected')

	//default username
	socket.username = "Anonymous"

    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })
    socket.on('connection', (socket) => {
        console.log('disconnected')
    })

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', {message : data.message});
    })

    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})




//     client.on('chat message', function(msg){
//         io.emit('chat message', msg);
//       });
//     client.on('disconnect', function(){
//         console.log('user disconnected');
//         client.emit('thread')
//       });
//     });

//    /*-----------------------------------------------------*/ 
  


// var server = require('http').createServer(app);
// var io = require('socket.io')(client);


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
// app.use('/', routes);

app.get('/', (req, res)=> {
    res.render('StudentProfile');
});

app.set('port', 80);
var server = app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + server.address().port);  

});