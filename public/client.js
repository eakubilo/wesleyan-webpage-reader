let socket = io.connect(`${window.location.protocol}//${window.location.host}`);

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
let select = document.getElementById("selectCourse");
for(let i = 0; i < courses.length; i++){
	let course = courses[i];
	let el = document.createElement("option");
	el.textContent = course;
	el.value = course;
	select.appendChild(el);
}	
let str;
let parser = new DOMParser();
function printData(data){
	if(socket.id == data.id){
		    let springCourses = [];
    let fallCourses = [];
    let doc = parser.parseFromString(data.text, 'text/html');
    let courseTag = doc.getElementsByClassName("header")[6].innerHTML;
    console.log(doc.getElementsByClassName("header")[6]);
    let courseTagVal = 0;
    for(let i = 0; i < courseTag.length; i++){
        courseTagVal += courseTag.charCodeAt(i);
    }
    // console.log(doc.getElementsByTagName("a"));
    let currentAnchor = "fall";
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
            if((fallCourses.indexOf(anchorArray) == -1) && anchorArray != courseTag){
                if(doc.getElementsByTagName("tbody")[2].contains(anchor)){
                    fallCourses.push(anchorArray);
                }
			}
			if((springCourses.indexOf(anchorArray) == -1) && anchorArray != courseTag){
				if(doc.getElementsByTagName("tbody")[4].contains(anchor)){
                    springCourses.push(anchorArray);
                }
            }
        }
    }
	let fallCourseData={
		courses: fallCourses,
		semester: "fall",
		year: data.year
	}
	let springCourseData = {
		courses: springCourses,
		semester: "spring",
		year: (data.year + 1)
	}
	let fallCourseFormatted = `<br> ${fallCourseData.year} ${fallCourseData.semester} courses: ${fallCourseData.courses.toString()}`
	let springCourseFormatted = `<br> ${springCourseData.year} ${springCourseData.semester} courses: ${springCourseData.courses.toString()}`
	document.getElementById("courses").innerHTML = document.getElementById("courses").innerHTML + fallCourseFormatted;
	document.getElementById("courses").innerHTML = document.getElementById("courses").innerHTML + springCourseFormatted;
	//socket.emit('savedata', fallCourseData);
	//socket.emit('savedata', springCourseData);
    console.log(fallCourses);
    console.log(springCourses);

	}
}

document.getElementById("click").onclick = clickFunction;
function clickFunction(){
	document.getElementById("courses").innerHTML = "";
    for(let i = 0; i < 15; i++){
        let link = `https://owaprod-pub.wesleyan.edu/reg/!wesmaps_page.html?stuid=&facid=NONE&crse_list=${document.getElementById("selectCourse").value}&term=${1069+10*i}&offered=Y`
        let data = {
            url: link,
			year: 2006 + i,
			id: socket.id
        }
        socket.emit('button', data);
    }
}