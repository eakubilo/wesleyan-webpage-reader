let express = require('express');
let fs = require('fs');
let app = express();

let server = app.listen(3000);
app.use(express.static('public'));

let socket = require('socket.io');
console.log("My socket server is running");

let io = socket(server);

io.sockets.on('connection', newConnection);
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let req = new XMLHttpRequest();

function newConnection(socket) {
    console.log('new connection' + socket.id);
    socket.on('button', sendRequest);
    function sendRequest(data){
        console.log(data);
        req.open('GET', data.url, false);
        req.send(null);
        if(req.status == 200) {
            io.sockets.emit('button', {text: req.responseText, url: data.url, year: data.year});
        }
    }
	socket.on('savedata',saveFile);
	function saveFile(data){
		console.log(data)
		let coursesFormatted = `\n ${data.year} ${data.semester} courses: ${data.courses.toString()}`
		fs.appendFile('courses.txt', coursesFormatted, function(err) {
			if (err) {
				console.log(`Error! Append failed`)
			}else {
				console.log(`Append successful`)
			}
		})
	}
}