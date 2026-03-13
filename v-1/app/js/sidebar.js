const btnBurgerOpen = document.querySelector(".burger-button.open")
const btnBurgerClose = document.querySelector(".burger-button.close")
const sideBar = document.querySelector(".sidebar")

btnBurgerOpen.addEventListener("click", () => {
    btnBurgerOpen.classList.add("active")
    sideBar.classList.toggle("active")
})

btnBurgerClose.addEventListener("click", () => {
    btnBurgerOpen.classList.remove("active")
    sideBar.classList.remove("active")
})