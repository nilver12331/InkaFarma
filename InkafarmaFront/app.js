const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();

/*Estamos utilizando ejs */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuración
app.use(expressLayouts);  //indicamos que la app que vamos a utilizar un layout 
app.set('layout', 'layouts/main'); // Usa views/layout.ejs  'El segundo parametro es el nombre del layout'

app.use(express.static(path.join(__dirname, 'public')));

//Rutas
const ventasRoutes = require('./routes/main');
const adminRoutes = require('./routes/admin');

app.use('/main', ventasRoutes);
app.use('/admin', adminRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});