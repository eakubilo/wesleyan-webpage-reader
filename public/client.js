let socket = io.connect('http://localhost:3000');

socket.on('button', printData);
let courses = [
    "AFAM",
    "AMST",
    "ANTH",
    "ARAB",
    "ARCP",
    "ARHA",
    "ARST",
    "ASTR",
    "BIOL",
    "CCIV",
    "CEAS",
    "CGST",
    "CHEM",
    "CHIN",
    "CHUM",
    "CIS",
    "CJST",
    "COL",
    "COMP",
    "CSPL",
    "CSS",
    "DANC",
    "EES",
    "ECON",
    "EDST",
    "ENGL",
    "ENVS",
    "FGSS",
    "FILM",
    "FREN",
    "GELT",
    "GOVT",
    "GRK",
    "GRST",
    "HEBR",
    "HIST",
    "HIUR",
    "IDEA",
    "ITAL",
    "JAPN",
    "KREA",
    "LANG",
    "LAST",
    "LAT",
    "MATH",
    "MBB",
    "MDST",
    "MUSC",
    "NSB",
    "PHED",
    "PHIL",
    "PHYS",
    "PORT",
    "PSYC",
    "QAC",
    "REES",
    "RELI",
    "RLL",
    "RULE",
    "RUSS",
    "SISP",
    "SOC",
    "SPAN",
    "THEA",
    "WLIT"
  ]
let str;
let parser = new DOMParser();
let regexp = /[>][A-Z]{4}[0-9]{3}[-][0-1]{2}/gi
let regexpThreeLetters = /[>][A-Z]{3}[0-9]{3}[-][0][1]/gi
let regexpThreeLettersAmpersand = /[>][A-Z]{2}[&][A-Z][0-9]{3}[-][0][1]/gi
let regexpThreeLettersAmpersandButStupid = /[>][A-Z][&][A-Z]{2}[0-9]{3}[-][0][1]/gi
function printData(data){
    let courses = [];
    let doc = parser.parseFromString(data.text, 'text/html');
    let courseTag = doc.getElementsByClassName("header")[6].innerHTML;
    console.log(doc.getElementsByClassName("header")[6]);
    let courseTagVal = 0;
    for(let i = 0; i < courseTag.length; i++){
        courseTagVal += courseTag.charCodeAt(i);
    }
    // console.log(doc.getElementsByTagName("a"));
    for(let anchor of doc.getElementsByTagName("a")){
        let anchorVal = 0;
        for(let i = 0; i < anchor.innerHTML.length; i++){
            if((anchor.innerHTML.charCodeAt(i) >= 65 && anchor.innerHTML.charCodeAt(i) <= 90) || (anchor.innerHTML.charCodeAt(i) >= 97 && anchor.innerHTML.charCodeAt(i) <= 122) ){
                anchorVal += anchor.innerHTML.charCodeAt(i);
            }
        }
        if(anchorVal == courseTagVal){
            let anchorArray = anchor.innerHTML;
            for(let i = 0; i < 10; i ++){
                anchorArray=anchorArray.replace(`-0${i}`, '');
            }
            if(courses.indexOf(anchorArray) == -1 && anchorArray != courseTag){
                courses.push(anchorArray);
            }
        }
    }
    console.log(courses);
    // str = data.text;
    // let match, matches =[];
    // console.log(data.url.substring(84,85));    
    // while((match = regexp.exec(str)) != null || ((match = regexpThreeLetters.exec(str)) != null) || ((match = regexpThreeLettersAmpersand.exec(str)) != null) || ((match = regexpThreeLettersAmpersandButStupid.exec(str)) != null)){
    //     console.log("found");
    //     matches.push({
    //         index: match.index,
    //         content: str.substring((match.index+1), (match.index + 11))
    //     });
    //     str = str.replace(str.substring((match.index+1), (match.index + 11)))
    // }
    // console.log(matches);
}

document.getElementById("click").onclick = clickFunction;
function clickFunction(){
    for(let i = 0; i < courses.length; i++){
        let link = `https://owaprod-pub.wesleyan.edu/reg/!wesmaps_page.html?stuid=&facid=NONE&crse_list=${courses[i]}&term=1209&offered=Y`
        let data = {
            url: link
        }
        socket.emit('button', data);
    }
}