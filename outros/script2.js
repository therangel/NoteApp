
const input = document.getElementById("input");
const btnAdd = document.getElementById("btn");
const list = document.getElementById("task-list");

let tasks = []


btnAdd.addEventListener("click", () => {
    const taskText = input.value.trim()
    if(taskText !== ""){
        addTask(taskText)
        input.value = ""

    } else{
        alert("Digite uma tarefa")
    }

})

function addTask(text) {
    // criei um objeto para armazenar a tarefa e um id para ela.
    const newTask = {
        id: Date.now(),
        text: text,
        done: false
    }

    tasks.push(newTask)
    renderTask()
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id)
    renderTask()
  
}

function taskToggle(id) {
    tasks = tasks.map(task => {
        if(task.id === id) {
            return {...task, done: !task.done}       
        }

        return task
    })

    renderTask()
}

function renderTask() {
    list.innerHTML = ""

    tasks.forEach((task) => {
        const li = document.createElement("li")
        li.classList.add("li")

        const check = document.createElement("input")
        check.type = "checkbox"
        check.classList.add("checkbox-li")
        check.checked = task.done

        const text = document.createElement("p")
        text.textContent = task.text
        text.classList.add("task-text")

        if(task.done){
            text.classList.add("completed")
            li.classList.add("completed")
        }
    
        check.addEventListener("click", () => {
            taskToggle(task.id)
           
        })

        const btnDel = document.createElement("button")
        btnDel.classList.add("delete-btn")
        btnDel.textContent = "delete"

        btnDel.addEventListener("click", () => {
            deleteTask(task.id)
        })

        li.append(check, text, btnDel)
        list.appendChild(li)
    })
}

