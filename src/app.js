const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

app.use(cors());
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/health', (req, res) => {
  return res.status(200).json({ status: 'ok', message: 'Server is healthy' });
});

module.exports = app;
