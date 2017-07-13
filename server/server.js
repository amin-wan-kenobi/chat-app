const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '..', '/public');
//const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

//below socket is similar to the socket we defined in html
io.on('connection', (socket) => {
    console.log('New user connected');

    //Now user is connected so we greet the user
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the App'));

    //Someone joined and others will get a message not the person who joined
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    socket.on('createMessage', (newMessage) => {
        console.log('newMessage Received from Client', newMessage);
        // io.emit('newMessage', {
        //     from: newMessage.from,
        //     text: newMessage.text,
        //     createdAt: new Date().getTime()
        // });
        //Above will emit to all
        socket.broadcast.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
    });

});



server.listen(port, () => { console.log(`Server is up and running in port ${port}`) });