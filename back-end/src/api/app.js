require('express-async-errors');
const express = require('express');
const cors = require('cors');
const { errorHandler } = require('../middleware/errorHandler');
const productsRouter = require('../database/routes/products.routes');

const app = express();

app.use(express.json());
app.use(cors());


app.use(productsRouter);

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/users', userRouter);

app.use(errorHandler.handle);

module.exports = app;
