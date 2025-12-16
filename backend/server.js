// ==========================
// Cargar variables de entorno
// ==========================
require("dotenv").config();

// ==========================
// Imports
// ==========================
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

// ==========================
// Inicializar app
// ==========================
const app = express();

// ==========================
// Middlewares globales
// ==========================
app.use(cors());
app.use(express.json());

// ==========================
// Inicializar Supabase
// ==========================
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// (opcional) dejar supabase disponible en req
app.use((req, res, next) => {
  req.supabase = supabase;
  next();
});

// ==========================
// Importar routers
// ==========================
const publicRoutes = require("./src/routes/public_routes/homeAPI"); 
const menuRoutes = require("./src/routes/public_routes/menuAPI");
const sectionRoutes = require("./src/routes/public_routes/sectionBySlugAPI");

const privateRoutes = require("./src/routes/private_routes/private.routes");

// ==========================
// Ruta base de prueba
// ==========================
app.get("/", (req, res) => {
  res.status(200).json({ message: "Servidor CAADI funcionando!" });
});

// ==========================
// Montar rutas
// ==========================

// Rutas públicas
// app.use("/home", publicRoutes);
// app.use("/menu", menuRoutes);
// app.use("/sections", sectionRoutes);

// Rutas privadas (admin)
app.use("/admin", privateRoutes);

// ==========================
// Levantar servidor
// ==========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
