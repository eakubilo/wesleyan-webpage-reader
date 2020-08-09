let socket = io.connect('http://localhost:3000');

socket.on('button', printData);
let str;
let regexp = /[A-Z]{4}[1-9]{3}[-][0][1]/gi
function printData(data){
    str = data.text;
    let match, matches =[];
    while((match = regexp.exec(data.text)) != null){
        matches.push({
            index: match.index,
            content: data.text.substring(match.index, (match.index + 7))
        });
    }
    console.log(matches);
}

document.getElementById("click").onclick = clickFunction;

function clickFunction(){
    let data = {
        url: document.getElementById("type").value
    }
    socket.emit('button', data);
}
