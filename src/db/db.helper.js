const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/broquelizate')
  .then(() => console.log('Conexión a MongoDB exitosa'))
  .catch(error => console.error('Error conectándose a MongoDB:', error));

const broquelSchema = new mongoose.Schema({
  nombre: String,
  imagen: String,
  precio: Number,
  descripcion: String,
  categoria: String,
  fecha_creacion: { type: Date, default: Date.now }
});

const Producto = mongoose.model('Producto', broquelSchema);

const lunaBisel = new Producto({
  nombre: "Cadena luna bisel",
  imagen: "https://firebasestorage.googleapis.com/v0/b/broquelizate-8d060.appspot.com/o/Imagenes-productos%2FOro10k%2Fcadena-luna-bisel.webp?alt=media&token=c1194c98-4a85-4ded-86f6-64e6794bfbeb", 
  precio: 530.00

});

lunaBisel.save()
  .then(() => console.log('Producto guardado'))
  .catch(error => console.error('Error guardando el producto:', error));
