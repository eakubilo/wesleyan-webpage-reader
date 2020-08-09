let express = require('express');

let app = express();

let server = app.listen(3000);
app.use(express(static('/public')));

console.log("My socket server is running");

let io = socket(server);

io.sockets.on('connection', newConnection);
let req = new XMLHttpRequest();

function newConnection(socket) {
    console.log('new connection' + socket.id);
    socket.on('button', sendRequest);
    function sendRequest(data){
        req.open('GET', data.url, false);
        req.send(null);
        if(req.status == 200) {
            io.sockets.emit('button', {text: req.responseText});
        }
    }
}