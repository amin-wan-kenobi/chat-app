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

socket.on('newLocationMessage', function(message){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function (messageFromServer) {
        console.log(`GOT IT: ${messageFromServer.message}`);
    });

});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if(!navigator.geolocation){
        return alert('Geolocation is not supported by your browser');
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        // console.log(position);
        // console.log('Latitude', position.coords.latitude);
        // console.log('Longitude', position.coords.longitude);
        // console.log('Current Time', new Date(position.timestamp));
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, function (messageFromServer){});
    }, function(){
        alert('Unable to fetch location');
    });
});