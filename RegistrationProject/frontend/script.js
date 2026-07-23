const form = document.getElementById("registrationForm");
const statusMessage = document.getElementById("statusMessage");
const fields = [
  "fullName",
  "email",
  "phoneNumber",
  "password",
  "confirmPassword"
];

function setError(fieldId, message) {
  document.getElementById(`${fieldId}Error`).textContent = message;
}

function clearErrors() {
  fields.forEach((fieldId) => setError(fieldId, ""));
  statusMessage.textContent = "";
  statusMessage.className = "status";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phoneNumber) {
  return /^[0-9+()\-\s]{7,15}$/.test(phoneNumber);
}

function validateForm(data) {
  let valid = true;

  if (!data.fullName.trim()) {
    setError("fullName", "Full name is required.");
    valid = false;
  }

  if (!data.email.trim()) {
    setError("email", "Email is required.");
    valid = false;
  } else if (!isValidEmail(data.email)) {
    setError("email", "Enter a valid email address.");
    valid = false;
  }

  if (!data.phoneNumber.trim()) {
    setError("phoneNumber", "Phone number is required.");
    valid = false;
  } else if (!isValidPhone(data.phoneNumber)) {
    setError("phoneNumber", "Enter a valid phone number.");
    valid = false;
  }

  if (!data.password) {
    setError("password", "Password is required.");
    valid = false;
  } else if (data.password.length < 6) {
    setError("password", "Password must be at least 6 characters.");
    valid = false;
  }

  if (!data.confirmPassword) {
    setError("confirmPassword", "Please confirm your password.");
    valid = false;
  } else if (data.password !== data.confirmPassword) {
    setError("confirmPassword", "Passwords do not match.");
    valid = false;
  }

  return valid;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearErrors();

  const data = {
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    phoneNumber: document.getElementById("phoneNumber").value,
    password: document.getElementById("password").value,
    confirmPassword: document.getElementById("confirmPassword").value
  };

  if (!validateForm(data)) {
    statusMessage.textContent = "Please fix the errors above and try again.";
    statusMessage.classList.add("error");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullName: data.fullName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Registration failed.");
    }

    statusMessage.textContent = result.message;
    statusMessage.classList.add("success");
    form.reset();
  } catch (error) {
    statusMessage.textContent = error.message || "Error connecting to server.";
    statusMessage.classList.add("error");
  }
});

fields.forEach((fieldId) => {
  const input = document.getElementById(fieldId);
  input.addEventListener("input", () => {
    document.getElementById(`${fieldId}Error`).textContent = "";
  });
});
