import mongoose from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'mongoose-bcrypt';  // Usamos mongoose-bcrypt
import dotenv from 'dotenv';

dotenv.config(); 

// Define the User schema using Mongoose
const userSchema = new mongoose.Schema({
  _id: { type: String, required: true, default: () => crypto.randomUUID() },
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true, bcrypt: true }  
  
});

// Habilitar mongoose-bcrypt para el esquema de usuarios
userSchema.plugin(bcrypt);

// Create the User model
const User = mongoose.model('User', userSchema);

export class UserRepository {

  
 

  // Crear un nuevo usuario
  static async create({ username, email, password }) {
    // Validar los datos de entrada
    Validation.username(username);
    Validation.email(email);
    Validation.password(password);
    

    const existingUser = await User.findOne({ username });
    if (existingUser) throw new Error('This username is already taken!');

    // Crear y guardar el nuevo usuario (bcrypt generará el hash automáticamente)
    const user = new User({
      username,
      email,
      password,  // No es necesario hacer el hash manualmente
    });

    await user.save();  // Se generará el hash automáticamente gracias a mongoose-bcrypt

    return user._id;  // Retorna el ID del usuario después de la creación
  }

  // Iniciar sesión
  static async login({ username, password }) {
    // Validar los datos de entrada
    Validation.username(username);
    Validation.email(email);
    Validation.password(password);

    // Buscar al usuario por su nombre de usuario
    const user = await User.findOne({ username });
    if (!user) throw new Error(`User ${username} not found`);

    // Comparar la contraseña proporcionada con la almacenada (bcrypt lo hace automáticamente)
    const isValid = await user.verifyPassword(password);  // verifyPassword es un método agregado por mongoose-bcrypt
    if (!isValid) throw new Error('Invalid password');

    // Retornar la información del usuario sin la contraseña
    const { password: _, ...publicUser } = user.toObject();

    return publicUser;
  }

   // Método para obtener todos los usuarios
  static async findAll() {
    return await User.find(); // Encuentra todos los usuarios
  }
}

// Clase de validación
class Validation {
  static username(username) {
    if (typeof username !== 'string') throw new Error('Username must be a string');
    if (username.length < 3) throw new Error('Username must be at least 3 characters long');
  }

  static password(password) {
    if (typeof password !== 'string') throw new Error('Password must be a string');
    if (password.length < 6) throw new Error('Password must be at least 6 characters long');
  }

  static email(email) {
    if (typeof email !== 'string') throw new Error('Email must be a string');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new Error('Invalid email format');
  }

}
