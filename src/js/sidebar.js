
/* =============== ELEMENTS ================ */

const btnBurgerOpen = document.querySelector(".burger-button.open")
const btnBurgerClose = document.querySelector(".burger-button.close")
const sideBar = document.querySelector(".sidebar")
const overlay = document.querySelector(".overlay")
const sidebarMenu = document.querySelector(".navbar-menu")
const sidebarLinks = document.querySelectorAll(".sidebar-link");
const currentPage = window.location.pathname.split("/").pop();


/* =============== STATE ================ */

sidebarLinks.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
});


/* =============== EVENTS ================ */

btnBurgerOpen.addEventListener("click", () => {
    openSideBar()
})

btnBurgerClose.addEventListener("click", () => {
    closeSideBar()
})

overlay.addEventListener("click", () => {
    closeSideBar()
})


/* =============== FUNCTIONS ================ */

function openSideBar() {
    // btnBurgerOpen.classList.add("open")
    sideBar.classList.add("open")
    overlay.classList.add("open")
}

function closeSideBar() {
    // btnBurgerClose.classList.remove("open")
    sideBar.classList.remove("open")
    overlay.classList.remove("open")
}


