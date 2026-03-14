
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
        color: selectorColorNote
    }

    notes.push(newNote)
    renderTask()
}

function deleteNote(id) {
    notes = notes.filter(note => note.id !== id)
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
        noteDate.textContent = new Date()
        noteDate.classList.add("note-date")
    
        const btnDel = document.createElement("button");
        btnDel.textContent = "delete"
        btnDel.classList.add("delete-note")

        const noteText = document.createElement("p")
        noteText.classList.add("note-text")
        noteText.textContent = note.text

        btnDel.addEventListener("click", () => {
            deleteNote(note.id)
        })

        noteHeader.append(noteDate, btnDel)
        li.append(noteHeader, noteText)
        list.appendChild(li)

    })
}






