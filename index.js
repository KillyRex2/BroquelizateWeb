import express from 'express';
import cors from 'cors';  // Importa el paquete cors
import mongoose from 'mongoose';

const app = express();
const port = 3000;

// Configura el middleware de CORS
app.use(cors({
  origin: 'http://localhost:4321'  
}));

// Middleware para json
app.use(express.json());

// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/broquelizate')
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch(error => console.error('Error conectándose a MongoDB:', error));

// Definir el esquema y modelo
const broquelSchema = new mongoose.Schema({
  nombre: { type: String, required: true },       // Campo requerido
  imagen: { type: String, required: true },       // Campo requerido
  precio: { type: Number, required: true },       // Campo requerido
  descripcion: { type: String, required: true },  // Campo requerido
  categoria: { type: String, required: true },    // Campo requerido
  fecha_creacion: { type: Date, default: Date.now }
});

const Producto = mongoose.model('Producto', broquelSchema);

// Endpoint para obtener los productos
// app.get('/productos', async (req, res) => {
//   try {
//     const productos = await Producto.find();
//     res.json(productos);
//   } catch (error) {
//     res.status(500).send('Error obteniendo los productos');
//   }
// });

// Endpoint para crear un nuevo producto
app.post('/productos', async (req, res) => {
  try {
    const { nombre, imagen, precio, descripcion, categoria } = req.body;

    // Verificar que todos los campos requeridos estén presentes
    if (!nombre || !imagen || !precio || !descripcion || !categoria) {
      return res.status(400).send('Faltan campos obligatorios');
    }

    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();
    res.status(201).send('Producto creado exitosamente');
  } catch (error) {
    res.status(400).send('Error creando el producto');
  }
});

// Endpoint para actualizar un producto por su ID
app.put('/productos/:id', async (req, res) => {
  try {
    const productoActualizado = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }  // `new: true` devuelve el documento actualizado, `runValidators` asegura que las validaciones de Mongoose se ejecuten
    );
    if (!productoActualizado) {
      return res.status(404).send('Producto no encontrado');
    }
    res.json(productoActualizado);
  } catch (error) {
    console.error('Error actualizando el producto:', error);
    res.status(400).send('Error actualizando el producto');
  }
});

// Endpoint para eliminar un producto por su ID
app.delete('/productos/:id', async (req, res) => {
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!productoEliminado) {
      return res.status(404).send('Producto no encontrado');
    }
    res.send('Producto eliminado exitosamente');
  } catch (error) {
    console.error('Error eliminando el producto:', error);
    res.status(500).send('Error eliminando el producto');
  }
});

app.get('/productos', async (req, res) => {
  try {
    const { categoria } = req.query;

    // Log the received category for debugging
    console.log('Category received:', categoria);

    // Ajuste aquí: Usa el modelo "Producto"
    const query = categoria ? { categoria: new RegExp(`^${categoria}$`, 'i') } : {};

    const productos = await Producto.find(query);

    // Log the filtered products for debugging
    console.log('Filtered products:', productos);

    res.json(productos);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Server Error');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
