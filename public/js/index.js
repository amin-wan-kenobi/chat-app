var socket = io();
socket.on('connect', function() {
    console.log('Connected to the server');

    // socket.emit('createMessage', {
    //     from: 'Server',
    //     text: 'Hello Server, How are you buddy?'
    // });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server')
});

socket.on('newMessage', function(message) {
    console.log('New Message from Server', message);
});