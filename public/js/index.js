var socket = io();
socket.on('connect', function () {
    console.log('Connected to the server');

    // socket.emit('createMessage', {
    //     from: 'Server',
    //     text: 'Hello Server, How are you buddy?'
    // });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server')
});

socket.on('newMessage', function (message) {
    console.log('Server', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
    jQuery('[name=message]').val('');
});

// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hi'
// }, function (messageFromServer) {
//     console.log(`GOT IT: ${messageFromServer.message}`);
// });

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function (messageFromServer) {
        console.log(`GOT IT: ${messageFromServer.message}`);
    });

});