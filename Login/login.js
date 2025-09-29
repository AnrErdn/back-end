const loginDataArray = [
  { username: "Anar-Erdene", password: "Anar-Erdene123" },
];

function getLoginData(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("errorMessage");
    
  errorMessage.textContent = "";

  if (!username || !password) {
    alert("Please enter both username and password.");
    return;
  }

  const user = loginDataArray.find(data => data.username === username);

  if (!user) {
    errorMessage.textContent = "Username does not exist.";
  } else if (user.password !== password) {
    errorMessage.textContent = "Password is incorrect.";
  } else {
    errorMessage.textContent = "Login successful!";
    errorMessage.classList.add("text-green-500");
    errorMessage.classList.remove("text-red-500");
    console.log("Login successful for:", username);
  }

  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
}
