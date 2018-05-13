// initializing socket, connection to server
 let socket = io.connect('http://localhost/profile');


 let send_message = $("#send_message");
 //let username = $("#username");
 var message = $("#message")


//Emit message
send_message.click(function(){
    socket.emit('new_message', {message : message.val()})
})

//Listen on new_message
socket.on("new_message", (data) => {
    feedback.html('');
    message.val('');
    chatroom.append("<p class='message'>"  + data.message + "</p>")
})






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