const Tarea = require('../models/Tarea');

const tareaCtrl = {};

tareaCtrl.mostrarTareas = async (req, res) => {
   try {
      // const usuarioID = req.header('usuarioID');

      // if (!usuarioID) {
      //    return res.status(500).json({ msg: 'No se pueden ver las tareas' })
      // }

      const tareas = await Tarea.find({ usuarioID: req.usuario.id });
      res.status(200).send({ tareas });
   } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un error');
   }
}

tareaCtrl.agregarTarea = async (req, res) => {
   try {
      const { titulo, descripcion } = req.body;

      const tarea = new Tarea({
         titulo,
         descripcion
      });

      // agregar tarea al usuario correspondiente
      tarea.usuarioID = req.usuario.id;

      tarea.save();
      res.status(200).send({ tarea });
   } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un error');
   }
}

tareaCtrl.actualizarTarea = async (req, res) => {
   try {
      const { titulo, descripcion, estado } = req.body;

      const nuevaTarea = {
         _id: req.params.id,
         titulo,
         descripcion,
         estado
      }
      await Tarea.findByIdAndUpdate(req.params.id, nuevaTarea);
      res.status(200).send({ nuevaTarea });
   } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un error');
   }
}

tareaCtrl.eliminarTarea = async (req, res) => {
   await Tarea.findByIdAndRemove(req.params.id);
   res.status(200).send({ msg: 'Tarea eliminada' });
}

module.exports = tareaCtrl;