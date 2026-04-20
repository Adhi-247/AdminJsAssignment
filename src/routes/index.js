const express = require('express');
const authRoutes = require('./auth.routes');

const router = express.Router();

router.use('/', authRoutes);

module.exports = router;
