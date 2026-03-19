
/* =============== ELEMENTS ================ */

const lightIcon = document.querySelector(".fa-sun")
const darkIcon = document.querySelector(".fa-moon")
const themeIcon = document.querySelector(".toggle-theme")
// const sideBar = document.querySelector(".sidebar")

themeIcon.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme")
    lightIcon.classList.toggle("themeChange")
    darkIcon.classList.toggle("themeChange")
})







