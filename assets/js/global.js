
/* =============== ELEMENTS ================ */

const darkBtn = document.querySelector(".dark-btn")
const lightBtn = document.querySelector(".light-btn")
const main = document.querySelector(".main")
// const sideBar = document.querySelector(".sidebar")


darkBtn.addEventListener("click", () => {
   ligthTheme()
})

lightBtn.addEventListener("click", () => {
   darkTheme()
})

function ligthTheme() {
    darkBtn.classList.add("hidden") 
    lightBtn.classList.add("visible") 
    main.classList.add("light")
    sideBar.classList.add("light")
}

function darkTheme() {
    darkBtn.classList.remove("hidden") 
    lightBtn.classList.remove("visible") 
    main.classList.remove("light")
    sideBar.classList.remove("light")
}






