const { Router } = require('express');
const { ProductsController } = require('../controllers/products.controller');

const productsRouter = Router();

const productsController = new ProductsController();

productsRouter.get('/products', (req, res) => productsController.getProducts(req, res));

module.exports = productsRouter;