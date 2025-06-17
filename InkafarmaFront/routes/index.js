const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home');
});

/*
router.get('/nosotros', (req, res) => {
  res.render('nosotros');
});

router.get('/contactanos', (req, res) => {
  res.render('contactanos');
});

*/
module.exports = router;