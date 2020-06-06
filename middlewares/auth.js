const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
   const token = req.header('token');

   if (!token) {
      return res.status(401).send({ msg: 'Permiso no válido, no existe token' });
   }

   try {
      const cifrado = jwt.verify(token, process.env.SECRETA);
      req.usuario = cifrado.usuario;
      next();
   } catch (error) {
      console.log(error);
      res.status(400).send({ msg: 'Token no válido' });
   }
}