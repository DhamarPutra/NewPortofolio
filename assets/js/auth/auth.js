let users = [];
let dataUser = localStorage.getItem("users")
  ? JSON.parse(localStorage.getItem("users"))
  : [];

async function register() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const hashedPassword = await hashPassword(password);

  let data = {
    username: username,
    email: email,
    password: hashedPassword,
  };

  if (localStorage.getItem("users")) {
    users = JSON.parse(localStorage.getItem("users"));
  }

  users.push(data);

  localStorage.setItem("users", JSON.stringify(users));
  window.location.href = "../pages/login.html";
}

async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const hashedPassword = await hashPassword(password);

  let validationUser = dataUser.find(
    (user) => user.username === username && user.password === hashedPassword
  );

  if (validationUser) {
    alert("Login successful");
    window.location.href = "../pages/dashboard.html";
    localStorage.setItem("isLogin", true);
    return true;
  } else {
    alert("Login failed");
    return false;
  }
}

function cekLogin() {
  const isLogin = localStorage.getItem("isLogin");

  if (!isLogin) {
    window.location.href = "../index.html";
  }
}

function userList(data) {
  const tbody = document.getElementById("userTableBody");
  tbody.innerHTML = "";

  data.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="py-2 px-4 border border-gray-300 text-center">${user.username}</td>
      <td class="py-2 px-4 border border-gray-300 text-center">${user.email}</td>
    `;
    tbody.appendChild(row);
  });
}

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}

function logout() {
  alert("Logout successfully");
  localStorage.removeItem("isLogin");
  window.location.href = "../index.html";
}
