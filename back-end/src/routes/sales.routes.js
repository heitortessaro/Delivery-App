const { Router } = require('express');
const { SalesController } = require('../controllers/sales.controller');

const salesRouter = Router();

const salesController = new SalesController();

salesRouter.post('/sales', (req, res) => salesController.createSale(req, res));
salesRouter.get('/sales', (req, res) => salesController.getSales(req, res));

module.exports = salesRouter;