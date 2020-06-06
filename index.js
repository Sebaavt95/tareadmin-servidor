const express = require('express');
const ConnectDB = require('./database');
const cors = require('cors');
require('dotenv').config({ path: 'variables.env' });

// Servidor
const app = express();

// Conectar BD
ConnectDB();

// Configuraciones
const port = process.env.port || 4000;

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas
app.use('/', require('./routes/usuarioRoutes'));
app.use('/', require('./routes/tareaRoutes'));

// Iniciando el servidor...
app.listen(port, '0.0.0.0', () => {
   console.log(`Server on port ${port}`);
});