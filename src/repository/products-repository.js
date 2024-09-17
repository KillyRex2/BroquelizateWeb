
import mongoose from 'mongoose';

// Definir el esquema y modelo
const broquelSchema = new mongoose.Schema({
  nombre: { type: String, required: true },       // Campo requerido
  imagen: { type: String, required: true },       // Campo requerido
  precio: { type: Number, required: true },       // Campo requerido
  descripcion: { type: String, required: true },  // Campo requerido
  categoria: { type: String, required: true },    // Campo requerido
  fecha_creacion: { type: Date, default: Date.now }
});

export const Producto = mongoose.model('Producto', broquelSchema);
