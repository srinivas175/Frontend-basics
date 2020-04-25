const start = document.getElementById('control-button');
const content = document.getElementById('content');
const menubar = document.getElementsByClassName("menu-bar");
const menu_items = document.getElementsByClassName("nav-items");

var srt_button_class = start.firstChild.classList;
var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();

const bot_action = ['Do you want to quit ?',"You seem to not speak for a long time."];

recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

menubar[0].addEventListener("click",()=>{
    menu_items[0].classList.toggle("open");
})

start.addEventListener("click",clickFunction);


function clickFunction() {
    start.disabled = true;
    // getConfirmation("Hold on, Initializing");
    getConfirmation("Start Speaking");
    setTimeout(() => {
        srt_button_class.toggle("fa-stop");
        if(srt_button_class.contains("fa-stop")){
            recognition.start();
            start.setAttribute("title","stop");
        }else{
            quit();
        }
    }, 1000);
    
}

recognition.onstart = function() {
// getConfirmation("Hold on, Initializing");
}

recognition.onspeechstart = function() {
// getConfirmation("Start Speaking");
setTimeout(() => {
    start.disabled = false;
}, 2000);   
}


recognition.onspeechend = function() {
    getConfirmation("I'm quitting, Bye");
    if(srt_button_class.contains("fa-stop")){
        srt_button_class.toggle("fa-stop");
        start.disabled = false;
        start.setAttribute("title","start");
    }
}

recognition.onresult = async function(event) {
    var res = await event;
    var pos = res.resultIndex;
    var message = res.results[pos][0].transcript.toLowerCase().trim();
    if(message == "stop" || message == "abort" || message == "quit" || message == "exit"){
        getConfirmation(bot_action[0],"true");
    }else{
        content.value = content.value + ' ' + message;
        getConfirmation(message);
    }
};


recognition.onerror = async function (event) {
    console.log("Seems to be some Error", await event.error);  
}

function getConfirmation(message,flag="false") {
    const speech = new SpeechSynthesisUtterance();
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    speech.text = message;
    if(message == "yes"){
        //  || message == "yup" || message == "yeah"
        quit();
    }else{
        flag = false;
        window.speechSynthesis.speak(speech);
    }

}

function quit() {
    recognition.stop();
    srt_button_class.toggle("fa-stop");start.disabled = false;
    start.setAttribute("title","start");
}
