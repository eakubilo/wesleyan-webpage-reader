let socket = io.connect('http://localhost:3000');

socket.on('button', printData);

function printData(data){
    console.log(data);
}

document.getElementById("click").onclick = clickFunction;

function clickFunction(){
    let data = {
        url: document.getElementById("type").value
    }
    socket.emit('button', data);
}
