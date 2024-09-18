import express from 'express';
import { createProduct, getAllProducts, updateProductById, deleteProductById } from '../repositories/products-repository.js';  // Importar funciones del repositorio

const router = express.Router();

// Ruta para obtener productos, con opción de filtrar por categoría
router.get('/productos', async (req, res) => {
  try {
    const { categoria } = req.query;
    const productos = await getAllProducts(categoria);  // Usar la función del repositorio
    res.json(productos);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Server Error');
  }
});

// Ruta para crear un producto
router.post('/productos', async (req, res) => {
  try {
    const { nombre, imagen, precio, descripcion, categoria } = req.body;
    if (!nombre || !imagen || !precio || !descripcion || !categoria) {
      return res.status(400).send('Faltan campos obligatorios');
    }
    const nuevoProducto = await createProduct(req.body);  // Usar la función del repositorio
    res.status(201).send('Producto creado exitosamente');
  } catch (error) {
    res.status(400).send('Error creando el producto');
  }
});

// Ruta para actualizar un producto por ID
router.put('/productos/:id', async (req, res) => {
  try {
    const productoActualizado = await updateProductById(req.params.id, req.body);  // Usar la función del repositorio
    if (!productoActualizado) {
      return res.status(404).send('Producto no encontrado');
    }
    res.json(productoActualizado);
  } catch (error) {
    console.error('Error actualizando el producto:', error);
    res.status(400).send('Error actualizando el producto');
  }
});

// Ruta para eliminar un producto por ID
router.delete('/productos/:id', async (req, res) => {
  try {
    const productoEliminado = await deleteProductById(req.params.id);  // Usar la función del repositorio
    if (!productoEliminado) {
      return res.status(404).send('Producto no encontrado');
    }
    res.send('Producto eliminado exitosamente');
  } catch (error) {
    console.error('Error eliminando el producto:', error);
    res.status(500).send('Error eliminando el producto');
  }
});

export default router;
