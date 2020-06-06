const mongoose = require('mongoose');

const TareaSchema = new mongoose.Schema({
   titulo: {
      type: String,
      required: true
   },
   descripcion: {
      type: String
   },
   estado: {
      type: Boolean,
      default: false
   },
   usuarioID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario'
   }
});

module.exports = mongoose.model('Tarea', TareaSchema);