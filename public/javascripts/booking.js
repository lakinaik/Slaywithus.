
var currentDate = new Date();
var year = currentDate.getFullYear();
var month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
var day = currentDate.getDate().toString().padStart(2, '0');
var maxDate = year + '-' + month + '-' + day;

document.getElementById('dob').setAttribute('max', maxDate);

// ==============booking=================
let date = new Date(); // Get the current date
let dateWithoutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate()); // Remove time component
let prevBtn = document.querySelector(".prev-btn");
let nextBtn = document.querySelector(".next-btn");
let dayContainer = document.querySelector(".day-container");
const monthYear = document.getElementById('monthYear');
let months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

function updateCalendar(targetMonth, targetYear) {
  const firstDay = new Date(targetYear, targetMonth, 1);
  const daysInMonth = new Date(targetYear, targetMonth + 1, 0).getDate();
  const startDay = firstDay.getDay();

  monthYear.textContent = `${months[targetMonth]} ${targetYear}`;
  dayContainer.innerHTML = '';

  // Calculate the date for the first day of the previous month
  const prevMonthLastDay = new Date(targetYear, targetMonth, 0);
  const daysInPrevMonth = prevMonthLastDay.getDate();
  const prevMonthFirstDay = new Date(targetYear, targetMonth - 1, daysInPrevMonth - startDay + 1);

  for (let i = 0; i < startDay; i++) {
    const emptyDayElement = document.createElement('div');
    emptyDayElement.classList.add('calendar-day', 'empty', 'prev-day', 'disabled'); // Add prev-day class and disable previous month's dates
    emptyDayElement.textContent = prevMonthFirstDay.getDate() + i; // Display the previous month's dates
    dayContainer.appendChild(emptyDayElement);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement('div');
    const dayDate = new Date(targetYear, targetMonth, day); // Create a Date object for the day
    dayElement.dataset.date = dayDate.toISOString(); // Store the date as ISO string
    dayElement.textContent = day;
    
    if (dayDate < dateWithoutTime) { // Compare without time component
      dayElement.classList.add('disabled', 'prev-day'); // Disable past dates and add prev-day class
    }
    
    dayElement.classList.add('calendar-day');
    dayContainer.appendChild(dayElement);
  }

  const calendarDays = document.querySelectorAll('.calendar-day');

  calendarDays.forEach(day => {
    const dayDate = new Date(day.dataset.date);

    if (dayDate < dateWithoutTime) {
      day.classList.add('disabled', 'prev-day');
    }

    day.addEventListener('click', () => {
      if (!day.classList.contains('disabled')) {
        calendarDays.forEach(d => d.classList.remove('active'));
        day.classList.add('active');
      }
    });
  });
}

prevBtn.addEventListener('click', () => {
  if (currentMonth === 0) {
    return; // Prevent going back from January
  } else {
    currentMonth--;
  }
  updateCalendar(currentMonth, currentYear);
});

nextBtn.addEventListener('click', () => {
  if (currentMonth === 11) {
    currentMonth = 0;
    currentYear++;
  } else {
    currentMonth++;
  }
  updateCalendar(currentMonth, currentYear);
});

updateCalendar(currentMonth, currentYear);


// services
document.addEventListener("DOMContentLoaded", () => {
  let services = document.querySelectorAll(".service");
  services.forEach((service) => {
    service.addEventListener("click", () => {
      service.classList.add("active");

      let parentOfService = service.parentElement;

      let child = parentOfService.children;

      for (let i = 0; i < child.length; i++) {
        if (child[i] !== service) {
          child[i].classList.remove("active");
        }
      }
    });
  });
});



// ===============select time=============

var selectedTime;
// Get all the time slots
const timeSlots = document.querySelectorAll('.times');

// Add click event listener to each time slot
timeSlots.forEach(slot => {
  slot.addEventListener('click', () => {
    let currentTime = new Date();
    // const selectedTime = new Date(slot.querySelector('span').innerText.split('-')[0].trim());
     selectedTime = slot.querySelector('span').innerHTML;

    if (selectedTime < currentTime) {
      alert('Please select a time slot that is not in the past.');
      return;
    }

    // Remove active class from all time slots
    timeSlots.forEach(slot => {
      slot.classList.remove('active');
    });

    // Add active class to the clicked time slot
    slot.classList.add('active');
 
  });
});

// ===============Getting service data============

var serviceName;
var duration;
var price;
var selectedDate;
var selectedTime;

var firstName, lastName, Email, Phone, Note;

//Service data
 function content() {
  const serviceItems = document.querySelectorAll(".service");
  const Days = document.querySelectorAll(".calendar-day");
  // debugger
  serviceItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      serviceName = item.querySelector(".service-name").textContent;
      duration = item.querySelector(".duration").textContent;
      price = item.querySelector(".price").textContent;
    });
  });

  //getting the particular date
  Days.forEach((day) => {
    day.addEventListener("click", () => {
      selectedDate = day.innerHTML;
    });
  });

  // getting the selected time
  const allTimes = document.querySelectorAll(".times span");

  allTimes.forEach((time) => {
    time.addEventListener("click", () => {
      selectedTime = time.innerHTML;
    });
  });
}



content();


