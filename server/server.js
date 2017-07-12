const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});



server.listen(port, () => { console.log(`Server is up and running in port ${port}`) });