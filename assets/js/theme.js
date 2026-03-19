
/* =============== ELEMENTS ================ */

const lightIcon = document.querySelector(".fa-sun")
const darkIcon = document.querySelector(".fa-moon")
const themeIcon = document.querySelector(".toggle-theme")
// const sideBar = document.querySelector(".sidebar")

const savedTheme = localStorage.getItem("theme")

if (savedTheme === "dark") {
    lightIcon.classList.add("themeChange")
    darkIcon.classList.add("themeChange")
}

themeIcon.addEventListener("click", () => {
    changeTheme()
})

function changeTheme() {
    const isDark = document.documentElement.classList.toggle("dark-theme");

    lightIcon.classList.toggle("themeChange")
    darkIcon.classList.toggle("themeChange")

    localStorage.setItem("theme", isDark ? "dark" : "light")
}








