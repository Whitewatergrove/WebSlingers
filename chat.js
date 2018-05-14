$(function(){
    //make connection
 var socket = io.connect('localhost/profile')

 //buttons and inputs
 var message = $("#message")
 var username = $("#username")
 var send_message = $("#send_message")
 var send_username = $("#send_username")
 var chatroom = $("#chatroom")
 var feedback = $("#feedback")

 //Emit message
 send_message.click(function(){
     socket.emit('new_message', {message : message.val()})
 })

 //Listen on new_message
 socket.on("new_message", (data) => {
     feedback.html('');
     message.val('');
     chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
 })

 //Emit a username
 send_username.click(function(){
     socket.emit('change_username', {username : username.val()})
 })

 //Emit typing
 message.bind("keypress", () => {
     socket.emit('typing')
 })

 //Listen on typing
 socket.on('typing', (data) => {
     feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
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