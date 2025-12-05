// 1. Importar la librería Express
const express = require('express');

// 2. Crear una instancia de la aplicación
const app = express();

// 3. Definir el puerto de escucha
const PORT = 3000;

// 4. Middleware integrado para parsear peticiones JSON
// Permite que Express lea el req.body enviado como JSON
app.use(express.json()); 

// 5. Definición de una ruta básica (Endpoint)
app.get('/', (req, res) => {
    res.status(200).json({
        message: '¡Servidor CAADI operativo y listo para recibir peticiones!'
    });
});

// 6. Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor Express escuchando en http://localhost:${PORT}`);
});