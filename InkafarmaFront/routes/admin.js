// routes/admin.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('admin/home', { layout: 'layouts/admin' });
});
router.get('/cliente', (req, res) => {
  res.render('admin/cliente', { layout: 'layouts/admin' });
});
module.exports = router;