const { Router } = require('express');
const router = Router();
const { registrarUsuario, usuarioAutenticado, iniciarSesionUsuario, actualizarDatosUsuario, eliminarUsuario } = require('../controllers/UsuarioController');
const auth = require('../middlewares/auth');

// 
router.get('/', auth, usuarioAutenticado);

// Agregar usuario
router.post('/registrarse', registrarUsuario);

// Iniciar sesión de usuario
router.post('/iniciar-sesion', iniciarSesionUsuario);

// Actualizar datos de usuario
router.put('/usuarios/:id', auth, actualizarDatosUsuario);

// Eliminar usuario
router.delete('/usuarios/:id', auth, eliminarUsuario);

module.exports = router;