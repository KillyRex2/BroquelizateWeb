// Importar mongoose
import mongoose from 'mongoose';

// Definir el esquema del producto
const broquelSchema = new mongoose.Schema({
  nombre: { type: String, required: true },       // Campo requerido
  imagen: { type: String, required: true },       // Campo requerido
  precio: { type: Number, required: true },       // Campo requerido
  descripcion: { type: String, required: true },  // Campo requerido
  categoria: { type: String, required: true },    // Campo requerido
  fecha_creacion: { type: Date, default: Date.now }
});

// Crear el modelo del producto
const Producto = mongoose.model('Producto', broquelSchema);

// Función para obtener todos los productos, opcionalmente filtrados por categoría
export const getAllProducts = async (categoria = null) => {
  const query = categoria ? { categoria: new RegExp(`^${categoria}$`, 'i') } : {};
  return Producto.find(query);
};

// Función para crear un nuevo producto
export const createProduct = async (productData) => {
  const nuevoProducto = new Producto(productData);
  return nuevoProducto.save();
};

// Función para actualizar un producto por ID
export const updateProductById = async (id, productData) => {
  return Producto.findByIdAndUpdate(id, productData, { new: true, runValidators: true });
};

// Función para eliminar un producto por ID
export const deleteProductById = async (id) => {
  return Producto.findByIdAndDelete(id);
};
