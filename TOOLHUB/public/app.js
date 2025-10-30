// Función para registrar un nuevo usuario
function registerUser() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorElement = document.getElementById("register-error");

  // Validar campos
  if (!username || !email || !password) {
    errorElement.innerText = "Por favor complete todos los campos.";
    return;
  }

  // Enviar la solicitud POST al servidor
  fetch("http://localhost:3000/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw err;
        });
      }
      return response.json();
    })
    .then((data) => {
      errorElement.innerText = "";
      alert(data.message || "Registro exitoso!");

      document.getElementById("username").value = "";
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
    })
    .catch((error) => {
      errorElement.innerText =
        error.message || "Error al registrar el usuario.";
    });
}

// Función para iniciar sesión
function loginUser() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const errorElement = document.getElementById("login-error");

  // Validar campos
  if (!email || !password) {
    errorElement.innerText = "Por favor complete todos los campos.";
    return;
  }

  // Enviar la solicitud POST al servidor
  fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw err;
        });
      }
      return response.json();
    })
    .then((data) => {
      if (data.token) {
        // Almacenar token y datos de usuario
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userData", JSON.stringify(data.user));

        // Mostrar página principal
        showMainPage(data.user);
      } else {
        errorElement.innerText = "Credenciales inválidas.";
      }
    })
    .catch((error) => {
      errorElement.innerText = error.message || "Error al iniciar sesión.";
    });
}

// Mostrar página principal
function showMainPage(user) {
  document.getElementById("auth-forms").style.display = "none";
  const mainPage = document.getElementById("main-page");
  mainPage.style.display = "block";

  // Actualizar el mensaje de bienvenida
  const welcomeMessage = document.getElementById("welcome-message");
  welcomeMessage.textContent = `Bienvenido, ${user.username}!`;
}

// Cerrar sesión
document.getElementById("logout-btn").addEventListener("click", () => {
  // Eliminar datos de autenticación
  localStorage.removeItem("authToken");
  localStorage.removeItem("userData");

  // Ocultar página principal y mostrar formularios
  document.getElementById("main-page").style.display = "none";
  document.getElementById("auth-forms").style.display = "flex";

  // Limpiar campos de login
  document.getElementById("login-email").value = "";
  document.getElementById("login-password").value = "";
});

// Verificar autenticación al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("authToken");
  const userData = localStorage.getItem("userData");

  if (token && userData) {
    showMainPage(JSON.parse(userData));
  } else {
    document.getElementById("main-page").style.display = "none";
  }
});
