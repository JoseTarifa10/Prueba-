const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connection = require("./database");
const verifyToken = require("./middleware");

const router = express.Router();

// Registro de usuario
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const [existingUser] = await connection
      .promise()
      .query("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar usuario en la base de datos
    await connection
      .promise()
      .query(
        "INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword]
      );

    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res
      .status(500)
      .json({ message: "Error al registrar el usuario", error: error.message });
  }
});

// Inicio de sesión
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe
    const [results] = await connection
      .promise()
      .query("SELECT * FROM usuarios WHERE email = ?", [email]);

    if (results.length === 0) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const user = results[0];

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    // Crear un token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Inicio de sesión exitoso",
      token,
      user: { username: user.username },
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res
      .status(500)
      .json({ message: "Error al iniciar sesión", error: error.message });
  }
});

// Registrar el uso de una herramienta
router.post("/tools", verifyToken, (req, res) => {
  const { toolName } = req.body;
  const userId = req.userId; // Obtener el ID del usuario desde el token

  if (!toolName) {
    return res
      .status(400)
      .json({ message: "El nombre de la herramienta es requerido" });
  }

  const query =
    "INSERT INTO herramientas (herramienta, fecha_uso, usuario_id) VALUES (?, NOW(), ?)";
  connection.query(query, [toolName, userId], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({
          message: "Error al registrar la herramienta",
          error: err.sqlMessage,
        });
    }
    res.status(201).json({ message: "Herramienta registrada correctamente" });
  });
});

// Save a note (Protected route)
router.post("/notes", verifyToken, (req, res) => {
  const { content } = req.body;
  const userId = req.userId; // Get the user ID from the token

  if (!content) {
    return res
      .status(400)
      .json({ message: "El contenido de la nota es requerido" });
  }

  connection.query(
    "INSERT INTO notes (user_id, content) VALUES (?, ?)",
    [userId, content],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al guardar la nota", error: err.sqlMessage });
      }
      res.status(201).json({
        message: "Nota guardada correctamente",
        noteId: results.insertId,
      });
    }
  );
});

// Get all notes for a user (Protected route)
router.get("/notes", verifyToken, (req, res) => {
  const userId = req.userId; // Get the user ID from the token

  connection.query(
    "SELECT * FROM notes WHERE user_id = ? ORDER BY created_at DESC",
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Error al obtener las notas",
          error: err.sqlMessage,
        });
      }
      res.json(results);
    }
  );
});

// Guardar una tarea (ruta protegida)
router.post("/tasks", verifyToken, (req, res) => {
  const { descripcion, prioridad, fecha_limite } = req.body;
  const userId = req.userId; // Obtener el ID del usuario desde el token

  if (!descripcion || !prioridad || !fecha_limite) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  const query = `
    INSERT INTO tareas (descripcion, prioridad, fecha_limite, usuario_id)
    VALUES (?, ?, ?, ?)
  `;
  connection.query(
    query,
    [descripcion, prioridad, fecha_limite, userId],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({
            message: "Error al guardar la tarea",
            error: err.sqlMessage,
          });
      }
      res
        .status(201)
        .json({
          message: "Tarea guardada correctamente",
          taskId: results.insertId,
        });
    }
  );
});

// Ruta para obtener estadísticas del usuario actual
router.get("/stats", verifyToken, async (req, res) => {
  const userId = req.userId; 

  try {
    const [toolUsage] = await connection
      .promise()
      .query(
        "SELECT herramienta, COUNT(*) AS usageCount FROM herramientas WHERE usuario_id = ? GROUP BY herramienta",
        [userId]
      );
    const [noteCount] = await connection
      .promise()
      .query("SELECT COUNT(*) AS totalNotes FROM notes WHERE user_id = ?", [
        userId,
      ]);
    const [taskCount] = await connection
      .promise()
      .query("SELECT COUNT(*) AS totalTasks FROM tareas WHERE usuario_id = ?", [
        userId,
      ]);

    res.json({
      toolUsage,
      totalNotes: noteCount[0].totalNotes,
      totalTasks: taskCount[0].totalTasks,
    });
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    res
      .status(500)
      .json({ message: "Error al obtener estadísticas", error: error.message });
  }
});

module.exports = router;
