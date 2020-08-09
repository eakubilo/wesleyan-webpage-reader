let socket = io.connect('http://localhnost:3000');

socket.on('bullet', printData);

function printData(data){
    console.log(data);
}

document.getElementById("Click").addEventListener("click", clickFunction)

function clickFunction(){
    let data = {
        url: document.getElementById("type").value
    }
    socket.emit('bullet', data);
}
