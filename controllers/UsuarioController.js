const Usuario = require('../models/Usuario');
const Tarea = require('../models/Tarea');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const usuarioCtrl = {};

usuarioCtrl.registrarUsuario = async (req, res) => {
   const { nombre, email, password } = req.body;

   try {
      // Verificar si existe otro usuario
      const usuario = await Usuario.findOne({ email });
      if (usuario) {
         return res.status(400).send({ msg: 'El usuario ya existe', error: 'userError' });
      }

      // Hashear password
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const nuevoUsuario = new Usuario({
         nombre,
         email,
         password: passwordHash
      });
      nuevoUsuario.save();

      res.status(200).send({ msg: 'Registro exitoso, redirigiendo para iniciar sesión...' });
   } catch (error) {
      console.log(error);
      res.status(400).send('Hubo un error');
   }
}

usuarioCtrl.iniciarSesionUsuario = async (req, res) => {
   const { email, password } = req.body;

   try {
      // Verificar si existe el email
      const usuario = await Usuario.findOne({ email }).select('-fechaAlta');
      if (!usuario) {
         return res.status(400).send({ msg: 'El email ingresado no está registrado', error: 'userError' });
      }

      // Verificar password
      const passwordVerificado = await bcrypt.compare(password, usuario.password);
      if (!passwordVerificado) {
         return res.status(400).send({ msg: 'El password es incorrecto', error: 'passwordError' });
      }

      // Crear JWT
      const payload = {
         usuario: {
            id: usuario.id
         }
      }
      const token = jwt.sign(payload, process.env.SECRETA);
      res.status(200).send({ usuario, token });
   } catch (error) {
      console.log(error);
      res.status(400).send('Hubo un error');
   }
}

usuarioCtrl.usuarioAutenticado = async (req, res) => {
   try {
      const usuario = await Usuario.findById(req.usuario.id).select('-password -fechaAlta');
      res.json({ usuario });
   } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un error');
   }
}

usuarioCtrl.actualizarDatosUsuario = async (req, res) => {
   const { nombre, email, password } = req.body;

   // Verificar si el email está en uso
   const usuario = await Usuario.findOne({ email });
   if (usuario && (String(usuario._id) !== req.params.id)) {
      return res.status(400).send({ msg: 'Otra cuenta ha registrado ese email', error: 'userError' });
   }

   // Hashear password
   const salt = await bcrypt.genSalt(10);
   const passwordHash = await bcrypt.hash(password, salt);

   const nuevosDatos = {
      nombre,
      email,
      password: passwordHash
   };
   await Usuario.findByIdAndUpdate(req.params.id, nuevosDatos);
   res.status(200).send({ msg: 'Tus datos fueron actualizados' });
}

usuarioCtrl.eliminarUsuario = async (req, res) => {
   await Usuario.findByIdAndRemove(req.params.id);
   await Tarea.deleteMany({ usuarioID: req.usuario.id });
   res.status(200).send({ msg: 'Usuario eliminado' });
}

module.exports = usuarioCtrl;