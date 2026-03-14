
const openNoteModal = document.querySelector(".open-modal-btn")
const noteModal = document.querySelector(".modal-note")
const closeNoteModal = document.querySelector(".close-modal-btn")
const noteText = document.querySelector(".modal-note-text")
const addNote = document.querySelector(".modal-add-btn")

openNoteModal.addEventListener("click", () => {
    noteModal.classList.add("active")
})

closeNoteModal.addEventListener("click", () => {
    noteModal.classList.remove("active")
})

const list = document.getElementById("note-list");

let notes = []

addNote.addEventListener("click", () => {
    const noteTextContent = noteText.value.trim()

    if(noteTextContent !== ""){
        createNote(noteTextContent)
        noteModal.classList.remove("active")
        noteText.value = ""
    } else {
        alert("Digite uma tarefa")
    }
})

// Color Note
let selectorColorNote = "#ffffff"

document.querySelectorAll(".btn-color-note").forEach(color => {
    color.addEventListener("click", () => {
        selectorColorNote = color.dataset.color
        noteModal.style.backgroundColor = selectorColorNote
    })
})


function createNote(text) {
    const newNote = {
        id: Date.now(),
        text: text,
        color: selectorColorNote,
        date: new Date().toLocaleDateString()
    }

    notes.push(newNote)

    selectorColorNote = "#ffffff"
    noteModal.style.backgroundColor = "#ffffff"

    localStorage.setItem("notes", JSON.stringify(notes))

    renderTask()  
}

function deleteNote(id) {
    notes = notes.filter(note => note.id !== id)

    localStorage.setItem("notes", JSON.stringify(notes))

    renderTask()
}

function renderTask() {

    console.log(notes)
    list.innerHTML = ""

    notes.forEach(note => {
        const li = document.createElement("li")
        li.classList.add("li-note")
        li.style.backgroundColor = note.color  

        const noteHeader = document.createElement("div")
        noteHeader.classList.add("note-header")

        const noteDate = document.createElement("span")
        noteDate.textContent = note.date 
        noteDate.classList.add("note-date")
    
        const btnDel = document.createElement("button");
        btnDel.textContent = "delete"
        btnDel.classList.add("delete-note")

        const noteTextElement = document.createElement("p")
        noteTextElement.classList.add("note-text")
        noteTextElement.textContent = note.text

        btnDel.addEventListener("click", () => {
            deleteNote(note.id)
        })

        noteHeader.append(noteDate, btnDel)
        li.append(noteHeader, noteTextElement)
        list.appendChild(li)

    })
}

const savedNotes = localStorage.getItem("notes")

if(savedNotes) {
    notes = JSON.parse(savedNotes)
    renderTask()
}






