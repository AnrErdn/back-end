const loginDataArray = [
  { username: "Anar-Erdene", email: "anar@example.com", password: "Anar-Erdene123" }
];

function getSignUpData(event) {
  event.preventDefault();


  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const errorMessage = document.getElementById("errorMessage");

  errorMessage.textContent = "";
  errorMessage.classList.remove("text-green-500");
  errorMessage.classList.add("text-red-500");

  if (!username || !email || !password || !confirmPassword) {
    errorMessage.textContent = "Please fill in all fields.";
    return;
  }

  const userExists = loginDataArray.some(data => data.username === username || data.email === email);
  if (userExists) {
    errorMessage.textContent = "Username or email already exists.";
    return;
  }

  if (password !== confirmPassword) {
    errorMessage.textContent = "Passwords do not match.";
    return;
  }

  loginDataArray.push({ username, email, password });

  errorMessage.textContent = "Sign up successful!";
  errorMessage.classList.remove("text-red-500");
  errorMessage.classList.add("text-green-500");
  console.log("New user added:", { username, email, password });

  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("confirmPassword").value = "";
}
