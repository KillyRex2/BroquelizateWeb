import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser'
import cors from 'cors';  
import mongoose from 'mongoose';
import { UserRepository } from './src/repositories/users-repository.js'

// Cargar las variables de entorno
dotenv.config(); 

// Usar las variables de entorno
import './src/enviroments/config.js';  // Asegúrate de que este archivo sea un módulo ES

const port = process.env.PORT || 3000;
const app = express();


// Configurar el middleware de CORS
app.use(cors({
  origin: 'http://localhost:4321',  
  credentials: true 
}));

// Middleware para json
app.use(express.json());
app.use(cookieParser())

app.use((req, res, next) => {
  const token = req.cookies.access_token
  req.session = { user: null }
  try {
    const data = jwt.verify(token, process.env.SECRET_JWT_KEY)
    req.session.user = data
  } catch (err) {}

  next() // -> seguir a la sig ruta o middleware
})


// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/broquelizate')
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch(error => console.error('Error conectándose a MongoDB:', error));

// Definir el esquema y modelo
const broquelSchema = new mongoose.Schema({
  nombre: { type: String, required: true },       
  imagen: { type: String, required: true },       
  precio: { type: Number, required: true },       
  descripcion: { type: String, required: true },  
  categoria: { type: String, required: true },    
  fecha_creacion: { type: Date, default: Date.now }
});

const Producto = mongoose.model('Producto', broquelSchema);

// Endpoints (no hay cambios aquí)
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

// Gestion de usuarios 

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await UserRepository.login({ username, password })
    const token = jwt.sign(
      { id: user._id, username: user.username },
        process.env.SECRET_JWT_KEY,
      {
        expiresIn: '1h'
      })

    // const Refreshtoken = jwt.sign(
    //   { id: user._id, username: user.username },
    //   SECRET_JWT_KEY,
    //   {
    //     expiresIn: '7d'
    //   })

    res
      .cookie('access_token', token, {
        httpOnly: true, // Cookie solo accesible desde el server
        secure: process.env.SECRET_JWT_SEC === 'production', // la cookie solo se puede acceder en https
        sameSite: 'strict', // la cookie solo accesible en el mismo dominio
        maxAge: 1000 * 60 * 60 // la cookie tiene un tiempo de validez de 1 hora 
      })
      .send({ user, token })
  } catch (err) {
    res.status(401).send(err.message)
  }
})

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body

    // Verifica que los datos fueron recibidos
    console.log('Register request body:', req.body)

    console.log({ username, email, password })

    if (!username || !password || !email) {
      return res.status(400).send({ error: 'Username and password are required' })
    }

    try {
      const id = await UserRepository.create({ username, email, password })
      res.send({ id })
    } catch (err) {
      console.error(err) // Para que puedas ver el error exacto en la consola
      res.status(400).send({ error: err.message })
    }
})

app.post('/logout', (req, res) => {
  res
    .clearCookie('access_token')
    .json({ message: 'logout successful' })
})

app.get('/users', async (req, res) => {
  try {
    const usuarios = await UserRepository.findAll() 
    res.json(usuarios);
  } catch (error) {
    console.error('Error obteniendo los usuarios:', error);
    res.status(500).send('Error obteniendo los usuarios');
  }
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
