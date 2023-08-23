// ===========popUp modal=============

let popUp = document.querySelector(".popUp-wrapper");
let popUpCloseBtn = document.querySelector(".newsLatter-close-btn");
function showModal(){
    setTimeout(() => {
        popUp.style.display = "flex" 
    }, 2000);
}

window.addEventListener('load',showModal)
popUpCloseBtn.addEventListener('click',()=>{
    popUp.style.display = "none" 

})