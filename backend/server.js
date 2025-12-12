//Cargar variables de entorno
require('dotenv').config();

// Importar express y supabase-js
const express = require('express');
const { createClient } = require('@supabase/supabase-js');

//Inicializar express
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

// Inicializar Supabase (USA service_role_key)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

//Ruta de prueba
app.get("/", (req, res) => {
  res.status(200).json({ message: "Servidor CAADI funcionando!" });
});

// Levantar servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
