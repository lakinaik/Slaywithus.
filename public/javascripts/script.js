const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll('.navlink a');
    
navLinks.forEach(link => {
    let linkpath = link.getAttribute('href')
    if(linkpath == currentPath){
        link.parentElement.classList.add("active")
    }
    else{
        link.parentElement.classList.remove("active")

    }
});



// ==========sticky navbar==========
let navbar = document.querySelector(".navbar");
window.addEventListener('scroll',()=>{
    if(window.scrollTo > 10){
        navbar.classList.toggle("open")
    }
})

let menu_icon = document.getElementById("menu-icon");
let overlay = document.querySelector(".overlay");
let sidebar = document.querySelector(".sidebar");

menu_icon.addEventListener('click',()=>{
    overlay.style.display = "block";
    sidebar.classList.add("open");
})
overlay.addEventListener('click',()=>{
    sidebar.classList.remove("open");
    overlay.style.display = "none";
})

// =======sidebar-Dropdwon==========
let sidebar_dropdown = document.querySelector(".side-drop-down");
let side_dropdown_btn = document.querySelector(".side-drop-down-btn");
side_dropdown_btn.addEventListener('click',()=>{
    sidebar_dropdown.classList.toggle("open")
})


// ============search box=============

let searchbtn = document.getElementById("search");
let searchBox = document.querySelector(".search-box");
searchbtn.addEventListener('click',(e)=>{
    e.preventDefault
    searchBox.classList.toggle("open");
})
// ============Dark Mode ==============
 let body = document.querySelector("body");
 let mode  = document.querySelector(".mode");
 mode.addEventListener('click',()=>{
    body.classList.toggle("darkMode");
    if(body.classList.contains("darkMode")){
        mode.innerHTML = `<i class="bi bi-brightness-high"></i>`
    }
    else{
        mode.innerHTML = `<i class="bi bi-moon"></i>`
    }
 })



//  =======scroll up ============

let scrollUp = document.querySelector(".scroll-up");

window.addEventListener('scroll', checkHeight);

function checkHeight(){
if(window.scrollY > 400){
    scrollUp.style.display = "block"
}
else{
    scrollUp.style.display = "none"
}
}

scrollUp.addEventListener('click', ()=>{
    window.scrollTo({
        top : 0,
        behavior : "smooth"
    })
})
// // profile
// function toggldClass() {
//     document.querySelector(".profile").classList.toggle("active")
// }
// document.querySelector(".profile-tab").addEventListener("click", toggldClass)
// document.querySelector(".profile-close-btn").addEventListener("click", toggldClass)
// document.querySelector(".cancel").addEventListener("click", toggldClass)