// src/pages/api/productos.js
import { MongoClient } from 'mongodb';

export async function get() {
  const client = new MongoClient('mongodb://localhost:27017');
  await client.connect();
  const db = client.db('broquelizate');
  const collection = db.collection('productos');
  const productos = await collection.find({}).toArray();

  client.close();

  return {
    body: JSON.stringify(productos),
  };
}
