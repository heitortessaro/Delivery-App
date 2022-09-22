const express = require('express');
const productsRouter = require('../database/routes/products.routes');

const app = express();
app.use(productsRouter);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
