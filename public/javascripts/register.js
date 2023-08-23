
var registerNextBtn = document.getElementById("register-next-tab-btn")
var registerPrevBtn = document.getElementById("register-prev-btn")
let page1 = document.querySelector(".page-1")

var basicTab = document.querySelector(".basic-tab");
var personalTab = document.querySelector(".personal-tab");

let page2 = document.querySelector(".page-2")

var firstname = document.querySelector(".firstname")
var lastname = document.querySelector(".lastname")
var email = document.querySelector(".email")
var phoneInput = document.getElementById("phoneInput")
var firstname = document.querySelector(".firstname")
var countries = document.querySelector(".countries")
var states = document.querySelector("#stateId")
var password = document.querySelector(".password")
var cpassword = document.querySelector(".cpassword")

var showHidePass = document.querySelector('.showHidePass');
var showHidePassC = document.querySelector('.showHidePassC');

showHidePass.addEventListener('click', (e) => {
  e.preventDefault();
  if (password.type === "password") {
    password.type = "text";
    showHidePass.innerHTML = `<i class="bi bi-eye"></i>`


  } else {
    showHidePass.innerHTML = `<i class="bi bi-eye-slash"></i>`
    password.type = "password";
  }
});

showHidePassC.addEventListener('click', (e) => {
  e.preventDefault();
  if (cpassword.type === "password") {
    showHidePassC.innerHTML = `<i class="bi bi-eye"></i>`
    cpassword.type = "text";
    
  } else {
    showHidePassC.innerHTML = `<i class="bi bi-eye-slash"></i>`
    cpassword.type = "password";

  }
});

function validatePassword() {
  const passwordInput = document.getElementById("password");
  const passwordStrength = document.getElementById("password-strength");
  const matching = document.getElementById("matching");

  const password = passwordInput.value;
  const minLength = 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);

  let strength = "Weak";

  if (password.length >= minLength && hasUppercase && hasLowercase && hasNumber && hasSpecial) {
    strength = "Strong";
    passwordStrength.style.color = "Green"
  }

  passwordStrength.textContent = `Password Strength: ${strength}`;
}

function match(){
  if(password.value !== cpassword.value){
    matching.textContent = "Password not matched"
  }
  else{
    matching.style.display = "none"
  }
}


function validate() {
  var firstname = document.querySelector(".firstname")
  var lastname = document.querySelector(".lastname")
  var email = document.querySelector(".email")
  var phoneInput = document.getElementById("phoneInput")
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("cpassword");

  const inputFields = [firstname, lastname, email, phoneInput, password, confirmPassword];
  inputFields.forEach(field => {
      field.style.border = "";
  });

  let isValid = true;

  if (firstname.value === "") {
    firstname.style.border = "2px solid red";
      isValid = false;
  }

  if (lastname.value === "") {
    lastname.style.border = "2px solid red";
      isValid = false;
  }

  if (email.value === "") {
      email.style.border = "2px solid red";
      isValid = false;
  }

  if (phoneInput.value === "") {
    phoneInput.style.border = "2px solid red";
      isValid = false;
  }
  // if (countries.value === "") {
  //   countries.style.border = "2px solid red";
  //     isValid = false;
  // }
  // if (states.value === "") {
  //   states.style.border = "2px solid red";
  //     isValid = false;
  // }

  if (password.value === "") {
      password.style.border = "2px solid red";
      isValid = false;
  }

  if (confirmPassword.value === "") {
      confirmPassword.style.border = "2px solid red";
      isValid = false;
  }

  if (password.value !== confirmPassword.value) {
      password.style.border = "2px solid red";
      confirmPassword.style.border = "2px solid red";
      alert("Passowrd not matched")
      isValid = false;
  }

  return isValid;
}

registerNextBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  
  if(!validate()) {
    alert("All fields are required")
   }
else{
    page1.style.display = "none"
    page2.style.display = "block"
    personalTab.classList.add("active")
    basicTab.classList.remove("active")
  }
 

})


registerPrevBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  page1.style.display = "block"
  page2.style.display = "none"
  basicTab.classList.add("active")
  personalTab.classList.remove("active")
})

const iti = window.intlTelInput(phoneInput, {
  initialCountry: 'in', 
  separateDialCode: true,
  utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.3/js/utils.js',
  });   

