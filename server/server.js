const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const publicPath = path.join(__dirname, '..', '/public');
//const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

//below socket is similar to the socket we defined in html
io.on('connection', (socket) => {
    console.log('New user connected', socket.userDetails);

    //Now user is connected so we greet the user
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat App'));

    //Someone joined and others will get a message not the person who joined
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    socket.on('createMessage', (newMessage, callback) => {
        console.log('Client Message', newMessage);
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
        //Above will emit to all
        //socket.broadcast.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
        callback({ message: 'All Well on Server Side' });
    });

    socket.on('createLocationMessage', (coords, callback) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
        callback('Location sent to all');
    });

});



server.listen(port, () => { console.log(`Server is up and running in port ${port}`) });