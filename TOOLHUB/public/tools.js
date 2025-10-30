function loadTool(toolName) {
  const toolContent = document.getElementById("tool-content");

  // Registrar el uso de la herramienta en la base de datos
  registerToolUsage(toolName);

  switch (toolName) {
    case "calculator":
      toolContent.innerHTML = `
                <h2>Calculadora</h2>
                <div class="calculator">
                    <div class="calculator-display" id="calc-display">0</div>
                    <div class="calculator-buttons">
                        <button class="calculator-button" onclick="calcInput('7')">7</button>
                        <button class="calculator-button" onclick="calcInput('8')">8</button>
                        <button class="calculator-button" onclick="calcInput('9')">9</button>
                        <button class="calculator-button" onclick="calcOperation('/')">/</button>
                        <button class="calculator-button" onclick="calcInput('4')">4</button>
                        <button class="calculator-button" onclick="calcInput('5')">5</button>
                        <button class="calculator-button" onclick="calcInput('6')">6</button>
                        <button class="calculator-button" onclick="calcOperation('*')">×</button>
                        <button class="calculator-button" onclick="calcInput('1')">1</button>
                        <button class="calculator-button" onclick="calcInput('2')">2</button>
                        <button class="calculator-button" onclick="calcInput('3')">3</button>
                        <button class="calculator-button" onclick="calcOperation('-')">-</button>
                        <button class="calculator-button" onclick="calcInput('0')">0</button>
                        <button class="calculator-button" onclick="calcInput('.')">.</button>
                        <button class="calculator-button" onclick="calculate()">=</button>
                        <button class="calculator-button" onclick="calcOperation('+')">+</button>
                        <button class="calculator-button" style="grid-column: span 4;" onclick="clearDisplay()">Limpiar</button>
                    </div>
                </div>
            `;
      // Reset calculator state
      currentInput = "0";
      previousInput = "";
      operation = null;
      updateDisplay();
      break;

    case "clock":
      toolContent.innerHTML = `
                <h2>Reloj</h2>
                <div class="clock-container">
                    <div id="current-time">${new Date().toLocaleTimeString()}</div>
                    <div id="current-date">${new Date().toLocaleDateString()}</div>
                </div>
                <div class="timer-controls" style="text-align: center; margin-top: 20px;">
                    <button onclick="startTimer()" class="timer-button">Iniciar Temporizador</button>
                    <button onclick="stopTimer()" class="timer-button">Detener</button>
                    <div id="timer-display" style="font-size: 24px; margin: 20px 0;">00:00:00</div>
                </div>
            `;
      updateClock();
      break;

    case "notes":
      toolContent.innerHTML = `
                <h2>Mis Notas</h2>
                <textarea id="notes-textarea" style="width: 100%; height: 200px; margin: 10px 0; padding: 10px; border-radius: 5px; border: 1px solid #ddd;"></textarea>
                <div style="text-align: center;">
                    <button onclick="saveNotes()" style="width: auto; padding: 10px 20px;">Guardar Notas</button>
                </div>
            `;
      loadNotes();
      document.getElementById("notes-textarea").focus();
      break;

    case "converter":
      toolContent.innerHTML = `
                <h2>Conversor de Unidades</h2>
                <div class="converter-form" style="max-width: 400px; margin: 0 auto;">
                    <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 10px; align-items: center; margin-bottom: 20px;">
                        <input type="number" id="converter-value" placeholder="Valor" style="padding: 10px;">
                        <span>de</span>
                        <select id="converter-from" style="padding: 10px;">
                            <option value="km">Kilómetros</option>
                            <option value="m">Metros</option>
                            <option value="cm">Centímetros</option>
                        </select>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 10px; align-items: center; margin-bottom: 20px;">
                        <div></div>
                        <span>a</span>
                        <select id="converter-to" style="padding: 10px;">
                            <option value="m">Metros</option>
                            <option value="km">Kilómetros</option>
                            <option value="cm">Centímetros</option>
                        </select>
                    </div>
                    <div style="text-align: center;">
                        <button onclick="convertUnits()" style="width: auto; padding: 10px 20px;">Convertir</button>
                    </div>
                    <div id="converter-result" style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px;"></div>
                </div>
            `;
      document.getElementById("converter-value").focus();
      break;

    case "dice":
      toolContent.innerHTML = `
                <h2>Generador de Dados</h2>
                <div style="max-width: 300px; margin: 0 auto; text-align: center;">
                    <label for="dice-sides">Número de caras:</label>
                     <input type="number" id="dice-sides" min="2" value="6" style="padding: 10px; margin: 10px 0;">
                     <div>
                         <button onclick="rollDice()" style="padding: 10px 20px;">Lanzar Dado</button>
                     </div>
                     <div id="dice-result" style="margin-top: 20px; font-size: 24px; font-weight: bold;"></div>
                </div>
             `;
      document.getElementById("dice-sides").focus();
      break;

    case "password":
      toolContent.innerHTML = `
                <h2>Generador de Contraseñas Seguras</h2>
                <div style="max-width: 300px; margin: 0 auto; text-align: center;">
                    <label for="password-length">Longitud:</label>
                    <input type="number" id="password-length" value="12" min="4" max="32" style="padding:10px; margin:10px 0;">
                    <div>
                        <button onclick="generatePassword()" style="padding: 10px 20px;">Generar Contraseña</button>
                    </div>
                    <div id="password-result" style="margin-top: 20px; font-size: 24px; font-weight: bold;"></div>
                </div>
            `;
      document.getElementById("password-length").focus();
      break;

    case "weather":
      toolContent.innerHTML = `
                    <div style="display: flex; flex-direction: column; align-items: center; text-align: center; padding: 20px;">
                        <h2>🌤️ Pronóstico del Tiempo</h2>
                        <div id="weather-container" style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
                            <label for="province-select">Selecciona la provincia:</label>
                            <select id="province-select">
                                <option value="01">Álava</option>
                                <option value="02">Albacete</option>
                                <option value="03">Alicante</option>
                                <option value="04">Almería</option>
                                <option value="05">Asturias</option>
                                <option value="06">Ávila</option>
                                <option value="07">Badajoz</option>
                                <option value="08">Barcelona</option>
                                <option value="09">Burgos</option>
                                <option value="10">Cáceres</option>
                                <option value="11">Cádiz</option>
                                <option value="12">Cantabria</option>
                                <option value="13">Castellón</option>
                                <option value="14">Ciudad Real</option>
                                <option value="15">Córdoba</option>
                                <option value="16">Cuenca</option>
                                <option value="17">Girona</option>
                                <option value="18">Granada</option>
                                <option value="19">Guadalajara</option>
                                <option value="20">Gipuzkoa</option>
                                <option value="21">Huelva</option>
                                <option value="22">Huesca</option>
                                <option value="23">Jaén</option>
                                <option value="24">La Rioja</option>
                                <option value="25">Las Palmas</option>
                                <option value="26">León</option>
                                <option value="27">Lleida</option>
                                <option value="28">Madrid</option>
                                <option value="29">Málaga</option>
                                <option value="30">Murcia</option>
                                <option value="31">Navarra</option>
                                <option value="32">Ourense</option>
                                <option value="33">Asturias</option>
                                <option value="34">Palencia</option>
                                <option value="35">Pontevedra</option>
                                <option value="36">Salamanca</option>
                                <option value="37">Segovia</option>
                                <option value="38">Sevilla</option>
                                <option value="39">Soria</option>
                                <option value="40">Tarragona</option>
                                <option value="41">Teruel</option>
                                <option value="42">Toledo</option>
                                <option value="43">Valencia</option>
                                <option value="44">Valladolid</option>
                                <option value="45">Vizcaya</option>
                                <option value="46">Zamora</option>
                                <option value="47">Zaragoza</option>
                            </select>
                            <button onclick="getWeather()">Obtener pronóstico</button>
                            <div id="weather-result" style="margin-top: 20px; display: flex; flex-direction: column; align-items: center; text-align: center;"></div>
                        </div>
                    </div>
                `;
      document.getElementById("province-select").focus();
      break;

    case "qr":
      toolContent.innerHTML = `
                  <div style="display: flex; flex-direction: column; align-items: center; text-align: center; padding: 20px;">
                    <h2>Generador de Código QR</h2>
                      <input type="text" id="qr-input" placeholder="Escribe el texto o URL" style="padding: 8px; width: 80%; max-width: 300px; margin-bottom: 10px;">
                       <button onclick="generateQR()">Generar QR</button>
                  <canvas id="qr-canvas" style="margin-top: 20px;"></canvas>
             </div>
                 `;
      document.getElementById("qr-input").focus();
      break;

    case "hangman-game":
      toolContent.innerHTML = `
                    <div id="hangman-game" style="max-width: 500px; margin: 0 auto; text-align: center;">
                        <h2>Juego del Ahorcado</h2>
                        <div style="margin: 20px 0; font-size: 24px; letter-spacing: 5px;" id="word-display"></div>
                        <div style="margin: 15px 0;">
                            <p>Intentos restantes: <span id="tries" style="font-weight: bold;">6</span></p>
                            <p>Letras usadas: <span id="used-letters" style="font-style: italic;"></span></p>
                        </div>
                        <div style="margin: 20px 0;">
                            <input type="text" id="letter-input" maxlength="1" placeholder="Escribe una letra" 
                                   style="padding: 8px; font-size: 16px; text-align: center; text-transform: uppercase;" />
                            <button onclick="guessLetter()" 
                                    style="padding: 8px 15px; background-color: #4CAF50; color: white; border: none; border-radius: 4px;">
                                Adivinar
                            </button>
                        </div>
                        <div>
                            <button onclick="initHangmanGame()" 
                                    style="padding: 8px 15px; background-color: #2196F3; color: white; border: none; border-radius: 4px;">
                                Nuevo Juego
                            </button>
                        </div>
                        <p id="message" style="margin-top: 20px; min-height: 24px; font-weight: bold;"></p>
                    </div>
                `;
      initHangmanGame();
      break;

    case "task-manager":
      toolContent.innerHTML = `
          <h2 class="task-manager-title">Gestor de Tareas</h2>
          <div class="task-manager-container">
            <div class="task-inputs">
              <input type="text" id="task-name" placeholder="Nombre de la tarea" class="task-input" />
              <input type="date" id="task-date" class="task-input" />
              <select id="task-priority" class="task-input">
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
              <button onclick="addTaskToDatabase()" class="task-button">Añadir Tarea</button>
            </div>
            <div id="task-list" class="task-list">
              <h3>Lista de Tareas</h3>
              <ul id="tasks" class="tasks"></ul>
            </div>
          </div>
        `;
      document.getElementById("task-name").focus(); // Centrar en el campo de entrada de tareas
      loadTasksFromLocalStorage();
      break;

    case "stats":
      toolContent.innerHTML = `
          <h2>📊 Estadísticas</h2>
          <div id="stats-container" style="text-align: center; padding: 20px; background: #f8f9fa; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
            <p style="font-size: 18px; color: #666;">Cargando estadísticas...</p>
          </div>
        `;

      fetch("http://localhost:3000/api/stats", {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("authToken"),
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener las estadísticas");
          }
          return response.json();
        })
        .then((data) => {
          const statsContainer = document.getElementById("stats-container");
          statsContainer.innerHTML = `
              <div style="font-size: 16px; color: #333; line-height: 1.6;">
                <p><strong>📝 Total de notas:</strong> ${data.totalNotes}</p>
                <p><strong>✅ Total de tareas:</strong> ${data.totalTasks}</p>
                <h3 style="margin-top: 20px; font-size: 20px; color: #007bff;">Uso de herramientas:</h3>
                <ul style="list-style: none; padding: 0; margin: 0;">
                  ${data.toolUsage
                    .map(
                      (tool) =>
                        `<li style="margin: 10px 0; padding: 10px; background: #fff; border: 1px solid #ddd; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
                          <strong>${tool.herramienta}:</strong> ${tool.usageCount} usos
                        </li>`
                    )
                    .join("")}
                </ul>
              </div>
            `;
        })
        .catch((error) => {
          console.error("Error:", error);
          document.getElementById("stats-container").innerHTML =
            "<p style='color: red;'>Error al cargar las estadísticas.</p>";
        });
      break;
  }
}

