const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');
const publicPath = path.join(__dirname, '..', '/public');
//const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
var io = socketIO(server);

var users = new Users();

app.use(express.static(publicPath));

//below socket is similar to the socket we defined in html
io.on('connection', (socket) => {
    console.log('New user connected', socket.id);

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and Room are required');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        //Now user is connected so we greet the user
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat App'));
        //Someone joined and others will get a message not the person who joined
        //socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));
        //We will send it to that specific group only
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
        callback();
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
        var user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
    });

    socket.on('createMessage', (newMessage, callback) => {
        var user = users.getUser(socket.id);
        if(user && isRealString(newMessage.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, newMessage.text));
        }
        
        //Above will emit to all
        //socket.broadcast.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
        callback({ message: 'All Well on Server Side' });
    });

    socket.on('createLocationMessage', (coords, callback) => {
        var user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
            callback('Location sent to all');
        }
        
    });



});



server.listen(port, () => { console.log(`Server is up and running in port ${port}`) });