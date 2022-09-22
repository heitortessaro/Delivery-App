const { Router } = require('express');
const ProductsController = require('../controllers/products.controller');

const productsRouter = Router();

productsRouter.get('/products', ProductsController.getProducts);

module.exports = productsRouter;