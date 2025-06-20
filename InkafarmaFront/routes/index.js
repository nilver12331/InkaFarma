const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/catalog', (req, res) => {
  res.render('catalog');
});
/*
router.get('/contactanos', (req, res) => {
  res.render('contactanos');
});

*/
module.exports = router;