import mongoose from 'mongoose';

// Definir el esquema de la orden
const orderSchema = new mongoose.Schema({
  productos: [
    {
      productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
      cantidad: { type: Number, required: false },
    }
  ],
  total: { type: Number, required: true },
  username: { type: String, required: true },  // Asumiendo que manejas el usuario por nombre o ID de usuario
  direccion_envio: { type: String, required: false },
  estado: { type: String, default: 'pendiente', enum: ['pendiente', 'procesando', 'completada', 'cancelada'] },
  fecha_creacion: { type: Date, default: Date.now },
  fecha_actualizacion: { type: Date, default: Date.now }
});

// Crear el modelo de la orden
const Orden = mongoose.model('Orden', orderSchema);

export class OrderRepository {
  // Método para obtener todas las órdenes, opcionalmente filtradas por estado o usuario
  static async getAllOrders(estado = null, usuario = null) {
    const query = {};
    if (estado) {
      query.estado = new RegExp(`^${estado}$`, 'i');
    }
    if (usuario) {
      query.usuario = usuario;
    }
    return Orden.find(query).populate('productos.productoId'); // Populate para mostrar detalles del producto
  }

  // Método para crear una nueva orden
  static async createOrder(orderData) {
    const nuevaOrden = new Orden(orderData);
    return nuevaOrden.save();
  }

  // Método para actualizar una orden por ID
  static async updateOrderById(id, orderData) {
    return Orden.findByIdAndUpdate(id, { ...orderData, fecha_actualizacion: Date.now() }, { new: true, runValidators: true });
  }

  // Método para eliminar una orden por ID
  static async deleteOrderById(id) {
    return Orden.findByIdAndDelete(id);
  }
}
