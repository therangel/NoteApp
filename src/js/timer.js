// ELEMENTS ========================================== 
const minute = document.querySelector(".minute");
const second = document.querySelector(".second");
const button = document.querySelector(".play-pause");
const resetBtn = document.querySelector(".reset");
const settings = document.querySelector(".settings");
const setTimerModal = document.querySelector(".set-timer");
const closeSetTimer = document.querySelector(".close-settings");
const saveSetTimer = document.querySelector(".save-settings");


const newTurnSound = new Audio("../assets/audio/BigBell.mp3");
const studyVoice = new Audio("../assets/audio/study--voice.mp3");
const breakVoice = new Audio("../assets/audio/break--voice.mp3");

// STATE ========================================== 
let min = 25;
let sec = 0;
let myInterval = null;
let mode = "work";

let startTime = null;

let studyDuration = 25
let breakDuration = 5

let remaining = studyDuration * 60 * 1000;

let isRunning = false



// EVENTS ========================================== 

button.addEventListener("click", () => {

    if (!isRunning) {
        // PLAY

        if (!studyDuration) studyDuration = 25

        isRunning = true
        startTime = Date.now()

        addClass()
        loop()

    } else {
        // PAUSE

        clearTimeout(myInterval);
        isRunning = false

        // ATUALIZAÇÃO CRÍTICA: Subtrai o tempo que passou do total restante
        remaining = remaining - (Date.now() - startTime);

        // Renderiza o tempo exato onde parou
        renderCurrentTime(remaining);

        button.classList.remove("active");  
    }
});

resetBtn.addEventListener("click", () => {
    resetTimer(studyDuration, 0);    
});

settings.addEventListener("click", () => {
    setTimerModal.classList.add("active")

})

closeSetTimer.addEventListener("click", () => {
    setTimerModal.classList.remove("active")
})

saveSetTimer.addEventListener("click", () => {
    
    setTimer()

})

// FUNCTIONS ========================================== 

function setTimer() {


    const rawStudy = document.querySelector(".study-hour").value
    const rawBreak = document.querySelector(".break-hour").value


    if (rawStudy.trim() === "" || rawBreak.trim() === "") {

        alert("Preencha todos os campos antes de salvar")
        return 

    } else {
        setTimerModal.classList.remove("active")
    }

    studyDuration = Number(rawStudy)
    breakDuration = Number(rawBreak)

    if (studyDuration <= 0 || breakDuration <= 0) return

    min = studyDuration

    resetTimer(studyDuration, 0)
}

function loop() {

    if (!isRunning) return

    timerActive();
    
    // Usei 100ms para o cronômetro ser muito mais sensível ao clique e não travar o número na hora da troca de turno

    myInterval = setTimeout(loop, 100); 
}

function timerActive() {

    let timeLeft = remaining - (Date.now() - startTime);

    if (timeLeft <= 0) {
        if (mode === "work") {

            notification(newTurnSound, breakVoice);
            mode = "break"; 

            remaining = breakDuration  * 60 * 1000;
        
        } else {

            notification(newTurnSound, studyVoice);
            mode = "work";
            remaining = studyDuration * 60 * 1000;
        }

        startTime = Date.now();
        return;
    }

    renderCurrentTime(timeLeft);
}

// Criamos essa auxiliar para evitar repetição de código
function renderCurrentTime(milliseconds) {
    // Mudamos para Math.floor para o segundo não "pular" antes da hora
    let totalSec = Math.ceil(milliseconds / 1000);

    min = Math.floor(totalSec / 60);
    sec = totalSec % 60;

    updateDisplay();
}

function updateDisplay() {
    second.textContent = `${sec}`.padStart(2, "0");
    minute.textContent = `${min}`.padStart(2, "0");
}

function resetTimer(m, s) {

    clearTimeout(myInterval);
    myInterval = null;  
    isRunning = false
    mode = "work";

    remaining = m * 60 * 1000;
    startTime = null;
    
    min = m;
    sec = s;

    removeClass();
    updateDisplay();
}


function addClass() {
    button.classList.add("active");
    resetBtn.classList.add("active");
}

function removeClass() {
    button.classList.remove("active"); 
    resetBtn.classList.remove("active");
}

function notification(sound, voice) {
    sound.pause(); 
    sound.currentTime = 0.5; 
    sound.playbackRate = 1.5; 

    voice.pause(); 
    voice.currentTime = 0; 

    sound.play(); 

    setTimeout(() => {
        voice.play(); 
    }, 1000);
}