// Registrar el uso de una herramienta
function registerToolUsage(toolName) {
  const token = localStorage.getItem("authToken");

  fetch("http://localhost:3000/api/tools", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ toolName }),
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
      console.log("Uso de herramienta registrado:", data.message);
    })
    .catch((error) => {
      console.error("Error al registrar el uso de la herramienta:", error);
    });
}

// Variables globales para la calculadora
let currentInput = "0";
let previousInput = "";
let operation = null;

// Funciones para la calculadora
function calcInput(num) {
  if (currentInput === "0") {
    currentInput = num;
  } else {
    currentInput += num;
  }
  updateDisplay();
}

function calcOperation(op) {
  if (operation !== null) calculate();
  previousInput = currentInput;
  currentInput = "0";
  operation = op;
}

function calculate() {
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev)) return;

  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operation = null;
  previousInput = "";
  updateDisplay();
}

function clearDisplay() {
  currentInput = "0";
  previousInput = "";
  operation = null;
  updateDisplay();
}

function updateDisplay() {
  const display = document.getElementById("calc-display");
  if (display) {
    display.innerText = currentInput;
  }
}

// Funciones para el reloj
let clockInterval;
let timerInterval;
let timerSeconds = 0;

function updateClock() {
  clearInterval(clockInterval);
  clockInterval = setInterval(() => {
    const now = new Date();
    document.getElementById("current-time").innerText =
      now.toLocaleTimeString();
    document.getElementById("current-date").innerText =
      now.toLocaleDateString();
  }, 1000);
}

