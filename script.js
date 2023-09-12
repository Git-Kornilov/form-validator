"use strict";

// DOM elements
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Error message
const showError = function (input, message) {
  input.parentElement.className = "form-control error";

  input.parentElement.querySelector("small").innerText = message;
};

// Success message
const showSuccess = function (input) {
  input.parentElement.className = "form-control success";
};

// Check email with regex
const checkEmail = function (input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(String(input.value.trim()).toLocaleLowerCase()))
    showSuccess(input);
  else showError(input, `Email is not valid`);
};

// Field name from ID
const getFieldName = (input) => input.id[0].toUpperCase() + input.id.slice(1);

// Check required all fields
const checkRequired = function (inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === "")
      showError(input, `${getFieldName(input)} is required`);
    else showSuccess(input);
  });
};

// Check input length
const checkLength = (input, min, max) => {
  if (input.value.length < min)
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  else if (input.value.length > max)
    showError(input, `${getFieldName(input)} must be less ${max} characters`);
  else showSuccess(input);
};

// Check passwords match
const checkPasswordsMatch = function (input1, input2) {
  if (input1.value !== input2.value) showError(input2, "Password do not match");
};

// Run check function
const runCheckFunction = () => {
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
};

// Submit EventListener
form.addEventListener("submit", (e) => {
  e.preventDefault();

  runCheckFunction();
});
