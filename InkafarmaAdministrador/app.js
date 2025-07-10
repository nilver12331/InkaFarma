const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

// Configuraciones
app.set('view engine', 'ejs');

app.set('views', __dirname + '/views');
app.set('layout', 'layout'); // nombre sin .ejs

// Middlewares
app.use(expressLayouts);
app.use(express.static(__dirname + '/public'));

// Rutas
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Servidor en puerto 3001
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});