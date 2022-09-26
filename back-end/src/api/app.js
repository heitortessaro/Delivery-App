require('express-async-errors');
const express = require('express');
const cors = require('cors');
const { errorHandler } = require('../middleware/errorHandler');
const productsRouter = require('../routes/products.routes');
const userRouter = require('../routes/user.routes');
const salesRouter = require('../routes/sales.routes');
const imagesRouter = require('../routes/images.routes');

const app = express();

app.use(express.json());
app.use(cors());

app.use(productsRouter, userRouter, salesRouter, imagesRouter);

app.get('/coffee', (_req, res) => res.status(418).end());

// app.use('/users', userRouter);

app.use(errorHandler.handle);

module.exports = app;
