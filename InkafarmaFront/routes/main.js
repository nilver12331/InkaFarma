// routes/main.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('ventas/home');
});

module.exports = router; 