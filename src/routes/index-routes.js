import productRoutes from './product-routes.js'; // Importa las rutas de productos

const routes = (app) => {
  app.use('/productos', productRoutes);  // Define la ruta base para productos
};

export default routes;  // Exporta por defecto
