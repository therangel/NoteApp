
const openNoteModal = document.querySelector(".open-modal-btn")
const noteModal = document.querySelector(".modal-note")
const closeNoteModal = document.querySelector(".close-modal-btn")
const noteText = document.querySelector(".modal-note-text")
const addNote = document.querySelector(".modal-add-btn")
const overlayNote = document.querySelector(".overlay-notes")


openNoteModal.addEventListener("click", () => {
    noteModal.classList.add("active")
    overlayNote.classList.add("active")
})

closeNoteModal.addEventListener("click", () => {
    noteModal.classList.remove("active")
    overlayNote.classList.remove("active")
})

const list = document.getElementById("note-list");

let notes = []

addNote.addEventListener("click", () => {
    const noteTextContent = noteText.value.trim()

    if(noteTextContent !== ""){
        createNoteObject(noteTextContent)
        noteModal.classList.remove("active")
        overlayNote.classList.remove("active")
        noteText.value = ""
    } else {
        alert("Digite uma tarefa")
    }
})

// Note Color
let selectorColorNote = "#ffffff"

document.querySelectorAll(".btn-color-note").forEach(color => {
    color.addEventListener("click", () => {
        selectorColorNote = color.dataset.color
        noteModal.style.backgroundColor = selectorColorNote
    })
})


function createNoteObject(text) {
    const newNote = {
        id: Date.now(),
        text: text,
        color: selectorColorNote,
        favorite: false,
        date: new Date().toLocaleDateString()
    }

    notes.push(newNote)

    selectorColorNote = "#ffffff"
    noteModal.style.backgroundColor = "#ffffff"

    
    renderTask() 
    saveNotes() 
}

function renderTask() {

    // console.log(notes)

    const noteCont = document.querySelector(".notes-cont")
    noteCont.textContent = notes.length

    let noteContFav = document.querySelector(".notes-cont-fav")
    let onlyFavNotes = notes.filter(favNote => favNote.favorite !== false)
    noteContFav.textContent = onlyFavNotes.length
    
    list.innerHTML = ""
    const fragment = document.createDocumentFragment()

    notes.forEach(note => {

        const li = createNoteElement(note)
        fragment.appendChild(li)
    })

    list.appendChild(fragment)
}

function createNoteElement(note) {

    const li = document.createElement("li")
    li.classList.add("li-note")
    li.style.backgroundColor = note.color  

    const noteHeader = document.createElement("div")
    noteHeader.classList.add("note-header")

    const favBtn = document.createElement("button")
    favBtn.classList.add("fav-note-btn", "btn-note")

    if(note.favorite){
        favBtn.classList.add("is-fav")
        li.classList.add("is-fav")
    }
    
    favBtn.addEventListener("click", () => {          
        favoriteTask(note.id)    
    })

    const noteDate = document.createElement("span")
    noteDate.textContent = note.date 
    noteDate.classList.add("note-date")

    const btnDel = document.createElement("button");
    btnDel.textContent = "delete"
    btnDel.classList.add("del-note-btn", "btn-note")

    const noteTextElement = document.createElement("p")
    noteTextElement.classList.add("note-text")
    noteTextElement.textContent = note.text

    btnDel.addEventListener("click", () => {
        deleteNote(note.id)
    })

    const editBtn = document.createElement("button")
    editBtn.textContent = "edit"
    editBtn.classList.add("edit-note-btn", "btn-note")

    editBtn.addEventListener("click", () => {
        editNote(note.id, note.text)
        overlayNote.classList.add("active")
     
    })

    noteHeader.append(favBtn, noteDate, btnDel)
    li.append(noteHeader, noteTextElement, editBtn)
    
    return li
}

function favoriteTask(id) {
    // console.log(id)

    

    notes = notes.map((note) => {
        if (note.id === id ) {
            return {...note, favorite: !note.favorite}   
        }

        return note
    })

    saveNotes()
    renderTask()         
}

function deleteNote(id) {
    notes = notes.filter(note => note.id !== id)

    saveNotes()
    renderTask()
}

function editNote(id, text) {
    const myNotesContainer = document.querySelector(".my-notes")

    const note = notes.find(n => n.id === id)
        
    const editTextModal = document.createElement("div")
    editTextModal.classList.add("edit-note-modal", "edit-note-visible")

    const editText = document.createElement("textarea")
    editText.classList.add("edit-note-text")
    editText.value = text
    editText.addEventListener("input", () => {
        errorMsg.style.display = "none"
    })

    const btnSaveEdit = document.createElement("button")
    btnSaveEdit.classList.add("save-edit-btn")
    btnSaveEdit.textContent = "save"

    const btnCancelEdit = document.createElement("button")
    btnCancelEdit.classList.add("cancel-edit-btn")
    btnCancelEdit.textContent = "cancel"

    btnCancelEdit.addEventListener("click", () => {
        editTextModal.classList.remove("edit-note-visible")
        overlayNote.classList.remove("active")
    })

    const errorMsg = document.createElement("span")
    errorMsg.textContent = "A nota não pode ficar vazia..."
    errorMsg.classList.add("edit-error")

    editTextModal.append(editText, btnCancelEdit, btnSaveEdit, errorMsg)

    myNotesContainer.append(editTextModal)

    btnSaveEdit.addEventListener("click", () => {

        const newText = editText.value.trim()

        if(editText.value !== ""){
            note.text = newText
            editTextModal.classList.remove("edit-note-visible")
            overlayNote.classList.remove("active")
            saveNotes()
            renderTask()

        } else {
            errorMsg.style.display = "block"
        }  
    })
}


function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes))
}

function loadNotes() {
    const savedNotes = localStorage.getItem("notes")

    if(savedNotes){
        const parsedNotes = JSON.parse(savedNotes)

        if(Array.isArray(parsedNotes)){
            notes = parsedNotes
        } else {
            notes = []
        }
    }
}

loadNotes()
renderTask()









