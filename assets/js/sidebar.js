const btnBurgerOpen = document.querySelector(".burger-button.open")
const btnBurgerClose = document.querySelector(".burger-button.close")
const sideBar = document.querySelector(".sidebar")
const overlay = document.querySelector(".overlay")

btnBurgerOpen.addEventListener("click", () => {
    btnBurgerOpen.classList.add("active")
    sideBar.classList.add("active")
    overlay.classList.add("active")
})

btnBurgerClose.addEventListener("click", () => {
    removeClass(btnBurgerClose, sideBar, overlay)
})

overlay.addEventListener("click", () => {
    removeClass(btnBurgerClose, sideBar, overlay)
})

function removeClass(element, element2, element3) {
    element.classList.remove("active")
    element2.classList.remove("active")
    element3.classList.remove("active")
}