// Funciones para el temporizador
function startTimer() {
  clearInterval(timerInterval);
  timerSeconds = 0;
  timerInterval = setInterval(() => {
    timerSeconds++;
    const hours = Math.floor(timerSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((timerSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timerSeconds % 60).toString().padStart(2, "0");
    document.getElementById(
      "timer-display"
    ).innerText = `${hours}:${minutes}:${seconds}`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

// Funciones para el gestor de tareas
async function saveNotes() {
  const notes = document.getElementById("notes-textarea").value;
  const token = localStorage.getItem("authToken");

  try {
    const response = await fetch("http://localhost:3000/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ content: notes }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al guardar la nota");
    }

    // Guardar las notas en localStorage
    localStorage.setItem("notes", notes);

    alert("Notas guardadas correctamente en la base de datos!");
  } catch (error) {
    console.error("Error:", error);
    alert(error.message);
  }
}

function loadNotes() {
  try {
    // Cargar las notas desde localStorage
    const notes = localStorage.getItem("notes");

    if (notes) {
      document.getElementById("notes-textarea").value = notes;
    } else {
      alert("No hay notas guardadas localmente.");
    }
  } catch (error) {
    console.error("Error al cargar las notas:", error);
    alert("Error al cargar las notas desde el almacenamiento local.");
  }
}

// Funciones para el conversor
function convertUnits() {
  const value = parseFloat(document.getElementById("converter-value").value);
  const from = document.getElementById("converter-from").value;
  const to = document.getElementById("converter-to").value;

  if (isNaN(value)) {
    document.getElementById("converter-result").innerHTML =
      '<p style="color: red;">Ingrese un valor válido</p>';
    return;
  }

  let result;

  // Conversión de distancia
  if (from === "km" && to === "m") result = value * 1000;
  else if (from === "km" && to === "cm") result = value * 100000;
  else if (from === "m" && to === "km") result = value / 1000;
  else if (from === "m" && to === "cm") result = value * 100;
  else if (from === "cm" && to === "m") result = value / 100;
  else if (from === "cm" && to === "km") result = value / 100000;
  else result = value; // Misma unidad

  document.getElementById("converter-result").innerHTML = `
        <p><strong>Resultado:</strong> ${value} ${getUnitName(
    from
  )} = ${result} ${getUnitName(to)}</p>
    `;
}

function getUnitName(unit) {
  const units = {
    km: "kilómetros",
    m: "metros",
    cm: "centímetros",
  };
  return units[unit] || unit;
}

// Función para el generador de dados
function rollDice() {
  const sidesInput = document.getElementById("dice-sides");
  const resultDisplay = document.getElementById("dice-result");
  const sides = parseInt(sidesInput.value);

  if (isNaN(sides) || sides < 2) {
    resultDisplay.innerHTML =
      '<p style="color:red;">Ingrese un número válido de caras (mínimo 2).</p>';
    return;
  }

  // Mostrar el GIF y un mensaje de "Lanzando..."
  resultDisplay.innerHTML = `
    <div style="text-align: center;">
      <img src="assets/dice-roll.gif" alt="Rolling dice..." style="width: 100px; height: auto;" />
      <p style="margin-top: 10px;">Lanzando...</p>
    </div>
  `;

  // Simular el tiempo de lanzamiento del dado
  setTimeout(() => {
    const result = Math.floor(Math.random() * sides) + 1;

    // Mostrar el resultado debajo del GIF
    resultDisplay.innerHTML = `
      <div style="text-align: center;">
        <img src="assets/dice-roll.gif" alt="Rolling dice..." style="width: 100px; height: auto;" />
        <p style="margin-top: 10px;">🎲 Resultado: ${result}</p>
      </div>
    `;
  }, 2000); // 2 segundos para mostrar el resultado
}

// Función para el generador de contraseñas seguras
function generatePassword() {
  const length = parseInt(document.getElementById("password-length").value);
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }
  document.getElementById("password-result").innerText = password;
}

// Valores municipios por provincia
const municipiosPorProvincia = {
  "01": "01059", // Vitoria-Gasteiz
  "02": "02003", // Albacete
  "03": "03014", // Alicante
  "04": "04013", // Almería
  "05": "05019", // Ávila
  "06": "06015", // Badajoz
  "07": "07040", // Palma
  "08": "08019", // Barcelona
  "09": "09059", // Burgos
  10: "10103", // Cáceres
  11: "11027", // Cádiz
  12: "12040", // Castellón de la Plana
  13: "13034", // Ciudad Real
  14: "14021", // Córdoba
  15: "15030", // A Coruña
  16: "16078", // Cuenca
  17: "17079", // Girona
  18: "18087", // Granada
  19: "19130", // Guadalajara
  20: "20069", // Donostia / San Sebastián
  21: "21041", // Huelva
  22: "22125", // Huesca
  23: "23050", // Jaén
  24: "24089", // León
  25: "25120", // Lleida
  26: "26089", // Logroño
  27: "27028", // Lugo
  28: "28079", // Madrid
  29: "29067", // Málaga
  30: "30030", // Murcia
  31: "31201", // Pamplona / Iruña
  32: "32054", // Ourense
  33: "33044", // Oviedo
  34: "34120", // Palencia
  35: "35016", // Las Palmas de Gran Canaria
  36: "36038", // Pontevedra
  37: "37274", // Salamanca
  38: "38023", // Santa Cruz de Tenerife
  39: "39075", // Santander
  40: "40194", // Segovia
  41: "41091", // Sevilla
  42: "42173", // Soria
  43: "43148", // Tarragona
  44: "44216", // Teruel
  45: "45168", // Toledo
  46: "46250", // Valencia
  47: "47186", // Valladolid
  48: "48020", // Bilbao
  49: "49275", // Zamora
  50: "50297", // Zaragoza
};

// Función para obtener el clima
function getWeather() {
  // Valores municipios por provincia
  const municipiosPorProvincia = {
    "01": "01059", // Vitoria-Gasteiz
    "02": "02003", // Albacete
    "03": "03014", // Alicante
    "04": "04013", // Almería
    "05": "05019", // Ávila
    "06": "06015", // Badajoz
    "07": "07040", // Palma
    "08": "08019", // Barcelona
    "09": "09059", // Burgos
    10: "10103", // Cáceres
    11: "11027", // Cádiz
    12: "12040", // Castellón de la Plana
    13: "13034", // Ciudad Real
    14: "14021", // Córdoba
    15: "15030", // A Coruña
    16: "16078", // Cuenca
    17: "17079", // Girona
    18: "18087", // Granada
    19: "19130", // Guadalajara
    20: "20069", // Donostia / San Sebastián
    21: "21041", // Huelva
    22: "22125", // Huesca
    23: "23050", // Jaén
    24: "24089", // León
    25: "25120", // Lleida
    26: "26089", // Logroño
    27: "27028", // Lugo
    28: "28079", // Madrid
    29: "29067", // Málaga
    30: "30030", // Murcia
    31: "31201", // Pamplona / Iruña
    32: "32054", // Ourense
    33: "33044", // Oviedo
    34: "34120", // Palencia
    35: "35016", // Las Palmas de Gran Canaria
    36: "36038", // Pontevedra
    37: "37274", // Salamanca
    38: "38023", // Santa Cruz de Tenerife
    39: "39075", // Santander
    40: "40194", // Segovia
    41: "41091", // Sevilla
    42: "42173", // Soria
    43: "43148", // Tarragona
    44: "44216", // Teruel
    45: "45168", // Toledo
    46: "46250", // Valencia
    47: "47186", // Valladolid
    48: "48020", // Bilbao
    49: "49275", // Zamora
    50: "50297", // Zaragoza
  };
  const provinceId = document.getElementById("province-select").value;
  const municipioId = municipiosPorProvincia[provinceId];

  if (!municipioId) {
    document.getElementById("weather-result").innerText =
      "No se encontró un municipio válido para esta provincia.";
    return;
  }

  const url = `https://www.el-tiempo.net/api/json/v2/provincias/${provinceId}/municipios/${municipioId}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("No se pudo obtener la respuesta de la API.");
      }
      return response.json();
    })
    .then((data) => {
      const municipio = data.municipio.NOMBRE;
      const provincia = data.municipio.NOMBRE_PROVINCIA;
      const estadoCielo = data.stateSky.description;
      const temperaturaActual = data.temperatura_actual;
      const temperaturaMaxima = data.temperaturas.max;
      const temperaturaMinima = data.temperaturas.min;
      const humedad = data.humedad;
      const viento = data.viento;

      const weatherInfo = `
            <div style="text-align: center;">
                <p><strong>Clima en ${municipio}, ${provincia}</strong></p>
                <p>${estadoCielo}</p>
                <p>🌡️ Temperatura actual: ${temperaturaActual}°C</p>
                <p>🔺 Máxima: ${temperaturaMaxima}°C</p>
                <p>🔻 Mínima: ${temperaturaMinima}°C</p>
                <p>💧 Humedad: ${humedad}%</p>
                <p>💨 Viento: ${viento} km/h</p>
            </div>
        `;
      document.getElementById("weather-result").innerHTML = weatherInfo;
    })
    .catch((error) => {
      console.error("Error al obtener los datos del clima:", error);
      document.getElementById(
        "weather-result"
      ).innerText = `Error al obtener los datos del clima: ${error.message}`;
    });
}

function generateQR() {
  const input = document.getElementById("qr-input").value;
  const canvas = document.getElementById("qr-canvas");

  if (!input) {
    alert("Por favor, escribe algo para generar el código QR.");
    return;
  }

  const qr = new QRious({
    element: canvas,
    value: input,
    size: 250,
  });
}

// Variables globales para el juego del ahorcado
let hangmanWords = [
  "JAVASCRIPT",
  "HTML",
  "CSS",
  "PROGRAMACION",
  "COMPUTADORA",
  "INTERNET",
  "DESARROLLO",
  "FUNCION",
  "VARIABLE",
];
let selectedWord = "";
let guessedLetters = [];
let remainingTries = 6;
let usedLetters = [];

// Función para inicializar el juego del ahorcado
function initHangmanGame() {
  selectedWord =
    hangmanWords[Math.floor(Math.random() * hangmanWords.length)].toUpperCase();
  guessedLetters = Array(selectedWord.length).fill("_");
  remainingTries = 6;
  usedLetters = [];

  const letterInput = document.getElementById("letter-input");
  if (letterInput) {
    letterInput.disabled = false;
    letterInput.value = "";
    letterInput.focus();
  }

  // Actualizar la interfaz
  updateHangmanDisplay();
}

// Función para actualizar la pantalla del juego
function updateHangmanDisplay() {
  document.getElementById("word-display").textContent =
    guessedLetters.join(" ");
  document.getElementById("tries").textContent = remainingTries;
  document.getElementById("used-letters").textContent = usedLetters.join(", ");
}

// Función para procesar un intento de letra
function guessLetter() {
  const letterInput = document.getElementById("letter-input");
  const letter = letterInput.value.toUpperCase();
  const messageElement = document.getElementById("message");

  // Validar la entrada
  if (!letter || !letter.match(/[A-ZÁÉÍÓÚÑ]/) || letter.length !== 1) {
    messageElement.textContent = "Por favor ingresa una letra válida.";
    messageElement.style.color = "red";
    letterInput.value = "";
    return;
  }

  // Verificar si la letra ya fue usada
  if (usedLetters.includes(letter)) {
    messageElement.textContent = "Ya usaste esta letra. Intenta con otra.";
    messageElement.style.color = "orange";
    letterInput.value = "";
    return;
  }

  // Agregar a letras usadas
  usedLetters.push(letter);
  usedLetters.sort();

  // Verificar si la letra está en la palabra
  if (selectedWord.includes(letter)) {
    // Actualizar letras adivinadas
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === letter) {
        guessedLetters[i] = letter;
      }
    }

    // Verificar si ganó
    if (!guessedLetters.includes("_")) {
      messageElement.textContent = "¡Felicidades! ¡Ganaste!";
      messageElement.style.color = "green";
      letterInput.disabled = true;
    } else {
      messageElement.textContent = "¡Correcto! Sigue adivinando.";
      messageElement.style.color = "green";
    }
  } else {
    // Letra incorrecta
    remainingTries--;

    // Verificar si perdió
    if (remainingTries <= 0) {
      messageElement.textContent = `¡Perdiste! La palabra era: ${selectedWord}`;
      messageElement.style.color = "red";
      letterInput.disabled = true;
      guessedLetters = selectedWord.split("");
      updateHangmanDisplay(); // Mostrar la palabra completa
    } else {
      messageElement.textContent = `Letra incorrecta. Te quedan ${remainingTries} intentos.`;
      messageElement.style.color = "red";
    }
  }

  // Actualizar la pantalla y limpiar el input
  updateHangmanDisplay();
  letterInput.value = "";
}

// Función para añadir una tarea a la base de datos y actualizar la interfaz
async function addTaskToDatabase() {
  const taskName = document.getElementById("task-name").value;
  const taskDate = document.getElementById("task-date").value;
  const taskPriority = document.getElementById("task-priority").value;
  const token = localStorage.getItem("authToken");

  if (!taskName || !taskDate || !taskPriority) {
    alert("Por favor, completa todos los campos.");
    return;
  }

  try {
    // Enviar la tarea al servidor mediante una solicitud POST
    const response = await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        descripcion: taskName,
        prioridad: taskPriority,
        fecha_limite: taskDate,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al guardar la tarea");
    }

    const data = await response.json();
    alert(data.message || "Tarea guardada correctamente");

    // Guardar la tarea en localStorage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ taskName, taskDate, taskPriority });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    const taskList = document.getElementById("tasks");
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
      <span onclick="toggleTaskCompletion(this)">${taskName} - ${taskDate} - ${taskPriority}</span>
      <button onclick="removeTaskFromList(this)">Eliminar</button>
    `;
    taskList.appendChild(taskItem);

    // Limpiar los campos
    document.getElementById("task-name").value = "";
    document.getElementById("task-date").value = "";
    document.getElementById("task-priority").value = "";
  } catch (error) {
    console.error("Error:", error);
    alert(error.message);
  }
}

function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("tasks");

  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
      <span onclick="toggleTaskCompletion(this)">${task.taskName} - ${task.taskDate} - ${task.taskPriority}</span>
      <button onclick="removeTaskFromList(this)">Eliminar</button>
    `;
    taskList.appendChild(taskItem);
  });
}

// Función para alternar el subrayado de una tarea
function toggleTaskCompletion(taskElement) {
  taskElement.classList.toggle("completed");
}

//Función para eliminar una tarea de la lista visible
function removeTaskFromList(button) {
  const taskItem = button.parentElement; // Obtener el elemento
  const taskText = taskItem.querySelector("span").innerText; // Obtener el texto de la tarea

  // Eliminar la tarea del DOM
  taskItem.remove();

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = tasks.filter((task) => {
    const taskString = `${task.taskName} - ${task.taskDate} - ${task.taskPriority}`;
    return taskString !== taskText;
  });
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
