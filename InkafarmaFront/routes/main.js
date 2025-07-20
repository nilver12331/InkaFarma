// routes/main.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('ventas/home');
});

router.get('/catalog', (req, res) => {
  res.render('ventas/catalog');
});

module.exports = router; 