// routes/admin.js
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.render('admin/home', { layout: 'layouts/admin' });
});
router.get('/cliente', (req, res) => {
  res.render('admin/cliente', { layout: 'layouts/admin' });
});
router.get('/categoria', (req, res) => {
  res.render('admin/categoria', { layout: 'layouts/admin' });
});
router.get('/atributo', (req, res) => {
  res.render('admin/atributo', { layout: 'layouts/admin' });
});
router.get('/zonaReferencia', (req, res) => {
  res.render('admin/zonaReferencia', { layout: 'layouts/admin' });
});
module.exports = router;