const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const indexRouter = require('./routes/index');

/*Estamos utilizando ejs */
app.set('view engine', 'ejs');



app.set('views', path.join(__dirname, 'views'));


app.use(expressLayouts);  //indicamos que la app que vamos a utilizar un layout 
app.set('layout', 'layout'); // Usa views/layout.ejs  'El segundo parametro es el nombre del layout'

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});