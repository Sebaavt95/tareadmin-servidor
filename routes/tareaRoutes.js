const { Router } = require('express');
const router = Router();
const { mostrarTareas, agregarTarea, actualizarTarea, eliminarTarea } = require('../controllers/TareaController');
const auth = require('../middlewares/auth');

// Mostrar tareas
router.get('/tareas', auth, mostrarTareas);

// Agregar tarea
router.post('/tareas/nueva-tarea', auth, agregarTarea);

// Actualizar tarea
router.put('/tareas/:id', auth, actualizarTarea);

// Eliminar tarea
router.delete('/tareas/:id', auth, eliminarTarea);

module.exports = router;