/**
 * Created by anggitowibisono2 on 5/23/2016.
 */

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

var osipaddress = process.env.OPENSHIFT_NODEJS_IP;
var osport = process.env.OPENSHIFT_NODEJS_PORT;

app.set('port', osport || 3000);
app.set('ipaddress', osipaddress);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.broadcast.emit('hi');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
        console.log(msg);
    });

    socket.on('registerClient',function(data){
        var index = onlineClient.indexOf(data.user);
        if (index > -1) {
            onlineClient.splice(index, 1);
        }
       onlineClient.push(data.user);
        socket.emit('onlineClient',onlineClient);
        console.log(onlineClient);
    });
});

server.listen(process.env.OPENSHIFT_NODEJS_PORT, process.env.OPENSHIFT_NODEJS_IP);