// script.js

// Function to create the form and append it to the document
function createRegisterForm() {
  // Create form container
  const container = document.createElement("div");
  container.classList.add("container");

  // Create heading
  const heading = document.createElement("h1");
  heading.textContent = "Create Account";
  container.appendChild(heading);

  // Create form element
  const form = document.createElement("form");
  form.id = "registerForm";

  // Username Input
  const usernameLabel = document.createElement("label");
  usernameLabel.setAttribute("for", "username");
  usernameLabel.textContent = "Username:";
  form.appendChild(usernameLabel);

  const usernameInput = document.createElement("input");
  usernameInput.type = "text";
  usernameInput.id = "username";
  usernameInput.name = "username";
  usernameInput.required = true;
  form.appendChild(usernameInput);

  // Email Input
  const emailLabel = document.createElement("label");
  emailLabel.setAttribute("for", "email");
  emailLabel.textContent = "Email:";
  form.appendChild(emailLabel);

  const emailInput = document.createElement("input");
  emailInput.type = "email";
  emailInput.id = "email";
  emailInput.name = "email";
  emailInput.required = true;
  form.appendChild(emailInput);

  // Password Input
  const passwordLabel = document.createElement("label");
  passwordLabel.setAttribute("for", "password");
  passwordLabel.textContent = "Password:";
  form.appendChild(passwordLabel);

  const passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.id = "password";
  passwordInput.name = "password";
  passwordInput.required = true;
  form.appendChild(passwordInput);

  // Error message container
  const errorMessage = document.createElement("p");
  errorMessage.id = "error-message";
  form.appendChild(errorMessage);

  // Submit button
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Register";
  form.appendChild(submitButton);

  // Append form to container
  container.appendChild(form);

  // Append container to body
  document.body.appendChild(container);

  // Add form submission event
  form.addEventListener("submit", validateForm);
}

// Function to validate the form
function validateForm(event) {
  event.preventDefault(); // Prevent form submission

  // Get form values
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Clear previous error message
  const errorMessage = document.getElementById("error-message");
  errorMessage.textContent = "";

  // Validate inputs
  if (!username || !email || !password) {
    errorMessage.textContent = "All fields are required!";
    return;
  }

  // Email pattern (basic check)
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(email)) {
    errorMessage.textContent = "Please enter a valid email address!";
    return;
  }

  // Password length check
  if (password.length < 6) {
    errorMessage.textContent = "Password must be at least 6 characters!";
    return;
  }

  // If all validations pass
  alert("Account registered successfully!");

  // Log the form data for demonstration purposes
  console.log("Username:", username);
  console.log("Email:", email);
  console.log("Password:", password);
}

// Call the function to create the form on page load
window.onload = createRegisterForm;
