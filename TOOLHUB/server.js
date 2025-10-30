const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
const connection = require("./database"); 

const app = express();

// Middleware para servir archivos estáticos
app.use(express.static("public"));


app.use(cors());
app.use(bodyParser.json());


app.use("/api", routes);

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});