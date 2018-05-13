// // initializing socket, connection to server
$(function(){
    let socket = io.connect('http://localhost');
 

    // buttons & inputs
    let message = $("#message");
    let username = $("#username");
    let sendmgs = $("#sendmsg");
    let sendusername = $("#sendusername");
    let chatroom = $("#chatroom");
   
    // emit message
    sendmgs.click(function(){
        socket.emit('new message', {message :message.val})
    })
   
   // emit a username
    sendusername.click(function(){
        console.log(username.val());
        socket.emit('change username' , {username : username.val()})
    })
    // listen on new message
    socket.on("new msg", (data) => {
        console.log(data);
        chatroom.append("<p class= 'msg'>" + data.username + ":" + data.message + "</p>")
    })
});
// socket.on('connect', function(data) {
//    socket.emit('join', 'Hello server from client');
// });

// // listener for 'thread' event, which updates messages
// socket.on('thread', function(data) {
//    $('#thread').append('<li>' + data + '</li>');
// });

// // prevents form from submitting and sends a message to server
// $('form').submit(function(){
//    var message = $('#message').val();
//    socket.emit('messages', message);
//    this.reset();
//    return false;
// });




/*------------ */