var checkedValues = [];

  function saveService() {
    $(".customer-name").html(document.getElementById("fname").value+ " "+ document.getElementById("lname").value)
   $(".selected-service").html(serviceName)
   $(".selected-date-time").html(selectedDate +" "+ $("#monthYear").text()+", "+ selectedTime)
   
var garmentsColorRadios = $("input[name=garmentscolor]:checked");


garmentsColorRadios.each(function() {
    checkedValues.push($(this).val());
});


    $.ajax({
      url: "/booking",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        serviceName: serviceName, 
        duration: duration,
        price: price,
        selectedDate: selectedDate, 
        selectedTime: selectedTime,
        firstName: document.getElementById("fname").value,
        lastName: document.getElementById("lname").value,
        Email: document.getElementById("email").value,
        Phone: document.getElementById("phoneInput").value,
        Country : $("#countryId").val(),
        State : $("#stateId").val(),
        Note: document.getElementById("note").value,
        DOB : $("#dob").val(),
        Occupation : $("#occupation").val(),
        Garments: checkedValues,
        BodyBuilt: $("#bodybuilt").val(),
        Complexion: $("#complexion").val(),
        sociallink: $("#sociallink").val(),
        favoritecloset : $("#favoritecloset").val(),
        bookinMessage: $("#bookinMessage").val(),


      }),
      success: function (response) {
      },
    });
  }


// =============
let tabLink = document.querySelectorAll(".tab-link");
let resTabLink = document.querySelectorAll(".res-tab-link");

const steps = document.querySelectorAll(".step");

let currentStep = 0;

function showStep(stepIndex) {
  steps.forEach((step, index) => {
    step.style.display = index === stepIndex ? "block" : "none";
  });
  currentStep = stepIndex;
}

function updateTabClasses(stepIndex) {
  tabLink.forEach((tab, index) => {
    if (index === stepIndex) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });
  resTabLink.forEach((tab, index) => {
    if (index === stepIndex) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });
}

document.getElementById("nextStep1").addEventListener("click", (e) => {
  e.preventDefault();
  // validate
  if (serviceName == undefined || duration == undefined || price == undefined) {
    alert("Select a service");
  } else {
    showStep(1);
    updateTabClasses(1);
  }
});
document.getElementById("nextStep2").addEventListener("click", () => {
  // validate
  if (selectedDate == undefined) {
    alert("Select date");
  } else if (selectedTime == undefined) {
    alert("Select time");
  } else {
    showStep(2);
    updateTabClasses(2);
  }
});

document.getElementById("nextStep3").addEventListener("click", () => {

// Get user input values
firstName = document.getElementById("fname").value.trim();
lastName = document.getElementById("lname").value.trim();
Email = document.getElementById("email").value.trim();
Phone = document.getElementById("phoneInput").value.trim();
Country = document.getElementById("countryId").value;
State = document.getElementById("stateId").value;
Note = document.getElementById("note").value.trim();

// Perform validation
if (firstName === "" || lastName === "" || Email === "" || Phone === "" || Country === "" || State === "") {
  alert("All fields are required");
} else if (!isValidEmail(Email)) {
  alert("Invalid email address");
} else if (!isValidPhone(Phone)) {
  alert("Invalid phone number");
} else {
  showStep(3);
  updateTabClasses(3);
}
});
document.getElementById("nextStep4").addEventListener("click", (e) => {
  e.preventDefault();

  // Get values from input fields
  const DOB = $("#DOB").val();
  const Occupation = $("#occupation").val();
  const GarmentsColour = $("input[name=garmentscolor]").val();
  const BodyBuilt = $("#bodybuilt").val();
  const Complexion = $("#complexion").val();
  const social = $("#sociallink").val();
  const profileimage = $("#profileimage").val();
  const favoritecloset = $("#favoritecloset").val();

  // Check if all fields are filled
  // if (DOB && Occupation && BodyBuilt && Complexion && social && profileimage && favoritecloset) {
    // If all fields are filled, proceed to next step
    showStep(4);
    updateTabClasses(4);
  // } else {
    // If not all fields are filled, show an alert
    // alert("Please fill in all fields before proceeding.");
  // }
});

document.getElementById("nextStep5").addEventListener("click", (e) => {
  e.preventDefault();
  showStep(5)
  updateTabClasses(5);
});
document.getElementById("nextStep6").addEventListener("click", (e) => {
  e.preventDefault();
  alert("booking successful");
  window.location.pathname = "/";
});


document.getElementById("prevStep2").addEventListener("click", (e) => {
  e.preventDefault();
  showStep(currentStep - 1);
  updateTabClasses(0);

});


document.getElementById("prevStep3").addEventListener("click", () => {
  showStep(currentStep - 1);
  updateTabClasses(1);

});
document.getElementById("prevStep4").addEventListener("click", () => {
  showStep(currentStep - 1);
  updateTabClasses(2);

});



document.getElementById("prevStep5").addEventListener("click", () => {

  showStep(currentStep - 1);
  updateTabClasses(3);

});
document.getElementById("prevStep6").addEventListener("click", () => {

  showStep(currentStep - 1);
  updateTabClasses(4);

});


// Email validation function
function isValidEmail(email) {
  // Use a regular expression for basic email format validation
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

// Phone validation function
function isValidPhone(phone) {
  // Use a regular expression for basic phone number format validation
  const phonePattern = /^[0-9]{10}$/; // Assuming 10-digit phone numbers
  return phonePattern.test(phone);
}
// Show the initial step
showStep(0);

function bookingConfirmed(){

$.ajax({
  url: "/sentMail",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        serviceName: serviceName, 
        duration: duration,
        price: price,
        selectedDate: selectedDate, 
        selectedTime: selectedTime,
        firstName: document.getElementById("fname").value,
        lastName: document.getElementById("lname").value,
        Email: document.getElementById("email").value,
      })
})
}


// validation for check boxes


