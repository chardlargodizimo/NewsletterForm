// Selecting DOM elements
const main = document.querySelector(".newsletter");
const form = document.querySelector(".sign-up");
const submittedEmail = document.getElementById("submitted-email");
const successMessage = document.querySelector(".success");
const dismiss = document.querySelector('[data-type="dismiss"]');
const error = document.querySelector(".error");
const email = form.querySelector(".sign-up__eadd");
const showValidIcon = form.querySelector(".valid-email-icon");

// Regular expression for validating email format
const validEmail = /^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9-]+)\.([a-zA-Z]{2,})(?:\.[a-zA-Z]{2,}){0,1}$/;

// Function to toggle between main and success pages
function switchPage() {
    main.classList.toggle("hide");
    successMessage.classList.toggle("hide");
}

// Function to update success message with the submitted email
function updateSuccessMessage(emailInput) {
    submittedEmail.textContent = emailInput;
} 

// Function to add error message and hide valid icon
function addErrorMsg() {
    error.classList.remove("hide");
    showValidIcon.classList.add("hide");
    email.setAttribute('data-type', "empty");
}

// // Function to remove error message and show valid icon
function removeErrorMsg() {
    error.classList.add("hide");
    showValidIcon.classList.remove("hide");
    email.removeAttribute('data-type', "empty");
}

// Function to handle input validation on each keystroke
function validation() {
    const emailInput = email.value.trim();
    emailInput.match(validEmail) 
        ? removeErrorMsg() 
        : addErrorMsg();
}

// Function to handle empty email on submission
function handleEmptyEmail() {
    email.focus();
}

// Event listener for input events on the email field
email.addEventListener("input", validation);

// Event listener for form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = email.value.trim();
    emailInput.match(validEmail)
        ? (updateSuccessMessage(emailInput), switchPage())
        : (handleEmptyEmail(), addErrorMsg());
});

// Event listener for dismiss button
dismiss.addEventListener("click", () => {
    form.reset();
    switchPage();
    updateSuccessMessage("");
    removeErrorMsg();
    showValidIcon.classList.add("hide");
});